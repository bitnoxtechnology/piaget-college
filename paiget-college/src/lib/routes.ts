import {
  Banknote,
  BookOpen,
  Dock,
  LayoutDashboardIcon,
  Settings,
} from "lucide-react";

export const dashboardRoutes = [
  {
    label: "Overview",
    route: "/admin/overview",
    icon: LayoutDashboardIcon,
    subMenu: false,
    subMenuItems: [],
  },
  {
    label: "Posts",
    route: "/admin/posts",
    icon: BookOpen,
    subMenu: false,
    subMenuItems: [],
  },
  {
    label: "Testimonials",
    route: "/admin/testimonials",
    icon: Dock,
    subMenu: false,
    subMenuItems: [],
  },
  {
    label: "Workshops",
    route: "/admin/workshops",
    icon: Banknote,
    subMenu: true,
    subMenuItems: [
      { label: "All", route: "/admin/workshops" },
      { label: "Old", route: "/admin/workshops/old" },
    ],
  },
  {
    label: "Settings",
    route: "/admin/settings",
    icon: Settings,
    subMenu: true,
    subMenuItems: [
      { label: "My Account", route: "/admin/settings/account" },
      { label: "Platform", route: "/admin/settings/platform" },
    ],
  },
];
