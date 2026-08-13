import BottomNavItem from "./BottomNavItem";
import { bottomNavItems } from "../../constants/navigation";

export default function BottomNavigation() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-(--color-surface) border-t border-(--color-border) flex justify-around items-center z-30 pb-safe shadow-lg">
      {bottomNavItems.map((item) => (
        <BottomNavItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          label={item.label}
        />
      ))}
    </nav>
  );
}
