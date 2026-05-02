import {
  BookOpen,
  LayoutDashboardIcon,
  CalendarDays,
  MessageSquare,
  ClipboardList,
} from "lucide-react";

type DashboardRoute = {
  label: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
  subMenu: boolean;
  subMenuItems: { label: string; route: string }[];
};

export const dashboardRoutes: DashboardRoute[] = [
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
    icon: MessageSquare,
    subMenu: false,
    subMenuItems: [],
  },
  {
    label: "Workshops",
    route: "/admin/workshops",
    icon: CalendarDays,
    subMenu: false,
    subMenuItems: [],
  },
  {
    label: "Applications",
    route: "/admin/applications",
    icon: ClipboardList,
    subMenu: false,
    subMenuItems: [],
  },
  // {
  //   label: "Settings",
  //   route: "/admin/settings",
  //   icon: Settings,
  //   subMenu: true,
  //   subMenuItems: [
  //     { label: "My Account", route: "/admin/settings/account" },
  //     { label: "Platform", route: "/admin/settings/platform" },
  //   ],
  // },
];
