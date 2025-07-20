"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DashboardHeaders } from "../components/dashboard-header";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";

export const DashboardView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.dashboard.getRecentActivity.queryOptions()
  );

  return (
    <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
      <DashboardHeaders />
      <div className="flex glass flex-col gap-y-5 text-white px-4 py-5 rounded-lg">
        <div className="flex flex-col gap-y-1">
          <h2 className="text-sm font-semibold">Aktifitas terbaru</h2>
          <p className="text-xs text-muted-foreground">
            Lihat semua aktifitas terbaru
          </p>
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};
