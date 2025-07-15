import React, { useState } from "react";
import { shoes } from "../mocks/shoes";
import type { Shoe } from "../mocks/shoes";

const initialCart = shoes.map((shoe) => ({ ...shoe, quantity: 1 }));
type CartItem = Shoe & { quantity: number };

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [showConfirm, setShowConfirm] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handleCheckout = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setIsPaid(true);
    setShowConfirm(false);
    setCart([]);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-[#F5E6C5] py-8 px-2 md:px-8">
      <div className="max-w-4xl mx-auto bg-[#FFF8ED] rounded-2xl shadow p-8 border border-[#E6D4B6]">
        <h1 className="text-2xl font-bold text-[#2D1A10] mb-6">Giỏ hàng</h1>
        {isPaid && (
          <div className="text-lg text-green-700 text-center py-8 font-semibold">
            Thanh toán thành công! Cảm ơn bạn đã mua hàng.
          </div>
        )}
        {!isPaid &&
          (cart.length === 0 ? (
            <div className="text-lg text-[#bfa046] text-center py-16 font-semibold">
              Giỏ hàng của bạn đang trống.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-[#2D1A10]">
                <thead>
                  <tr className="bg-[#E6D4B6] text-[#2D1A10]">
                    <th className="py-3 px-4 text-left font-semibold">
                      Sản phẩm
                    </th>
                    <th className="py-3 px-4 text-center font-semibold">
                      Đơn giá
                    </th>
                    <th className="py-3 px-4 text-center font-semibold">
                      Số lượng
                    </th>
                    <th className="py-3 px-4 text-center font-semibold">
                      Thành tiền
                    </th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#E6D4B6] last:border-0"
                    >
                      <td className="py-3 px-4 flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-16 object-contain rounded bg-[#faf9f6]"
                        />
                        <span className="font-semibold">{item.name}</span>
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-[#bfa046]">
                        {item.price.toLocaleString()}đ
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              Number(e.target.value)
                            )
                          }
                          className="w-16 px-2 py-1 rounded border border-[#E6D4B6] text-center bg-[#FFF8ED]"
                        />
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-[#bfa046]">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="bg-[#fff0f0] text-[#d9534f] font-bold px-4 py-1 rounded hover:bg-[#ffeaea] transition-colors"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        <div className="text-right mt-8 text-xl font-bold text-[#bfa046]">
          Tổng cộng: {total.toLocaleString()}đ
        </div>
        <div className="text-right mt-4">
          <button
            className="bg-[#bfa046] hover:bg-[#2D1A10] text-white font-bold text-lg px-8 py-3 rounded-lg transition-colors disabled:opacity-60"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Thanh toán
          </button>
        </div>

        {/* Modal xác nhận thanh toán */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-[#FFF8ED] border border-[#E6D4B6] rounded-2xl shadow-lg p-8 min-w-[320px] max-w-[90vw]">
              <h2 className="text-xl font-bold text-[#2D1A10] mb-4">
                Xác nhận thanh toán
              </h2>
              <div className="mb-6 text-[#2D1A10]">
                Bạn có chắc chắn muốn thanh toán đơn hàng với tổng số tiền{" "}
                <span className="font-bold text-[#bfa046]">
                  {total.toLocaleString()}đ
                </span>{" "}
                không?
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleCancel}
                  className="bg-[#E6D4B6] hover:bg-[#C9B37C] text-[#2D1A10] px-6 py-2 rounded-lg font-semibold shadow transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirm}
                  className="bg-[#bfa046] hover:bg-[#2D1A10] text-white px-6 py-2 rounded-lg font-semibold shadow transition-colors"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
