import { Outlet, Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Sidebar from "../components/navbars/SideBar";

export default function ProtectedLayout() {
  const { data: user, isLoading } = useCurrentUser();
  if (isLoading) return null;

  // Validate User is logged in else go to home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="relative flex-1 bg-gradient-to-b from-warmNeutral to-softBlueLight">
        <Outlet />
      </main>
    </div>
  );
}
