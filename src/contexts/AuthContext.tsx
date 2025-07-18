import React, { createContext, useContext, useEffect, useState } from "react";

import {
  authService,
  type Account,
  type LoginRequest,
  type RegisterRequest,
} from "@/services";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<Account>;
  register: (crendentials: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateProfile: (
    data: Partial<Account> & { password?: string }
  ) => Promise<any>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Account | null>(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authService
        .getProfile()
        .then((response) => {
          // Lấy dữ liệu người dùng từ response.data
          const userData =
            response.data.account !== undefined
              ? response.data.account
              : response.data;
          setUser({ ...userData });
          localStorage.setItem("user", JSON.stringify(userData));
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginRequest): Promise<Account> => {
    const response = await authService.login(credentials);
    if (response.account && response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.account));
      setUser(response.account);
      return response.account;
    } else {
      throw new Error(response.message || "Đăng nhập thất bại");
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      await authService.register(data);
      await login({ email: data.email, password: data.password });
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || "Đăng ký thất bại");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // // Cập nhật thông tin cá nhân
  // const updateProfile = async (
  //   data: Partial<Account> & { password?: string }
  // ) => {
  //   const response = await authService.updateProfile(undefined, data);
  //   // Sau khi cập nhật thành công, lấy lại profile mới nhất
  //   const profileRes = await authService.getProfile();
  //   setUser({ ...profileRes.data.user });
  //   return response;
  // };

  // // Đổi mật khẩu
  // const changePassword = async (
  //   currentPassword: string,
  //   newPassword: string
  // ) => {
  //   try {
  //     const response = await authService.changePassword({
  //       currentPassword,
  //       newPassword,
  //     });
  //     return response;
  //   } catch (err: any) {
  //     throw new Error(err?.response?.data?.message || "Đổi mật khẩu thất bại");
  //   }
  // };

  // Cập nhật thông tin cá nhân
  const updateProfile = async (
    data: Partial<Account> & { password?: string }
  ) => {
    const response = await authService.updateProfile(undefined, data);
     const updatedUser = response.account ? response.account : response;
    setUser({ ...updatedUser });
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  };

  // Đổi mật khẩu
  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const response = await authService.changePassword({
        currentPassword,
        newPassword,
      });
      return response;
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || "Đổi mật khẩu thất bại");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        isLoading,
        register,
        login,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
