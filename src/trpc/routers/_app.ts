import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { memberRouter } from "@/modules/users/server/procedures";
import { facilityRouter } from "@/modules/facility/server/procedures";
import { membershipRouter } from "@/modules/membership/server/procedures";
export const appRouter = createTRPCRouter({
  member: memberRouter,
  facility: facilityRouter,
  membership: membershipRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
