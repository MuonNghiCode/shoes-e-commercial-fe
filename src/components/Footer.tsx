import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Particles } from ".";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="sneako-header-modern  border-[color:var(--sneako-gold)] text-[color:var(--sneako-dark)] py-0  relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Particles />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-4 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-stretch">
        {/* Navigation Links - Left */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start justify-center gap-3 text-base font-medium order-2 md:order-1 text-center md:text-left">
          <span className="mb-1 font-bold text-lg md:text-xl tracking-wide">
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
        <motion.div
          className="md:col-span-4 flex flex-col items-center justify-center gap-4 select-none mb-6 md:mb-0 order-1 md:order-2 bg-gradient-to-b from-[color:var(--sneako-beige)] to-[color:var(--sneako-gray)] rounded-2xl shadow-lg p-5 md:p-8 border border-[color:var(--sneako-gold)]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src="/logo.webp"
              alt="Sneako Logo"
              className="h-14 w-14 md:h-20 md:w-20 object-contain rounded-2xl shadow-xl border-2 border-[color:var(--sneako-gold)] bg-[#fff8] mb-2"
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <span
              className="text-3xl md:text-5xl font-black tracking-widest drop-shadow-xl"
              style={{ letterSpacing: 2 }}
            >
              Sneako
            </span>
          </motion.div>
          <span className="text-base md:text-xl font-semibold opacity-90 italic tracking-wide text-center">
            Luxury Sneaker Store
            <br />
            Đẳng cấp & Thời thượng
          </span>
          <div className="flex gap-5 md:gap-6 mt-2">
            <motion.a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              whileHover={{ scale: 1.2, color: "#c9b37c" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaFacebook
                size={28}
                className="hover:text-[color:var(--sneako-gold)] transition drop-shadow"
              />
            </motion.a>
            <motion.a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              whileHover={{ scale: 1.2, color: "#c9b37c" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaInstagram
                size={28}
                className="hover:text-[color:var(--sneako-gold)] transition drop-shadow"
              />
            </motion.a>
          </div>
        </motion.div>

        {/* Contact Info - Right */}
        <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center gap-3 text-base order-3 text-center md:text-right">
          <span className="mb-1 font-bold text-lg md:text-xl tracking-wide">
            Liên hệ
          </span>
          <div className="flex items-center justify-center md:justify-end gap-2 md:gap-3">
            <FaMapMarkerAlt className="text-[color:var(--sneako-gold)]" />
            <span className="font-medium text-sm md:text-base">
              123 Đường Sneaker, Quận 1, TP.HCM
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-2 md:gap-3">
            <FaPhoneAlt className="text-[color:var(--sneako-gold)]" />
            <span className="font-medium text-sm md:text-base">
              0123 456 789
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-2 md:gap-3">
            <FaEnvelope className="text-[color:var(--sneako-gold)]" />
            <span className="font-medium text-sm md:text-base">
              support@sneako.vn
            </span>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-[color:var(--sneako-gold)] mt-8 pt-4 pb-3 text-center text-base opacity-90 bg-[color:var(--sneako-beige)] tracking-wide font-medium">
        © {new Date().getFullYear()} <span className="font-bold">Sneako</span>.
        All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
