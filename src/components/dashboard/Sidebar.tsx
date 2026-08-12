import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { sidebarNavItems } from "../../constants/navigation";
import useAuth from "../../context/auth/AuthContext";
import getName from "../../utils/getName";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside
      className={`hidden md:flex flex-col bg-(--color-surface) border-r border-(--color-border) transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[width] relative z-40 overflow-x-hidden ${
        isCollapsed ? "w-17" : "w-60"
      }`}
    >
      <div className="h-16 flex items-center border-b border-(--color-border) px-3 shrink-0">
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            className="h-10 w-full flex items-center justify-center rounded-(--btn-radius) text-(--color-text-muted) hover:bg-(--color-surface-strong) hover:text-(--color-text) transition-colors"
            aria-label="Expand sidebar"
            title="Expand"
          >
            <LuPanelLeftOpen size={20} />
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Logo className="w-8 h-8 shrink-0" />
              <span className="text-base font-extrabold text-(--color-text) whitespace-nowrap tracking-tight">
                Sharemint
              </span>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              className="h-8 w-8 shrink-0 rounded-(--btn-radius) text-(--color-text-soft) hover:bg-(--color-surface-strong) hover:text-(--color-text) transition-colors flex items-center justify-center"
              aria-label="Collapse sidebar"
              title="Collapse"
            >
              <LuPanelLeftClose size={18} />
            </button>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {sidebarNavItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            title={item.label}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {user && (
        <div className="border-t border-(--color-border) p-3 shrink-0">
          {isCollapsed ? (
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="h-10 w-full flex items-center justify-center rounded-(--btn-radius) text-(--color-text-soft) hover:bg-(--color-danger-soft) hover:text-(--color-danger) transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Logout"
              title="Logout"
            >
              {isLoggingOut ? (
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <FiLogOut size={16} />
              )}
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-(--btn-radius) p-2 hover:bg-(--color-surface-strong) transition-colors group cursor-pointer">
              <div className="w-9 h-9 shrink-0 rounded-full bg-(--color-primary) text-white flex items-center justify-center text-sm font-bold overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={getName(user)}
                    className="h-full w-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  user.email?.[0]?.toUpperCase() || "U"
                )}
              </div>
              <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-(--color-text)">
                    {getName(user)}
                  </p>
                  <p className="truncate text-xs text-(--color-text-soft)">
                    {user.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="h-8 w-8 shrink-0 rounded-(--btn-radius) text-(--color-text-soft) hover:bg-(--color-danger-soft) hover:text-(--color-danger) transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Logout"
                  title="Logout"
                >
                  {isLoggingOut ? (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <FiLogOut size={14} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
