import { Link, NavLink } from "react-router-dom";
import {
  Archive,
  Calendar,
  ChartNetwork,
  LayoutDashboard,
  TimerIcon,
} from "lucide-react";
import type { UserObject } from "../../types/user";
import avatarPlaceholder from "../../assets/avatar-placeholder.png";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/record", label: "Record", icon: TimerIcon },
  { to: "/sessions", label: "Sessions", icon: Calendar },
  { to: "/analytics", label: "Analytics", icon: ChartNetwork },
  { to: "/history", label: "History", icon: Archive },
];

interface SidebarProps {
  user: UserObject;
  onLogout: () => void;
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-white border-r border-gray-200 p-8 z-40">
      <nav className=" flex h-full flex-col space-y-6">
        {/* Brand */}
        <Link
          to="/dashboard"
          className="text-2xl font-semibold tracking-tight text-textPrimary"
        >
          Kronus<span className="text-softBlue">+</span>
        </Link>

        {/* Nav items */}
        <div className="space-y-2">
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
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User + Logout */}
        <div className="mt-auto pt-6 border-t border-[var(--warm-neutral-dark)]">
          <div className="flex flex-col items-center gap-3 mb-4">
            <img
              src={user?.avartar ?? avatarPlaceholder}
              alt={user?.name ?? "User avatar"}
              className="w-10 h-10 rounded-full border border-[var(--warm-neutral-dark)]"
            />
            <span className="text-sm text-textSecondary">{user?.name}</span>
          </div>

          <button
            onClick={onLogout}
            className="
      w-full px-6 py-2
      text-sm font-medium
      bg-[var(--accent-purple)]
      text-white
      rounded-full
      shadow-lg
      transition
      hover:scale-[1.02]
    "
          >
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}
