import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineCog,
} from "react-icons/hi";

export const userLinks = [
  { name: "Dashboard", path: "/user-dashboard", icon: HiOutlineHome },
  { name: "My Prompts", path: "/prompts", icon: HiOutlineDocumentText },
  { name: "Workspaces", path: "/workspaces", icon: HiOutlineUsers },
  { name: "Settings", path: "/settings", icon: HiOutlineCog },
];

export const adminLinks = [
  { name: "System Stats", path: "/admin/stats", icon: HiOutlineChartBar },
  { name: "Manage Users", path: "/admin/users", icon: HiOutlineUsers },
  { name: "Admin Settings", path: "/admin/settings", icon: HiOutlineCog },
];
