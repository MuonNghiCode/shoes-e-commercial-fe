import {
  FaTachometerAlt,
  FaHistory,
  FaHeart,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Order History",
    icon: <FaHistory className="mr-3" />,
    to: "/orders",
    disabled: false,
  },
  {
    label: "Wishlist",
    icon: <FaHeart className="mr-3" />,
    to: "/wishlist",
    disabled: true,
  },
  {
    label: "Shopping Cart",
    icon: <FaShoppingCart className="mr-3" />,
    to: "/cart",
    disabled: false,
  },
  {
    label: "Settings",
    icon: <FaCog className="mr-3" />,
    to: "/profile",
    disabled: false,
  },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="bg-[#FFFCF0] min-h-screen w-full max-w-xs p-4 border border-[#E6D4B6] rounded-xl shadow flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-[#2D1A10]">Navigation</h2>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.disabled ? "#" : item.to}
              className={`flex items-center px-4 py-2 rounded transition-colors font-medium
                ${
                  isActive
                    ? "bg-[#F5F7FA] text-[#2D1A10] border-l-4 border-[#C9B37C]"
                    : "text-[#2D1A10]"
                }
                ${
                  item.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#F5E6C5]"
                }
              `}
              tabIndex={item.disabled ? -1 : 0}
              aria-disabled={item.disabled}
              onClick={(e) => {
                if (item.disabled) e.preventDefault();
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
