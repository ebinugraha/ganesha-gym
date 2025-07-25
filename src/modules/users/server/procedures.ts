import db from "@/db";
import { user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq, ilike, ne } from "drizzle-orm";
import { z } from "zod";

export const memberRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        search: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const actualInput = input || {};
      const { search } = {
        search: actualInput.search,
      };

      const users = await db.query.user.findMany({
        with: {
          memberships: {
            with: {
              membershipType: true,
            },
          },
        },
        where: and(
          ne(user.id, ctx.auth.user.id),
          input?.search ? ilike(user.name, `%${search}%`) : undefined
        ),
      });

      return users;
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const userGetOne = await db.query.user.findFirst({
        with: {
          memberships: {
            with: {
              membershipType: true,
            },
          },
        },
        where: and(ne(user.id, ctx.auth.user.id), eq(user.id, input.id)),
      });

      if (!userGetOne) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return userGetOne;
    }),

  updateRole: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const [userUpdated] = await db
        .update(user)
        .set({
          role: input.role,
        })
        .where(eq(user.id, input.id))
        .returning();

      if (!userUpdated) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return userUpdated;
    }),
});
