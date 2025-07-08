"use client";
import { DataTable } from "@/components/data-table";
import { Payment, columns } from '../components/columns';
import { FacilitityFilters } from "../components/facility-filters";
import { FacilityHeaders } from "../components/facility-headers";

function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export const FacilitiesView = () => {
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
        <DataTable columns={columns} data={getData()} />
      </div>
    </div>
  );
};
