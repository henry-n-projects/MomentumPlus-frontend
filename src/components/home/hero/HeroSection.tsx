import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { BackgroundDots } from "./BackgroundDots";
import { PomodoroPreview } from "./PomodoroPreview";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 bg-warmNeutral">
      <BackgroundDots />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Heading */}
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl text-center mb-8 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          Focus, reimagined.
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-textSecondary max-w-2xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A minimal Pomodoro timer that helps you understand your work patterns
          and build lasting focus habits.
        </motion.p>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          <PomodoroPreview />

          <motion.div
            className="max-w-md text-center lg:text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 tracking-tight">
              Ready to focus?
            </h2>

            <p className="text-lg text-textSecondary leading-relaxed mb-8">
              Start building better focus habits today. Track your progress,
              stay consistent, and achieve more with less stress.
            </p>

            <Link to="/login">
              <motion.button
                className="group relative px-10 py-5 text-xl bg-softBlue text-white rounded-full shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative flex items-center justify-center gap-2">
                  Sign in and begin
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>

            <p className="mt-6 text-sm text-textSecondary">
              Free to use. No credit card required.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
