import BaseApiService from "./base";

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  orders: number;
}

export interface ProductCategory {
  name: string;
  value: number;
  fill: string;
}

export interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: string;
  createdAt: string;
}

class DashboardService extends BaseApiService {
  /**
   * Helper method để tạo dữ liệu tháng trống cho 6 tháng gần nhất
   */
  private createEmptyMonthlyData(): MonthlyRevenue[] {
    const currentDate = new Date();
    const monthNames = [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ];
    const result: MonthlyRevenue[] = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() - i);
      const monthKey = monthNames[date.getMonth()];

      result.push({
        month: monthKey,
        revenue: 0,
        orders: 0,
      });
    }

    return result;
  }

  /**
   * Lấy thống kê tổng quan cho dashboard
   * Sử dụng mock data để hiển thị ngay lập tức
   */
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Trả về mock data
      return {
        totalUsers: 1250,
        totalProducts: 89,
        totalOrders: 342,
        totalRevenue: 87500000,
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      return {
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
      };
    }
  }

  /**
   * Lấy dữ liệu doanh thu theo tháng - Mock data
   */
  async getMonthlyRevenue(): Promise<MonthlyRevenue[]> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Trả về mock data cho 6 tháng gần nhất
      return [
        { month: "T2", revenue: 12500000, orders: 45 },
        { month: "T3", revenue: 15800000, orders: 52 },
        { month: "T4", revenue: 18200000, orders: 67 },
        { month: "T5", revenue: 16900000, orders: 58 },
        { month: "T6", revenue: 21300000, orders: 73 },
        { month: "T7", revenue: 19800000, orders: 65 },
      ];
    } catch (error) {
      console.error("Error fetching monthly revenue:", error);
      return this.createEmptyMonthlyData();
    }
  }

  /**
   * Lấy dữ liệu phân loại sản phẩm - Mock data
   */
  async getProductCategories(): Promise<ProductCategory[]> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Trả về mock data
      return [
        {
          name: "Sneakers",
          value: 45,
          fill: "var(--sneako-gold)",
        },
        {
          name: "Boots",
          value: 30,
          fill: "#d4af37",
        },
        {
          name: "Casual",
          value: 25,
          fill: "#b8941f",
        },
      ];
    } catch (error) {
      console.error("Error fetching product categories:", error);
      return [];
    }
  }

  /**
   * Lấy danh sách đơn hàng gần đây - Mock data
   */
  async getRecentOrders(): Promise<RecentOrder[]> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Trả về mock data
      return [
        {
          id: "1",
          customer: "Nguyễn Văn A",
          product: "Nike Air Max 270",
          amount: 3500000,
          status: "Completed",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          customer: "Trần Thị B",
          product: "Adidas Ultra Boost",
          amount: 4200000,
          status: "Processing",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "3",
          customer: "Lê Hoàng C",
          product: "Converse Chuck Taylor",
          amount: 1800000,
          status: "Shipped",
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: "4",
          customer: "Phạm Minh D",
          product: "Vans Old Skool",
          amount: 2100000,
          status: "Completed",
          createdAt: new Date(Date.now() - 259200000).toISOString(),
        },
        {
          id: "5",
          customer: "Võ Thị E",
          product: "Puma RS-X",
          amount: 2800000,
          status: "Processing",
          createdAt: new Date(Date.now() - 345600000).toISOString(),
        },
      ];
    } catch (error) {
      console.error("Error fetching recent orders:", error);
      return [];
    }
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;
