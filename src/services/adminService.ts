import BaseApiService from "./base";
import { API_ENDPOINTS } from "@/constants";
import type {
  ResponseModel,
  User,
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  CreateUserRequest,
  UpdateUserRequest,
} from "@/types";

class AdminService extends BaseApiService {
  // ==================== USER MANAGEMENT ====================

  /**
   * Tạo tài khoản mới
   */
  async createAccount(
    userData: CreateUserRequest
  ): Promise<ResponseModel<User>> {
    return this.post<User>(API_ENDPOINTS.ADMIN.ACCOUNTS, userData);
  }

  /**
   * Lấy tất cả tài khoản
   */
  async getAllAccounts(): Promise<ResponseModel<User[]>> {
    return this.get<User[]>(API_ENDPOINTS.ADMIN.ACCOUNTS);
  }

  /**
   * Lấy tài khoản theo ID
   */
  async getAccountById(id: string): Promise<ResponseModel<User>> {
    return this.get<User>(`${API_ENDPOINTS.ADMIN.ACCOUNTS}/${id}`);
  }

  /**
   * Cập nhật tài khoản
   */
  async updateAccount(
    id: string,
    userData: UpdateUserRequest
  ): Promise<ResponseModel<User>> {
    return this.put<User>(`${API_ENDPOINTS.ADMIN.ACCOUNTS}/${id}`, userData);
  }

  /**
   * Xóa tài khoản
   */
  async deleteAccount(id: string): Promise<ResponseModel<void>> {
    return this.delete<void>(`${API_ENDPOINTS.ADMIN.ACCOUNTS}/${id}`);
  }

  // ==================== PRODUCT MANAGEMENT ====================

  /**
   * Tạo sản phẩm mới (với upload ảnh)
   */
  async createProduct(
    productData: CreateProductRequest & { imageFiles?: File[] }
  ): Promise<ResponseModel<Product>> {
    // Nếu có file ảnh, tạo FormData
    if (productData.imageFiles && productData.imageFiles.length > 0) {
      const formData = new FormData();

      // Thêm các trường dữ liệu vào FormData
      Object.keys(productData).forEach((key) => {
        if (key !== "imageFiles") {
          const value = productData[key as keyof CreateProductRequest];
          if (value !== undefined && value !== null) {
            formData.append(
              key,
              typeof value === "object" ? JSON.stringify(value) : String(value)
            );
          }
        }
      });

      // Thêm file ảnh (multiple files)
      productData.imageFiles.forEach((file, index) => {
        formData.append(`image_${index}`, file);
      });

      // Gửi request với FormData
      const response = await this.api.post<ResponseModel<Product>>(
        API_ENDPOINTS.ADMIN.PRODUCTS,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    }

    // Nếu không có file, gửi JSON thông thường
    return this.post<Product>(API_ENDPOINTS.ADMIN.PRODUCTS, productData);
  }

  /**
   * Lấy tất cả sản phẩm cho admin
   */
  async getAllProductsForAdmin(): Promise<ResponseModel<Product[]>> {
    return this.get<Product[]>(API_ENDPOINTS.ADMIN.ALL_PRODUCTS);
  }

  /**
   * Lấy sản phẩm theo ID
   */
  async getProductById(id: string): Promise<ResponseModel<Product>> {
    return this.get<Product>(`${API_ENDPOINTS.ADMIN.PRODUCTS}/${id}`);
  }

  /**
   * Cập nhật sản phẩm
   */
  async updateProduct(
    id: string,
    productData: UpdateProductRequest & { imageFiles?: File[] }
  ): Promise<ResponseModel<Product>> {
    // Nếu có file ảnh mới, tạo FormData
    if (productData.imageFiles && productData.imageFiles.length > 0) {
      const formData = new FormData();

      // Thêm các trường dữ liệu vào FormData
      Object.keys(productData).forEach((key) => {
        if (key !== "imageFiles") {
          const value = productData[key as keyof UpdateProductRequest];
          if (value !== undefined && value !== null) {
            formData.append(
              key,
              typeof value === "object" ? JSON.stringify(value) : String(value)
            );
          }
        }
      });

      // Thêm tất cả file ảnh
      productData.imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      // Gửi request với FormData
      const response = await this.api.put<ResponseModel<Product>>(
        `${API_ENDPOINTS.ADMIN.PRODUCTS}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    }

    // Nếu không có file, gửi JSON thông thường
    return this.put<Product>(
      `${API_ENDPOINTS.ADMIN.PRODUCTS}/${id}`,
      productData
    );
  }

  /**
   * Xóa sản phẩm
   */
  async deleteProduct(id: string): Promise<ResponseModel<void>> {
    return this.delete<void>(`${API_ENDPOINTS.ADMIN.PRODUCTS}/${id}`);
  }

  // ==================== BULK OPERATIONS ====================

  /**
   * Xóa nhiều tài khoản
   */
  async deleteMultipleAccounts(ids: string[]): Promise<ResponseModel<void>> {
    return this.post<void>(`${API_ENDPOINTS.ADMIN.ACCOUNTS}/bulk-delete`, {
      ids,
    });
  }

  /**
   * Xóa nhiều sản phẩm
   */
  async deleteMultipleProducts(ids: string[]): Promise<ResponseModel<void>> {
    return this.post<void>(`${API_ENDPOINTS.PRODUCTS.BASE}/bulk-delete`, {
      ids,
    });
  }

  // ==================== STATISTICS ====================

  /**
   * Lấy thống kê tổng quan
   */
  async getDashboardStats(): Promise<
    ResponseModel<{
      totalUsers: number;
      totalProducts: number;
      totalOrders: number;
      totalRevenue: number;
    }>
  > {
    return this.get<{
      totalUsers: number;
      totalProducts: number;
      totalOrders: number;
      totalRevenue: number;
    }>(`${API_ENDPOINTS.ADMIN.DASHBOARD_STATS}`);
  }

  // ==================== SEARCH & FILTER ====================

  /**
   * Tìm kiếm tài khoản
   */
  async searchAccounts(
    query: string,
    filters?: {
      role?: string;
      status?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<
    ResponseModel<{ users: User[]; total: number; page: number; limit: number }>
  > {
    const params = { query, ...filters };
    return this.get<{
      users: User[];
      total: number;
      page: number;
      limit: number;
    }>(`${API_ENDPOINTS.ADMIN.ACCOUNTS}/search`, params);
  }

  /**
   * Tìm kiếm sản phẩm
   */
  async searchProducts(
    query: string,
    filters?: {
      category?: string;
      priceMin?: number;
      priceMax?: number;
      inStock?: boolean;
      page?: number;
      limit?: number;
    }
  ): Promise<
    ResponseModel<{
      products: Product[];
      total: number;
      page: number;
      limit: number;
    }>
  > {
    const params = { query, ...filters };
    return this.get<{
      products: Product[];
      total: number;
      page: number;
      limit: number;
    }>(`${API_ENDPOINTS.PRODUCTS.BASE}/search`, params);
  }
}

export const adminService = new AdminService();
export default adminService;
