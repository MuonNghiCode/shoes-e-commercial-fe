import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { orderService } from "@/services/orderService";

function randomOrderId() {
  return (
    "OD" +
    Math.floor(100000 + Math.random() * 900000).toString() +
    Date.now().toString().slice(-4)
  );
}

const Checkout = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<any[]>([]);
  const [info, setInfo] = useState<any>(null);
  const [shipping, setShipping] = useState<string>("free");
  const [note, setNote] = useState("");
  const [orderId, setOrderId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    setCart(cartData ? JSON.parse(cartData) : []);
    const infoData = localStorage.getItem("checkoutInfo");
    setInfo(infoData ? JSON.parse(infoData) : null);
    const shippingData = localStorage.getItem("shipping");
    setShipping(shippingData || "free");
  }, []);

  useEffect(() => {
    if (info && info.note) setNote(info.note);
  }, [info]);

  // Tính lại subtotal và shippingCost để dùng cho tổng thanh toán
  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || item.qty || 1), 0);
  let shippingCost = 0;
  if (shipping === "flat") shippingCost = 10000;
  if (shipping === "pickup") shippingCost = 15000;
  const total = subtotal + shippingCost;

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Debug log để kiểm tra user
    console.log("User object:", user);
    console.log("User ID:", user?._id);
    
    // Lấy user ID với fallback
    const userId = user?._id || user?.id;
    
    // Kiểm tra user đã đăng nhập chưa
    if (!user || !userId) {
      toast.error("Vui lòng đăng nhập để đặt hàng!");
      setLoading(false);
      return;
    }
    
    // Kiểm tra thông tin giao hàng
    if (!info || !info.address) {
      toast.error("Vui lòng nhập thông tin giao hàng!");
      setLoading(false);
      return;
    }
    
    try {
      // Chuẩn bị dữ liệu order
      const orderItems = cart.map((item) => ({
        account: userId, // Account cho từng item theo yêu cầu của backend
        product: item.product?._id || item._id || item.id,
        price: item.price,
        qty: item.quantity || item.qty || 1,
        size: item.size || "N/A", // Bổ sung size, mặc định là N/A nếu không có
      }));
      
      const shippingAddress = {
        address: info.address,
        city: info.city || "",
        postalCode: "",
        country: "",
      };
      
      const payload = {
        account: userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shippingCost,
        totalPrice: total,
      };
      
      console.log("Payload being sent:", payload); // Debug log
      const res = await orderService.createOrder(payload);
      setOrderId(res?.data?.order?._id || randomOrderId());
      toast.success("Đặt hàng thành công!");
      localStorage.removeItem("cart");
      localStorage.removeItem("checkoutInfo");
      localStorage.removeItem("shipping");
    } catch (err: any) {
      console.error("Error creating order:", err);
      console.error("Error response:", err?.response?.data);
      toast.error(`Đặt hàng thất bại: ${err?.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-10 p-0">
      {/* Nút quay lại */}
      <button
        type="button"
        onClick={() => window.location.href = "/payment_detail"}
        className="mb-4 flex items-center gap-2 text-[#bfa046] hover:underline font-semibold"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Quay lại chi tiết thanh toán
      </button>
      {/* Stepper */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-lg">
          1
        </div>
        <span className="text-gray-400 font-bold text-2xl md:text-3xl">Giỏ hàng</span>
        <span className="text-gray-300 text-2xl">→</span>
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-lg">
          2
        </div>
        <span className="text-gray-400 font-bold text-2xl md:text-3xl">Chi tiết thanh toán</span>
        <span className="text-gray-300 text-2xl">→</span>
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
          3
        </div>
        <span className="font-bold text-2xl md:text-3xl">Hoàn tất đơn hàng</span>
      </div>
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left: Order Summary */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 mb-10">
          <div className="font-bold text-xl mb-6">Tóm tắt đơn hàng</div>
          <div className="flex flex-col gap-4 mb-6">
            {cart.length === 0 ? (
              <div className="text-center text-gray-400">Giỏ hàng trống.</div>
            ) : (
              cart.map((item, idx) => (
                <div key={(item.id || item._id || idx) + (item.size || "") + idx} className="flex items-center gap-4 bg-[#f5f5f5] rounded-lg p-3">
                  <img src={item.images?.[0] || item.product?.images?.[0] || ""} alt={item.name || item.product?.name || ""} className="w-16 h-16 object-contain rounded" />
                  <div className="flex-1">
                    <div className="font-semibold text-[#2D1A10]">
                      {(item.name || item.product?.name) || ""} <span className="text-sm text-gray-500">Size {item.size || "-"}</span>
                    </div>
                    <div className="text-sm text-gray-500">x{item.quantity || item.qty || 1}</div>
                  </div>
                  <div className="font-bold text-[#bfa046]">
                    {(item.price || 0).toLocaleString()}₫
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-between mb-2">
            <span>Tạm tính</span>
            <span className="font-semibold">{cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || item.qty || 1), 0).toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Phí vận chuyển</span>
            <span className="font-semibold">
              {shipping === "free" && "Miễn phí"}
              {shipping === "flat" && "10.000₫"}
              {shipping === "pickup" && "15.000₫"}
            </span>
          </div>
          <div className="flex justify-between font-bold text-xl my-6">
            <span>Tổng thanh toán</span>
            <span>{total.toLocaleString()}₫</span>
          </div>
        </div>
        {/* Right: Info & Confirm */}
        <form className="min-w-[340px] bg-[#fafafa] rounded-xl shadow-md p-6" onSubmit={handleConfirm}>
          <div className="font-bold text-xl mb-4">Thông tin người nhận & địa chỉ giao hàng</div>
          {info ? (
            <div className="mb-4 text-base text-[#2D1A10]">
              <div><span className="font-semibold">Họ tên:</span> {info.name || info.fullName}</div>
              <div><span className="font-semibold">Số điện thoại:</span> {info.phone}</div>
              {info.email && <div><span className="font-semibold">Email:</span> {info.email}</div>}
              <div><span className="font-semibold">Địa chỉ:</span> {info.address}</div>
            </div>
          ) : (
            <div className="text-gray-400 mb-4">Không có thông tin người nhận.</div>
          )}
          {!orderId ? (
            <button
              type="submit"
              className="w-full bg-[color:var(--sneako-gold)] text-black text-lg rounded-lg hover:bg-yellow-400 py-3 cursor-pointer font-bold"
              disabled={cart.length === 0 || loading}
            >
              {loading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
            </button>
          ) : (
            <div className="text-center mt-6">
              <div className="text-green-600 font-bold text-lg mb-2">Đặt hàng thành công!</div>
              <div className="text-base">Mã đơn hàng của bạn là:</div>
              <div className="text-2xl font-bold text-[#bfa046]">#{orderId}</div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Checkout;
