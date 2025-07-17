import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type GetUserCheckInStatusTypes =
  inferRouterOutputs<AppRouter>["checkInUser"]["getUserCheckInStatus"][number];
