"use client";

import { Calendar, Package } from "lucide-react";
import { PlanHeaders } from "../components/plan-header";
import { Badge } from "@/components/ui/badge";
import { FormPlan } from "../components/plan-form-paket";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export const ExtendViewPage = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.plan.membershipActive.queryOptions());

  const endDateString = data?.endDate;

  const daysLeft = (() => {
    if (!endDateString) {
      return 0; // Atau "N/A", atau null, sesuai kebutuhan tampilan Anda
    }
    const endDate = new Date(endDateString);
    const today = new Date();

    // Jika sudah kedaluwarsa, tampilkan 0, bukan angka negatif
    if (endDate < today) {
      return 0;
    }

    const timeDiff = endDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  })();

  return (
    <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
      <PlanHeaders />
      <div className="flex glass flex-col gap-y-7 text-white px-4 py-5 rounded-lg">
        <div className="flex gap-x-2 items-center">
          <Calendar size={20} className="text-blue-500" />
          <span>Status Membership Saat Ini</span>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-y-2">
            {data ? (
              <span className="text-sm">Aktif - {daysLeft} hari tersisa</span>
            ) : (
              <span className="text-sm">
                Belum aktif, anda harus memilih paket di bawah
              </span>
            )}

            <span className="text-xs text-muted-foreground">
              {data ? (
                <span>
                  Berakhir pada {new Date(data.endDate).toLocaleDateString()}
                </span>
              ) : (
                <span>
                  Tanggal berakhir akan tampil, jika anda sudah membeli paket
                </span>
              )}
            </span>
          </div>
          <div className="flex gap-x-2">
            <Badge variant={data ? "default" : "destructive"}>
              {data ? "Aktif" : "Tidak Aktif"}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-5 text-white px-4 py-5 rounded-lg">
        <div className="gap-y-1 flex flex-col">
          <div className="flex gap-x-2 items-center">
            <Package size={20} className="text-blue-500" />
            <span>Pilih Paket</span>
          </div>
          <span className="text-gray-300 text-sm">
            Pilih durasi membership yang ingin Anda perpanjang
          </span>
        </div>

        {/* Form Pilih */}
        <FormPlan id={data?.id} />
      </div>
    </div>
  );
};
