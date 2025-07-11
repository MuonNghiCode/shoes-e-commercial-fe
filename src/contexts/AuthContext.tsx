import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { users } from "@/mocks/users";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const foundUser = users.find(
          (u) => u.username === username && u.password === password
        );
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem("user", JSON.stringify(foundUser));
          setIsLoading(false);
          resolve(foundUser);
        } else {
          setIsLoading(false);
          resolve(null);
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isAdmin, isLoading, login, logout }}
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
