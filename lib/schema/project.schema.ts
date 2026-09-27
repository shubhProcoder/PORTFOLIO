import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  title: z.string(),
  status: z.enum(["COMPLETED", "IN_PROGRESS", "ABANDONED", "PLANNED"]),
  type: z.string(),
  context: z.string().optional(),
  problem: z.string().optional(),
  hypothesis: z.string().optional(),
  approach: z.string().optional(),
  architecture: z.string().optional(),
  build: z.string().optional(),
  personal_contribution: z.array(z.string()).optional(),
  team_contribution: z.array(z.string()).optional(),
  evaluation: z.string().optional(),
  failures: z.array(z.string()).optional(),
  results: z.array(z.string()).optional(),
  learnings: z.array(z.string()).optional(),
  stack: z.array(z.string()),
  core_features: z.array(z.string()),
  evidence: z.string().optional(),
  related_projects: z.array(z.string()).optional(),
  related_experiments: z.array(z.string()).optional(),
  related_articles: z.array(z.string()).optional(),
  github_url: z.string().optional(),
  live_url: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false)
});

export type Project = z.infer<typeof ProjectSchema>;
