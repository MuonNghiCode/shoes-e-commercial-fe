import { useState } from "react";
import ViewOrder from "./ViewOrder";

const orders = [
  {
    id: "DH001",
    date: "2025-07-01",
    status: "Đang xử lý",
    total: 3200000,
    items: [{ name: "Nike Air Max 270", quantity: 1, price: 3200000 }],
  },
  {
    id: "DH002",
    date: "2025-06-20",
    status: "Đã giao",
    total: 5000000,
    items: [
      { name: "Adidas Ultraboost 21", quantity: 1, price: 3500000 },
      { name: "Converse Chuck Taylor", quantity: 1, price: 1500000 },
    ],
  },
];

export default function MyOrders() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <div>
      <h1>Đơn hàng của tôi</h1>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Mã đơn</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Ngày đặt</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Trạng thái</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Tổng tiền</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Sản phẩm</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>
                {order.id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>
                {order.date}
              </td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>
                {order.status}
              </td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>
                {order.total.toLocaleString()} đ
              </td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x{item.quantity} (
                      {item.price.toLocaleString()} đ)
                    </li>
                  ))}
                </ul>
              </td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>
                <button onClick={() => setSelectedOrder(order)}>
                  View Order Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              minWidth: 350,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ViewOrder
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
