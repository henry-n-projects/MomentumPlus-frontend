import { Outlet } from "react-router-dom";

import TopBar from "../components/navbars/Topbar";
export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[var(--warm-neutral)] text-[var(--text-primary)] ">
      <TopBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
