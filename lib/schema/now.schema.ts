import { z } from "zod";

export const NowSchema = z.object({
  last_updated: z.string(),
  current_build: z.string(),
  current_learning: z.string(),
  current_reading: z.string().optional(),
  current_question: z.string().optional(),
  bandwidth_allocation: z.record(z.string(), z.number()).optional()
});

export type Now = z.infer<typeof NowSchema>;
