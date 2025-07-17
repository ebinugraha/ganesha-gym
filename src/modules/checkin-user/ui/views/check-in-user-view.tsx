"use client";

import { useTRPC } from "@/trpc/client";
import { CheckInStatusUser } from "../components/check-in-status";
import { CheckInUserHeaders } from "../components/check-in-user-headers";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { DataTable } from "@/components/data-table";
import { columns } from "@/modules/checkin-user/ui/components/checkin-column";

export const CheckInUserView = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.checkInUser.getUserCheckInStatus.queryOptions()
  );

  const checkout = useMutation(
    trpc.checkin.checkOut.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries();
        toast.success(`Checkout berhasil`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleCheckout = (id: string) => {
    checkout.mutateAsync({ id });
  };

  const { data: checkInHistory } = useQuery(
    trpc.checkin.getCheckInHistory.queryOptions()
  );

  return (
    <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
      <CheckInUserHeaders />
      {/* Status saat ini */}
      <CheckInStatusUser
        onCheckin={() => {}}
        values={data[0]}
        onCheckout={() => handleCheckout(data[0].userId)}
      />
      {/* !TODO Card Info */}

      {/* !TODO History */}
      {!!checkInHistory && (
        <div className="flex glass flex-col gap-y-5 text-white p-5 rounded-lg">
          <DataTable columns={columns} data={checkInHistory} />
        </div>
      )}
    </div>
  );
};
