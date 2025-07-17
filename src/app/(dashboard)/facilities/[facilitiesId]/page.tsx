import { auth } from "@/lib/auth";
import { FacilitiyIdView } from "@/modules/facility/ui/views/facilities-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    facilitiesId: string;
  }>;
}

const FacilitiesIdPage = async ({ params }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { facilitiesId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.facility.getOne.queryOptions({
      id: facilitiesId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p className="text-white">Loading...</p>}>
        <FacilitiyIdView facilityId={facilitiesId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default FacilitiesIdPage;
