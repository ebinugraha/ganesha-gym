"use client";

import { useTRPC } from "@/trpc/client";
import { MembershipCard } from "../components/membership-card";
import { MembershipHeaders } from "../components/membership-headers";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { MembershipUpdateDialog } from "../components/membership-update-dialog";
import { useState } from "react";

export const MembershipViews = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(trpc.membership.getMany.queryOptions({}));

  const [isOpenMembershipUpdateDialog, setIsOpenMembershipUpdateDialog] =
    useState(false);

  const [membershipId, setMembershipId] = useState("");

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Apakah anda yakin?",
    `Melakukan hapus membership, akan menghapus seluruh anggota yang memiliki membership ini`
  );

  const remove = useMutation(
    trpc.membership.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.membership.getMany.queryOptions({})
        );
        toast.success("Membership berhasil dihapus");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemove = async (id: string) => {
    const ok = await confirmRemove();

    if (!ok) return;

    await remove.mutateAsync({ id });
  };

  const handleUpdate = (id: string) => {
    setIsOpenMembershipUpdateDialog(true);
    setMembershipId(id);
  };

  return (
    <>
      <RemoveConfirmation />
      <MembershipUpdateDialog
        onOpenChange={setIsOpenMembershipUpdateDialog}
        open={isOpenMembershipUpdateDialog}
        id={membershipId}
      />
      <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
        {/* Headers */}
        <MembershipHeaders data={data} />
        <div className="grid grid-cols-3 gap-4">
          {data.items.map((item) => (
            <MembershipCard
              key={item.id}
              id={item.id}
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
              onRemove={handleRemove}
              onEdit={handleUpdate}
            />
          ))}
        </div>
      </div>
    </>
  );
};
