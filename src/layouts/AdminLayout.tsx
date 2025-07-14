import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--sneako-gray)" }}
    >
      <Header isAdminLayout />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        <main
          className={`
            flex-1 overflow-auto transition-all duration-300 p-4 mt-10
            ${sidebarOpen ? "ml-64" : "ml-16"}
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
