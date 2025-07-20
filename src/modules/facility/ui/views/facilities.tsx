"use client";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { FacilitityFilters } from "../components/facility-filters";
import { FacilityHeaders } from "../components/facility-headers";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";

export const FacilitiesView = () => {

  const router = useRouter()

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.facility.getMany.queryOptions({}));

  return (
    <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
      <FacilityHeaders />
      <div className="flex glass flex-col gap-y-5 text-white px-4 py-5 rounded-lg">
        <div className="flex flex-col gap-y-1">
          <h2 className="text-sm font-semibold">Daftar Fasilitas</h2>
          <p className="text-xs text-muted-foreground">
            Kelola semua fasilitas gym
          </p>
        </div>
        <FacilitityFilters />
        <DataTable columns={columns} data={data.items} onRowClick={(row) => router.push(`/facilities/${row.id}`)}/>
      </div>
    </div>
  );
};
