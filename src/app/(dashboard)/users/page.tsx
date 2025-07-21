import { UsersView } from "@/modules/users/ui/views/users-view";
import { getQueryClient } from "@/trpc/server";
import { trpc } from "../../../trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { loadsearchParams } from "@/modules/users/search-params";
import { UsersHeaders } from "@/modules/users/ui/components/users-headers";

interface UsersProps {
  searchParams: Promise<SearchParams>;
}

const UsersPage = async ({ searchParams }: UsersProps) => {
  const filters = await loadsearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  // prefetchUsers
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.member.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <>
      <div className="flex-1 flex-col flex text-white pb-4 py-5 px-4 md:px-8 gap-y-4">
        <UsersHeaders />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<p className="text-white">loading...</p>}>
            <UsersView />
          </Suspense>
        </HydrationBoundary>
      </div>
    </>
  );
};

export default UsersPage;
