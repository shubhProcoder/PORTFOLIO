import { z } from "zod";

export const PersonSchema = z.object({
  name: z.string(),
  title: z.string(),
  education: z.string(),
  primary_focus: z.string(),
  manifesto: z.string().optional(),
  bio_short: z.string().optional(),
  status: z.string(),
  location: z.string(),
  timezone: z.string(),
  channels: z.object({
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    email: z.string().optional()
  })
});

export type Person = z.infer<typeof PersonSchema>;
