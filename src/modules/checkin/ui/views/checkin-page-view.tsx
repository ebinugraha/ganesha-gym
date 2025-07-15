"use client";

import { InfoCard } from "@/components/info-card";
import { CheckinHeaders } from "../components/checkin-header";
import { UserCheck, UserPlus, Users } from "lucide-react";

export const CheckInPageView = () => {
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
      <div className="flex glass flex-col gap-y-5 text-white px-4 py-5 rounded-lg"></div>
    </div>
  );
};
