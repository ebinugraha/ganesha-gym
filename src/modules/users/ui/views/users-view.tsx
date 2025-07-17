"use client";

import { InfoCard } from "@/components/info-card";
import { UsersHeaders } from "../components/users-headers";
import { UserCheck, UserPlus, Users } from "lucide-react";

import { UserCard } from "../components/users-card";
import { FiltersUsers } from "../components/users-filters";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const UsersView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const { data } = useSuspenseQuery(trpc.member.getMany.queryOptions());

  return (
    <>
      <div className="flex-1 flex-col flex text-white pb-4 py-5 px-4 md:px-8 gap-y-4">
        {/* Users header */}
        <UsersHeaders />
        {/* Users Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
        {/* Users Filters */}
        <FiltersUsers />
        {/* Users Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              onClick={() => router.push(`/users/${user.id}`)}
              name={user.name}
              active={
                !!(
                  user.memberships?.[0]?.endDate &&
                  new Date(user.memberships[0].endDate) > new Date()
                )
              }
              email={user.email}
              phoneNumber={user.phoneNumber ?? ""}
              tanggalBergabung={new Date(user.createdAt).toLocaleDateString(
                "id-ID"
              )}
              tipe={user.memberships?.[0]?.membershipType?.name ?? ""}
              totalPertemuan={5}
              terakhirCheckIn={"4 hari"}
              role={user.role ?? ""}
              colorTipe={
                user.memberships?.[0]?.membershipType?.features.color ??
                "#9298a4"
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};
