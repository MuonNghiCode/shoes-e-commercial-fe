import type { CartResponse } from "@/types";
import BaseApiService from "./base";

class CartService extends BaseApiService {
  async getCart(): Promise<CartResponse> {
    const response = await this.api.get<CartResponse>("/cart");
    return response.data;
  }

  async addToCart(data: { product: string; price: number; qty: number; size?: string }): Promise<CartResponse> {
    const response = await this.api.post<CartResponse>("/cart", data);
    return response.data;
  }

  async updateCartItem(id: string, qty: number): Promise<CartResponse> {
    const response = await this.api.put<CartResponse>(`/cart/${id}`, { qty });
    return response.data;
  }

  async deleteCartItem(id: string): Promise<CartResponse> {
    const response = await this.api.delete<CartResponse>(`/cart/${id}`);
    return response.data;
  }
}

export const cartService = new CartService();
