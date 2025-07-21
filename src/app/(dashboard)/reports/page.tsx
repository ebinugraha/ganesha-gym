"use server";

import { auth } from "@/lib/auth";
import { loadsearchParams } from "@/modules/report/search-params";
import { ReportHeader } from "@/modules/report/ui/components/report-headers";
import { ReportView } from "@/modules/report/ui/views/report-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

interface ReportProps {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: ReportProps) => {
  const filters = await loadsearchParams(searchParams);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.report.getRecentActivity.queryOptions({
      ...filters
    })
  );

  return (
    <div className="flex-1 flex-col flex text-white py-5 px-4 md:px-8 gap-y-5">
      <ReportHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
          <ReportView />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default Page;
