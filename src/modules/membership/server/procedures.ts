import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constant";
import db from "@/db";
import { membershipFacility, membershipType } from "@/db/schema"; // Pastikan facility diimpor
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { count, eq } from "drizzle-orm"; // Impor sql
import { z } from "zod";
import { membershipCreateSchema, updateMembershipSchema } from "../schema";
import { Features } from "../types";
import { TRPCError } from "@trpc/server";

export const membershipRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const data = await db.query.membershipType.findFirst({
        where: eq(membershipType.id, input.id),
        with: {
          facilties: {
            with: {
              facility: true,
            },
          },
        },
      });

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Membership not found",
        });
      }

      return data;
    }),
  getMany: protectedProcedure
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
    .query(async ({ input }) => {
      const actualInput = input || {};

      const { page, pageSize } = {
        page: actualInput.page ?? DEFAULT_PAGE,
        pageSize: actualInput.pageSize ?? DEFAULT_PAGE_SIZE,
      };

      const data = await db.query.membershipType.findMany({
        with: {
          facilties: {
            with: {
              facility: true,
            },
          },
        },
        limit: pageSize,
        offset: (page - 1) * pageSize,
        orderBy: membershipType.createdAt,
      });

      const [total] = await db.select({ count: count() }).from(membershipType);

      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),

  create: protectedProcedure
    .input(membershipCreateSchema)
    .mutation(async ({ input }) => {
      const membershipTypeData = {
        name: input.name,
        price: parseInt(input.price),
        description: input.description,
        active: input.active,
        features: {
          benefits: [input.benefits],
          color: input.colors,
        } as Features,
        duration: 30,
      };

      const [dataCreate] = await db
        .insert(membershipType)
        .values(membershipTypeData)
        .returning();

      if (input.facilityAccess.length > 0) {
        const facilityRelations = input.facilityAccess.map((facilityId) => ({
          membershipTypeId: dataCreate.id,
          facilityId,
        }));
        await db.insert(membershipFacility).values(facilityRelations);
      }

      return dataCreate;
    }),

  update: protectedProcedure
    .input(updateMembershipSchema)
    .mutation(async ({ input }) => {
      const membershipTypeData = {
        name: input.name,
        price: parseInt(input.price),
        description: input.description,
        active: input.active,
        features: {
          benefits: [input.benefits],
          color: input.colors,
        } as Features,
        duration: 30,
      };

      const [dataUpdate] = await db
        .update(membershipType)
        .set(membershipTypeData)
        .where(eq(membershipType.id, input.id))
        .returning();

      await db
        .delete(membershipFacility)
        .where(eq(membershipFacility.membershipTypeId, input.id));

      if (input.facilityAccess.length > 0) {
        const facilityRelations = input.facilityAccess.map((facilityId) => ({
          membershipTypeId: dataUpdate.id,
          facilityId,
        }));
        await db.insert(membershipFacility).values(facilityRelations);
      }

      return dataUpdate;
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const [removedData] = await db
        .delete(membershipType)
        .where(eq(membershipType.id, input.id))
        .returning();

      if (!removedData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Membership not found",
        });
      }

      return removedData;
    }),
});
