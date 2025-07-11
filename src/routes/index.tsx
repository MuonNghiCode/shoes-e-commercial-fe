import { Layout, AuthLayout, AdminLayout } from "@/layouts";
import { Home, Login, Register } from "@/pages";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <div>Admin Home</div>,
      },
      {
        path: "users",
        element: <div>Quản lý người dùng</div>,
      },
      {
        path: "products",
        element: <div>Quản lý sản phẩm</div>,
      },
    ],
  },
]);

export default router;
