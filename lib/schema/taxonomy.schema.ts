import { z } from "zod";

export const TaxonomySchema = z.object({
  technologies: z.array(z.string()),
  themes: z.array(z.string())
});

export type Taxonomy = z.infer<typeof TaxonomySchema>;
