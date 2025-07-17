import db from "@/db";
import { checkIn, user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { endOfDay, startOfDay } from "date-fns";
import { and, eq, gte, isNull, lt } from "drizzle-orm";

export const checkInUserRouter = createTRPCRouter({
  getUserCheckInStatus: protectedProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);

    const userCheckIn = await db
      .select({
        userId: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        checkInId: checkIn.id,
        checkInTime: checkIn.checkInTime,
      })
      .from(checkIn)
      .innerJoin(user, eq(checkIn.userId, user.id))
      .where(
        and(
          eq(checkIn.userId, ctx.auth.user.id),
          gte(checkIn.checkInTime, todayStart),
          lt(checkIn.checkInTime, todayEnd),
          isNull(checkIn.checkOutTime)
        )
      ).limit(1);
    return userCheckIn;
  }),
});
