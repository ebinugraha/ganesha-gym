import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { useState } from "react";
import { set } from "zod";

export const PlanHeaders = () => {

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-xl font-semibold text-white">
            Perpanjang Membership
          </h1>
          <p className="text-sm text-muted-foreground">
            Pilih paket membership yang sesuai dengan kebutuhan Anda
          </p>
        </div>
      </div>
    </>
  );
};
