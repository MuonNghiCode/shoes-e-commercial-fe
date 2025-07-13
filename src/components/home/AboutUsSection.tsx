import React from "react";
import { motion } from "framer-motion";
import Particles from "../Particles";

const AboutUsSection: React.FC = () => {
  return (
    <section
      className="w-full bg-gradient-to-t from-[color:var(--sneako-beige)] via-[color:var(--sneako-gray)] to-white py-16 md:py-24 px-4 md:px-0 min-h-[60vh] flex items-center"
      id="about-us"
    >
      <Particles />
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[160px_1fr] gap-10 md:gap-16 items-center w-full">
        {/* Ảnh avatar tròn nhỏ */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="/logo.webp"
            alt="About Sneako"
            className="rounded-full shadow-xl border-4 border-[color:var(--sneako-gold)] w-40 h-40 object-cover object-center bg-white/60"
            style={{ background: "rgba(255,255,255,0.5)" }}
          />
        </motion.div>
        {/* Nội dung lớn */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[color:var(--sneako-gold)] mb-1 tracking-wide">
            Sneako - Cộng đồng & Đam mê
          </h2>
          <blockquote className="text-xl md:text-2xl italic font-semibold text-[color:var(--sneako-dark)] bg-white/60 border-l-4 border-[color:var(--sneako-gold)] pl-5 py-2 rounded-r-2xl shadow mb-2">
            “Mỗi đôi giày là một câu chuyện, một dấu ấn cá tính.”
          </blockquote>
          <p className="text-base md:text-lg text-[color:var(--sneako-dark)] opacity-90 font-medium">
            Sneako không chỉ là nơi mua sắm sneaker chính hãng, mà còn là không
            gian kết nối những người trẻ yêu thời trang, đam mê sáng tạo và khát
            khao thể hiện bản thân. Chúng tôi xây dựng cộng đồng, lan tỏa cảm
            hứng sống chất và khác biệt.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <div className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-[color:var(--sneako-gold)]"></span>
              <span className="text-[color:var(--sneako-dark)] font-semibold">
                Sự kiện, workshop sneaker định kỳ
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-[color:var(--sneako-gold)]"></span>
              <span className="text-[color:var(--sneako-dark)] font-semibold">
                Không gian trải nghiệm hiện đại
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-[color:var(--sneako-gold)]"></span>
              <span className="text-[color:var(--sneako-dark)] font-semibold">
                Cập nhật xu hướng sneaker thế giới
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-[color:var(--sneako-gold)]"></span>
              <span className="text-[color:var(--sneako-dark)] font-semibold">
                Cộng đồng trẻ, năng động, sáng tạo
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <span className="inline-block bg-[color:var(--sneako-gold)] text-[color:var(--sneako-dark)] font-bold px-5 py-2 rounded-xl shadow text-base md:text-lg">
              #SneakoCommunity
            </span>
            <span className="inline-block bg-[color:var(--sneako-dark)] text-[color:var(--sneako-gold)] font-bold px-5 py-2 rounded-xl shadow text-base md:text-lg">
              #BeYourself
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
