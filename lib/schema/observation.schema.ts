import { z } from "zod";

// ============================================================
// OBSERVATION SCHEMA — Full PRD Data Model
// Personal Publishing & Knowledge System
// ============================================================

export const ObservationTypeSchema = z.enum([
  "TECHNICAL_NOTE",
  "BUSINESS_PRODUCT_NOTE",
  "CASE_STUDY",
  "FIELD_NOTE",
  "LEARNING",
  "EXTERNAL_PUBLICATION",
]);

export const ObservationStatusSchema = z.enum([
  "DRAFT",
  "EDITING",
  "READY",
  "PUBLISHED",
  "UPDATED",
  "ARCHIVED",
]);

export const EditorialDistinctionSchema = z.enum([
  "PERSONAL_OBSERVATION",
  "SOURCE_DERIVED",
  "INTERPRETATION",
  "EXPERIMENTAL_RESULT",
  "PROJECT_EVIDENCE",
  "OPEN_QUESTION",
]);

export const ObservationBlockSchema = z.object({
  type: z.enum([
    "context",
    "observation",
    "question",
    "analysis",
    "learning",
    "impact",
    "code",
    "image",
    "quote",
    "link",
  ]),
  label: z.string().optional(),
  content: z.string().optional(),
  /** Editorial distinction — classifies the epistemic status of this claim */
  editorial: EditorialDistinctionSchema.optional(),
  /** For code blocks */
  language: z.string().optional(),
  caption: z.string().optional(),
  /** For quote blocks */
  attribution: z.string().optional(),
  /** For link blocks */
  url: z.string().optional(),
  linkText: z.string().optional(),
  /** For image blocks */
  src: z.string().optional(),
  alt: z.string().optional(),
});

export const ObservationSourceSchema = z.object({
  kind: z.enum(["NATIVE", "EXTERNAL"]),
  platform: z.enum(["LINKEDIN", "MEDIUM", "OTHER"]).optional(),
  originalUrl: z.string().optional(),
  canonicalLocation: z.enum(["PORTFOLIO", "EXTERNAL"]),
  availability: z.enum(["AVAILABLE", "MOVED", "UNAVAILABLE", "ARCHIVED"]),
});

export const ObservationSchema = z.object({
  // Identity
  id: z.string().optional(),
  slug: z.string().optional(),

  // Content
  title: z.string(),
  subtitle: z.string().optional(),
  excerpt: z.string(),

  // Classification
  type: ObservationTypeSchema,
  status: ObservationStatusSchema,

  // Dates (ISO string: "YYYY-MM-DD")
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),

  // Source model
  source: ObservationSourceSchema,

  // Blocks — the structured body of the observation
  blocks: z.array(ObservationBlockSchema).default([]),

  // Taxonomy
  tags: z.array(z.string()).default([]),

  // Relationships
  relatedProjects: z.array(z.string()).default([]),
  relatedLabs: z.array(z.string()).default([]),
  relatedObservations: z.array(z.string()).default([]),
  relatedTechnologies: z.array(z.string()).default([]),

  // Editorial metadata
  editorial: z
    .object({
      keyQuestion: z.string().optional(),
      hypothesis: z.string().optional(),
    })
    .optional(),

  // Draft guard — MUST be true for all non-public observations
  draft: z.boolean().default(false),
});

export type ObservationType = z.infer<typeof ObservationTypeSchema>;
export type ObservationStatus = z.infer<typeof ObservationStatusSchema>;
export type EditorialDistinction = z.infer<typeof EditorialDistinctionSchema>;
export type ObservationBlock = z.infer<typeof ObservationBlockSchema>;
export type ObservationSource = z.infer<typeof ObservationSourceSchema>;
export type Observation = z.infer<typeof ObservationSchema>;

/** Observation with the derived slug baked in (always available at runtime) */
export type HydratedObservation = Observation & { slug: string };
