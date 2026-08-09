import {
  FiHome,
  FiUsers,
  FiUser,
  FiSettings,
  FiCreditCard,
} from "react-icons/fi";
import type { IconType } from "react-icons";

export type NavItem = {
  to: string;
  icon: IconType;
  label: string;
};

export const sidebarNavItems: NavItem[] = [
  { to: "/dashboard", icon: FiHome, label: "Dashboard" },
  { to: "/dashboard/groups", icon: FiUsers, label: "Groups" },
  { to: "/dashboard/payments", icon: FiCreditCard, label: "Payments" },
  { to: "/dashboard/profile", icon: FiUser, label: "Profile" },
  { to: "/dashboard/settings", icon: FiSettings, label: "Settings" },
];

export const bottomNavItems: NavItem[] = [
  { to: "/dashboard", icon: FiHome, label: "Dashboard" },
  { to: "/dashboard/groups", icon: FiUsers, label: "Groups" },
  { to: "/dashboard/payments", icon: FiCreditCard, label: "Payments" },
  { to: "/dashboard/profile", icon: FiUser, label: "Profile" },
  { to: "/dashboard/settings", icon: FiSettings, label: "Settings" },
];
