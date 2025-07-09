import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constant";
import db from "@/db";
import { membershipFacility, membershipType, facility } from "@/db/schema"; // Pastikan facility diimpor
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { count, eq, getTableColumns, sql } from "drizzle-orm"; // Impor sql
import { z } from "zod";

export const membershipRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await db
        .select({
          ...getTableColumns(membershipType),
          facilities: sql`json_agg(${facility})`.as("facilities"),
        })
        .from(membershipType)
        .leftJoin(
          membershipFacility,
          eq(membershipFacility.membershipTypeId, membershipType.id)
        )
        .leftJoin(facility, eq(membershipFacility.facilityId, facility.id))
        .groupBy(membershipType.id);

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
    .query(async ({ ctx, input }) => {
      const actualInput = input || {};

      const { page, pageSize, search } = {
        page: actualInput.page ?? DEFAULT_PAGE,
        pageSize: actualInput.pageSize ?? DEFAULT_PAGE_SIZE,
        search: actualInput.search,
      };

      const data = await db.query.membershipType.findMany({
        with: {
          facilties: {
            with: {
              facility: true,
            }
          },
        },
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });

      console.log(JSON.stringify(data, null, 2));



      const [total] = await db.select({ count: count() }).from(membershipType);

      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),
});
