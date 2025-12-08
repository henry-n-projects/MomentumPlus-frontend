import { Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function AppLayout() {
  const { data: user } = useCurrentUser();

  return (
    <div className="min-h-screen bg-[var(--warm-neutral)] text-[var(--text-primary)]">
      {/* Navbar */}
      <nav
        className="
        sticky top-0 z-50
        w-full
        bg-white/70 backdrop-blur-md
        border-b border-[var(--warm-neutral-dark)]
        shadow-sm
      "
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]"
          >
            Pomodoro<span className="text-softBlue">+</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <span className="text-[var(--text-secondary)]">{user.name}</span>
            ) : (
              <motion.button
                className="px-7 py-2 text-l bg-softBlue text-white rounded-full shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login">Login</Link>
              </motion.button>
            )}
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
