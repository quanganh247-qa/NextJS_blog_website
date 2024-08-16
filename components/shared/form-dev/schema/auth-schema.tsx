"use client";

import { z } from "zod";

const signInSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});
const signUpSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(20, "Username must be at most 20 characters long"),
  email: z.string().email("Invalid email address"),
  first_name: z
    .string()
    .max(20, "First name must be at most 20 characters long"),
  last_name: z.string().max(20, "Last name must be at most 20 characters long"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

export type SignInType = z.infer<typeof signInSchema>;
export type SignUpType = z.infer<typeof signUpSchema>;

export { signInSchema, signUpSchema };
