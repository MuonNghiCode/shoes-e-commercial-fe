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
  export interface CreateProductRequest {
    name: string;
    price: number;
    description?: string;
    brand: string;
    sizes: '38' | '39' | '40' | '41' | '42' | '43' | '44';
    stock: number;
    category: string;
    images: string[] | string; // chấp nhận chuỗi hoặc mảng chuỗi
  }
  
  export interface UpdateProductRequest extends Partial<CreateProductRequest> {}
  
  export interface CreateOrderRequest {
    account: string; // ID
    orderItems: CreateOrderItemRequest[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
  }
  
  export interface CreateOrderItemRequest {
    product: string; // ID
    price: number;
    qty: number;
  }
  
  export interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  export interface UpdateOrderItemRequest {
    product?: string;
    price?: number;
    qty?: number;
  }
  