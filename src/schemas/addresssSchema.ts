"use client";

import { z } from "zod";

export const addressSchema = z.object({
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});
