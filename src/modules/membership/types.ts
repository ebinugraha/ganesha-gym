import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export interface Features {
  benefits: string[];
  color?: string;
}

export type MembershipGetMany =
  inferRouterOutputs<AppRouter>["membership"]["getMany"];
export type MembershipGetOne =
  inferRouterOutputs<AppRouter>["membership"]["getOne"]
