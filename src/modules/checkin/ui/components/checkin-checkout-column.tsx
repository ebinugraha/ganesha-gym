"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar, Clock, Crown } from "lucide-react";
import { CheckInHistory, GetAllCheckInHistory } from "../../../checkin/types";
import { format } from "date-fns";

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "HH.mm");
}

export const columns: ColumnDef<GetAllCheckInHistory>[] = [
  {
    accessorKey: "name",
    header: "Fasilitas",
    cell: ({ row }) => (
      <div className="flex gap-x-4 items-center">
        <div className="flex">
          <Activity className="text-blue-500" />
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex text-sm font-bold">
            <span className="flex gap-x-1 items-center">
              {row.original.user.name}
            </span>
          </div>
          <div className="flex text-sm font-normal text-gray-300">
            <span className="flex gap-x-1 items-center">
              <Clock size={15} /> {formatTime(row.original.checkInTime)}
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
        <Badge>Check-in</Badge>
      </div>
    ),
  },
];
