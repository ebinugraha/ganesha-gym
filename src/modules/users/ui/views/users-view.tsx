"use client";

import { InfoCard } from "@/components/info-card";
import { UsersHeaders } from "../components/users-headers";
import { SearchIcon, UserCheck, UserPlus, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserCard } from "../components/users-card";
import { FiltersUsers } from "../components/users-filters";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const UsersView = () => {
  const trpc = useTRPC();
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
              name={user.name}
              active={user.banned ? false : true}
              email={user.email}
              tipe={"VIP"}
              phoneNumber={user.phoneNumber ?? ""}
              // buat format tanggal bergabung 19-03-2023
              membership="Bulanan"
              tanggalBergabung={new Date(user.createdAt).toLocaleDateString(
                "id-ID"
              )}
              totalPertemuan={5}
              lokasi={"Bandung"}
              terakhirCheckIn={"4 hari"}
            />
          ))}
        </div>
      </div>
    </>
  );
};
