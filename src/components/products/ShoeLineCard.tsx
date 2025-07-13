import React from "react";

interface ShoeLineCardProps {
  line: string;
  image: string;
}

const ShoeLineCard: React.FC<ShoeLineCardProps> = ({ line, image }) => (
  <div className="w-56 h-56 rounded-2xl overflow-hidden relative group cursor-pointer border-2 border-yellow-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-200 bg-gray-100 flex flex-col justify-end">
    <img
      src={image}
      alt={line}
      className="absolute inset-0 w-full h-full object-cover object-center z-0 group-hover:scale-105 transition-transform duration-300"
    />
    <div className="relative z-10 w-full px-4 py-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col items-center">
      <div className="text-lg font-extrabold text-white text-center line-clamp-2 drop-shadow group-hover:text-[color:var(--sneako-gold)] transition-colors duration-200">
        {line}
      </div>
    </div>
  </div>
);

export default ShoeLineCard;
