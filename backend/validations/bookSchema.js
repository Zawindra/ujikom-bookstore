import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  year: z.string().min(1),
  genre: z.string().min(1),

  cover_url: z.string().url().optional().nullable(),
  price: z.number().optional(),
  discount: z.number().optional(),
  description: z.string().optional().nullable()
});
