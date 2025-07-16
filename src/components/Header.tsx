import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { FaUserCircle, FaBars, FaShoppingCart } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import CartDrawer from "@/components/CartDrawer";
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer";


const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  // Cart sẽ được render riêng bằng icon
];

interface HeaderProps {
  isAdminLayout?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAdminLayout = false }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  // Dropdown state and click outside logic
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const profileBtnMobileRef = useRef<HTMLButtonElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Kiểm tra xem click có phải là Link trong dropdown không
      const target = event.target as HTMLElement;
      if (target.closest("a[href]")) {
        return; // Không đóng dropdown nếu click vào Link
      }

      if (
        profileBtnRef.current &&
        !profileBtnRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        profileBtnMobileRef.current &&
        !profileBtnMobileRef.current.contains(event.target as Node)
      ) {
        setDropdownOpenMobile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (isAdminLayout) {
    return (
      <header className="flex justify-between items-center px-8 py-3 w-full sneako-header-modern">
        <a
          href="/admin"
          className="flex items-center gap-3 text-2xl font-black tracking-widest select-none"
        >
          <img
            src="/logo.webp"
            alt="Sneako Logo"
            className="h-10 w-10 object-contain rounded-xl shadow"
            style={{
              background: "#fff8",
              border: "1.5px solid var(--sneako-gold)",
            }}
          />
          <span className="ml-1" style={{ letterSpacing: 2 }}>
            Admin
          </span>
        </a>
        <div className="flex items-center gap-1 md:gap-3 lg:gap-5">
          <a href="/" className="sneako-nav-link">
            Về trang bán hàng
          </a>
          {isAuthenticated && (
            <>
              <span className="opacity-80">Xin chào, {user?.username}</span>
              <button onClick={logout} className="ml-2 sneako-cta">
                Đăng xuất
              </button>
            </>
          )}
        </div>
      </header>
    );
  }

  // User Header
  return (
    <motion.header
      className="relative z-50 w-full sneako-header-modern"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-3 md:py-4">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-3 select-none"
          whileHover={{ scale: 1.06, rotate: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.img
            src="/logo.webp"
            alt="Sneako Logo"
            className="h-10 w-10 md:h-14 md:w-14 object-contain rounded-2xl shadow-lg border border-[#E6D4B6] bg-[#fff8]"
            whileHover={{ rotate: 8, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <span
            className="text-2xl md:text-3xl font-black tracking-widest text-[#2D1A10]"
            style={{ letterSpacing: 2 }}
          >
            Sneako
          </span>
        </motion.a>
        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-10">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.to}
              href={link.to}
              className="relative sneako-nav-link text-lg px-2"
              whileHover={{ scale: 1.08, color: "#c9b37c" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span
                className={`relative z-10 ${
                  location.pathname === link.to
                    ? "text-[color:var(--sneako-gold)] font-bold"
                    : ""
                }`}
              >
                {link.label}
              </span>
              <span
                className={`absolute left-0 right-0 -bottom-1 h-[3px] rounded-full transition-all duration-300 md:hidden
                  ${
                    location.pathname === link.to
                      ? "bg-[color:var(--sneako-gold)] opacity-80"
                      : "bg-[color:var(--sneako-gold)] opacity-30"
                  }
                `}
                style={{ width: "100%" }}
              />
            </motion.a>
          ))}
        </nav>
        {/* CTA Button & User icon desktop */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart icon (Drawer trigger) */}
          <Drawer open={cartOpen} onOpenChange={setCartOpen}>
            <DrawerTrigger asChild>
              <button
                className="flex items-center justify-center w-11 h-11 rounded-full bg-[#F5F5F3] border border-[#C9B37C] shadow hover:scale-105 focus:outline-none mr-2"
                aria-label="Giỏ hàng"
                type="button"
              >
                <FaShoppingCart size={26} color={location.pathname === "/cart" ? "#C9B37C" : "#2D1A10"} />
              </button>
            </DrawerTrigger>
            <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
          </Drawer>
          {/* User icon */}
          {!isAuthenticated && (
            <a href="/login" className="sneako-cta">
              Shop Now
            </a>
          )}
          {isAuthenticated && (
            <div className="relative">
              <button
                className="flex items-center justify-center w-11 h-11 rounded-full bg-[#F5F5F3] border border-[#C9B37C] shadow hover:scale-105 transition focus:outline-none"
                onClick={() => setDropdownOpen((open) => !open)}
                ref={profileBtnRef}
                aria-label="Tài khoản"
                type="button"
              >
                <FaUserCircle size={28} color="#2D1A10" />
              </button>
              {dropdownOpen && (
                <UserDropdown
                  onClose={() => setDropdownOpen(false)}
                  onLogout={logout}
                />
              )}
            </div>
          )}
        </div>
        {/* Hamburger menu icon on mobile */}
        <button
          className="md:hidden flex items-center justify-center ml-auto text-3xl p-2 rounded focus:outline-none"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay background */}
            <motion.div
              className="absolute top-0 left-0 w-screen h-screen bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Slide-in menu */}
            <motion.div
              className="ml-auto h-full w-2/3 max-w-xs bg-white shadow-2xl rounded-l-3xl p-8 flex flex-col gap-8 relative"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                className="absolute top-4 right-6 text-3xl p-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Đóng menu"
              >
                ×
              </button>
              <nav className="flex flex-col gap-6 mt-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.to}
                    href={link.to}
                    className="relative sneako-nav-link text-xl px-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span
                      className={`relative z-10 ${
                        location.pathname === link.to
                          ? "text-[color:var(--sneako-gold)] font-bold"
                          : ""
                      }`}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`absolute left-0 right-0 -bottom-1 h-[3px] rounded-full transition-all duration-300
                      ${
                        location.pathname === link.to
                          ? "bg-[color:var(--sneako-gold)] opacity-80"
                          : "bg-[color:var(--sneako-gold)] opacity-30"
                      }
                    `}
                      style={{ width: "100%" }}
                    />
                  </a>
                ))}

                {!isAuthenticated && (
                  <a
                    href="/login"
                    className="sneako-cta text-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Shop Now
                  </a>
                )}
                {isAuthenticated && (
                  <div className="flex flex-col gap-2">
                    <button
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F5F3] border border-[#C9B37C] shadow focus:outline-none mx-auto"
                      onClick={() => setDropdownOpenMobile((open) => !open)}
                      ref={profileBtnMobileRef}
                      aria-label="Tài khoản"
                      type="button"
                    >
                      <FaUserCircle size={22} color="#2D1A10" />
                    </button>
                    {dropdownOpenMobile && (
                      <UserDropdown
                        onLogout={logout}
                        onClose={() => setDropdownOpenMobile(false)}
                      />
                    )}
                  </div>
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile nav */}
    </motion.header>
  );
};

export default Header;
