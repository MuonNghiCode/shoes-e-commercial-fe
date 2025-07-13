import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Particles from "./Particles";

const Footer = () => {
  return (
    <footer className="sneako-header-modern border-t border-[color:var(--sneako-gold)] text-[color:var(--sneako-dark)] py-0 mt-12 relative overflow-hidden">
      <Particles />
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-4 grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
        {/* Navigation Links - Left */}
        <div className="md:col-span-4 flex flex-col items-start justify-center gap-4 text-base font-medium order-2 md:order-1">
          <span className="mb-2 font-bold text-xl tracking-wide">
            Liên kết nhanh
          </span>
          <Link
            to="/"
            className="hover:text-[color:var(--sneako-gold)] transition underline-offset-4 hover:underline"
          >
            Trang chủ
          </Link>
          <Link
            to="/shop"
            className="hover:text-[color:var(--sneako-gold)] transition underline-offset-4 hover:underline"
          >
            Sản phẩm
          </Link>
          <Link
            to="/collections"
            className="hover:text-[color:var(--sneako-gold)] transition underline-offset-4 hover:underline"
          >
            Bộ sưu tập
          </Link>
          <Link
            to="/about"
            className="hover:text-[color:var(--sneako-gold)] transition underline-offset-4 hover:underline"
          >
            Về chúng tôi
          </Link>
          <Link
            to="/contact"
            className="hover:text-[color:var(--sneako-gold)] transition underline-offset-4 hover:underline"
          >
            Liên hệ
          </Link>
        </div>

        {/* Logo & Brand - Center */}
        <div className="md:col-span-4 flex flex-col items-center justify-center gap-5 select-none mb-4 md:mb-0 order-1 md:order-2 bg-gradient-to-b from-[color:var(--sneako-beige)] to-[color:var(--sneako-gray)] rounded-2xl shadow-lg p-8 border border-[color:var(--sneako-gold)]">
          <div className="flex flex-col items-center gap-3">
            <img
              src="/logo.webp"
              alt="Sneako Logo"
              className="h-20 w-20 object-contain rounded-2xl shadow-xl border-2 border-[color:var(--sneako-gold)] bg-[#fff8] mb-2"
            />
            <span
              className="text-5xl font-black tracking-widest drop-shadow-xl"
              style={{ letterSpacing: 2 }}
            >
              Sneako
            </span>
          </div>
          <span className="text-xl font-semibold opacity-90 italic tracking-wide text-center">
            Luxury Sneaker Store
            <br />
            Đẳng cấp & Thời thượng
          </span>
          <div className="flex gap-6 mt-2">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook
                size={28}
                className="hover:text-[color:var(--sneako-gold)] transition drop-shadow"
              />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram
                size={28}
                className="hover:text-[color:var(--sneako-gold)] transition drop-shadow"
              />
            </a>
          </div>
        </div>

        {/* Contact Info - Right */}
        <div className="md:col-span-4 flex flex-col items-end justify-center gap-4 text-base order-3">
          <span className="mb-2 font-bold text-xl tracking-wide">Liên hệ</span>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-[color:var(--sneako-gold)]" />
            <span className="font-medium">
              123 Đường Sneaker, Quận 1, TP.HCM
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-[color:var(--sneako-gold)]" />
            <span className="font-medium">0123 456 789</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-[color:var(--sneako-gold)]" />
            <span className="font-medium">support@sneako.vn</span>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-[color:var(--sneako-gold)] mt-8 pt-4 pb-3 text-center text-base opacity-90 bg-[color:var(--sneako-beige)] tracking-wide font-medium">
        © {new Date().getFullYear()} <span className="font-bold">Sneako</span>.
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
