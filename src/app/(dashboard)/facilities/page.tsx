import { FacilitiesView } from "@/modules/facility/ui/views/facilities";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const FacilityPage = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.facility.getMany.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p className="text-white">loading...</p>}>
        <FacilitiesView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default FacilityPage;
