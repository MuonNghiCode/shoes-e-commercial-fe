import { Layout, AuthLayout, AdminLayout } from "@/layouts";
import { Home, Login, Register, ErrorPage, UserProfile } from "@/pages";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import UserManagement from "@/pages/Admin/UserManagement";
import ProductManagement from "@/pages/Admin/ProductManagement";

import ProtectedRoute from "@/routes/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";
import MyOrders from "@/pages/Order/MyOrders";
import ProductList from "@/pages/Product/ProductList";

import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";

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
        path: "profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
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
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "products",
        element: <ProductManagement />,
      },
    ],
  },
]);

export default router;
