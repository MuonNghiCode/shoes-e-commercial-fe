import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  FaUserCircle,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

interface UserDropdownProps {
  onLogout: () => void;
  onClose?: () => void;
}

const UserDropdown = forwardRef<HTMLDivElement, UserDropdownProps>(
  ({ onLogout, onClose }, ref) => {
    const { user } = useAuth();

    return (
      <div
        ref={ref}
        className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg z-50 animate-fadeIn overflow-hidden"
        style={{ borderColor: "#E6D4B6" }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* User Info Header */}
        <div className="px-4 py-3 border-b" style={{ borderColor: "#E6D4B6" }}>
          <div className="flex items-center">
            <FaUserCircle
              size={20}
              className="mr-3"
              style={{ color: "var(--sneako-gold)" }}
            />
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--sneako-dark)" }}
              >
                {user?.name || "User"}
              </p>
              <p
                className="text-xs opacity-60"
                style={{ color: "var(--sneako-dark)" }}
              >
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
        </div>
        {/* User Options */}
        <div className="py-1">
          <Link
            to="/profile"
            className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
            style={{ color: "var(--sneako-dark)" }}
            onClick={() => {
              // Delay việc đóng dropdown để Link có thời gian điều hướng
              setTimeout(() => {
                if (onClose) {
                  onClose();
                }
              }, 100);
            }}
          >
            <FaUserCircle size={16} className="mr-3" />
            Trang cá nhân
          </Link>
          <Link
            to="/orders"
            className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
            style={{ color: "var(--sneako-dark)" }}
            onClick={() => {
              // Delay việc đóng dropdown để Link có thời gian điều hướng
              setTimeout(() => {
                if (onClose) {
                  onClose();
                }
              }, 100);
            }}
          >
            <FaClipboardList size={16} className="mr-3" />
            Đơn hàng
          </Link>
          {/* Admin Section */}
          {user?.role === "admin" && (
            <>
              <div
                className="mx-4 my-2 border-t"
                style={{ borderColor: "#E6D4B6" }}
              ></div>
              <div className="px-4 py-2">
                <p
                  className="text-xs font-semibold opacity-60"
                  style={{ color: "var(--sneako-dark)" }}
                >
                  QUẢN TRỊ
                </p>
              </div>
              <Link
                to="/admin"
                className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                style={{ color: "var(--sneako-gold)" }}
                onClick={() => {
                  // Delay việc đóng dropdown để Link có thời gian điều hướng
                  setTimeout(() => {
                    if (onClose) {
                      onClose();
                    }
                  }, 100);
                }}
              >
                <FaCog size={16} className="mr-3" />
                Bảng điều khiển Admin
              </Link>
            </>
          )}
        </div>
        {/* Logout Section */}
        <div className="border-t" style={{ borderColor: "#E6D4B6" }}>
          <button
            className="w-full flex items-center px-4 py-2 text-sm hover:bg-red-50 transition-colors text-red-600 cursor-pointer"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();

              // Call the logout function from props
              onLogout();

              // Close dropdown
              if (onClose) {
                onClose();
              }
            }}
            type="button"
          >
            <FaSignOutAlt size={16} className="mr-3" />
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }
);

UserDropdown.displayName = "UserDropdown";

export default UserDropdown;
