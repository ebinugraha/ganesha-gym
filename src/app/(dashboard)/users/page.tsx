import { UsersView } from "@/modules/users/ui/views/users-view";
import { getQueryClient } from "@/trpc/server";
import { trpc } from "../../../trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const UsersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  // prefetchUsers
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.member.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p className="text-white">loading...</p>}>
        <UsersView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default UsersPage;
