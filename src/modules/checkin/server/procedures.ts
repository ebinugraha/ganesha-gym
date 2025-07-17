import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { startOfDay, endOfDay } from "date-fns";
import db from "@/db";
import { and, desc, eq, gte, isNull, lt } from "drizzle-orm";
import { checkIn, user } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constant";

export const checkinRouter = createTRPCRouter({
  checkInUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
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
    .mutation(async ({ input }) => {
      const now = new Date();

      const existingCheckin = await db.query.checkIn.findFirst({
        where: and(eq(checkIn.userId, input.id), isNull(checkIn.checkOutTime)),
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

  // Get today's check-in status
  activeCheckIn: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({}) => {

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
        .where(and(isNull(checkIn.checkOutTime)));
      return userCheckIn;
    }),

  getCheckInHistory: protectedProcedure.query(async ({ ctx }) => {
    const userCheckIn = await db.query.checkIn.findMany({
      where: eq(checkIn.userId, ctx.auth.user.id),
    });

    if (!userCheckIn) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No check-in history found",
      });
    }

    return userCheckIn;
  }),

  getAllCheckInHistory: protectedProcedure.query(async ({ }) => {
    const userCheckIn = await db.query.checkIn.findMany({
      with: {
        user: true,
      },
      limit: 100,
      orderBy: desc(checkIn.checkInTime),
    });

    if (!userCheckIn) {
      throw new TRPCError({        
        code: "NOT_FOUND",
        message: "No check-in history found",
      });
    }

    return userCheckIn;
  }),
});
