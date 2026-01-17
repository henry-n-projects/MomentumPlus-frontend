import { Outlet, Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Sidebar from "../components/navbars/SideBar";

export default function ProtectedLayout() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen">
      <Sidebar user={user} onLogout={handleLogout} />

      <main className="ml-60 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
