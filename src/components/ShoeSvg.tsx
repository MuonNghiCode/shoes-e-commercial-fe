import React from "react";

const ShoeSvg = ({ color = "#c9b37c", size = 32, style = {} }) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 64 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M4 28C4 28 10 10 32 10C54 10 60 28 60 28C62 32 60 36 56 36H8C4 36 2 32 4 28Z"
      fill={color}
      stroke="#2d1a10"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect
      x="12"
      y="28"
      width="40"
      height="6"
      rx="3"
      fill="#fff"
      stroke="#2d1a10"
      strokeWidth="1.5"
    />
    <circle cx="18" cy="31" r="1.5" fill="#2d1a10" />
    <circle cx="24" cy="31" r="1.5" fill="#2d1a10" />
    <circle cx="30" cy="31" r="1.5" fill="#2d1a10" />
    <circle cx="36" cy="31" r="1.5" fill="#2d1a10" />
    <circle cx="42" cy="31" r="1.5" fill="#2d1a10" />
    <circle cx="48" cy="31" r="1.5" fill="#2d1a10" />
  </svg>
);

export default ShoeSvg;
