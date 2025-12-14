import { Outlet, Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { motion } from "motion/react";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[var(--warm-neutral)] text-[var(--text-primary)]">
      <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-[var(--warm-neutral-dark)] shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-semibold tracking-tight text-textPrimary"
          >
            Pomodoro<span className="text-softBlue">+</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <motion.a
              className="px-7 py-2 text-l bg-softBlue text-white rounded-full shadow-lg inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.a>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
