import React from "react";

// Định nghĩa kiểu dữ liệu shoeLine theo mock shoes.ts
export interface ShoeLine {
  category: string;
  image: string;
}

interface ShoeLineCardProps {
  shoeLine?: ShoeLine;
}

const ShoeLineCard: React.FC<ShoeLineCardProps> = ({ shoeLine }) => {
  if (!shoeLine || !shoeLine.image) {
    return (
      <div className="w-56 h-56 rounded-2xl flex items-center justify-center bg-gray-100 border-2 border-dashed border-[color:var(--sneako-gold)] text-gray-400 text-center">
        Không có dữ liệu
      </div>
    );
  }
  return (
    <div className="w-56 h-56 rounded-2xl overflow-hidden relative group cursor-pointer border-2 border-[color:var(--sneako-gold)] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-200 bg-gradient-to-br from-[color:var(--sneako-beige)] to-white flex flex-col justify-end">
      <img
        src={shoeLine.image}
        alt={shoeLine.category}
        className="absolute inset-0 w-full h-full object-cover object-center z-0 group-hover:scale-110 transition-transform duration-300"
        draggable={false}
        style={{ filter: "brightness(0.96)" }}
      />
      <div className="relative z-10 w-full px-4 py-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center">
        <div className="text-xl font-extrabold text-white text-center line-clamp-2 drop-shadow group-hover:text-[color:var(--sneako-gold)] transition-colors duration-200 tracking-wide uppercase">
          {shoeLine.category}
        </div>
      </div>
    </div>
  );
};

export default ShoeLineCard;
