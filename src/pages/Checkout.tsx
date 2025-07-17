import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { shoes } from "../mocks/shoes";
import type { Shoe } from "../mocks/shoes";

type CartItem = Shoe & { quantity: number };

const initialInfo = {
  fullName: "",
  phone: "",
  address: "",
  note: "",
};

const Checkout = () => {
  const [info, setInfo] = useState(initialInfo);
  const [payMethod, setPayMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Lấy cart từ localStorage, nếu không có thì lấy tất cả shoes với quantity=1
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    } else {
      setCart(shoes.map((shoe) => ({ ...shoe, quantity: 1 })));
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInfo((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!info.fullName || !info.phone || !info.address) {
      toast.error("Vui lòng nhập đầy đủ thông tin nhận hàng!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Đặt hàng thành công!");
      // Xóa cart sau khi đặt hàng thành công
      localStorage.removeItem("cart");
      setCart([]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5E6C5] py-8 px-2 md:px-8">
      <div className="max-w-4xl mx-auto bg-[#FFF8ED] rounded-2xl shadow-lg p-8 border border-[#E6D4B6]">
        <h2 className="text-2xl font-bold text-[#2D1A10] mb-6 text-center">
          Thanh toán
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div>
            <h3 className="text-lg font-semibold text-[#2D1A10] mb-4">
              Thông tin nhận hàng
            </h3>
            <div className="flex flex-col gap-3">
              <input
                name="fullName"
                placeholder="Họ và tên"
                value={info.fullName}
                onChange={handleChange}
                className="border border-[#E6D4B6] rounded-lg px-3 py-2 bg-[#FFF8ED] text-[#2D1A10]"
              />
              <input
                name="phone"
                placeholder="Số điện thoại"
                value={info.phone}
                onChange={handleChange}
                className="border border-[#E6D4B6] rounded-lg px-3 py-2 bg-[#FFF8ED] text-[#2D1A10]"
              />
              <input
                name="address"
                placeholder="Địa chỉ nhận hàng"
                value={info.address}
                onChange={handleChange}
                className="border border-[#E6D4B6] rounded-lg px-3 py-2 bg-[#FFF8ED] text-[#2D1A10]"
              />
              <textarea
                name="note"
                placeholder="Ghi chú (tuỳ chọn)"
                value={info.note}
                onChange={handleChange}
                className="border border-[#E6D4B6] rounded-lg px-3 py-2 bg-[#FFF8ED] text-[#2D1A10] min-h-[60px]"
              />
            </div>
            <h3 className="text-lg font-semibold text-[#2D1A10] mt-8 mb-4">
              Phương thức thanh toán
            </h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payMethod"
                  value="cod"
                  checked={payMethod === "cod"}
                  onChange={() => setPayMethod("cod")}
                  className="accent-[#2D1A10]"
                />
                Thanh toán khi nhận hàng (COD)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payMethod"
                  value="bank"
                  checked={payMethod === "bank"}
                  onChange={() => setPayMethod("bank")}
                  className="accent-[#2D1A10]"
                />
                Chuyển khoản ngân hàng
              </label>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#2D1A10] mb-4">
              Sản phẩm
            </h3>
            <div className="flex flex-col gap-4 mb-6">
              {cart.length === 0 ? (
                <div className="text-center text-[#7C5A2D]">
                  Giỏ hàng trống.
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-[#F5E6C5] rounded-lg p-3"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-[#2D1A10]">
                        {item.name}
                      </div>
                      <div className="text-sm text-[#7C5A2D]">
                        x{item.quantity}
                      </div>
                    </div>
                    <div className="font-bold text-[#2D1A10]">
                      {item.price.toLocaleString()}₫
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center justify-between text-lg font-bold text-[#2D1A10] mb-6">
              <span>Tổng tiền:</span>
              <span>{total.toLocaleString()}₫</span>
            </div>
            <button
              type="submit"
              className="w-full bg-[#2D1A10] hover:bg-[#C9B37C] text-white px-6 py-3 rounded-lg font-semibold shadow transition-colors"
              disabled={loading || cart.length === 0}
            >
              {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
