import type { Product, Order, Account, Review } from "./entities";
export interface ResponseModel<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface ListResponseData<T> {
  items: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  stats?: any;
}

// Auth responses
export interface LoginResponseData {
  token: string;
  user: Pick<Account, '_id' | 'name' | 'email' | 'isAdmin'>;
}

export interface RegisterResponseData {
  newUser: Pick<Account, '_id' | 'name' | 'email' | 'isAdmin'>;
}

// Product responses
export interface ProductResponseData {
  product: Product;
}

export interface ProductsResponseData {
  products: Product[];
}

// Order responses
export interface OrderResponseData {
  order: Order;
}

export interface OrdersResponseData {
  orders: Order[];
}

// Profile response
export interface ProfileResponseData {
  user: Pick<Account, '_id' | 'name' | 'email' | 'isAdmin'>;
}

// Review response
export interface ReviewResponseData {
  review: Review;
}

// Export type responses
export type LoginResponse = ResponseModel<LoginResponseData>;
export type RegisterResponse = ResponseModel<RegisterResponseData>;
export type ProfileResponse = ResponseModel<ProfileResponseData>;
export type ProductResponse = ResponseModel<ProductResponseData>;
export type ProductsResponse = ResponseModel<ProductsResponseData>;
export type OrderResponse = ResponseModel<OrderResponseData>;
export type OrdersResponse = ResponseModel<OrdersResponseData>;
export type ReviewResponse = ResponseModel<ReviewResponseData>;
export type BaseResponse = ResponseModel<null>;