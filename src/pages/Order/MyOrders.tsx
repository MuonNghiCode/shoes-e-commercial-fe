import React, { useEffect, useState } from "react";
import Sidebar from "@/components/user/sideBar";
import { orderService } from "@/services/orderService";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const statusColor: Record<string, string> = {
  "Hoàn thành": "bg-green-100 text-green-700",
  "Chờ xử lý": "bg-yellow-100 text-yellow-700",
  "Đang giao": "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const MyOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    orderService
      .getMyOrders()
      .then((data) => {
        console.log("Orders from BE:", data); // Log dữ liệu để kiểm tra
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setOrders([]);
        toast.error("Không thể tải đơn hàng!");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleViewDetail = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

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
              Đơn hàng của tôi
            </h2>
            <span className="text-base font-normal text-[#C9B37C]">
              ({orders.length} đơn hàng)
            </span>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-8 text-[#C9B37C] font-semibold">
                Đang tải đơn hàng...
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8 text-[#C9B37C] font-semibold">
                Bạn chưa có đơn hàng nào.
              </div>
            ) : (
              <table className="min-w-full text-sm text-[#2D1A10]">
                <thead>
                  <tr className="bg-[#E6D4B6] text-[#2D1A10]">
                    <th className="py-3 px-4 text-left font-semibold">
                      Mã đơn
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">
                      Ngày đặt
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">
                      Tổng tiền
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr
                      key={order._id || order.id || idx}
                      className="border-b border-[#E6D4B6] last:border-0 hover:bg-[#F5E6C5]/60 transition"
                    >
                      <td className="py-3 px-4 font-medium">
                        <button
                          type="button"
                          className="text-[#2D1A10] hover:text-[#C9B37C] underline font-semibold"
                          onClick={() =>
                            handleViewDetail(order._id || order.id)
                          }
                        >
                          #{order._id || order.id || idx}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : ""}
                      </td>
                      <td className="py-3 px-4">
                        {order.totalPrice
                          ? order.totalPrice.toLocaleString() + " đ"
                          : ""}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            statusColor[order.status] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status || "Chưa xác định"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
