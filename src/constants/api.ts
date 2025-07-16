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
    },

    PRODUCTS: {
        BASE: '/products',
        BY_ID: (id: string) => `/products/${id}`,
    },

    ORDERS: {
        BASE: '/orders',
        BY_ID: (id: string) => `/orders/${id}`,
        MY_ORDERS: '/orders/my-orders',
        ORDER_DETAIL: '/orders/order-detail',
    },
};