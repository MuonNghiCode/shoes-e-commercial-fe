import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import UserDropdown from "./UserDropdown";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Header = ({ isAdminLayout = false }: { isAdminLayout?: boolean }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  // Dropdown state and click outside logic
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const profileBtnMobileRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
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
    <header className="relative z-50 w-full sneako-header-modern">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-3 md:py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-4 select-none">
          <img
            src="/logo.webp"
            alt="Sneako Logo"
            className="h-14 w-14 object-contain rounded-2xl shadow-lg border border-[#E6D4B6] bg-[#fff8]"
          />
          <span
            className="text-3xl font-black tracking-widest text-[#2D1A10]"
            style={{ letterSpacing: 2 }}
          >
            Sneako
          </span>
        </a>
        {/* Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className={`sneako-nav-link text-lg${
                location.pathname === link.to ? " active" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        {/* CTA Button & User icon */}
        <div className="flex items-center gap-4">
          {!isAuthenticated && (
            <a href="/login" className="hidden md:inline-block sneako-cta">
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
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#2D1A10"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8.5" r="4" />
                  <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" />
                </svg>
              </button>
              {dropdownOpen && <UserDropdown onLogout={logout} />}
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="flex md:hidden items-center justify-center gap-2 pb-2">
        {NAV_LINKS.map((link) => (
          <a
            key={link.to}
            href={link.to}
            className={`sneako-nav-link text-base${
              location.pathname === link.to ? " active" : ""
            }`}
          >
            {link.label}
          </a>
        ))}
        {!isAuthenticated && (
          <a href="/login" className="ml-2 sneako-cta text-base">
            Shop
          </a>
        )}
        {isAuthenticated && (
          <div className="relative ml-2">
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F5F5F3] border border-[#C9B37C] shadow focus:outline-none"
              onClick={() => setDropdownOpenMobile((open) => !open)}
              ref={profileBtnMobileRef}
              aria-label="Tài khoản"
              type="button"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="#2D1A10"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8.5" r="4" />
                <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" />
              </svg>
            </button>
            {dropdownOpenMobile && <UserDropdown onLogout={logout} />}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
