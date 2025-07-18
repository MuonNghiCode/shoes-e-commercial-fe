import type {
  CreateOrderRequest,
  OrderQueryParams,
  OrderResponse,
  OrdersResponse,
  ResponseModel
} from "@/types";
import BaseApiService from "./base";
import { API_ENDPOINTS } from "@/constants";

class OrderService extends BaseApiService {
  async getAllOrders(params?: OrderQueryParams): Promise<OrdersResponse> {
    return this.get<OrdersResponse["data"]>(API_ENDPOINTS.ORDERS.BASE, params);
  }

  async getOrderById(id: string): Promise<OrderResponse> {
    return this.get<OrderResponse["data"]>(API_ENDPOINTS.ORDERS.BY_ID(id));
  }

  async createOrder(data: CreateOrderRequest): Promise<OrderResponse> {
    return this.post<OrderResponse["data"]>(API_ENDPOINTS.ORDERS.BASE, data);
  }

  async updateOrderToPaid(id: string): Promise<OrderResponse> {
    return this.put<OrderResponse["data"]>(`${API_ENDPOINTS.ORDERS.BY_ID(id)}/pay`);
  }

  async updateOrderToDelivered(id: string): Promise<OrderResponse> {
    return this.put<OrderResponse["data"]>(`${API_ENDPOINTS.ORDERS.BY_ID(id)}/deliver`);
  }

  async deleteOrder(id: string): Promise<ResponseModel<null>> {
    return this.delete<null>(API_ENDPOINTS.ORDERS.BY_ID(id));
  }

  async getMyOrders(): Promise<Order[]> {
    // Nếu this.get đã trả về response.data, chỉ cần return trực tiếp
    const data = await this.get(API_ENDPOINTS.ORDERS.BASE + "/my");
    console.log("OrderService getMyOrders result:", data);
    return Array.isArray(data) ? data : [];
  }

  async getById(id: string): Promise<any> {
    return await this.get(API_ENDPOINTS.ORDERS.BY_ID(id));
  }

  // Admin cập nhật trạng thái đơn hàng
  async updateOrderStatus(id: string, status: string): Promise<any> {
    return await this.put(API_ENDPOINTS.ORDERS.BASE + `/admin/${id}/status`, {
      status,
    });
  }
}

export const orderService = new OrderService();
