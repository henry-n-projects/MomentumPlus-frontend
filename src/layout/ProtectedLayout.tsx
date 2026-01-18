import { Outlet, Navigate } from "react-router-dom";
import { useCurrentUser, useLogout } from "../hooks/useUser";
import Sidebar from "../components/navbars/SideBar";

export default function ProtectedLayout() {
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: logout, isPending } = useLogout();

  if (isLoading) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen">
      <Sidebar user={user} onLogout={logout} isPendingLogout={isPending} />

      <main className="ml-60 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
