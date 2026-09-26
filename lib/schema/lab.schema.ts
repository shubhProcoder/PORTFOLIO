import { z } from "zod";

export const LabSchema = z.object({
  title: z.string(),
  hypothesis: z.string(),
  status: z.enum(["VALIDATED", "FAILED", "REVISED", "ACTIVE", "PLANNED"]),
  learning: z.string().optional(),
  draft: z.boolean().default(false)
});

export type Lab = z.infer<typeof LabSchema>;
