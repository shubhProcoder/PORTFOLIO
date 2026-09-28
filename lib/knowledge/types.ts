// ============================================================
// KNOWLEDGE MODEL TYPES
// Normalized entity & evidence types for the portfolio knowledge system
// ============================================================

export type EntityType =
  | 'PERSON'
  | 'PROJECT'
  | 'THINKING'
  | 'LAB'
  | 'JOURNEY'
  | 'NOW'
  | 'TECHNOLOGY';

export type EntityStatus =
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'ABANDONED'
  | 'PLANNED'
  | 'PUBLISHED'
  | 'DRAFT'
  | 'VALIDATED'
  | 'FAILED'
  | 'REVISED'
  | 'ACTIVE';

export type EvidenceState =
  | 'VERIFIED_FACT'
  | 'SELF_REPORTED'
  | 'HYPOTHESIS'
  | 'PLANNED'
  | 'IN_PROGRESS';

export interface KnowledgeEntity {
  id: string;
  type: EntityType;
  title: string;
  status: EntityStatus;
  /** The route this entity maps to in the portfolio */
  route: string;
  /** Source file path (relative to content/) */
  sourcePath: string;
  /** All searchable text fields concatenated for retrieval */
  searchableText: string;
  /** Structured fields for deep retrieval */
  fields: Record<string, string | string[] | undefined>;
  /** Evidence state classification */
  evidenceState: EvidenceState;
  /** Whether this entity is a draft (should not leak into results) */
  isDraft: boolean;
}

export interface Relationship {
  from: string; // entity id
  to: string;   // entity id
  type: string;  // e.g. BUILT, USES, RELATED_TO, TESTS, LED_TO
  label: string; // human-readable label
}

export interface EvidenceObject {
  entityId: string;
  entityType: EntityType;
  entityTitle: string;
  sourcePath: string;
  route: string;
  status: EntityStatus;
  evidenceState: EvidenceState;
  /** The specific content fragment that matches the query */
  matchedContent: string;
  /** Which field(s) matched */
  matchedFields: string[];
  /** Relevance score (0–1, deterministic ranking) */
  relevanceScore: number;
  /** Structured real data extracted directly from YAML */
  structuredData?: {
    problem?: string;
    approach?: string;
    architecture?: string;
    personalContribution?: string[];
    teamContribution?: string[];
    failures?: string | string[];
    learnings?: string | string[];
    results?: string[];
    stack?: string[];
    coreFeatures?: string[];
    learning?: string;
    hypothesis?: string;
    evidence?: string;
  };
}

export type QuerySupportStatus =
  | 'VERIFIED_FACT'
  | 'SUPPORTED'
  | 'SELF_REPORTED'
  | 'NOT_FOUND'
  | 'PARTIAL';

export interface QueryResult {
  query: string;
  /** Generated high-quality answer grounded in real YAML data */
  answer: string;
  /** Factual grounding status for trust transparency */
  supportStatus: QuerySupportStatus;
  /** Grounding explanation / trust note */
  trustNote: string;
  /** Key metrics or real data points extracted */
  keyDataPoints: string[];
  /** Ranked evidence objects */
  evidence: EvidenceObject[];
  /** Related entities not directly matched but connected */
  relatedEntities: RelatedEntity[];
  /** Total entities searched */
  totalEntitiesSearched: number;
  /** Timestamp of retrieval */
  retrievedAt: string;
}

export interface RelatedEntity {
  id: string;
  type: EntityType;
  title: string;
  route: string;
  relationshipType: string;
}

export interface KnowledgeIndex {
  entities: KnowledgeEntity[];
  relationships: Relationship[];
  lastBuilt: string;
}
