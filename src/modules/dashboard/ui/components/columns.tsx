"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, UserMinus, UserPlus, Users } from "lucide-react";
import { format } from "date-fns";
import { DashboardGetMany } from "../../types";

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "HH.mm");
}

export const columns: ColumnDef<DashboardGetMany>[] = [
  {
    accessorKey: "name",
    header: "Fasilitas",
    cell: ({ row }) => (
      <div className="flex gap-x-4 items-center">
        <div className="flex">
          {row.original.type === "Check-in" ? (
            <UserPlus className="text-green-500" />
          ) : row.original.type === "Membership Extended" ? (
            <Calendar className="text-blue-500" />
          ) : row.original.type === "New Registration" ? (
            <Users className="text-purple-500" />
          ) : (
            <UserMinus className="text-red-500" />
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex text-sm font-bold">
            <span className="flex gap-x-1 items-center">
              {row.original.name}
            </span>
          </div>
          <div className="flex text-sm font-normal text-gray-300">
            <span className="flex gap-x-1 items-center">
              <Clock size={15} /> {formatTime(row.original.time!)}
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex text-xs text-muted-foreground">
        <Badge
          variant={
            row.original.type === "Check-in"
              ? "default"
              : row.original.type === "Check-out"
              ? "destructive"
              : "secondary"
          }
        >
          {row.original.type}
        </Badge>
      </div>
    ),
  },
];
