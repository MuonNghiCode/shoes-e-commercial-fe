import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { orderService } from "@/services/orderService";
import Sidebar from "@/components/user/sideBar";
import { ToastContainer, toast } from "react-toastify";

const statusColor: Record<string, string> = {
  "Hoàn thành": "bg-green-100 text-green-700",
  "Chờ xử lý": "bg-yellow-100 text-yellow-700",
  "Đang giao": "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
};

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    orderService
      .getById(id)
      .then((data) => setOrder(data))
      .catch(() => {
        toast.error("Không tìm thấy đơn hàng!");
        navigate("/orders");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-[#C9B37C]">
        Đang tải chi tiết đơn hàng...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-[#C9B37C]">
        Không tìm thấy đơn hàng.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5E6C5] py-8 px-2 md:px-8">
      <ToastContainer />
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 w-full">
          <Sidebar />
        </div>
        <div className="md:w-3/4 w-full bg-[#FFF8ED] rounded-2xl shadow p-6 border border-[#E6D4B6]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#2D1A10]">
              Chi tiết đơn hàng #{order._id || order.id}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                statusColor[order.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {order.status}
            </span>
          </div>
          <div className="mb-6">
            <div className="font-semibold text-[#2D1A10] mb-2">
              Thông tin giao hàng
            </div>
            <div className="text-sm text-[#7C5A2D]">
              {order.shippingAddress?.address}, {order.shippingAddress?.city},{" "}
              {order.shippingAddress?.country}{" "}
              {order.shippingAddress?.postalCode}
            </div>
            <div className="text-sm text-[#7C5A2D] mt-1">
              Phương thức thanh toán: {order.paymentMethod}
            </div>
          </div>
          <div className="mb-6">
            <div className="font-semibold text-[#2D1A10] mb-2">Sản phẩm</div>
            <table className="min-w-full text-sm text-[#2D1A10]">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left font-semibold">
                    Tên sản phẩm
                  </th>
                  <th className="py-2 px-4 text-left font-semibold">Giá</th>
                  <th className="py-2 px-4 text-left font-semibold">
                    Số lượng
                  </th>
                  <th className="py-2 px-4 text-left font-semibold">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems?.map((item: any, idx: number) => (
                  <tr
                    key={idx}
                    className="border-b border-[#E6D4B6] last:border-0"
                  >
                    <td className="py-2 px-4">
                      {item.product?.name ||
                        item.product?.toString() ||
                        "Sản phẩm"}
                    </td>
                    <td className="py-2 px-4">
                      {item.price?.toLocaleString()} đ
                    </td>
                    <td className="py-2 px-4">{item.qty}</td>
                    <td className="py-2 px-4">
                      {(item.price * item.qty)?.toLocaleString()} đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-center gap-6 mt-8">
            <div className="text-lg font-bold text-[#2D1A10]">
              Tổng tiền: {order.totalPrice?.toLocaleString()} đ
            </div>
          </div>
          <div className="mt-6 text-sm text-[#7C5A2D]">
            Ngày đặt:{" "}
            {order.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
