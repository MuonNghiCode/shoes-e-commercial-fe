import { motion } from "framer-motion";
import Particles from "../Particles";

const HeroSection = () => {
  return (
    <motion.section
      className="relative flex flex-col items-center justify-start min-h-screen max-h-screen h-screen py-0 bg-gradient-to-b from-[color:var(--sneako-beige)] via-[color:var(--sneako-gray)] to-white overflow-hidden mb-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Particles />
      <div className="relative flex flex-col items-center justify-start w-full h-full pt-30 md:pt-40 px-3 md:px-0 text-center">
        {/* Tên thương hiệu */}
        <div className="relative flex flex-col md:flex-row items-center justify-center w-full text-center">
          <motion.h1
            className="z-10 text-[clamp(2.8rem,18vw,8rem)] md:text-[clamp(7rem,22vw,18rem)] font-extrabold tracking-tight text-center text-[color:var(--sneako-gold)] drop-shadow-2xl select-none leading-[0.95] md:leading-[0.9]"
            style={{
              letterSpacing: 6,
              textShadow: "0 8px 32px #c9b37c88, 0 2px 0 #fff",
            }}
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sneako
          </motion.h1>
          {/* Mobile: ảnh giày chính nằm dưới chữ */}
          <motion.img
            src="/shoes.webp"
            alt="Sneako Shoes"
            className="block md:hidden relative z-10 mt-2 w-[80vw] max-w-[340px] rotate-[-10deg] drop-shadow-2xl animate-fadeInUp opacity-95 pointer-events-none"
            style={{ pointerEvents: "none" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          {/* Desktop: ảnh giày chính đè lên chữ */}
          <motion.img
            src="/shoes.webp"
            alt="Sneako Shoes"
            className="hidden md:block absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] max-w-[95vw] rotate-[-10deg] drop-shadow-2xl animate-fadeInUp opacity-95 pointer-events-none"
            style={{ pointerEvents: "none" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          {/* Đôi giày nhỏ cho desktop */}
          <motion.img
            src="/shoes.webp"
            alt="Sneako Shoes Small Left"
            className="hidden md:block absolute left-4 bottom-4 w-[110px] rotate-[-25deg] opacity-60 drop-shadow-2xl blur-[2px] pointer-events-none"
            style={{ pointerEvents: "none", zIndex: 5 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.img
            src="/shoes.webp"
            alt="Sneako Shoes Small Right"
            className="hidden md:block absolute right-4 top-4 w-[90px] rotate-[20deg] opacity-60 drop-shadow-2xl blur-[2px] pointer-events-none"
            style={{ pointerEvents: "none", zIndex: 5 }}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
          {/* Đôi giày nhỏ cho mobile: hiển thị dưới cùng */}
          <div className="flex md:hidden w-full justify-between absolute left-0 right-0 bottom-2 px-4 pointer-events-none">
            <motion.img
              src="/shoes.webp"
              alt="Sneako Shoes Small Left"
              className="w-[60px] rotate-[-25deg] opacity-50 drop-shadow-2xl blur-[1.5px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            />
            <motion.img
              src="/shoes.webp"
              alt="Sneako Shoes Small Right"
              className="w-[50px] rotate-[20deg] opacity-50 drop-shadow-2xl blur-[1.5px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            />
          </div>
        </div>
        {/* Slogan và nút  */}
        <motion.div
          className="relative flex flex-col items-center justify-center mt-10 md:mt-45 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span className="text-lg md:text-3xl font-semibold text-[color:var(--sneako-dark)] opacity-80 text-center drop-shadow max-w-xs md:max-w-none">
            Luxury Sneaker Store
          </span>
          <motion.a
            href="#shoes-list"
            className="mt-5 md:mt-6 inline-block bg-[color:var(--sneako-gold)] text-[color:var(--sneako-dark)] font-bold px-7 py-3 md:px-12 md:py-5 rounded-2xl shadow-xl hover:bg-yellow-400 transition text-lg md:text-2xl tracking-wide border-2 border-[color:var(--sneako-gold)]"
            whileHover={{ scale: 1.07, boxShadow: "0 8px 32px #c9b37c88" }}
            whileTap={{ scale: 0.97 }}
          >
            Mua ngay
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
