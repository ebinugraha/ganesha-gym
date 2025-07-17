import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type CheckInToday =
  inferRouterOutputs<AppRouter>["checkin"]["activeCheckIn"][number];
export type CheckInHistory =
  inferRouterOutputs<AppRouter>["checkin"]["getCheckInHistory"][number];
export type GetAllCheckInHistory =
  inferRouterOutputs<AppRouter>["checkin"]["getAllCheckInHistory"][number];
