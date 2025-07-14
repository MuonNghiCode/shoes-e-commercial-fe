import React, { useState } from "react";
import { shoes } from "../mocks/shoes";
import type { Shoe } from "../mocks/shoes";

// Dummy initial cart: 1 of each shoe
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

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 24px 0 rgba(191,160,70,0.10)",
        padding: 32,
      }}
    >
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: "#bfa046",
          marginBottom: 24,
        }}
      >
        Giỏ hàng
      </h1>
      {cart.length === 0 ? (
        <div
          style={{
            fontSize: 20,
            color: "#888",
            textAlign: "center",
            padding: 40,
          }}
        >
          Giỏ hàng của bạn đang trống.
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#faf9f6" }}>
              <th style={{ padding: 12, fontWeight: 700, color: "#bfa046" }}>
                Sản phẩm
              </th>
              <th style={{ padding: 12, fontWeight: 700, color: "#bfa046" }}>
                Đơn giá
              </th>
              <th style={{ padding: 12, fontWeight: 700, color: "#bfa046" }}>
                Số lượng
              </th>
              <th style={{ padding: 12, fontWeight: 700, color: "#bfa046" }}>
                Thành tiền
              </th>
              <th style={{ padding: 12 }}></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f7f3ea" }}>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: 12,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 80,
                      height: 60,
                      objectFit: "contain",
                      borderRadius: 8,
                      background: "#faf9f6",
                    }}
                  />
                  <span style={{ fontWeight: 600 }}>{item.name}</span>
                </td>
                <td
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    color: "#bfa046",
                  }}
                >
                  {item.price.toLocaleString()}đ
                </td>
                <td style={{ textAlign: "center" }}>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                    style={{
                      width: 60,
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #e5d7b6",
                      textAlign: "center",
                    }}
                  />
                </td>
                <td
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    color: "#bfa046",
                  }}
                >
                  {(item.price * item.quantity).toLocaleString()}đ
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => handleRemove(item.id)}
                    style={{
                      background: "#fff0f0",
                      color: "#d9534f",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 16px",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div
        style={{
          textAlign: "right",
          marginTop: 32,
          fontSize: 24,
          fontWeight: 700,
          color: "#bfa046",
        }}
      >
        Tổng cộng: {total.toLocaleString()}đ
      </div>
      <div style={{ textAlign: "right", marginTop: 16 }}>
        <button
          style={{
            background: "#bfa046",
            color: "#fff",
            fontWeight: 700,
            fontSize: 20,
            border: "none",
            borderRadius: 8,
            padding: "12px 32px",
            cursor: "pointer",
          }}
          disabled={cart.length === 0}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Cart;
