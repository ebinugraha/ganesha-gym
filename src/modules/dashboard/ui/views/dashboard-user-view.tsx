"use client";

import { CreditCard } from "lucide-react";
import { DashboardHeadersUser } from "../components/dashboard-header-user";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const DashboardUserView = () => {
  const trpc = useTRPC();

  const { data } = useQuery(
    trpc.plan.membershipActive.queryOptions()
  );

  console.log(data);

  return (
    <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
      <DashboardHeadersUser />
      <div className="flex glass flex-col gap-y-5 text-white px-4 py-5 rounded-lg">
        <div className="flex flex-col gap-y-1">
          <h2 className="text-sm font-semibold flex items-center gap-x-2">
            <CreditCard className="text-purple-500" size={20} /> Status
            Membership
          </h2>
          <p className="text-xs text-muted-foreground">
            Lihat semua aktifitas terbaru
          </p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <Badge variant={!!data ? "default" : "destructive"}>{!!data ? "Aktif" : "Tidak Aktif"}</Badge>
          <Button asChild variant={"green"}>
            <Link href="/extend">Pilih Plan</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
