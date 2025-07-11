import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  isAdminLayout?: boolean;
}

const Header = ({ isAdminLayout = false }: HeaderProps) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={
        isAdminLayout
          ? "bg-blue-900 text-white p-4 shadow flex justify-between items-center"
          : "bg-white shadow py-4 px-6 flex justify-between items-center"
      }
    >
      <Link
        to={isAdminLayout ? "/admin" : "/"}
        className={
          isAdminLayout
            ? "text-xl font-bold"
            : "text-2xl font-bold text-blue-700"
        }
      >
        {isAdminLayout ? "Admin Dashboard" : "Shoes Shop"}
      </Link>
      <nav className="flex items-center gap-4">
        {isAdminLayout ? (
          <>
            <Link to="/" className="hover:underline">
              Về trang bán hàng
            </Link>
            <span className="text-gray-200">Xin chào, {user?.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:underline">
              Trang chủ
            </Link>
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link to="/admin" className="hover:underline">
                    Admin
                  </Link>
                )}
                <span className="text-gray-700">Xin chào, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">
                  Đăng nhập
                </Link>
                <Link to="/register" className="hover:underline">
                  Đăng ký
                </Link>
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
