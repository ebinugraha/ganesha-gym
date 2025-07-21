"use client";

import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { FacilityNewDialog } from "./facility-new-dialog";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export const FacilityHeaders = () => {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.facility.getMany.queryOptions({}));

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleExportFacilities = () => {
    if (!data || !data.items || data.items.length === 0) return;

    // 1. Siapkan header CSV
    const headers = [
      "ID Fasilitas",
      "Nama Fasilitas",
      "Kategori",
      "Deskripsi",
      "Tanggal Dibuat",
      "Tanggal Diperbarui",
      "Tipe Membership",
      "ID Tipe Membership",
      "Durasi (hari)",
      "Harga",
      "Status Aktif",
      "Fitur",
      "Tanggal Dibuat Membership",
      "Tanggal Diperbarui Membership",
    ];

    // 2. Format data untuk CSV
    const csvData = data.items.flatMap((facility) => {
      // If facility has no membership types, return a single row for the facility itself
      const baseRow = [
        formatCsvField(facility.id),
        formatCsvField(facility.name),
        formatCsvField(facility.category),
        formatCsvField(facility.description),
        formatDate(facility.createdAt),
        formatDate(facility.updatedAt),
      ];

      if (facility.membershipTypes.length === 0) {
        return [baseRow.concat(["", "", "", "", "", "", "", ""])]; // Add empty fields for membership type details
      }

      // Untuk setiap membership type dalam facility
      return facility.membershipTypes.map((mt) => {
        const membershipType = mt.membershipType;

        return [
          facility.id,
          formatCsvField(facility.name),
          formatCsvField(facility.category),
          formatCsvField(facility.description),
          formatDate(facility.createdAt),
          formatDate(facility.updatedAt),
          formatCsvField(membershipType.name),
          formatCsvField(membershipType.id),
          formatCsvField(membershipType.duration),
          formatCsvField(membershipType.price),
          membershipType.active ? "Aktif" : "Nonaktif",
          formatCsvField(membershipType.features.benefits.join("; ")),
          formatDate(mt.createdAt),
          formatDate(mt.updatedAt),
        ];
      });
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
    a.download = `facilities-export-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();

    // 5. Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  // Helper function untuk format field
  function formatCsvField(value: string | number | null | undefined) {
    if (value === null || value === undefined) return "";

    // Konversi ke string
    let str = String(value);

    // Handle karakter khusus
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      str = str.replace(/"/g, '""'); // Escape double quotes
      return `"${str}"`; // Wrap in quotes
    }

    return str;
  }

  // Helper function untuk format tanggal
  function formatDate(dateString: string | null | undefined) {
    if (!dateString) return "";

    const date = new Date(dateString);
    const pad = (num: number) => num.toString().padStart(2, "0");

    return `${pad(date.getDate())}/${pad(
      date.getMonth() + 1
    )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  return (
    <>
      <FacilityNewDialog onOpenChange={setIsDialogOpen} open={isDialogOpen} />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-xl font-semibold text-white">
            Manajemen Fasilitas
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola fasilitas gym, membership types, dan monitor penggunaan
            secara real-time
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <Button size={"sm"} variant={"glass"} onClick={handleExportFacilities}>
            <Download className="mr-2" />
            Export
          </Button>
          <Button
            size={"sm"}
            onClick={() => setIsDialogOpen((open) => !open)}
            className="font-normal transition-colors duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            <Plus />
            Tambah Fasilitas
          </Button>
        </div>
      </div>
    </>
  );
};
