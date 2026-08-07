import { FiHome, FiUsers } from "react-icons/fi";
import type { IconType } from "react-icons";

export type NavItem = {
  to: string;
  icon: IconType;
  label: string;
};

export const sidebarNavItems: NavItem[] = [
  { to: "/dashboard", icon: FiHome, label: "Dashboard" },
  { to: "/dashboard/groups", icon: FiUsers, label: "Groups" },
];

export const bottomNavItems: NavItem[] = [
  { to: "/dashboard", icon: FiHome, label: "Dashboard" },
  { to: "/dashboard/groups", icon: FiUsers, label: "Groups" },
];
