export const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        REFRESH_TOKEN: '/auth/refresh-token',
        CHANGE_PASSWORD: '/auth/change-password',
        PROFILE: '/auth/profile',
    },

    ACCOUNTS: {
        BASE: '/account',
        BY_ID: (id: string) => `/account/${id}`,
        PASSWORD: (id: string) => `/account/${id}/password`,
    },

    PRODUCTS: {
        BASE: '/products',
        BY_ID: (id: string) => `/products/${id}`,
        REVIEWS: (productId: string) => `/products/${productId}/reviews`,
        REVIEWS_BY_ID: (productId: string, reviewId: string) => `/products/${productId}/reviews/${reviewId}`,
    },

    ORDERS: {
        BASE: '/orders',
        BY_ID: (id: string) => `/orders/${id}`,
    },
} as const;

export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
} as const;

export const API_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    LOADING: 'loading',
} as const;

export const API_HEADERS = {
    CONTENT_TYPE: 'Content-Type',
    AUTHORIZATION: 'Authorization',
    ACCEPT: 'Accept',
} as const;

export const API_ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error occurred',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Internal server error',
    VALIDATION_ERROR: 'Validation error',
} as const;