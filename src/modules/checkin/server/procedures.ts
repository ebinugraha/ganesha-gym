import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { startOfDay, endOfDay, subDays } from "date-fns";
import db from "@/db";
import { and, eq, gte, isNull, lt } from "drizzle-orm";
import { checkIn } from "@/db/schema";
import { TRPCError } from "@trpc/server";

export const checkinRouter = createTRPCRouter({
  checkIn: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const now = new Date();

      const todayStart = startOfDay(now);
      const todayEnd = endOfDay(now);

      const existingCheckin = await db.query.checkIn.findFirst({
        where: and(
          eq(checkIn.userId, input.id),
          gte(checkIn.checkInTime, todayStart),
          lt(checkIn.checkInTime, todayEnd),
          isNull(checkIn.checkOutTime)
        ),
      });

      if (existingCheckin) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You already checked in today",
        });
      }

      const [newCheckIn] = await db
        .insert(checkIn)
        .values({
          userId: input.id,
          checkInTime: now,
        })
        .returning();

      return newCheckIn;
    }),

  checkOut: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const now = new Date();
      const todayStart = startOfDay(now);
      const todayEnd = endOfDay(now);

      const existingCheckin = await db.query.checkIn.findFirst({
        where: and(
          eq(checkIn.userId, input.id),
          gte(checkIn.checkInTime, todayStart),
          lt(checkIn.checkInTime, todayEnd),
          isNull(checkIn.checkOutTime)
        ),
      });

      if (!existingCheckin) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You haven't checked in today",
        });
      }

      // Update check-out time
      const [updatedCheckIn] = await db
        .update(checkIn)
        .set({ checkOutTime: now })
        .where(eq(checkIn.id, existingCheckin.id))
        .returning();

      return updatedCheckIn;
    }),
});
