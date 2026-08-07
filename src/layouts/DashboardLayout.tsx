import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import BottomNavigation from "../components/dashboard/BottomNavigation";

export default function DashboardLayout() {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-(--color-bg) font-sans">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
          <Outlet />
        </main>
      </div>

      <BottomNavigation />
    </div>
  );
}
