import { useAuth } from "@/contexts/AuthContext";
import { users } from "@/mocks/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SimpleBarChart,
  SimpleLineChart,
  StatCard,
} from "@/components/ui/charts";
import { Users, Package, ClipboardList, DollarSign } from "@/lib/icons";

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

  const salesData = [
    { label: "T2", value: 1200000 },
    { label: "T3", value: 1900000 },
    { label: "T4", value: 3000000 },
    { label: "T5", value: 2500000 },
    { label: "T6", value: 3200000 },
    { label: "T7", value: 2800000 },
    { label: "CN", value: 4000000 },
  ];

  const monthlyData = [
    { label: "T1", value: 45 },
    { label: "T2", value: 52 },
    { label: "T3", value: 48 },
    { label: "T4", value: 61 },
    { label: "T5", value: 55 },
    { label: "T6", value: 67 },
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
      <div className="p-6 space-y-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Tổng người dùng"
            value={stats.totalUsers}
            change={12}
            icon={Users}
          />
          <StatCard
            title="Tổng sản phẩm"
            value={stats.totalProducts}
            change={8}
            icon={Package}
          />
          <StatCard
            title="Tổng đơn hàng"
            value={stats.totalOrders}
            change={-3}
            icon={ClipboardList}
          />
          <StatCard
            title="Doanh thu"
            value={formatCurrency(stats.revenue)}
            change={15}
            icon={DollarSign}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle style={{ color: "var(--sneako-dark)" }}>
                Doanh thu tuần
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={salesData} height={250} />
            </CardContent>
          </Card>

          {/* Monthly Orders Chart */}
          <Card>
            <CardHeader>
              <CardTitle style={{ color: "var(--sneako-dark)" }}>
                Đơn hàng theo tháng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleLineChart data={monthlyData} height={250} />
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "var(--sneako-dark)" }}>
              Đơn hàng gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--sneako-gold)" }}>
                    <th
                      className="text-left py-3 px-4 font-semibold"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      ID
                    </th>
                    <th
                      className="text-left py-3 px-4 font-semibold"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      Khách hàng
                    </th>
                    <th
                      className="text-left py-3 px-4 font-semibold"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      Sản phẩm
                    </th>
                    <th
                      className="text-left py-3 px-4 font-semibold"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      Số tiền
                    </th>
                    <th
                      className="text-left py-3 px-4 font-semibold"
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
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--sneako-dark)" }}
              >
                Quản lý người dùng
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--sneako-dark)" }}
              >
                Xem và quản lý tài khoản người dùng
              </p>
              <button
                className="sneako-cta"
                onClick={() => (window.location.href = "/admin/users")}
              >
                Đi tới
              </button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--sneako-dark)" }}
              >
                Quản lý sản phẩm
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--sneako-dark)" }}
              >
                Thêm, sửa, xóa sản phẩm
              </p>
              <button
                className="sneako-cta"
                onClick={() => (window.location.href = "/admin/products")}
              >
                Đi tới
              </button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--sneako-dark)" }}
              >
                Báo cáo
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--sneako-dark)" }}
              >
                Xem báo cáo doanh thu và thống kê
              </p>
              <button
                className="sneako-cta"
                onClick={() => alert("Tính năng đang phát triển")}
              >
                Đi tới
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
