import { motion } from "motion/react";
import { useState } from "react";

export function PomodoroPreview() {
  const [hovered, setHovered] = useState(false);

  return (
    //Outer fade in animation
    <motion.div
      // starting state before animation begins
      initial={{ opacity: 0, scale: 0.8 }}
      //where animation should end up
      animate={{ opacity: 1, scale: 1 }}
      //timing for animation
      transition={{ duration: 1, delay: 0.4 }}
    >
      <div className="relative">
        {/* Glowing background*/}
        <motion.div
          className="absolute inset-0 rounder-full"
          // Circle that looks like soft light
          style={{
            background:
              "radial-gradient(circle, rgba(163,201,224,0.3), transparent 70%)",
            width: 320,
            height: 320,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Card */}
        <motion.div
          className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl cursor-pointer"
          style={{ width: 280, height: 280 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.05 }}
        >
          {/* Timer */}
          <div className="flex items-center justify-center h-full">
            <div className="relative">
              <svg width="180" height="180" className="-rotate-90">
                {/* Draw background Circle */}
                <circle
                  cx="90"
                  cy="90"
                  r="80"
                  stroke="#E5D7CF"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Draw Progress Circle */}
                <motion.circle
                  cx="90"
                  cy="90"
                  r="80"
                  stroke="#A3C9E0"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={502.4}
                  initial={{ strokeDashoffset: 502.4 }}
                  animate={{ strokeDashoffset: hovered ? 125.6 : 251.2 }}
                  transition={{ duration: 0.6 }}
                />
              </svg>

              {/* Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  className="text-4xl tracking-wider"
                  animate={{ opacity: hovered ? 0.6 : 1 }}
                >
                  25:00
                </motion.div>
                <motion.div
                  className="text-sm mt-2 text-textSecondary"
                  animate={{ opacity: hovered ? 1 : 0 }}
                >
                  Start focus
                </motion.div>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2"
            animate={{ opacity: hovered ? 1 : 0.5 }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < 2 ? "bg-softBlue" : "bg-warmNeutralDark"
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
