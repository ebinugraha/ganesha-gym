"use client";

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  ClockAlert,
  Crown,
  DoorOpen,
  UserLock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GenerateAvatar } from "@/components/generate-avatar";
import { Separator } from "@/components/ui/separator";
import { UsersIdHeaders } from "../components/users-id-headers";

interface Props {
  userId: string;
}

export const UserIdView = ({ userId }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.member.getOne.queryOptions({
      id: userId,
    })
  );

  // const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const endDateString = data.memberships?.[0]?.endDate;

  const daysLeft = (() => {
    if (!endDateString) {
      return 0; // Atau "N/A", atau null, sesuai kebutuhan tampilan Anda
    }
    const endDate = new Date(endDateString);
    const today = new Date();

    // Jika sudah kedaluwarsa, tampilkan 0, bukan angka negatif
    if (endDate < today) {
      return 0;
    }

    const timeDiff = endDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  })();

  return (
    <>
      <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
        <UsersIdHeaders role={data.role ?? ""} id={data.id} />
        <div className="flex glass flex-col gap-y-5 text-white px-4 py-4 rounded-lg">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            <div className="flex items-center gap-x-6">
              {!!data.image ? (
                <Avatar>
                  <AvatarImage src={data.image} />
                </Avatar>
              ) : (
                <GenerateAvatar
                  seed={data.name}
                  variant={"shapes"}
                  className="w-6 h-6"
                />
              )}
              <div className="flex flex-col gap-y-2">
                <h2 className="font-medium">{data.name}</h2>
                <h1 className="font-normal text-xs text-gray-400">
                  {data.email}
                </h1>
              </div>
              <Badge
                variant={
                  !!(
                    data.memberships?.[0]?.endDate &&
                    new Date(data.memberships[0].endDate) > new Date()
                  )
                    ? "default"
                    : "destructive"
                }
              >
                {!!(
                  data.memberships?.[0]?.endDate &&
                  new Date(data.memberships[0].endDate) > new Date()
                )
                  ? "Aktif"
                  : "Tidak Aktif"}
              </Badge>
            </div>

            <Separator />

            <div className="flex gap-x-2 items-center text-sm text-gray-300">
              {/* !TODO: nanti di ubah menjadi data asli */}
              <Clock size={15} />{" "}
              <span className="font-bold">Terakhir Check-in</span> : 4 hari yang
              lalu
            </div>
            <div className="flex gap-x-2 items-center text-sm text-gray-300">
              <Calendar size={15} />{" "}
              <span className="font-bold">Tanggal bergabung</span> :{" "}
              {new Date(data.createdAt).toLocaleDateString("id-ID")}
            </div>
            <div className="flex gap-x-2 items-center text-sm text-gray-300">
              <DoorOpen size={15} />{" "}
              <span className="font-bold">Pertemuan</span> : 5 kali
            </div>
            <div className="flex gap-x-2 items-center text-sm text-gray-300">
              <ClockAlert size={15} /> <span className="font-bold">Sisa</span> :{" "}
              {daysLeft} hari lagi
            </div>
            <div className="flex gap-x-2 items-center text-sm text-gray-300">
              <Crown size={15} /> <span className="font-bold">Paket</span> :
              <Badge
                variant={"outline"}
                className="font-bold text-xs"
                style={{
                  color:
                    data.memberships?.[0]?.membershipType?.features.color ??
                    "#9298a4",
                }}
              >
                <Crown
                  style={{
                    color:
                      data.memberships?.[0]?.membershipType?.features.color ??
                      "#9298a4",
                  }}
                />
                {data.memberships?.[0]?.membershipType?.name ?? ""}
              </Badge>
            </div>
            <div className="flex gap-x-2 items-center text-sm text-gray-300">
              <UserLock size={15} /> <span className="font-bold">Role</span> :
              <Badge variant={"purple"}>{data.role ?? ""}</Badge>
            </div>
            {/* <UserCard
                          key={user.id}
                          id={user.id}
                          onClick={(name) => router.push(`/users/${user.id}`)}
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
                          colorTipe={user.memberships?.[0]?.membershipType?.features.color ?? "#9298a4"}
                        /> */}
          </div>
        </div>
      </div>
    </>
  );
};
