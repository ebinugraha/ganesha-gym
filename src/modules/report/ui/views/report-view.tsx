"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "@/modules/dashboard/ui/components/columns";
import { DataTable } from "@/components/data-table";
import { useReportFilters } from "../../hooks/user-report-filters";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const ReportView = () => {
  const trpc = useTRPC();

  const [filters] = useReportFilters();

  const { data } = useSuspenseQuery(
    trpc.report.getRecentActivity.queryOptions({
      ...filters,
    })
  );

  const handleExportData = () => {
    if (!data || data.length === 0) return;

    // 1. Buat header CSV
    const headers = ["Name", "Value", "Type", "Time"];

    // 2. Format data untuk CSV
    const csvData = data.map((item) => {
      // Format value berdasarkan tipe data
      let formattedValue = "";

      if (item.value === null) {
        formattedValue = "null";
      } else if (typeof item.value === "boolean") {
        formattedValue = item.value ? "true" : "false";
      } else {
        formattedValue = String(item.value);
      }

      return [
        formatCsvField(item.name),
        formatCsvField(formattedValue),
        formatCsvField(item.type),
        item.time ? formatDateField(item.time) : "N/A",
      ];
    });

    // 3. Gabungkan header dan data
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    // 4. Buat dan download file
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-export-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();

    // 5. Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  // Helper function untuk format CSV field
  const formatCsvField = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined) return "";

    const str = String(value);

    // Handle karakter khusus
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }

    return str;
  };

  // Helper function untuk format timestamp
  const formatDateField = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);

      // Validasi tanggal
      if (isNaN(date.getTime())) return "Invalid Date";

      // Format: YYYY-MM-DD HH:mm:ss
      const pad = (num: number) => num.toString().padStart(2, "0");
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
      )}`;
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <>
      <div className="flex glass flex-col gap-y-5 text-white px-4 py-5 rounded-lg">
        <div className="flex items-center gap-x-2">
          <Button size={"sm"} variant={"green"} onClick={handleExportData}>
            <Download className="mr-2" />
            Export CSV
          </Button>
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
};
