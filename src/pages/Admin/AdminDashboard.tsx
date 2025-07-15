import { useAuth } from "@/contexts/AuthContext";
import { users } from "@/mocks/users";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock data for dashboard stats
  const stats = {
    totalUsers: users.length,
    totalProducts: 150,
    totalOrders: 89,
    revenue: 2500000, // VND
  };

  // Chart data
  const monthlyRevenue = [
    { month: "T1", revenue: 1200000, orders: 45 },
    { month: "T2", revenue: 1800000, orders: 52 },
    { month: "T3", revenue: 2100000, orders: 68 },
    { month: "T4", revenue: 1900000, orders: 61 },
    { month: "T5", revenue: 2500000, orders: 89 },
    { month: "T6", revenue: 2800000, orders: 95 },
  ];

  const productCategories = [
    { name: "Sneakers", value: 45, fill: "var(--sneako-gold)" },
    { name: "Running", value: 25, fill: "#d4af37" },
    { name: "Casual", value: 20, fill: "#b8941f" },
    { name: "Formal", value: 10, fill: "#9c7a0c" },
  ];

  const chartConfig = {
    revenue: {
      label: "Doanh thu",
      color: "var(--sneako-gold)",
    },
    orders: {
      label: "Đơn hàng",
      color: "#d4af37",
    },
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng người dùng
              </CardTitle>
              <svg
                className="w-6 h-6"
                style={{ color: "var(--sneako-gold)" }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--sneako-dark)" }}
              >
                {stats.totalUsers}
              </div>
              <p className="text-xs text-muted-foreground">+2 từ tháng trước</p>
            </CardContent>
          </Card>

          {/* Total Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng sản phẩm
              </CardTitle>
              <svg
                className="w-6 h-6"
                style={{ color: "var(--sneako-gold)" }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM8 15V9h4v6H8z"
                  clipRule="evenodd"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--sneako-dark)" }}
              >
                {stats.totalProducts}
              </div>
              <p className="text-xs text-muted-foreground">+12 sản phẩm mới</p>
            </CardContent>
          </Card>

          {/* Total Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng đơn hàng
              </CardTitle>
              <svg
                className="w-6 h-6"
                style={{ color: "var(--sneako-gold)" }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--sneako-dark)" }}
              >
                {stats.totalOrders}
              </div>
              <p className="text-xs text-muted-foreground">+5% từ tuần trước</p>
            </CardContent>
          </Card>

          {/* Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
              <svg
                className="w-6 h-6"
                style={{ color: "var(--sneako-gold)" }}
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
            </CardHeader>
            <CardContent>
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--sneako-dark)" }}
              >
                {formatCurrency(stats.revenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                +8.2% từ tháng trước
              </p>
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
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo tháng</CardTitle>
              <CardDescription>
                Biểu đồ doanh thu và số đơn hàng 6 tháng gần đây
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [
                      name === "revenue"
                        ? formatCurrency(Number(value))
                        : value,
                      name === "revenue" ? "Doanh thu" : "Đơn hàng",
                    ]}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="var(--sneako-gold)"
                    name="Doanh thu"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Product Categories Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Phân loại sản phẩm</CardTitle>
              <CardDescription>
                Tỷ lệ các loại sản phẩm trong kho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={productCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {productCategories.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Line Chart for Trends */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Xu hướng đơn hàng</CardTitle>
            <CardDescription>
              Biểu đồ đường thể hiện xu hướng số đơn hàng theo tháng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => [value, "Đơn hàng"]}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="var(--sneako-gold)"
                  strokeWidth={3}
                  dot={{ fill: "var(--sneako-gold)", r: 6 }}
                  activeDot={{ r: 8, fill: "#d4af37" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Quản lý người dùng</CardTitle>
              <CardDescription>
                Xem và quản lý tài khoản người dùng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <button
                className="sneako-cta w-full"
                onClick={() => (window.location.href = "/admin/users")}
              >
                Đi tới
              </button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Quản lý sản phẩm</CardTitle>
              <CardDescription>Thêm, sửa, xóa sản phẩm</CardDescription>
            </CardHeader>
            <CardContent>
              <button
                className="sneako-cta w-full"
                onClick={() => (window.location.href = "/admin/products")}
              >
                Đi tới
              </button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Báo cáo</CardTitle>
              <CardDescription>
                Xem báo cáo doanh thu và thống kê
              </CardDescription>
            </CardHeader>
            <CardContent>
              <button
                className="sneako-cta w-full"
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
