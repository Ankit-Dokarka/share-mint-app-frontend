import { memo } from "react";
import BottomNavItem from "./BottomNavItem";
import { navItems } from "../../constants/navigation";

const BottomNavigation = () => {
  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-(--color-surface) border-t border-(--color-border) flex justify-around items-center z-30 pb-safe shadow-lg"
    >
      {navItems.map((item) => (
        <BottomNavItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          label={item.label}
        />
      ))}
    </nav>
  );
};

export default memo(BottomNavigation);
