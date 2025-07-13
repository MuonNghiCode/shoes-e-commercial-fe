import React from "react";

type Order = {
  id: string;
  date: string;
  status: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
};

interface ViewOrderProps {
  order: Order;
  onClose: () => void;
}

const ViewOrder: React.FC<ViewOrderProps> = ({ order, onClose }) => {
  return (
    <div>
      <h2>Chi tiết đơn hàng: {order.id}</h2>
      <p>
        <strong>Ngày đặt:</strong> {order.date}
      </p>
      <p>
        <strong>Trạng thái:</strong> {order.status}
      </p>
      <p>
        <strong>Tổng tiền:</strong> {order.total.toLocaleString()} đ
      </p>
      <h3>Sản phẩm</h3>
      <ul>
        {order.items.map((item, idx) => (
          <li key={idx}>
            {item.name} x{item.quantity} ({item.price.toLocaleString()} đ)
          </li>
        ))}
      </ul>
      <button onClick={onClose} style={{ marginTop: 16 }}>
        Đóng
      </button>
    </div>
  );
};

export default ViewOrder;
