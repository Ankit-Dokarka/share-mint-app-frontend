import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import BottomNavigation from "../components/dashboard/BottomNavigation";
import { GroupsProvider } from "../context/groups/GroupProvider";
import { ExpenseProvider } from "../context/expense/ExpenseProvider";

export default function DashboardLayout() {
  const location = useLocation();

  const isChatPage = location.pathname.startsWith("/dashboard/chat");

  return (
    <GroupsProvider>
      <ExpenseProvider>
        <div className="flex h-dvh w-full overflow-hidden bg-(--color-bg) text-(--color-text)">
          <Sidebar />

          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />

            <main
              className={`flex-1 overflow-hidden ${
                isChatPage
                  ? "pb-20 md:pb-0"
                  : "overflow-y-auto px-4 py-5 pb-24 sm:px-6 md:px-8 lg:px-10 md:pb-8"
              }`}
            >
              <Outlet />
            </main>
          </div>

          <BottomNavigation />
        </div>
      </ExpenseProvider>
    </GroupsProvider>
  );
}
