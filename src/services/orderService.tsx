import { API_ENDPOINTS } from "@/constants";
import BaseApiService from "./base";
import type { Order } from "@/types";

class OrderService extends BaseApiService {
  async getMyOrders(): Promise<Order[]> {
    // Nếu this.get đã trả về response.data, chỉ cần return trực tiếp
    const data = await this.get(API_ENDPOINTS.ORDERS.BASE + "/my");
    console.log("OrderService getMyOrders result:", data);
    return Array.isArray(data) ? data : [];
  }

  async getById(id: string): Promise<any> {
    return await this.get(API_ENDPOINTS.ORDERS.BY_ID(id));
  }
}

export const orderService = new OrderService();
