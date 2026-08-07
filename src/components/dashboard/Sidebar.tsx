import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronsLeft, FiChevronsRight, FiLogOut } from "react-icons/fi";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { sidebarNavItems } from "../../constants/navigation";
import useAuth from "../../hooks/useAuth";
import getName from "../../utils/getName";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <aside
        className={`hidden md:flex flex-col bg-(--color-surface) border-r border-(--color-border) transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[width] relative z-40 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        <div className="h-16 flex items-center border-b border-(--color-border) px-6 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <Logo className="w-9 h-9 shrink-0" />
            <span
              className={`text-lg font-extrabold text-(--color-text) whitespace-nowrap transition-opacity duration-200 ${
                isCollapsed ? "opacity-0 delay-0" : "opacity-100 delay-300"
              }`}
            >
              Sharemint
            </span>
          </div>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1.5 pt-5">
          {sidebarNavItems.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        {user && (
          <div className="border-t border-(--color-border) p-3">
            <div
              className={`flex items-center gap-3 rounded-(--btn-radius) border border-(--color-border) bg-(--color-surface-strong)/70 p-3 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-10 h-10 shrink-0 rounded-full bg-(--color-primary) text-white flex items-center justify-center text-sm font-bold">
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

              {!isCollapsed && (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-(--color-text) capitalize">
                      {getName(user)}
                    </p>
                    <p className="truncate text-xs text-(--color-text-soft)">
                      {user.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="h-9 w-9 shrink-0 rounded-(--btn-radius) border border-(--color-border) bg-(--color-surface) text-(--color-text-muted) hover:border-(--color-danger)/40 hover:bg-(--color-danger-soft) hover:text-(--color-danger) transition-colors flex items-center justify-center"
                    aria-label="Logout"
                    title="Logout"
                  >
                    <FiLogOut size={16} />
                  </button>
                </>
              )}
            </div>

            {isCollapsed && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 h-10 w-full rounded-(--btn-radius) border border-(--color-border) bg-(--color-surface) text-(--color-text-muted) hover:border-(--color-danger)/40 hover:bg-(--color-danger-soft) hover:text-(--color-danger) transition-colors flex items-center justify-center"
                aria-label="Logout"
                title="Logout"
              >
                <FiLogOut size={16} />
              </button>
            )}
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-8 -right-4 -translate-y-1/2 z-40 w-8 h-8 flex items-center justify-center rounded-full bg-(--color-elevated) border border-(--color-border) shadow-md text-(--color-text-muted) hover:text-(--color-primary) hover:border-(--color-primary)/40 transition-all duration-200"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? (
            <FiChevronsRight size={18} className="shrink-0" />
          ) : (
            <FiChevronsLeft size={18} className="shrink-0" />
          )}
        </button>
      </aside>
    </>
  );
}
