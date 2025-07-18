// Review requests
export interface CreateReviewRequest {
  productId: string;
  accountId: string;
  rating: number;
  comment: string;
}
// Product query params
export interface ProductQueryParams {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: "38" | "39" | "40" | "41" | "42" | "43" | "44";
  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

// Order query params
export interface OrderQueryParams {
  accountId?: string;
  status?: string;
  isPaid?: boolean;
  isDelivered?: boolean;
  fromDate?: string;
  toDate?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}
// ...existing code...
// Auth requests
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

// Profile requests
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Product requests
export type CreateProductRequest = Omit<
  import("./entities").Product,
  | "_id"
  | "averageRating"
  | "numOfReviews"
  | "review"
  | "createdAt"
  | "updatedAt"
>;
export type UpdateProductRequest = Partial<CreateProductRequest>;

// Review requests
export interface CreateReviewRequest {
  productId: string;
  rating: number;
  comment: string;
}

// Order requests
export interface CreateOrderItemRequest {
  account: string; // Account ID - required by backend
  product: string; // Product ID
  price: number;
  qty: number;
  size: string; // Size field for shoes
}

export interface CreateOrderRequest {
  account: string; // Account ID
  orderItems: CreateOrderItemRequest[];
  shippingAddress: import("./entities").ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export interface UpdateOrderItemRequest {
  product?: string;
  price?: number;
  qty?: number;
}

// Admin requests
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  phone?: string;
  address?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  isAdmin?: boolean;
  phone?: string;
  address?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string;
}
