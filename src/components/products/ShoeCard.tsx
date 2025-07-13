import React from "react";

interface ShoeCardProps {
  shoe: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

const ShoeCard: React.FC<ShoeCardProps> = ({ shoe }) => (
  <div className="min-w-[340px] max-w-[360px] aspect-[4/5] rounded-[2.5rem] overflow-hidden group relative flex flex-col justify-end bg-gray-100 border border-white/80 shadow-none transition-transform duration-300 hover:-translate-y-2">
    <img
      src={shoe.image}
      alt={shoe.name}
      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 select-none z-0"
      draggable={false}
    />
    <span className="absolute top-5 right-5 bg-white/95 text-[color:var(--sneako-gold)] text-xs font-bold px-4 py-1 rounded-full border border-white/80 tracking-wider uppercase z-10">
      New
    </span>
    <div className="relative z-10 w-full px-7 pb-7 pt-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center">
      <h3 className="text-2xl font-extrabold text-white mb-2 text-center line-clamp-2 tracking-tight drop-shadow">
        {shoe.name}
      </h3>
      <div className="text-2xl font-bold text-[color:var(--sneako-gold)] mb-5 tracking-wider drop-shadow">
        {shoe.price.toLocaleString()}₫
      </div>
      <button className="w-full flex items-center justify-center gap-2 px-0 py-4 rounded-full bg-[color:var(--sneako-gold)] text-[color:var(--sneako-dark)] font-extrabold text-lg border-2 border-[color:var(--sneako-gold)] shadow-md hover:bg-yellow-300 hover:text-black transition-all duration-200 tracking-wide hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[color:var(--sneako-gold)]">
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

export default ShoeCard;
