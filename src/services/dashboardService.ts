import { adminService } from "./adminService";
import BaseApiService from "./base";
import { API_ENDPOINTS } from "@/constants";

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
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
  async getDashboardStats(): Promise<DashboardStats> {
    // Sử dụng adminService để lấy dữ liệu tổng
    const [usersRes, productsRes, ordersRes] = await Promise.all([
      adminService.getAllAccounts(),
      adminService.getAllProductsForAdmin(),
      this.get(API_ENDPOINTS.ADMIN.ORDERS),
    ]);
    // Log dữ liệu để debug nếu không hiển thị
    console.log("getAllAccounts data:", usersRes);
    console.log("getAllProductsForAdmin data:", productsRes);
    console.log("getAllOrders data:", ordersRes);

    // Nếu adminService trả về { data: [...] }, lấy .data
    const users = Array.isArray(usersRes.data) ? usersRes.data : usersRes;
    const products = Array.isArray(productsRes.data)
      ? productsRes.data
      : productsRes;
    const orders = Array.isArray(ordersRes.data) ? ordersRes.data : ordersRes;

    return {
      totalUsers: users.length,
      totalProducts: products.length,
      totalOrders: orders.length,
    };
  }

  async getRecentOrders(): Promise<RecentOrder[]> {
    const response = await this.get(API_ENDPOINTS.ADMIN.ORDERS);
    // Log dữ liệu để debug nếu không hiển thị
    console.log("getRecentOrders data:", response);
    const orders = Array.isArray(response.data) ? response.data : response;
    return orders.map((order: any) => ({
      id: order._id || order.id,
      customer: order.account?.name || "Unknown",
      product:
        order.orderItems && order.orderItems.length > 0
          ? order.orderItems[0].product?.name || "Unknown"
          : "Unknown",
      amount: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
    }));
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;
