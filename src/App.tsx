import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import router from "@/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={2000} />
    </AuthProvider>
  );
};

export default App;
