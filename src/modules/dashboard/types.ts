import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type DashboardGetMany =
  inferRouterOutputs<AppRouter>["dashboard"]["getRecentActivity"][number];