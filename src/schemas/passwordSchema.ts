"use client"
 
import { z } from "zod"


const passwordValidation = z
  .string()
  .min(4, { message: "Password must be at least 4 characters long" })
  .max(20, { message: "Password must not exceed 20 characters" });

export const passwordSchema = z.object({
  oldPassword: passwordValidation,
  newPassword: passwordValidation,
});
