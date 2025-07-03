import { z } from "zod";

export const signInSchemas = z.object({
  email: z
    .string()
    .email()
    .min(2, { message: "Email harus diisi setidaknya 2 karakter" }),
  password: z.string().min(6, { message: "Password harus diisi" }),
});

export const signUpSchemas = signInSchemas
  .extend({
    name: z.string().min(3, { message: "Name is required" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Konfirmasi password harus lebih dari 6 karakter" }),
    phoneNumber: z.string().min(10, { message: "Phone number is not valid" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });
