import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { useState } from "react";
import { set } from "zod";

export const CheckInUserHeaders = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-xl font-semibold text-white">
            Check-in / Check-Out
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola aktivitas gym Anda dengan mudah
          </p>
        </div>
      </div>
    </>
  );
};
