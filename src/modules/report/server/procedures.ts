import db from "@/db";
import { checkIn, payments, user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, eq, gte, ilike, isNotNull, sql } from "drizzle-orm";
import { z } from "zod";

export const ReportRouter = createTRPCRouter({
  getRecentActivity: protectedProcedure
    .input(z.object({ search: z.string().nullish() }))
    .query(async ({ input }) => {
      const actualInput = input || {};

      const { search } = {
        search: actualInput.search,
      };

      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const checkIns = await db
        .select({
          name: user.name,
          time: checkIn.checkInTime,
          type: sql<string>`'Check-in'`,
          value: sql<string>`'None'`,
        })
        .from(checkIn)
        .innerJoin(user, eq(checkIn.userId, user.id))
        .where(
          and(
            gte(checkIn.checkInTime, twentyFourHoursAgo),
            search ? ilike(user.name, `%${search}%`) : undefined
          )
        )
        .execute();

      // 2. Aktivitas Check-out
      const checkOuts = await db
        .select({
          name: user.name,
          time: checkIn.checkOutTime,
          type: sql<string>`'Check-out'`,
          value: sql<string>`'None'`,
        })
        .from(checkIn)
        .innerJoin(user, eq(checkIn.userId, user.id))
        .where(
          and(
            gte(checkIn.checkOutTime, twentyFourHoursAgo),
            isNotNull(checkIn.checkOutTime),
            search ? ilike(user.name, `%${search}%`) : undefined
          )
        )
        .execute();

      const membershipExtensions = await db
        .select({
          name: user.name,
          time: payments.paymentDate,
          type: sql<string>`'Membership Extended'`,
          value: payments.amount,
        })
        .from(payments)
        .innerJoin(user, eq(payments.userId, user.id))
        .where(
          and(
            eq(payments.paymentStatus, "Success"),
            gte(payments.paymentDate, twentyFourHoursAgo),
            search ? ilike(user.name, `%${search}%`) : undefined,
          )
        )
        .execute();

      // 4. Aktivitas Registrasi Baru
      const newRegistrations = await db
        .select({
          name: user.name,
          time: user.createdAt,
          type: sql<string>`'New Registration'`,
          value: user.banned,
        })
        .from(user)
        .where(
          and(
            gte(user.createdAt, twentyFourHoursAgo),
            search ? ilike(user.name, `%${search}%`) : undefined
          )
        )
        .execute();

      const activities = [
        ...checkIns,
        ...checkOuts,
        ...membershipExtensions,
        ...newRegistrations,
      ];

      return activities;
    }),
});
