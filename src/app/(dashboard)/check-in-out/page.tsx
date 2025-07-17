import { auth } from "@/lib/auth";
import { CheckInPageView } from "@/modules/checkin/ui/views/checkin-page-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const CheckInPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  
  void Promise.all([
    queryClient.prefetchQuery(trpc.checkin.activeCheckIn.queryOptions({})),
    queryClient.prefetchQuery(trpc.checkin.getAllCheckInHistory.queryOptions()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p className="text-white">Loading...</p>}>
        <CheckInPageView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CheckInPage;

// import { FacilitiesView } from "@/modules/facility/ui/views/facilities";
// import { getQueryClient, trpc } from "@/trpc/server";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { Suspense } from "react";

// const FacilityPage = () => {
//   const queryClient = getQueryClient();

//   void queryClient.prefetchQuery(trpc.facility.getMany.queryOptions({}));

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Suspense fallback={<p className="text-white">loading...</p>}>
//         <FacilitiesView />
//       </Suspense>
//     </HydrationBoundary>
//   );
// };

// export default FacilityPage;
