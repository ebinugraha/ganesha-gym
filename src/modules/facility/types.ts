import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type FacilityGetMany =
  inferRouterOutputs<AppRouter>["facility"]["getMany"]['items'];