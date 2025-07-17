import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Users } from "lucide-react";
import { CheckInUserCard } from "./checkin-user-card";
import { toast } from "sonner";

export const CheckInMember = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.checkin.activeCheckIn.queryOptions({})
  );

  const checkOut = useMutation(
    trpc.checkin.checkOut.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.checkin.activeCheckIn.queryOptions({})
        );
        toast.success(`Checkout berhasil`);
      },
    })
  );

  const handleCheckout = (id: string) => {
    checkOut.mutate({ id });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          <Users className="text-blue-500" />
          <span className="text-xl">Member Sedang di Gym</span>
        </div>
        <span className="text-sm text-gray-400">
          Monitor dan kelola aktivitas member secara real-time
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {data.map((user) => (
          <CheckInUserCard
            key={user.userId}
            values={user}
            onClick={(id) => handleCheckout(id)}
          />
        ))}
      </div>
    </div>
  );
};
