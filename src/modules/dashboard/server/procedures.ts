import db from "@/db";
import { checkIn, payments, user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, eq, gte, isNotNull, sql } from "drizzle-orm";

export const dashboardRouter = createTRPCRouter({
  getRecentActivity: protectedProcedure.query(async () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const checkIns = await db
      .select({
        name: user.name,
        time: checkIn.checkInTime,
        type: sql<string>`'Check-in'`,
      })
      .from(checkIn)
      .innerJoin(user, eq(checkIn.userId, user.id))
      .where(gte(checkIn.checkInTime, twentyFourHoursAgo))
      .execute();

    // 2. Aktivitas Check-out
    const checkOuts = await db
      .select({
        name: user.name,
        time: checkIn.checkOutTime,
        type: sql<string>`'Check-out'`,
      })
      .from(checkIn)
      .innerJoin(user, eq(checkIn.userId, user.id))
      .where(
        and(
          gte(checkIn.checkOutTime, twentyFourHoursAgo),
          isNotNull(checkIn.checkOutTime)
        )
      )
      .execute();

    const membershipExtensions = await db
      .select({
        name: user.name,
        time: payments.paymentDate,
        type: sql<string>`'Membership Extended'`,
      })
      .from(payments)
      .innerJoin(user, eq(payments.userId, user.id))
      .where(
        and(
          eq(payments.paymentStatus, "Success"),
          gte(payments.paymentDate, twentyFourHoursAgo)
        )
      )
      .execute();

    // 4. Aktivitas Registrasi Baru
    const newRegistrations = await db
      .select({
        name: user.name,
        time: user.createdAt,
        type: sql<string>`'New Registration'`,
      })
      .from(user)
      .where(gte(user.createdAt, twentyFourHoursAgo))
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
