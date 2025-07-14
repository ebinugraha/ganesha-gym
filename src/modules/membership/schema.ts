import { z } from "zod";

export const membershipCreateSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nama setidaknya harus memiliki 2 karakter" })
    .max(20, { message: "Nama tidak boleh lebih dari 20 karakter" }),
  price: z.string().min(1, { message: "Harga tidak boleh kosong" }),
  description: z
    .string()
    .min(2, { message: "Deskripsi setidaknya harus memiliki 2 karakter" })
    .max(100, { message: "Deskripsi tidak boleh lebih dari 100 karakter" }),
  facilityAccess: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "Harus memilih setidaknya 1 fasilitas",
    }),
  benefits: z.string().optional(),
  active: z.boolean(),
  colors: z.string().optional(),
});

export const updateMembershipSchema = membershipCreateSchema.extend({
  id: z.string().min(1, { message: "Id tidak boleh kosong" }),
});
