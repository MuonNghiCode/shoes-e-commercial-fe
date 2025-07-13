import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50">
      <div className="w-full shadow-2xl overflow-hidden flex flex-col min-h-screen border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-md w-full">
          <Header />
        </div>
        {/* Main Content */}
        <main className="flex-1 bg-transparent">
          <Outlet />
        </main>
        {/* Footer */}
        <div className="bg-white/90 backdrop-blur-md shadow-inner border-t border-gray-100 w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
