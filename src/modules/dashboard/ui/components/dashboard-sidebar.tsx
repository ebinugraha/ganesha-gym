"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { listItemNav } from "../../list-item";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DashboardUserButton } from "./dashboard-user-button";

export const DashboardSidebar = () => {
  const { data, isPending } = authClient.useSession();
  const pathname = usePathname();

  const userRole = data?.user.role;

  const filterdNavItems = listItemNav.filter((item) => {
    if (!item.roles) {
      return true;
    }
    return userRole && item.roles.includes(userRole);
  });

  return (
    <Sidebar className="">
      <SidebarHeader className="text-white">
        <Link href="/" className="flex items-center gap-2 px-3 pt-3">
          <Image src={"/logo.svg"} alt="logo" height={25} width={25} />
          <p className="text-lg font-semibold">Ganesha-GYM</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <SidebarSeparator className="opacity-10 text-[#ffffff]" />
      </div>
      <SidebarContent className="pt-6 px-3">
        {isPending && (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map(
              (
                _,
                index // Render 5 baris skeleton, sesuaikan jumlahnya
              ) => (
                <Skeleton key={index} className="h-8 w-full rounded-md" />
              )
            )}
          </div>
        )}
        <SidebarMenu className="space-y-0.5">
          {filterdNavItems.map((data) => (
            <SidebarMenuItem key={data.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    className={cn(
                      "group relative flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ",
                      // --- Tambahkan kelas transisi di sini ---
                      "transition-colors duration-200", // Transisi warna selama 200ms
                      // ------------------------------------
                      "hover:bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:text-white", // Efek hover
                      "text-muted-foreground", // Gaya default (non-aktif)
                      pathname === data.href &&
                        "text-white/90 border bg-gradient-to-r from-blue-500/20 to-purple-500/20" // Gaya saat aktif
                    )}
                    asChild
                  >
                    <Link
                      href={data.href}
                      className="flex items-center gap-x-4 py-4"
                    >
                      {pathname === data.href && (
                        <span className="absolute left-0 top-0 h-full w-1 rounded-l-md bg-gradient-to-b from-blue-500 to-purple-500" />
                      )}
                      <data.icons
                        style={{ width: "20px", height: "20px" }}
                        className={cn(
                          pathname === data.href && "text-blue-500"
                        )}
                      />
                      <span className="text-sm font-semibold">
                        {data.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">{data.description}</TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-3 text-white pb-3">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
