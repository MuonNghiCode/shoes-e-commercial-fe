import { useAuth } from "@/contexts/AuthContext";
import { users } from "@/mocks/users";

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock data for dashboard stats
  const stats = {
    totalUsers: users.length,
    totalProducts: 150,
    totalOrders: 89,
    revenue: 2500000, // VND
  };

  const recentOrders = [
    {
      id: 1,
      customer: "Nguyễn Văn A",
      product: "Nike Air Max",
      amount: 2500000,
      status: "Completed",
    },
    {
      id: 2,
      customer: "Trần Thị B",
      product: "Adidas Ultraboost",
      amount: 3200000,
      status: "Pending",
    },
    {
      id: 3,
      customer: "Lê Văn C",
      product: "Puma RS-X",
      amount: 1800000,
      status: "Processing",
    },
    {
      id: 4,
      customer: "Phạm Thị D",
      product: "Converse Chuck Taylor",
      amount: 1200000,
      status: "Completed",
    },
  ];

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
      default:
        return "bg-gray-100 text-gray-800";
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div
            className="p-6 rounded-lg shadow-sm border"
            style={{
              background: "var(--sneako-beige)",
              borderColor: "var(--sneako-gold)",
            }}
          >
            <div className="flex items-center">
              <div
                className="p-3 rounded-full mr-4"
                style={{ background: "var(--sneako-gold)" }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: "var(--sneako-dark)" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--sneako-dark)" }}
                >
                  Tổng người dùng
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: "var(--sneako-dark)" }}
                >
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div
            className="p-6 rounded-lg shadow-sm border"
            style={{
              background: "var(--sneako-beige)",
              borderColor: "var(--sneako-gold)",
            }}
          >
            <div className="flex items-center">
              <div
                className="p-3 rounded-full mr-4"
                style={{ background: "var(--sneako-gold)" }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: "var(--sneako-dark)" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM8 15V9h4v6H8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--sneako-dark)" }}
                >
                  Tổng sản phẩm
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: "var(--sneako-dark)" }}
                >
                  {stats.totalProducts}
                </p>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div
            className="p-6 rounded-lg shadow-sm border"
            style={{
              background: "var(--sneako-beige)",
              borderColor: "var(--sneako-gold)",
            }}
          >
            <div className="flex items-center">
              <div
                className="p-3 rounded-full mr-4"
                style={{ background: "var(--sneako-gold)" }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: "var(--sneako-dark)" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--sneako-dark)" }}
                >
                  Tổng đơn hàng
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: "var(--sneako-dark)" }}
                >
                  {stats.totalOrders}
                </p>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div
            className="p-6 rounded-lg shadow-sm border"
            style={{
              background: "var(--sneako-beige)",
              borderColor: "var(--sneako-gold)",
            }}
          >
            <div className="flex items-center">
              <div
                className="p-3 rounded-full mr-4"
                style={{ background: "var(--sneako-gold)" }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: "var(--sneako-dark)" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--sneako-dark)" }}
                >
                  Doanh thu
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: "var(--sneako-dark)" }}
                >
                  {formatCurrency(stats.revenue)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div
          className="p-6 rounded-lg shadow-sm border"
          style={{
            background: "var(--sneako-beige)",
            borderColor: "var(--sneako-gold)",
          }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: "var(--sneako-dark)" }}
          >
            Đơn hàng gần đây
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--sneako-gold)" }}>
                  <th
                    className="text-left py-2 px-4 font-semibold"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    ID
                  </th>
                  <th
                    className="text-left py-2 px-4 font-semibold"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Khách hàng
                  </th>
                  <th
                    className="text-left py-2 px-4 font-semibold"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Sản phẩm
                  </th>
                  <th
                    className="text-left py-2 px-4 font-semibold"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Số tiền
                  </th>
                  <th
                    className="text-left py-2 px-4 font-semibold"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Trạng thái
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
                    <td
                      className="py-3 px-4"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      #{order.id}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      {order.customer}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      {order.product}
                    </td>
                    <td
                      className="py-3 px-4 font-semibold"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div
            className="p-6 rounded-lg shadow-sm border text-center"
            style={{
              background: "var(--sneako-beige)",
              borderColor: "var(--sneako-gold)",
            }}
          >
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--sneako-dark)" }}
            >
              Quản lý người dùng
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--sneako-dark)" }}>
              Xem và quản lý tài khoản người dùng
            </p>
            <button
              className="sneako-cta"
              onClick={() => (window.location.href = "/admin/users")}
            >
              Đi tới
            </button>
          </div>

          <div
            className="p-6 rounded-lg shadow-sm border text-center"
            style={{
              background: "var(--sneako-beige)",
              borderColor: "var(--sneako-gold)",
            }}
          >
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--sneako-dark)" }}
            >
              Quản lý sản phẩm
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--sneako-dark)" }}>
              Thêm, sửa, xóa sản phẩm
            </p>
            <button
              className="sneako-cta"
              onClick={() => (window.location.href = "/admin/products")}
            >
              Đi tới
            </button>
          </div>

          <div
            className="p-6 rounded-lg shadow-sm border text-center"
            style={{
              background: "var(--sneako-beige)",
              borderColor: "var(--sneako-gold)",
            }}
          >
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--sneako-dark)" }}
            >
              Báo cáo
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--sneako-dark)" }}>
              Xem báo cáo doanh thu và thống kê
            </p>
            <button
              className="sneako-cta"
              onClick={() => alert("Tính năng đang phát triển")}
            >
              Đi tới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
