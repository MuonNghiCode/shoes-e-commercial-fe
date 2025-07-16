import type { Account, ChangePasswordRequest, LoginRequest, LoginResponse, ProfileResponse, ResponseModel, UpdateProfileRequest } from "@/types";
import BaseApiService from "./base";
import { API_ENDPOINTS } from "@/constants";

class AuthService extends BaseApiService {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await this.api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
        return response.data;
    }

    async register(credentials: LoginRequest): Promise<ResponseModel<LoginResponse>> {
        return this.post<LoginResponse>(API_ENDPOINTS.AUTH.REGISTER, credentials);
    }

    async getProfile(): Promise<ResponseModel<ProfileResponse>> {
        return this.get<ProfileResponse>(API_ENDPOINTS.AUTH.PROFILE);
    }

    // async logout(): Promise<void> {
    //     return this.post<void>(API_ENDPOINTS.AUTH.LOGOUT);
    // }

    async refreshToken(): Promise<ResponseModel<LoginResponse>> {
        return this.post<LoginResponse>(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
    }

    async updateProfile(id: string, data: UpdateProfileRequest): Promise<ResponseModel<Account>> {
        return this.put<Account>(API_ENDPOINTS.ACCOUNTS.BY_ID(id), data);
    }

    async changePassword(id: string, data: ChangePasswordRequest): Promise<ResponseModel<void>> {
        return this.put<void>(API_ENDPOINTS.ACCOUNTS.PASSWORD(id), data);
    }
}

export const authService = new AuthService();