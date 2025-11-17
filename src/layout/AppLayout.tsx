import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav>Pomodoro Plus</nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
