import { auth } from "@/lib/auth";
import { MembershipViews } from "@/modules/membership/ui/views/membership-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const MembershipPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

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
