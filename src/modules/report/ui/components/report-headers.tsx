"use client";

import { ReportFilters } from "./report-filters";

export const ReportHeader = () => {

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-xl font-semibold text-white">
            Laporan Check-in/Check-out
          </h1>
          <p className="text-sm text-muted-foreground">
            Analisis aktivitas member dan penggunaan gym
          </p>
        </div>
        
      </div>
      <div className="flex glass flex-col gap-y-5 text-white px-4 py-5 rounded-lg">
        <ReportFilters />
      </div>
    </>
  );
};
