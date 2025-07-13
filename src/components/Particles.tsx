import { motion } from "framer-motion";
import ShoeSvg from "./ShoeSvg";

const PARTICLE_COUNT = 28;
const SHAPES = ["circle", "diamond", "star", "shoe"];
const COLORS = [
  "#e6d4b6", // beige
  "#c9b37c", // gold
  "#f5f5f3", // gray
  "#fff8",
  "#fff",
  "#b8a07e", // thêm màu nâu sáng
];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const Particle = ({
  shape,
  color,
  size,
  left,
  top,
  duration,
  delay,
  rotate,
}: any) => {
  if (shape === "shoe") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: [0, 0.8, 0],
          y: [0, -random(40, 120)],
          rotate: [rotate, rotate + random(-60, 60)],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
          width: size * 1.5,
          height: size,
          opacity: 0.7,
          zIndex: 0,
          pointerEvents: "none",
          filter: "drop-shadow(0 2px 8px #c9b37c44)",
          transform: `rotate(${rotate}deg)`,
        }}
      >
        <ShoeSvg color={color} size={size * 1.5} />
      </motion.div>
    );
  }
  let style: React.CSSProperties = {
    position: "absolute",
    left: `${left}%`,
    top: `${top}%`,
    width: size,
    height: size,
    opacity: 0.6,
    zIndex: 0,
    filter: "blur(1.5px)",
    pointerEvents: "none",
    transform: `rotate(${rotate}deg)`,
  };
  if (shape === "circle") {
    style.borderRadius = "50%";
    style.background = color;
  } else if (shape === "diamond") {
    style.background = color;
    style.transform += " rotate(45deg)";
  } else if (shape === "star") {
    style.background = color;
    style.clipPath =
      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.7, 0],
        y: [0, -random(40, 120)],
        rotate: [rotate, rotate + random(-60, 60)],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      style={style}
    />
  );
};

const FooterParticles = () => {
  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const size = random(14, 36);
        const left = random(0, 100);
        const top = random(0, 100);
        const duration = random(7, 16);
        const delay = random(0, 8);
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const rotate = random(-30, 30);
        return (
          <Particle
            key={i}
            shape={shape}
            color={color}
            size={size}
            left={left}
            top={top}
            duration={duration}
            delay={delay}
            rotate={rotate}
          />
        );
      })}
    </div>
  );
};

export default FooterParticles;
