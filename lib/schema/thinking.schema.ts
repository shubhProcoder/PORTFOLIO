import { z } from "zod";

export const ThinkingSchema = z.object({
  title: z.string(),
  topic: z.string(),
  status: z.enum(["PUBLISHED", "DRAFT", "PLANNED"]),
  date: z.string().optional(),
  draft: z.boolean().default(false)
});

export type Thinking = z.infer<typeof ThinkingSchema>;
