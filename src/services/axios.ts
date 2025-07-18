import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // URL của backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động thêm token vào request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // You might want to redirect to login page here
    }
    return Promise.reject(error);
  }
);

export default api;
