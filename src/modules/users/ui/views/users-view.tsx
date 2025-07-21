"use client";

import { InfoCard } from "@/components/info-card";
import { UserCheck, UserPlus, Users } from "lucide-react";

import { UserCard } from "../components/users-card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUsersFilters } from "../../hooks/use-users-filter";

export const UsersView = () => {
  const trpc = useTRPC();
  const router = useRouter();

  const [filters] = useUsersFilters();

  const { data } = useSuspenseQuery(
    trpc.member.getMany.queryOptions({
      ...filters,
    })
  );

  const getTotalLength = () => {
    return data?.length;
  };

  const getTotalAktif = data?.map((user) => {
    return !!(
      user.memberships?.[0]?.endDate &&
      new Date(user.memberships[0].endDate) > new Date()
    );
  });

  return (
    <>
      {/* Users header */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard
          title="Total Member"
          value={getTotalLength() ?? 0}
          description="Ini adalah total member dari keseluruhan"
          icon={<Users className="text-blue-500" />}
        />
        <InfoCard
          title="Member Aktif"
          value={getTotalAktif?.filter((item) => item === true).length ?? 0}
          description="Member aktif GYM"
          icon={<UserCheck className="text-green-500" />}
        />
        <InfoCard
          title="Member Non Aktif"
          value={getTotalAktif?.filter((item) => item === false).length ?? 0}
          description="Member Non Aktif GYM"
          icon={<UserPlus className="text-purple-500" />}
        />
      </div>

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
              user.memberships?.[0]?.membershipType?.features.color ?? "#9298a4"
            }
          />
        ))}
      </div>
    </>
  );
};
