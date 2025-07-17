import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  children: ReactNode;
}

const ProtectedRoute = ({
  requireAdmin = false,
  children,
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Nếu chưa đăng nhập
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu yêu cầu admin mà user không phải admin
  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
