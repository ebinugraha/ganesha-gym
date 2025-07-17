import { auth } from "@/lib/auth";
import { CheckInUserView } from "@/modules/checkin-user/ui/views/check-in-user-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const CheckInPageUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.checkInUser.getUserCheckInStatus.queryOptions()
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p className="text-white">Loading...</p>}>
        <CheckInUserView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CheckInPageUser;
