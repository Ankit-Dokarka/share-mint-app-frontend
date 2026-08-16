import {
  FiHome,
  FiUsers,
  FiUser,
  FiSettings,
  FiMessageSquare,
} from "react-icons/fi";
import type { IconType } from "react-icons";

export type NavItem = {
  to: string;
  icon: IconType;
  label: string;
};

export const navItems: NavItem[] = [
  { to: "/dashboard", icon: FiHome, label: "Dashboard" },
  { to: "/dashboard/groups", icon: FiUsers, label: "Groups" },
  { to: "/dashboard/chat", icon: FiMessageSquare, label: "Chat" },
  { to: "/dashboard/profile", icon: FiUser, label: "Profile" },
  { to: "/dashboard/settings", icon: FiSettings, label: "Settings" },
];
