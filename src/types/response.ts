export interface ResponseModel<T> {
    success: boolean;
    message: string;
    data: T;
}

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
    images: string[] | string;
  }
  
  export interface UpdateProductRequest extends Partial<CreateProductRequest> {}
  
  // Product response
  import type { Product } from "./entities";
  
  export interface ProductResponseData {
    product: Product;
  }
  
  export interface ProductsResponseData {
    products: Product[];
  }
  
  export type ProductResponse = ResponseModel<ProductResponseData>;
  export type ProductsResponse = ResponseModel<ProductsResponseData>;
  export type CreateProductResponse = ResponseModel<Product>;
  export type UpdateProductResponse = ResponseModel<Product>;
  export type DeleteProductResponse = ResponseModel<{ message: string }>;
  