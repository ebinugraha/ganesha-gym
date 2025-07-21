"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FiltersUsers } from "./users-filters";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const UsersHeaders = () => {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.member.getMany.queryOptions({}));

  const exportMembershipData = () => {
    if (!data) return;

    // 1. Buat header CSV
    const headers = [
      "ID",
      "Nama",
      "Email",
      "Nomor Telepon",
      "Tipe Membership",
      "Tanggal Mulai",
      "Tanggal Dibuat",
      "Tanggal Diperbarui",
    ];

    // 2. Format data dengan benar
    const csvData = data.map((item) => {
      // Handle kemungkinan tidak ada membership
      const membership = item.memberships[0] || {};
      const membershipType = membership.membershipType || {};

      // Format setiap field untuk CSV
      return [
        formatCsvField(item.id),
        formatCsvField(item.name),
        formatCsvField(item.email),
        formatCsvField(item.phoneNumber),
        formatCsvField(membershipType.name),
        formatDateField(membership.startDate),
        formatDateField(item.createdAt),
        formatDateField(item.updatedAt),
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
    a.download = `members-data-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();

    // 5. Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);

    // Helper functions
    function formatCsvField(value: string | number | null | undefined) {
      if (value === null || value === undefined) return "";

      // Konversi ke string
      let str = String(value);

      // Handle karakter khusus
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        // Escape double quotes
        str = str.replace(/"/g, '""');
        // Wrap in quotes
        return `"${str}"`;
      }

      return str;
    }

    function formatDateField(date: Date | string | undefined) {
      if (!date) return "";

      const d = new Date(date);

      // Format: DD/MM/YYYY HH:mm
      const pad = (num: number) => num.toString().padStart(2, "0");
      return `${pad(d.getDate())}/${pad(
        d.getMonth() + 1
      )}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-xl font-semibold text-white">Manajemen Member</h1>
          <p className="text-sm text-muted-foreground">
            Kelola dan pantau aktivitas member gym
          </p>
        </div>
        <Button size={"sm"} variant={"glass"} onClick={exportMembershipData}>
          <Download className="mr-2" />
          Export
        </Button>
      </div>
      <FiltersUsers />
    </>
  );
};
