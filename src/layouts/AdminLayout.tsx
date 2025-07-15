import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "@/components";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop mặc định mở

  useEffect(() => {
    const handleResize = () => {
      // Mobile thì đóng sidebar
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Gọi ngay lần đầu

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--sneako-gray)" }}
    >
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header isAdminLayout />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
