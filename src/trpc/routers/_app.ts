
import { createTRPCRouter } from "../init";
import { memberRouter } from "@/modules/users/server/procedures";
import { facilityRouter } from "@/modules/facility/server/procedures";
import { membershipRouter } from "@/modules/membership/server/procedures";
import { checkinRouter } from "@/modules/checkin/server/procedures";
import { checkInUserRouter } from "@/modules/checkin-user/server/procedures";
import { planRouter } from "@/modules/plan/server/procedures";
import { dashboardRouter } from "@/modules/dashboard/server/procedures";
export const appRouter = createTRPCRouter({
  member: memberRouter,
  facility: facilityRouter,
  membership: membershipRouter,
  checkin: checkinRouter,
  checkInUser: checkInUserRouter,
  plan: planRouter,
  dashboard: dashboardRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
