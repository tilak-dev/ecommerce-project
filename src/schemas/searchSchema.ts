import { z } from "zod";

export const SearchCategorySchema = z.object({
  category: z.string(),
});
