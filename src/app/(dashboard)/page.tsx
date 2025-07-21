import { auth } from "@/lib/auth";
import { DashboardUserView } from "@/modules/dashboard/ui/views/dashboard-user-view";
import { DashboardView } from "@/modules/dashboard/ui/views/dashboard-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const UserPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.dashboard.getRecentActivity.queryOptions()
  );

  if (session.user.role === "user") {
    return (
      <div>
        <DashboardUserView />
      </div>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <DashboardView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default UserPage;
