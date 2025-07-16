import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaUsers,
  FaBox,
  FaChartBar,
  FaCog,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";

const adminLinks = [
  {
    to: "/admin",
    label: "Trang chủ Admin",
    icon: FaHome,
    exact: true,
  },
  {
    to: "/admin/users",
    label: "Quản lý người dùng",
    icon: FaUsers,
  },
  {
    to: "/admin/products",
    label: "Quản lý sản phẩm",
    icon: FaBox,
  },
  {
    to: "/admin/reports",
    label: "Báo cáo",
    icon: FaChartBar,
  },
  {
    to: "/admin/settings",
    label: "Cài đặt",
    icon: FaCog,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sử dụng isOpen prop để điều khiển việc mở rộng sidebar
  const shouldExpand = isOpen;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && !isDesktop && (
        <button
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 cursor-default"
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onToggle();
            }
          }}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          h-screen z-40 transition-all duration-300 ease-in-out flex-shrink-0
          ${
            !isDesktop && !isOpen
              ? "translate-x-full absolute"
              : "translate-x-0"
          }
          ${shouldExpand ? "w-64" : "w-64 md:w-16"}
          ${!isDesktop ? "fixed" : "sticky top-0"}
        `}
        style={{
          background: "var(--sneako-beige)",
          borderRight: "2px solid var(--sneako-gold)",
          boxShadow: "2px 0 10px rgba(45, 26, 16, 0.1)",
        }}
      >
        {/* Navigation */}
        <nav className="pt-6 px-3 h-full overflow-y-auto">
          {/* Toggle Button - hiển thị ở trên cùng của sidebar */}
          <div className="mb-4 pb-4 border-b border-gray-300">
            <button
              onClick={onToggle}
              className="w-full p-3 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center"
              style={{
                background: shouldExpand ? "var(--sneako-gold)" : "transparent",
                color: shouldExpand ? "white" : "var(--sneako-dark)",
                border: `1px solid var(--sneako-gold)`,
              }}
              title={shouldExpand ? "Thu gọn sidebar" : "Mở rộng sidebar"}
            >
              {shouldExpand ? (
                <>
                  <FaArrowLeft size={16} className="mr-2" />
                  <span className="text-sm font-medium">Thu gọn</span>
                </>
              ) : (
                <FaBars size={16} />
              )}
            </button>
          </div>

          <ul className="space-y-2">
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
                      hover:scale-105 hover:shadow-md relative overflow-hidden
                      ${isActive ? "shadow-lg" : ""}
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
                    title={!shouldExpand ? link.label : ""}
                    onClick={() => !isDesktop && onToggle()} // Đóng sidebar khi click trên mobile
                  >
                    {/* Icon */}
                    <div
                      className={`flex items-center justify-center transition-all duration-200 ${
                        shouldExpand ? "mr-3" : "mx-auto"
                      }`}
                    >
                      <IconComponent
                        size={20}
                        className={`transition-all duration-200 ${
                          isActive ? "text-white" : "group-hover:scale-110"
                        }`}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className={`font-medium transition-all duration-300 whitespace-nowrap ${
                        shouldExpand ? "opacity-100 w-auto" : "opacity-0 w-0"
                      } ${
                        isActive
                          ? "text-white font-bold"
                          : "group-hover:font-semibold"
                      }`}
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

          {/* Footer */}
          <div className="absolute bottom-4 left-0 right-0 px-3">
            <div
              className={`text-center py-2 text-xs opacity-70 transition-all duration-300 ${
                shouldExpand ? "opacity-70" : "opacity-50"
              }`}
              style={{ color: "var(--sneako-dark)" }}
            >
              {shouldExpand ? "Sneako Admin v1.0" : "v1.0"}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
