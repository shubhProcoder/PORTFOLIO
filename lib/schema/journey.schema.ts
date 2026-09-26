import { z } from "zod";

export const JourneySchema = z.object({
  year: z.string(),
  title: z.string(),
  organization: z.string(),
  description: z.string(),
  draft: z.boolean().default(false)
});

export type Journey = z.infer<typeof JourneySchema>;
