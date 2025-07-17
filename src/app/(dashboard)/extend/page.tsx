import { auth } from "@/lib/auth";
import { ExtendViewPage } from "@/modules/plan/ui/views/extend-view-page";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const ExtendPage = async () => {
  const queryCliet = getQueryClient();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session){
    redirect('/sign-in')
  }

  void queryCliet.prefetchQuery(
    trpc.plan.membershipActive.queryOptions()
  );

  return (
    <HydrationBoundary state={dehydrate(queryCliet)}>
      <Suspense fallback={<p className="text-white">Loading...</p>}>
        <ExtendViewPage />;
      </Suspense>
    </HydrationBoundary>
  );
};

export default ExtendPage;
