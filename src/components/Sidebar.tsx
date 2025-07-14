import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Package,
  BarChart3,
  Settings,
  Menu,
  X,
} from "@/lib/icons";

const adminLinks = [
  {
    to: "/admin",
    label: "Trang chủ Admin",
    icon: Home,
    exact: true,
  },
  {
    to: "/admin/users",
    label: "Quản lý người dùng",
    icon: Users,
  },
  {
    to: "/admin/products",
    label: "Quản lý sản phẩm",
    icon: Package,
  },
  {
    to: "/admin/reports",
    label: "Báo cáo",
    icon: BarChart3,
  },
  {
    to: "/admin/settings",
    label: "Cài đặt",
    icon: Settings,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();

  const handleMouseEnter = () => {
    // Chỉ tự động mở trên desktop và có delay nhỏ để tránh trigger ngẫu nhiên
    if (window.innerWidth >= 768 && !isOpen) {
      setTimeout(() => {
        if (window.innerWidth >= 768 && !isOpen) {
          onToggle();
        }
      }, 150);
    }
  };

  const handleMouseLeave = () => {
    // Chỉ tự động đóng trên desktop với delay để tránh đóng quá nhanh
    if (window.innerWidth >= 768 && isOpen) {
      setTimeout(() => {
        if (window.innerWidth >= 768 && isOpen) {
          onToggle();
        }
      }, 300);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg shadow-lg"
        style={{
          background: "var(--sneako-gold)",
          color: "var(--sneako-dark)",
        }}
      >
        {isOpen ? (
          <X width={20} height={20} />
        ) : (
          <Menu width={20} height={20} />
        )}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <button
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20 cursor-pointer"
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onToggle();
            }
          }}
          aria-label="Đóng sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-10 transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isOpen ? "w-64" : "w-64 md:w-16"}
          overflow-hidden
        `}
        style={{
          background: "var(--sneako-beige)",
          borderRight: "2px solid var(--sneako-gold)",
          boxShadow: "2px 0 10px rgba(45, 26, 16, 0.1)",
          height: "100vh", // Full height cho sticky behavior
          paddingTop: "80px", // Space cho header
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Navigation */}
        <nav className="px-3 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-transparent">
          <ul className="space-y-2 pb-16">
            {adminLinks.map((link) => {
              const isActive = link.exact
                ? location.pathname === link.to
                : location.pathname.startsWith(link.to);

              const IconComponent = link.icon;

              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`
                      group flex items-center px-3 py-3 rounded-lg transition-all duration-200 
                      hover:shadow-md hover:translate-x-1 relative overflow-hidden
                      ${isActive ? "shadow-lg transform translate-x-1" : ""}
                    `}
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, var(--sneako-gold), #d4af37)"
                        : "transparent",
                      color: "var(--sneako-dark)",
                      border: `1px solid ${
                        isActive ? "var(--sneako-gold)" : "transparent"
                      }`,
                    }}
                    title={!isOpen ? link.label : ""}
                  >
                    {/* Icon */}
                    <div className="flex items-center justify-center flex-shrink-0">
                      <IconComponent
                        width={20}
                        height={20}
                        className={`transition-all duration-200 ${
                          isActive ? "text-white" : "group-hover:scale-110"
                        }`}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className={`
                        font-medium transition-all duration-200 whitespace-nowrap overflow-hidden
                        ${
                          isActive
                            ? "text-white font-bold"
                            : "group-hover:font-semibold"
                        }
                        ${
                          isOpen
                            ? "opacity-100 ml-3 w-auto"
                            : "opacity-0 ml-0 w-0"
                        }
                      `}
                    >
                      {link.label}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <div
                        className="absolute right-0 top-0 h-full w-1 rounded-l-full"
                        style={{ background: "var(--sneako-dark)" }}
                      />
                    )}

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-lg" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-4 bg-gradient-to-t from-[var(--sneako-beige)] to-transparent">
          <div
            className="text-center py-2 text-xs opacity-70 transition-all duration-200"
            style={{ color: "var(--sneako-dark)" }}
          >
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-200 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Sneako Admin v1.0
            </span>
            <span className={`${isOpen ? "hidden" : "block"}`}>v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
