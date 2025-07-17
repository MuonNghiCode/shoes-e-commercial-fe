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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authService
        .getProfile()
        .then((response) => setUser(response.data.user))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginRequest): Promise<Account> => {
    const response = await authService.login(credentials);
    if (response.account && response.token) {
      localStorage.setItem("token", response.token);
      setUser(response.account);
      return response.account;
    } else {
      throw new Error(response.message || "Đăng nhập thất bại");
    }
  };

  const register = async (data: RegisterRequest) => {
    await authService.register(data);
    await login({ email: data.email, password: data.password });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
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
