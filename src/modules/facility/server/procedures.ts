import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constant";
import db from "@/db";
import { facility, membershipFacility } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { asc, count, eq } from "drizzle-orm";
import { z } from "zod";
import { MAX_PAGE_SIZE } from "../../../constant";
import { membershipType } from "../../../db/schema";

export const facilityRouter = createTRPCRouter({
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
    .query(async ({ ctx, input }) => {
      const actualInput = input || {};
      const { page, pageSize, search } = {
        page: actualInput.page ?? DEFAULT_PAGE,
        pageSize: actualInput.pageSize ?? DEFAULT_PAGE_SIZE,
        search: actualInput.search,
      };

      const data = await db
        .select()
        .from(facility)
        .orderBy(asc(facility.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db.select({ count: count() }).from(facility);

      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const [data] = await db
        .select()
        .from(facility)
        .where(eq(facility.id, input.id));

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Facility with id ${input.id} not found`,
        });
      }

      return data;
    }),
});
