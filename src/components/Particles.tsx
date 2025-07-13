import { motion } from "framer-motion";

const PARTICLE_COUNT = 35;
const COLORS = [
  "#d4af37", // vàng sang trọng
  "#c9a96e", // vàng nhạt
  "#f8f6f0", // kem
  "#ffffff", // trắng
  "#e8dcc6", // beige nhạt
  "#b8860b", // vàng đậm
  "#f5f5f5", // xám nhạt
  "#ffffff80", // trắng trong suốt
  "#d4af3760", // vàng trong suốt
];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const Particle = ({
  color,
  size,
  left,
  top,
  duration,
  delay,
  direction,
  blur,
  opacity,
}: {
  color: string;
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  direction: number;
  blur: number;
  opacity: number;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.3,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        opacity: [0, opacity, opacity * 0.8, 0],
        y: [0, -random(60, 180)],
        x: [0, direction * random(10, 40)],
        scale: [0.3, 1, 0.8, 0.2],
        filter: [
          `blur(${blur}px)`,
          `blur(${blur * 0.5}px)`,
          `blur(${blur}px)`,
          `blur(${blur * 2}px)`,
        ],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeOut",
      }}
      style={{
        position: "absolute",
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 30%, ${color}, ${color}aa)`,
        zIndex: 0,
        pointerEvents: "none",
        boxShadow: `
          0 0 ${size * 0.5}px ${color}40,
          inset 0 0 ${size * 0.3}px ${color}30
        `,
      }}
    />
  );
};

const Particles = () => {
  // Tạo các orb lớn nền
  const backgroundOrbs = Array.from({ length: 8 }).map((_) => ({
    size: random(80, 150),
    left: random(0, 100),
    top: random(0, 100),
    duration: random(20, 40),
    delay: random(0, 10),
    direction: random(-1, 1),
    blur: random(8, 15),
    opacity: random(0.1, 0.3),
    color: COLORS[Math.floor(Math.random() * 4)], // Chỉ màu nhạt
  }));

  // Tạo các particle nhỏ
  const smallParticles = Array.from({ length: PARTICLE_COUNT }).map((_) => ({
    size: random(8, 24),
    left: random(0, 100),
    top: random(0, 100),
    duration: random(8, 18),
    delay: random(0, 12),
    direction: random(-1, 1),
    blur: random(0.5, 2),
    opacity: random(0.4, 0.8),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden">
      {/* Background orbs */}
      {backgroundOrbs.map((orb, i) => (
        <Particle key={`bg-${i}`} {...orb} />
      ))}

      {/* Small particles */}
      {smallParticles.map((particle, i) => (
        <Particle key={`particle-${i}`} {...particle} />
      ))}

      {/* Gradient overlay để tạo depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, #d4af3708 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, #c9a96e08 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #f8f6f005 0%, transparent 70%)
          `,
        }}
      />
    </div>
  );
};

export default Particles;
