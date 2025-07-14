import { Link, useLocation } from "react-router-dom";
import { 
  FaHome, 
  FaUsers, 
  FaBox, 
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes
} from "react-icons/fa";

const adminLinks = [
  { 
    to: "/admin", 
    label: "Trang chủ Admin", 
    icon: FaHome,
    exact: true 
  },
  { 
    to: "/admin/users", 
    label: "Quản lý người dùng", 
    icon: FaUsers
  },
  { 
    to: "/admin/products", 
    label: "Quản lý sản phẩm", 
    icon: FaBox
  },
  { 
    to: "/admin/reports", 
    label: "Báo cáo", 
    icon: FaChartBar
  },
  { 
    to: "/admin/settings", 
    label: "Cài đặt", 
    icon: FaCog
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg"
        style={{
          background: 'var(--sneako-gold)',
          color: 'var(--sneako-dark)'
        }}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 h-screen z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isOpen ? 'w-64' : 'w-64 md:w-16'}
        `}
        style={{
          background: 'var(--sneako-beige)',
          borderRight: '2px solid var(--sneako-gold)',
          boxShadow: '2px 0 10px rgba(45, 26, 16, 0.1)'
        }}
      >
        {/* Desktop Toggle Button */}
        <div className="hidden md:flex justify-end p-4">
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:scale-105 transition-transform"
            style={{
              background: 'var(--sneako-gold)',
              color: 'var(--sneako-dark)'
            }}
          >
            <FaBars size={16} />
          </button>
        </div>

        {/* Logo Section */}
        <div className="flex items-center justify-center py-6 border-b border-opacity-30" style={{ borderColor: 'var(--sneako-gold)' }}>
          <img
            src="/logo.webp"
            alt="Sneako Logo"
            className={`object-contain rounded-xl shadow transition-all duration-300 ${
              isOpen ? 'h-12 w-12' : 'h-8 w-8'
            }`}
            style={{
              background: '#fff8',
              border: '1.5px solid var(--sneako-gold)',
            }}
          />
          {isOpen && (
            <span 
              className="ml-3 text-xl font-bold transition-opacity duration-300"
              style={{ color: 'var(--sneako-dark)' }}
            >
              Admin
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
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
                      ${isActive ? 'shadow-lg' : ''}
                    `}
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, var(--sneako-gold), #d4af37)' 
                        : 'transparent',
                      color: 'var(--sneako-dark)',
                      border: `1px solid ${isActive ? 'var(--sneako-gold)' : 'transparent'}`,
                    }}
                    title={!isOpen ? link.label : ''}
                  >
                    {/* Icon */}
                    <div className={`flex items-center justify-center ${isOpen ? 'mr-3' : 'mx-auto'}`}>
                      <IconComponent 
                        size={20} 
                        className={`transition-all duration-200 ${
                          isActive ? 'text-white' : 'group-hover:scale-110'
                        }`}
                      />
                    </div>
                    
                    {/* Label */}
                    {isOpen && (
                      <span 
                        className={`font-medium transition-all duration-200 ${
                          isActive ? 'text-white font-bold' : 'group-hover:font-semibold'
                        }`}
                      >
                        {link.label}
                      </span>
                    )}

                    {/* Active indicator */}
                    {isActive && (
                      <div 
                        className="absolute right-0 top-0 h-full w-1 rounded-l-full"
                        style={{ background: 'var(--sneako-dark)' }}
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
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <div 
            className="text-center py-2 text-xs opacity-70"
            style={{ color: 'var(--sneako-dark)' }}
          >
            {isOpen ? 'Sneako Admin v1.0' : 'v1.0'}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
