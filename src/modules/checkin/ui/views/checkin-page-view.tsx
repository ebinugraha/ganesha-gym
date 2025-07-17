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

  const trpc = useTRPC()

  const allHistoryCheckIn = useSuspenseQuery(trpc.checkin.getAllCheckInHistory.queryOptions())

  return (
    <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
      <CheckinHeaders />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <InfoCard
          title="Total Member"
          value="156"
          description="+12% dari bulan lalu"
          icon={<Users className="text-blue-500" />}
        />
        <InfoCard
          title="Member Aktif"
          value="142"
          description="91% dari total member"
          icon={<UserCheck className="text-green-500" />}
        />
        <InfoCard
          title="Total Member"
          value="23"
          description="Bulan ini"
          icon={<UserPlus className="text-purple-500" />}
        />
        <InfoCard
          title="Total Member"
          value="23"
          description="Bulan ini"
          icon={<UserPlus className="text-purple-500" />}
        />
      </div>
      <Tabs defaultValue="history">
        <TabsList className="glass mb-2">
          <TabsTrigger className="text-white" value="history">
            <Calendar/> Riwayat Check-In
          </TabsTrigger>
          <TabsTrigger className="text-white" value="member">
            <Users/> Sedang Di GYM
          </TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <div className="flex glass flex-col gap-y-5 text-white px-4 py-5 rounded-lg">
            <CheckInHistory values={allHistoryCheckIn.data}/>
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
