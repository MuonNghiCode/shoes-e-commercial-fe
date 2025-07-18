import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import dashboardService from "@/services/dashboardService";
import { orderService } from "@/services/orderService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = [
  "Pending",
  "Processing",
  "Delivered",
  "Completed",
  "Cancelled",
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [editingStatus, setEditingStatus] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [statusValues, setStatusValues] = useState<{ [id: string]: string }>(
    {}
  );
  const navigate = useNavigate();

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [dashboardStats, recentOrdersData] = await Promise.all([
          dashboardService.getDashboardStats(),
          dashboardService.getRecentOrders(),
        ]);
        setStats(dashboardStats);
        setRecentOrders(recentOrdersData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Có lỗi khi tải dữ liệu dashboard!");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Xử lý sửa trạng thái đơn hàng
  const handleEditStatus = (orderId: string, currentStatus: string) => {
    setEditingStatus((prev) => ({ ...prev, [orderId]: true }));
    setStatusValues((prev) => ({ ...prev, [orderId]: currentStatus }));
  };

  const handleCancelEdit = (orderId: string) => {
    setEditingStatus((prev) => ({ ...prev, [orderId]: false }));
  };

  const handleStatusChange = (orderId: string, value: string) => {
    setStatusValues((prev) => ({ ...prev, [orderId]: value }));
  };

  const handleSaveStatus = async (orderId: string) => {
    try {
      await orderService.updateOrderStatus(orderId, statusValues[orderId]);
      toast.success("Cập nhật trạng thái thành công!");
      // Cập nhật lại danh sách đơn hàng
      const recentOrdersData = await dashboardService.getRecentOrders();
      setRecentOrders(recentOrdersData);
      setEditingStatus((prev) => ({ ...prev, [orderId]: false }));
    } catch (err) {
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--sneako-gray)" }}>
      <div className="mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--sneako-dark)" }}
          >
            Chào mừng, {user?.username}!
          </h1>
          <p className="text-lg" style={{ color: "var(--sneako-dark)" }}>
            Tổng quan hệ thống quản lý cửa hàng giày
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg" style={{ color: "var(--sneako-dark)" }}>
              Đang tải dữ liệu...
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Users */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Tổng người dùng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    {stats.totalUsers}
                  </div>
                </CardContent>
              </Card>

              {/* Total Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Tổng sản phẩm
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    {stats.totalProducts}
                  </div>
                </CardContent>
              </Card>

              {/* Total Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Tổng đơn hàng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    {stats.totalOrders}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Đơn hàng gần đây</CardTitle>
                <CardDescription>
                  Danh sách các đơn hàng mới nhất trong hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1px solid var(--sneako-gold)",
                          }}
                        >
                          <th className="text-left py-2 px-4 font-semibold">
                            Mã đơn
                          </th>
                          <th className="text-left py-2 px-4 font-semibold">
                            Khách hàng
                          </th>
                          <th className="text-left py-2 px-4 font-semibold">
                            Sản phẩm
                          </th>
                          <th className="text-left py-2 px-4 font-semibold">
                            Số tiền
                          </th>
                          <th className="text-left py-2 px-4 font-semibold">
                            Trạng thái
                          </th>
                          <th className="text-left py-2 px-4 font-semibold">
                            Hành động
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order, index) => (
                          <tr
                            key={order.id}
                            style={{
                              borderBottom:
                                index < recentOrders.length - 1
                                  ? "1px solid var(--sneako-gold)"
                                  : "none",
                            }}
                          >
                            <td className="py-3 px-4">
                              <button
                                className="text-blue-700 underline font-semibold"
                                onClick={() => navigate(`/orders/${order.id}`)}
                                type="button"
                              >
                                #{order.id}
                              </button>
                            </td>
                            <td className="py-3 px-4">{order.customer}</td>
                            <td className="py-3 px-4">{order.product}</td>
                            <td className="py-3 px-4 font-semibold">
                              {formatCurrency(order.amount)}
                            </td>
                            <td className="py-3 px-4">
                              {editingStatus[order.id] ? (
                                <select
                                  value={statusValues[order.id]}
                                  onChange={(e) =>
                                    handleStatusChange(order.id, e.target.value)
                                  }
                                  className="border rounded px-2 py-1"
                                >
                                  {STATUS_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {order.status}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {editingStatus[order.id] ? (
                                <>
                                  <button
                                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => handleSaveStatus(order.id)}
                                    type="button"
                                  >
                                    Lưu
                                  </button>
                                  <button
                                    className="bg-gray-300 text-black px-3 py-1 rounded"
                                    onClick={() => handleCancelEdit(order.id)}
                                    type="button"
                                  >
                                    Hủy
                                  </button>
                                </>
                              ) : (
                                <button
                                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                                  onClick={() =>
                                    handleEditStatus(order.id, order.status)
                                  }
                                  type="button"
                                >
                                  Sửa trạng thái
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p>Chưa có đơn hàng nào trong hệ thống</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
