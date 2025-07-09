"use client";

import { useTRPC } from "@/trpc/client";
import { MembershipCard } from "../components/membership-card";
import { FiltersMembership } from "../components/membership-filters";
import { MembershipHeaders } from "../components/membership-headers";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MembershipViews = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.membership.getMany.queryOptions({}));

  return (
    <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
      {/* Headers */}
      <MembershipHeaders />
      {/* Content */}
      <FiltersMembership />
      <div className="grid grid-cols-3 gap-4">
        {data.items.map((item) => (
          <MembershipCard
            key={item.id}
            name={item.name}
            description={item.description}
            isActive={item.active}
            priority={1}
            price={item.price}
            benefits={item.features.benefits ? item.features.benefits : []}
            facilities={item.facilties.map(
              (facility) => facility.facility.name
            )}
            color={item.features.color ?? "#fafafa"}
          />
        ))}
      </div>
    </div>
  );
};
