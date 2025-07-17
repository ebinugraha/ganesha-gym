import db from "@/db";
import { membership, membershipType, payments } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq, gte } from "drizzle-orm";
import { z } from "zod";

export const planRouter = createTRPCRouter({
  processPayments: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        membershipTypeId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // mengecek status membership
      const currentMembership = await db.query.membership.findFirst({
        where: and(
          eq(membership.userId, input.userId),
          gte(membership.endDate, new Date())
        ),
      });

      let startDate: Date;

      if (currentMembership && currentMembership.endDate > new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Membership masih aktif",
        });
      } else {
        startDate = new Date();
      }

      const currentMembershipType = await db.query.membershipType.findFirst({
        where: eq(membershipType.id, input.membershipTypeId),
      });

      if (!currentMembershipType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Membership type tidak ditemukan",
        });
      }

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + currentMembershipType?.duration);

      const newMembership = await db
        .insert(membership)
        .values({
          userId: input.userId,
          membershipTypeId: input.membershipTypeId,
          startDate: startDate,
          endDate: endDate,
        })
        .returning();

      await db.insert(payments).values({
        userId: ctx.auth.user.id,
        membershipId: newMembership[0].id,
        amount: currentMembershipType.price,
        paymentDate: new Date(),
        paymentStatus: "Success",
      });
      return newMembership;
    }),

  membershipActive: protectedProcedure.query(async ({ ctx, input }) => {
    const activeMembership = await db.query.membership.findFirst({
      where: and(
        eq(membership.userId, ctx.auth.user.id),
        gte(membership.endDate, new Date())
      ),
    });

    if (!activeMembership) {
      return null;
    }

    return activeMembership;
  }),

  isMembershipActive: protectedProcedure.query(async ({ ctx }) => {
    const activeMembership = await db.query.membership.findFirst({
      where: and(
        eq(membership.userId, ctx.auth.user.id),
        gte(membership.endDate, new Date())
      ),
    });

    return !!activeMembership;
  }),
});
