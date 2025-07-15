import React from "react";
import { useNavigate } from "react-router-dom";

import type { Shoe } from "@/mocks/shoes";

interface ShoeCardProps {
  shoe: Shoe;
}

const ShoeCard: React.FC<ShoeCardProps> = ({ shoe }) => {
  const navigate = useNavigate();
  return (
    <div
      className="min-w-[320px] max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden group relative flex flex-col justify-end bg-gradient-to-br from-[color:var(--sneako-beige)] to-white border border-[color:var(--sneako-gold)] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      style={{ boxShadow: "0 8px 32px #c9b37c33" }}
      onClick={() => navigate(`/product/${shoe.id}`)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") navigate(`/product/${shoe.id}`);
      }}
      role="button"
      aria-label={`Xem chi tiết sản phẩm ${shoe.name}`}
    >
      {/* Ảnh sản phẩm */}
      <img
        src={shoe.images?.[0] || ""}
        alt={shoe.name}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110 select-none z-0"
        draggable={false}
        style={{ filter: "brightness(0.97)" }}
      />
      {/* Badge brand */}
      <span className="absolute top-5 left-5 bg-white/90 text-[color:var(--sneako-dark)] text-xs font-bold px-4 py-1 rounded-full border border-[color:var(--sneako-gold)] tracking-wider uppercase z-20 shadow">
        {shoe.brand}
      </span>
      {/* Badge new */}
      <span className="absolute top-5 right-5 bg-[color:var(--sneako-gold)]/90 text-white text-xs font-bold px-4 py-1 rounded-full border border-white/80 tracking-wider uppercase z-20 shadow">
        New
      </span>
      {/* Nội dung */}
      <div className="relative z-10 w-full px-7 pb-7 pt-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center">
        <h3 className="text-2xl font-extrabold text-white mb-1 text-center line-clamp-2 tracking-tight drop-shadow">
          {shoe.name}
        </h3>
        {/* Rating */}
        {/* {typeof shoe.averageRating === "number" && (
        <div className="flex items-center gap-1 mb-1">
          <svg
            width="18"
            height="18"
            fill="#FFD700"
            viewBox="0 0 24 24"
            className="inline-block drop-shadow"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="text-yellow-200 font-semibold text-sm">
            {shoe.averageRating?.toFixed(1)}
          </span>
          <span className="text-white/70 text-xs">
            ({shoe.numOfReviews || 0})
          </span>
        </div>
      )} */}
        {/* Mô tả ngắn */}
        {shoe.description && (
          <div className="text-base text-white/90 mb-2 text-center line-clamp-1 drop-shadow">
            {shoe.description}
          </div>
        )}
        {/* Giá */}
        <div className="text-2xl font-bold text-[color:var(--sneako-gold)] mb-4 tracking-wider drop-shadow">
          {shoe.price.toLocaleString()}₫
        </div>
        {/* Nút mua */}
        <button className="w-full flex items-center justify-center gap-2 px-0 py-3 rounded-full bg-[color:var(--sneako-gold)] text-[color:var(--sneako-dark)] font-extrabold text-lg border-2 border-[color:var(--sneako-gold)] shadow-md hover:bg-yellow-300 hover:text-black transition-all duration-200 tracking-wide hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[color:var(--sneako-gold)]">
          <svg
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3"
            />
          </svg>
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default ShoeCard;
