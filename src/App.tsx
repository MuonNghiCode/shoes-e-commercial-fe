import React from "react";
import { Suspense, lazy } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import router from "@/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LazyRouterProvider = lazy(() =>
  import("react-router-dom").then((mod) => ({
    default: (props: React.ComponentProps<typeof mod.RouterProvider>) => (
      <mod.RouterProvider {...props} />
    ),
  }))
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyRouterProvider router={router} />
      </Suspense>
      <ToastContainer position="top-right" autoClose={2000} />
    </AuthProvider>
  );
};

export default App;
