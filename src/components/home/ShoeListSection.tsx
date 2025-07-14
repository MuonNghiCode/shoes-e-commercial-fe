import React, { useRef } from "react";
import { motion } from "framer-motion";
import ShoeCard from "../products/ShoeCard";
import ShoeLineCard from "../products/ShoeLineCard";
import Particles from "../Particles";
import { shoes, shoeLines } from "@/mocks/shoes";

const fallbackImg = "https://via.placeholder.com/224x224?text=No+Image";
const shoeLinesWithImg = shoeLines
  .map((def) => {
    const found = shoes.find((s) => s.id === def.id);
    return {
      line: def.line,
      image: found?.image || fallbackImg,
    };
  })
  .filter((v, i, arr) => arr.findIndex((x) => x.line === v.line) === i);

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
              {shoeLinesWithImg.map((line, idx) => (
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
