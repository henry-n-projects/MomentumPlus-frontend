import { motion } from "motion/react";
import { useMousePosition } from "../../../hooks/useMousePosition";

export function BackgroundDots() {
  const mouse = useMousePosition();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? "#3E86B6" : "#8763C1"
            }, transparent)`,
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: (mouse.x - window.innerWidth / 2) * (0.01 + i * 0.002),
            y: (mouse.y - window.innerHeight / 2) * (0.01 + i * 0.002),
          }}
          transition={{
            scale: {
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: { duration: 0.5 },
            y: { duration: 0.5 },
          }}
        />
      ))}
    </div>
  );
}
