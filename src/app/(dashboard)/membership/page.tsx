import { MembershipViews } from "@/modules/membership/ui/views/membership-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const MembershipPage = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.membership.getMany.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p className="text-white">loading...</p>}>
        <MembershipViews />
      </Suspense>
    </HydrationBoundary>
  );
};

export default MembershipPage;
