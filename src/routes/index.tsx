import { Layout, AuthLayout, AdminLayout } from "@/layouts";
import { Home, Login, Register, ErrorPage, UserProfile } from "@/pages";

import ProtectedRoute from "@/routes/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";
import MyOrders from "@/pages/Order/MyOrders";
import ProductList from "@/pages/Product/ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "user-orders",
        element: <MyOrders />,
      },
      {
        path: "user-productList",
        element: <ProductList />,
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
