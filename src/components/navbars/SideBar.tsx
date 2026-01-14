import { Link, NavLink } from "react-router-dom";
import {
  Archive,
  Calendar,
  ChartNetwork,
  LayoutDashboard,
  TimerIcon,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/record", label: "Record", icon: TimerIcon },
  { to: "/sessions", label: "Sessions", icon: Calendar },
  { to: "/analytics", label: "Analytics", icon: ChartNetwork },
  { to: "/history", label: "History", icon: Archive },
];
export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r border-gray-200 p-8 ">
      <nav className="space-y-4">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-textPrimary"
        >
          Kronus<span className="text-softBlue">+</span>
        </Link>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition
               ${
                 isActive
                   ? "bg-softBlue/10 text-textPrimary font-medium"
                   : "text-textSecondary hover:text-textPrimary"
               }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={20}
                  color={
                    isActive ? "var(--soft-blue)" : "var(--text-secondary)"
                  }
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
