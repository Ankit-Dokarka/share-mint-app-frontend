import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import BottomNavigation from "../components/dashboard/BottomNavigation";

export default function DashboardLayout() {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-(--color-bg) text-(--color-text)">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto px-4 py-5 pb-24 sm:px-6 md:px-8 lg:px-10 md:pb-8">
          <Outlet />
        </main>
      </div>

      <BottomNavigation />
    </div>
  );
}
