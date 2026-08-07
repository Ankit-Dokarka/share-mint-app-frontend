import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons";

type BottomNavItemProps = {
  to: string;
  icon: IconType;
  label: string;
};

export default function BottomNavItem({
  to,
  icon: Icon,
  label,
}: BottomNavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center gap-1 w-full h-full text-xs transition-colors ${
          isActive ? "text-(--color-primary)" : "text-(--color-text-muted)"
        }`
      }
    >
      <Icon size={22} />
      <span>{label}</span>
    </NavLink>
  );
}
