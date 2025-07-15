import { FacilitiyIdView } from "@/modules/facility/ui/views/facilities-id-view";
import { UserIdView } from "@/modules/users/ui/views/users-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    userId: string;
  }>;
}

const UserIdPage = async ({ params }: Props) => {
  const { userId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.member.getOne.queryOptions({
      id: userId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p className="text-white">Loading...</p>}>
        {/* <FacilitiyIdView facilityId={facilitiesId} /> */}
        <UserIdView userId={userId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default UserIdPage;
