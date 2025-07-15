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
export type CreateProductRequest = Omit<import("./entities").Product, '_id' | 'averageRating' | 'numOfReviews' | 'reviews' | 'createdAt' | 'updatedAt'>;
export type UpdateProductRequest = Partial<CreateProductRequest>;

// Review requests
export interface CreateReviewRequest {
  productId: string;
  rating: number;
  comment: string;
}

// Order requests
export interface CreateOrderItemRequest {
  product: string; // Product ID
  price: number;
  qty: number;
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
  