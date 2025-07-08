"use client";

import { MembershipCard } from "../components/membership-card";
import { FiltersMembership } from "../components/membership-filters";
import { MembershipHeaders } from "../components/membership-headers";

export const MembershipViews = () => {
  return (
    <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
      {/* Headers */}
      <MembershipHeaders />
      {/* Content */}
      <FiltersMembership />
      <div className="grid grid-cols-3 gap-4">
        <MembershipCard
          name="Basic"
          priority={1}
          description="Akses dasar ke fasilitas gym"
          isActive={true}
          price="800000"
          benefits={["Akses gym dasar", "Loker", "Shower"]}
          facilities={["Treadmil", "Weight Training zone"]}
          color="blue"
        />
        <MembershipCard
          name="Basic"
          priority={1}
          description="Akses dasar ke fasilitas gym"
          isActive={true}
          price="800000"
          benefits={["Akses gym dasar", "Loker", "Shower",  ]}
          facilities={["Treadmil", "Weight Training zone"]}
          color="blue"
        />
        <MembershipCard
          name="Basic"
          priority={1}
          description="Akses dasar ke fasilitas gym"
          isActive={true}
          price="800000"
          benefits={["Akses gym dasar", "Loker", "Shower"]}
          facilities={["Treadmil", "Weight Training zone"]}
          color="blue"
        />
      </div>
    </div>
  );
};
