// ============================================================
// KNOWLEDGE MODULE — PUBLIC API
// ============================================================

export { retrieve, getExampleQueries, invalidateIndex, getIndexStats } from './retrieve';
export { buildKnowledgeIndex, normalizeContentToEntities } from './normalize';
export type {
  KnowledgeEntity,
  Relationship,
  KnowledgeIndex,
  EvidenceObject,
  QueryResult,
  RelatedEntity,
  EntityType,
  EntityStatus,
  EvidenceState,
  QuerySupportStatus,
} from './types';
