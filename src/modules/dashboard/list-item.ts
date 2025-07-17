import {
  Calendar,
  ChartColumn,
  CreditCard,
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
    roles: ["admin"],
  },
  {
    icons: Settings,
    label: "Fasilitas",
    href: "/facilities",
    description: "Kelola fasilitas",
    roles: ["admin"],
  },
  {
    icons: Calendar,
    label: "Check-in/out",
    href: "/check-in-out",
    description: "Monitor dan kelola aktivitas member",
    roles: ["admin"],
  },
  {
    icons: Crown,
    label: "Membership",
    href: "/membership",
    description: "Kelola membership dari member",
    roles: ["admin"],
  },
  {
    icons: ChartColumn,
    label: "Laporan",
    href: "/reports",
    description: "Buat laporan gym dan member",
    roles: ["admin"],
  },
  {
    icons: Calendar,
    label: "Check-in",
    href: "/checkin",
    description: "Checkin GYM",
    roles: ["user"],
  },
  {
    icons: CreditCard,
    label: "Plan",
    href: "/extend",
    description: "Tentukan membership anda",
    roles: ["user"],
  },
];
