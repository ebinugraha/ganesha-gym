"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { DashboardCommand } from "./dashboard-command";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const DashboardNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const pathParts = pathname.split("/");

  const firstPart = pathParts[1] || "Dashboard";

  return (
    <>
      <DashboardCommand open={isOpen} onOpenChange={setIsOpen} />
      <nav className="flex items-center w-full justify-between px-5 py-3 glass border-0 border-b text-white">
        <div className="flex flex-col">
          {/* Breadcrumb
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-white font-medium" href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              {pathParts.slice(2).map((part, index) => (
                <BreadcrumbItem key={index}>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbPage>{part}</BreadcrumbPage>
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb> */}
          <span className="text-xs text-muted-foreground">
            welcome👋 • Admin
          </span>
        </div>
        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant={"outline"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border glass px-1.5 font-mono text-[10px]">
            <span className="text-xs">ctrl </span>+ k
          </kbd>
        </Button>
      </nav>
    </>
  );
};
