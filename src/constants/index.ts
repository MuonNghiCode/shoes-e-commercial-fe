export * from './api';

export const APP_CONFIG = {
    NAME: 'Sneako',
    VERSION: '1.0.0',
    DESCROPTION: 'Sneako - Your ultimate online shoe store',
} as const;

export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    THEME: 'theme',
    LANGUAGE: 'language',
    CART: 'cart',
} as const;

export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
} as const;

export const VALIDATION = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MAX_LENGTH: 20,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
    PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
    REVIEW_MAX_LENGTH: 1000,
}

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: (id: string) => `/products/${id}`,
    CART: '/cart',
    CHECKOUT: '/checkout',
    ORDERS: '/orders',
    ORDER_DETAIL: (id: string) => `/orders/${id}`,
    ADMIN : {
        DASHBOARD: '/admin/dashboard',
        PRODUCTS: '/admin/products',
        ORDERS: '/admin/orders',
        ACCOUNTS: '/admin/accounts',
    },
    NOT_FOUND: '*',
} as const;