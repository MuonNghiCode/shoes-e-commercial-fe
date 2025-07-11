import { Link, useLocation } from "react-router-dom";

const adminLinks = [
  { to: "/admin", label: "Trang chủ Admin", exact: true },
  { to: "/admin/users", label: "Quản lý người dùng" },
  { to: "/admin/products", label: "Quản lý sản phẩm" },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="w-64 bg-blue-800 text-white p-4 h-full hidden md:block">
      <nav>
        <ul>
          {adminLinks.map((link) => (
            <li
              key={link.to}
              className={
                (
                  link.exact
                    ? location.pathname === link.to
                    : location.pathname.startsWith(link.to)
                )
                  ? "font-bold underline mb-2"
                  : "mb-2"
              }
            >
              <Link to={link.to} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
