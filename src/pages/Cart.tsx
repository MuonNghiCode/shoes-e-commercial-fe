import React, { useState } from "react";
import { shoes } from "../mocks/shoes";
import type { Shoe } from "../mocks/shoes";
import { motion } from "framer-motion";

// Dummy initial cart: 1 of each shoe
const initialCart = shoes.map((shoe) => ({ ...shoe, quantity: 1 }));

type CartItem = Shoe & { quantity: number };

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [shipping, setShipping] = useState<string>("free");

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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let shippingCost = 0;
  if (shipping === "flat") shippingCost = 10000;
  if (shipping === "pickup") shippingCost = 15000;
  const total = subtotal + shippingCost;

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
          {cart.length === 0 ? (
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
                  <tr key={item.id} className="border-b border-[#f7f3ea]">
                    <td className="flex items-center gap-4 p-3">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-15 object-contain rounded-lg bg-[#faf9f6]"
                      />
                      <span className="font-semibold">{item.name}</span>
                    </td>
                    <td className="text-center font-semibold text-[#bfa046]">
                      {item.price.toLocaleString()}đ
                    </td>
                    <td className="text-center">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, Number(e.target.value))
                        }
                        className="w-16 py-1 rounded-md  border-[#e5d7b6] text-center"
                      />
                    </td>
                    <td className="text-center font-semibold text-[#bfa046]">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleRemove(item.id)}
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
          <div className="mb-3">
            <div className="mb-2">Vận chuyển</div>
            <div>
              <label className="block mb-1">
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
              <label className="block mb-1">
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
              <label className="block">
                <input
                  type="radio"
                  name="shipping"
                  value="pickup"
                  checked={shipping === "pickup"}
                  onChange={() => setShipping("pickup")}
                  className="mr-2"
                />
                Nhận tại cửa hàng: 15.000đ
              </label>
            </div>
            <div className="text-gray-400 text-xs mt-2">
              Giao đến 211, 121, hcm, 1111, Afghanistan.
              <br />
              <a href="#" className="text-[#bfa046] underline">
                Đổi địa chỉ
              </a>
            </div>
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
          >
            Tiến hành thanh toán
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
