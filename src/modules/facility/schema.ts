import { z } from "zod";

export const createFasilitySchema = z.object({
  name: z.string().min(2, { message: "Nama tidak boleh kurang dari 2" }),
  description: z
    .string()
    .min(2, { message: "Deskripsi tidak boleh kurang dari 2" }),
  category: z
    .string()
    .min(2, { message: "Kategori tidak boleh kurang dari 2" }),
  image: z.string().optional(),
});

export const updateFasilitySchema = createFasilitySchema.extend({
  id: z.string().min(1, { message: "Id tidak boleh kosong" }),
});
