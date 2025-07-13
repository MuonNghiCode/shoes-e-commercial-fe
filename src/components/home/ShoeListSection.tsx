import React, { useRef } from "react";
import { motion } from "framer-motion";
import ShoeCard from "../products/ShoeCard";
import ShoeLineCard from "../products/ShoeLineCard";
import Particles from "../Particles";

const shoes = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 3200000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cb1951e7-0600-4f7a-9b26-12be8cd2bd01/W+AIR+MAX+270.png",
  },
  {
    id: 2,
    name: "Adidas Ultraboost 21",
    price: 3500000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ab9c92c2-eddb-4265-975a-63c892ccf527/M+AIR+MAX+ALPHA+TRAINER+6.png",
  },
  {
    id: 3,
    name: "Converse Chuck Taylor",
    price: 1500000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/365a36f8-2439-426c-8d6d-870463e26e77/M+ZOOM+GP+CHALLENGE+1+CLY.png",
  },
  {
    id: 4,
    name: "Nike Air Force 1 '07",
    price: 2800000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cb1951e7-0600-4f7a-9b26-12be8cd2bd01/W+AIR+MAX+270.png",
  },
  {
    id: 5,
    name: "Adidas Stan Smith",
    price: 2200000,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_800,h_800/global/352634/75/sv01/fnd/PNA/fmt/png/PUMA-Suede-Classic-Unisex-Sneakers",
  },
  {
    id: 6,
    name: "Puma Suede Classic",
    price: 1800000,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_800,h_800/global/352634/75/sv01/fnd/PNA/fmt/png/PUMA-Suede-Classic-Unisex-Sneakers",
  },
  {
    id: 7,
    name: "New Balance 574",
    price: 2700000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cb1951e7-0600-4f7a-9b26-12be8cd2bd01/W+AIR+MAX+270.png",
  },
  {
    id: 8,
    name: "Vans Old Skool",
    price: 1600000,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_800,h_800/global/352634/75/sv01/fnd/PNA/fmt/png/PUMA-Suede-Classic-Unisex-Sneakers",
  },
  {
    id: 9,
    name: "Balenciaga Triple S",
    price: 18500000,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_800,h_800/global/352634/75/sv01/fnd/PNA/fmt/png/PUMA-Suede-Classic-Unisex-Sneakers",
  },
  {
    id: 10,
    name: "Alexander McQueen Oversized",
    price: 14500000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cb1951e7-0600-4f7a-9b26-12be8cd2bd01/W+AIR+MAX+270.png",
  },
];

// Map tên dòng giày thực tế cho từng sản phẩm
const shoeLineMap: Record<number, { line: string; image: string }> = {
  1: { line: "Nike Air Max", image: shoes[0].image },
  2: { line: "Adidas Ultraboost", image: shoes[1].image },
  3: { line: "Converse Chuck Taylor", image: shoes[2].image },
  4: { line: "Nike Air Force 1", image: shoes[3].image },
  5: { line: "Adidas Stan Smith", image: shoes[4].image },
  6: { line: "Puma Suede Classic", image: shoes[5].image },
  7: { line: "New Balance 574", image: shoes[6].image },
  8: { line: "Vans Old Skool", image: shoes[7].image },
  9: { line: "Balenciaga Triple S", image: shoes[8].image },
  10: { line: "McQueen Oversized", image: shoes[9].image },
};

const shoeLines = Object.values(
  shoeLineMap
  // Loại bỏ trùng tên dòng nếu có
).filter((v, i, arr) => arr.findIndex((x) => x.line === v.line) === i);

const ShoeListSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineScrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 md:px-0 min-h-screen flex items-center">
      <Particles />
      <div className="w-full ">
        {/* Lựa theo dòng */}
        <div className="mb-10 overflow-hidden">
          <div className="text-lg font-bold text-gray-800 mb-3 text-center">
            Lựa theo dòng
          </div>
          <div className="relative w-full">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-[color:var(--sneako-gold)] text-[color:var(--sneako-gold)] hover:text-[color:var(--sneako-dark)] rounded-full shadow p-2 transition"
              aria-label="Scroll left dòng"
              onClick={() => {
                if (lineScrollRef.current) {
                  lineScrollRef.current.scrollBy({
                    left: -260,
                    behavior: "smooth",
                  });
                }
              }}
              type="button"
            >
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-[color:var(--sneako-gold)] text-[color:var(--sneako-gold)] hover:text-[color:var(--sneako-dark)] rounded-full shadow p-2 transition"
              aria-label="Scroll right dòng"
              onClick={() => {
                if (lineScrollRef.current) {
                  lineScrollRef.current.scrollBy({
                    left: 260,
                    behavior: "smooth",
                  });
                }
              }}
              type="button"
            >
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div
              ref={lineScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-2 py-2 overflow-hidden"
              style={{ scrollBehavior: "smooth" }}
            >
              {shoeLines.map((line, idx) => (
                <motion.div
                  key={line.line}
                  className="h-56 min-w-[14rem] max-w-[14rem] flex-shrink-0"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.06 }}
                >
                  <ShoeLineCard line={line.line} image={line.image} />
                </motion.div>
              ))}
            </div>
            <style>{`
              .scrollbar-hide::-webkit-scrollbar { display: none; }
              .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[color:var(--sneako-gold)] mb-6 tracking-wide text-center uppercase drop-shadow-lg">
          Sản phẩm nổi bật
        </h2>
        <div className="relative w-full overflow-hidden">
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-[60] bg-white/80 hover:bg-[color:var(--sneako-gold)] text-[color:var(--sneako-gold)] hover:text-[color:var(--sneako-dark)] rounded-full shadow p-3 transition"
            aria-label="Scroll left"
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
              }
            }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-[60] bg-white/80 hover:bg-[color:var(--sneako-gold)] text-[color:var(--sneako-gold)] hover:text-[color:var(--sneako-dark)] rounded-full shadow p-3 transition"
            aria-label="Scroll right"
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
              }
            }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide px-8 py-2 overflow-hidden"
            style={{ scrollBehavior: "smooth" }}
          >
            {shoes.map((shoe, idx) => (
              <motion.div
                key={shoe.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ scale: 1.04 }}
                className="flex-shrink-0"
              >
                <ShoeCard shoe={{ ...shoe, id: shoe.id.toString() }} />
              </motion.div>
            ))}
          </div>
          {/* Ẩn thanh cuộn trên Chrome/Safari/Edge */}
          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default ShoeListSection;
