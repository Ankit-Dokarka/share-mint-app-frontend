import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons";

type SidebarItemProps = {
  to: string;
  icon: IconType;
  label: string;
  isCollapsed: boolean;
};

export default function SidebarItem({
  to,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 px-4 py-3 rounded-(--btn-radius) transition-all duration-200 ${
          isActive
            ? "bg-(--color-primary) text-white shadow-md"
            : "text-(--color-text-muted) hover:bg-(--color-primary-soft) hover:text-(--color-primary)"
        } ${isCollapsed ? "justify-center px-0" : ""}`
      }
    >
      <Icon
        size={18}
        className="shrink-0 transition-transform duration-200 group-hover:scale-110"
      />
      {!isCollapsed && (
        <span className="text-sm font-medium whitespace-nowrap">{label}</span>
      )}

      {isCollapsed && (
        <span className="absolute left-full ml-4 px-2.5 py-1.5 bg-(--color-text) text-(--color-bg) text-xs font-medium rounded-(--btn-radius) opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
          {label}
        </span>
      )}
    </NavLink>
  );
}
