"use client";

import { InfoCard } from "@/components/info-card";
import { CheckinHeaders } from "../components/checkin-header";
import { Calendar, UserCheck, UserPlus, Users } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckInHistory } from "../components/checkin-history";
import { CheckInMember } from "../components/checkin-member";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const CheckInPageView = () => {
  const trpc = useTRPC();

  const allHistoryCheckIn = useSuspenseQuery(
    trpc.checkin.getAllCheckInHistory.queryOptions()
  );

  const hariIni = new Date();

  const checkInHariIni = allHistoryCheckIn.data.filter((data) => {
    const tanggalCheckIn = new Date(data.checkInTime);

    return (
      tanggalCheckIn.getDate() === hariIni.getDate() &&
      tanggalCheckIn.getMonth() === hariIni.getMonth() &&
      tanggalCheckIn.getFullYear() === hariIni.getFullYear()
    );
  });

  const checkOutHariIni = allHistoryCheckIn.data.filter((data) => {
    // Buat objek Date dari waktu checkout di dalam data Anda
    const tanggalCheckOut = new Date(data.checkOutTime ?? "");

    // Bandingkan tanggal, bulan, dan tahun untuk akurasi penuh
    return (
      tanggalCheckOut.getDate() === hariIni.getDate() &&
      tanggalCheckOut.getMonth() === hariIni.getMonth() &&
      tanggalCheckOut.getFullYear() === hariIni.getFullYear()
    );
  });

  return (
    <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
      <CheckinHeaders />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <InfoCard
          title="Total User Check-in"
          value={allHistoryCheckIn.data.length}
          description="Total keseluruhan checkin"
          icon={<Users className="text-blue-500" />}
        />
        <InfoCard
          title="Total User Check-in hari ini"
          value={checkInHariIni.length}
          description="Total Check in hari ini"
          icon={<UserCheck className="text-green-500" />}
        />
        <InfoCard
          title="Total User Check-out hari ini"
          value={checkOutHariIni.length}
          description="Bulan ini"
          icon={<UserPlus className="text-purple-500" />}
        />
      </div>
      <Tabs defaultValue="history">
        <TabsList className="glass mb-2">
          <TabsTrigger className="text-white" value="history">
            <Calendar /> Riwayat Check-In
          </TabsTrigger>
          <TabsTrigger className="text-white" value="member">
            <Users /> Sedang Di GYM
          </TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <div className="flex glass flex-col gap-y-5 text-white px-4 py-5 rounded-lg">
            <CheckInHistory values={allHistoryCheckIn.data} />
          </div>
        </TabsContent>
        <TabsContent value="member">
          <div className="flex flex-col gap-y-5 text-white px-4 py-5 rounded-lg">
            <CheckInMember />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
