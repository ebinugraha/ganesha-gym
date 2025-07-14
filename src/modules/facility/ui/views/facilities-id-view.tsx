"use client";

import { useTRPC } from "@/trpc/client";
import { FacilityIdHeaders } from "../components/facility-id-headers";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { category } from "../components/columns";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FacilityUpdateDialog } from "../components/facility-update-dialog";

interface Props {
  facilityId: string;
}

export const FacilitiyIdView = ({ facilityId }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.facility.getOne.queryOptions({
      id: facilityId,
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Apakah anda yakin?",
    `Fasilitas ini akan dihapus dari daftar`
  );

  const remove = useMutation(
    trpc.facility.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.membership.getMany.queryOptions({})
        );
        toast.success("Membership berhasil dihapus");
        router.push("/facilities");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemove = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await remove.mutateAsync({ id: facilityId });
  };

  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  return (
    <>
      <FacilityUpdateDialog
        onOpenChange={setUpdateAgentDialogOpen}
        open={updateAgentDialogOpen}
        initials={data}
      />
      <RemoveConfirmation />
      <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
        <FacilityIdHeaders
          onRemove={handleRemove}
          onEdit={() => setUpdateAgentDialogOpen(true)}
        />
        <div className="flex glass flex-col gap-y-5 text-white px-4 py-5 rounded-lg">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            <div className="flex items-center gap-x-6">
              <Image
                src={!!data.image ? data.image : "/placeholder_image.svg"}
                alt="Image placeholder"
                width={80}
                height={80}
                className="rounded-md"
              />
              <div className="flex flex-col gap-y-2">
                <h2 className="font-medium">{data.name}</h2>
                <h1 className="font-normal text-xs text-gray-400">
                  {data.description}
                </h1>
              </div>
              <Badge className={cn("text-white", category[data.category])}>
                {data.category}
              </Badge>
            </div>
            <div className="flex gap-x-2 items-center">
              {data.membershipTypes.map((type) => (
                <Badge
                  variant={"outline"}
                  key={type.id}
                  className="font-bold text-xs"
                  style={{
                    color: type.membershipType.features.color,
                  }}
                >
                  <Crown
                    style={{
                      color: type.membershipType.features.color,
                    }}
                  />
                  {type.membershipType.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
