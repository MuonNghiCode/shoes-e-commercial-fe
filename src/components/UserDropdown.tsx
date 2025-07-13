import React from "react";
import { useNavigate } from "react-router-dom";

interface UserDropdownProps {
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="absolute right-0 mt-2 w-44 bg-white border border-[#E6D4B6] rounded-xl shadow-lg z-50 animate-fadeIn">
      <a
        href="/profile"
        className="block px-4 py-2 hover:bg-[#F5F5F3] text-[#2D1A10]"
      >
        Trang cá nhân
      </a>
      <a
        href="/orders"
        className="block px-4 py-2 hover:bg-[#F5F5F3] text-[#2D1A10]"
      >
        Đơn hàng
      </a>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 hover:bg-[#F5F5F3] text-[#C0392B] cursor-pointer"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default UserDropdown;
