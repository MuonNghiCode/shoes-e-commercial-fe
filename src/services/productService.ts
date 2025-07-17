import type { CreateProductRequest, CreateReviewRequest, ProductQueryParams, ProductResponse, ResponseModel, ReviewResponse, UpdateProductRequest } from "@/types";
import BaseApiService from "./base";
import { API_ENDPOINTS } from "@/constants";

class ProductService extends BaseApiService {
    async getAllProducts(params?: ProductQueryParams): Promise<ProductResponse> {
        return this.get<ProductResponse['data']>(API_ENDPOINTS.PRODUCTS.BASE, params);
    }

    async getProductById(id: string): Promise<ProductResponse> {
        return this.get<ProductResponse['data']>(API_ENDPOINTS.PRODUCTS.BY_ID(id));
    }

    async createProduct(data: CreateProductRequest): Promise<ProductResponse> {
        return this.post<ProductResponse['data']>(API_ENDPOINTS.PRODUCTS.BASE, data);
    }

    async updateProduct(id: string, data: UpdateProductRequest): Promise<ProductResponse> {
        return this.put<ProductResponse['data']>(API_ENDPOINTS.PRODUCTS.BY_ID(id), data);
    }

    async deleteProduct(id: string): Promise<ResponseModel<null>> {
        return this.delete<null>(API_ENDPOINTS.PRODUCTS.BY_ID(id));
    }

    async getProductReviews(productId: string): Promise<ReviewResponse> {
        return this.get<ReviewResponse['data']>(API_ENDPOINTS.PRODUCTS.REVIEWS(productId));
    }

    async createProductReview(productId: string, data: CreateReviewRequest): Promise<ReviewResponse> {
        return this.post<ReviewResponse['data']>(API_ENDPOINTS.PRODUCTS.REVIEWS(productId), data);
    }

    async updateProductReview(productId: string, reviewId: string, data: CreateReviewRequest): Promise<ReviewResponse> {
        return this.put<ReviewResponse['data']>(API_ENDPOINTS.PRODUCTS.REVIEWS_BY_ID(productId, reviewId), data);
    }

    async deleteProductReview(productId: string, reviewId: string): Promise<ResponseModel<null>> {
        return this.delete<null>(API_ENDPOINTS.PRODUCTS.REVIEWS_BY_ID(productId, reviewId));
    }
}

export const productService = new ProductService();