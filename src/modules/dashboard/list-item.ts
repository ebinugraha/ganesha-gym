import {
  Calendar,
  ChartColumn,
  Crown,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

export const listItemNav = [
  {
    icons: LayoutDashboard,
    label: "Beranda",
    href: "/",
    description: "Lihat quick action rangkuman hari ini",
    roles: ["admin", "user"],
  },
  {
    icons: Users,
    label: "Pengguna",
    href: "/users",
    description: "Kelola dan pantau aktivitas member gym",
    roles: ["admin", "user"],
  },
  {
    icons: Settings,
    label: "Fasilitas",
    href: "/facilities",
    description: "Kelola fasilitas",
    roles: ["admin", "user"],
  },
  {
    icons: Calendar,
    label: "Check-in/out",
    href: "/check-in-out",
    description: "Monitor dan kelola aktivitas member",
    roles: ["admin", "user"],
  },
  {
    icons: Crown,
    label: "Membership",
    href: "/membership",
    description: "Kelola membership dari member",
    roles: ["admin", "user"],
  },
  {
    icons: ChartColumn,
    label: "Laporan",
    href: "/reports",
    description: "Buat laporan gym dan member",
    roles: ["admin"],
  },
];
