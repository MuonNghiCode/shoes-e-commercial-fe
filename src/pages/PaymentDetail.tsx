import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { cartService } from "@/services/cartService";
import { useNavigate } from "react-router-dom";


const PaymentDetail: React.FC = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<any[]>([]); // CartResponse là OrderItem[]
  const [shipping, setShipping] = useState<string>("free");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    cartService.getCart()
      .then((data) => setCart(data))
      .catch(() => setCart([]))
      .finally(() => setLoading(false));
  }, []);

  // Form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
    if (!form.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!form.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";
    return newErrors;
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.qty || item.quantity || 1), 0);
  let shippingCost = 0;
  if (shipping === "flat") shippingCost = 10000;
  if (shipping === "pickup") shippingCost = 15000;
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem("checkoutInfo", JSON.stringify(form));
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("shipping", shipping);
      navigate("/checkout");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-10 p-0">
      {/* Nút quay lại */}
      <button
        type="button"
        onClick={() => navigate("/cart")}
        className="mb-4 flex items-center gap-2 text-[#bfa046] hover:underline font-semibold"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Quay lại giỏ hàng
      </button>
      {/* Stepper */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-lg">
          1
        </div>
        <span className="text-gray-400 font-bold text-2xl md:text-3xl">Giỏ hàng</span>
        <span className="text-gray-300 text-2xl">→</span>
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
          2
        </div>
        <span className="font-bold text-2xl md:text-3xl">Chi tiết thanh toán</span>
        <span className="text-gray-300 text-2xl">→</span>
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-lg">
          3
        </div>
        <span className="text-gray-400 font-bold text-2xl md:text-3xl">Hoàn tất đơn hàng</span>
      </div>
      {/* Main content: 2 columns */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left: Form */}
        <form className="flex-1 bg-white rounded-2xl shadow-lg p-8 mb-10" onSubmit={handleSubmit}>
          <div className="font-bold text-xl mb-6">Thông tin thanh toán & giao hàng</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Họ và tên <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 ${errors.name ? "border-red-400" : "border-[#e5d7b6]"}`}
                placeholder="Nhập họ và tên"
              />
              {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
            </div>
            <div>
              <label className="block font-semibold mb-1">Số điện thoại <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 ${errors.phone ? "border-red-400" : "border-[#e5d7b6]"}`}
                placeholder="Nhập số điện thoại"
              />
              {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-[#e5d7b6] rounded-lg px-3 py-2"
                placeholder="Nhập email (nếu có)"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Địa chỉ cụ thể <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 ${errors.address ? "border-red-400" : "border-[#e5d7b6]"}`}
                placeholder="Số nhà, tên đường, phường/xã"
              />
              {errors.address && <div className="text-red-500 text-xs mt-1">{errors.address}</div>}
            </div>
          </div>
          {/* Shipping method chọn lại */}
          <div className="mt-6">
            <div className="mb-2 font-semibold">Vận chuyển</div>
            <div className="flex flex-col gap-2">
              <label>
                <input
                  type="radio"
                  name="shipping"
                  value="free"
                  checked={shipping === "free"}
                  onChange={() => setShipping("free")}
                  className="mr-2"
                />
                Miễn phí vận chuyển
              </label>
              <label>
                <input
                  type="radio"
                  name="shipping"
                  value="flat"
                  checked={shipping === "flat"}
                  onChange={() => setShipping("flat")}
                  className="mr-2"
                />
                Giao hàng tiêu chuẩn: 10.000đ
              </label>
              <label>
                <input
                  type="radio"
                  name="shipping"
                  value="pickup"
                  checked={shipping === "pickup"}
                  onChange={() => setShipping("pickup")}
                  className="mr-2"
                />
                Nhận tại cửa hàng
              </label>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
            className="mt-8 w-full bg-[color:var(--sneako-gold)] text-black text-lg rounded-lg hover:bg-yellow-400 py-3 cursor-pointer font-bold"
            type="submit"
            disabled={cart.length === 0}
          >
            Xác nhận thanh toán
          </motion.button>
        </form>
        {/* Right: Cart Summary */}
        <div className="min-w-[340px] bg-[#fafafa] rounded-xl shadow-md p-6">
          <div className="font-bold text-xl mb-4">Tóm tắt đơn hàng</div>
          <div className="flex justify-between mb-3">
            <span>Tạm tính</span>
            <span className="font-semibold">{subtotal.toLocaleString()}đ</span>
          </div>
          <div className="mb-3">
            <div className="mb-2">Vận chuyển</div>
            <div>
              {shipping === "free" && <span>Miễn phí vận chuyển</span>}
              {shipping === "flat" && <span>Giao hàng tiêu chuẩn: 10.000đ</span>}
              {shipping === "pickup" && <span>Nhận tại cửa hàng: 15.000đ</span>}
            </div>
          </div>
          <div className="flex justify-between font-bold text-xl my-6">
            <span>Tổng cộng</span>
            <span>{total.toLocaleString()}đ</span>
          </div>
          <div className="text-gray-400 text-xs mt-2">
            Khách hàng: {user?.name || "Chưa đăng nhập"}<br />
            Email: {user?.email || "Chưa nhập"}<br />
            Địa chỉ giao hàng: {form.address ? `${form.address}` : "Chưa nhập"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
