import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cartService } from "@/services/cartService";

const Cart: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState<string>("free");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setLoading(true);
    cartService.getCart()
      .then(data => setCart(data))
      .catch(() => setCart([]))
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    setLoading(true);
    try {
      await cartService.updateCartItem(itemId, quantity);
      setRefresh(r => r + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (itemId: string) => {
    setLoading(true);
    try {
      await cartService.deleteCartItem(itemId);
      setRefresh(r => r + 1);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  let shippingCost = 0;
  if (shipping === "flat") shippingCost = 10000;
  if (shipping === "pickup") shippingCost = 15000;
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    // Khi thanh toán thành công, nên xóa cart ở backend và reload lại cart FE
    window.location.href = "/payment_detail";
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-10 p-0">
      {/* Stepper */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
          1
        </div>
        <span className="font-bold text-2xl md:text-3xl">Giỏ hàng</span>
        <span className="text-gray-300 text-2xl">→</span>
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-lg">
          2
        </div>
        <span className="text-gray-400 font-bold text-2xl md:text-3xl">
          Chi tiết thanh toán
        </span>
        <span className="text-gray-300 text-2xl">→</span>
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-lg">
          3
        </div>
        <span className="text-gray-400 font-bold text-2xl md:text-3xl">
          Hoàn tất đơn hàng
        </span>
      </div>
      {/* Main content: 2 columns */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left: Cart Table */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 mb-10">
          {loading ? (
            <div className="text-xl text-gray-400 text-center py-10">Đang tải...</div>
          ) : cart.length === 0 ? (
            <div className="text-xl text-gray-400 text-center py-10">
              Giỏ hàng của bạn đang trống.
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 font-bold text-[#bfa046] text-left">
                    Sản phẩm
                  </th>
                  <th className="p-3 font-bold text-[#bfa046]">Đơn giá</th>
                  <th className="p-3 font-bold text-[#bfa046]">Số lượng</th>
                  <th className="p-3 font-bold text-[#bfa046]">Thành tiền</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id} className="border-b border-[#f7f3ea]">
                    <td className="flex items-center gap-4 p-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-15 object-contain rounded-lg bg-[#faf9f6]"
                      />
                      <span className="font-semibold">{item.product.name} <span className="ml-2 text-xs text-gray-500">(Size {item.size || "-"})</span></span>
                    </td>
                    <td className="text-center font-semibold text-[#bfa046]">
                      {item.price.toLocaleString()}đ
                    </td>
                    <td className="text-center">
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) =>
                          handleQuantityChange(item._id, Number(e.target.value))
                        }
                        className="w-16 py-1 rounded-md  border-[#e5d7b6] text-center"
                      />
                    </td>
                    <td className="text-center font-semibold text-[#bfa046]">
                      {(item.price * item.qty).toLocaleString()}đ
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className=" text-gray-400 cursor-pointer"
                      >
                        x
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Right: Cart Summary */}
        <div className="min-w-[340px] bg-[#fafafa] rounded-xl shadow-md p-6">
          <div className="font-bold text-xl mb-4">Tổng kết giỏ hàng</div>
          <div className="flex justify-between mb-3">
            <span>Tạm tính</span>
            <span className="font-semibold">{subtotal.toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between font-bold text-xl my-6">
            <span>Tổng cộng</span>
            <span>{total.toLocaleString()}đ</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
            className="w-full bg-[color:var(--sneako-gold)] text-black text-lg rounded-lg hover:bg-yellow-400 py-3 cursor-pointer font-bold"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Chi tiết thanh toán
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
