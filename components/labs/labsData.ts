export interface LabExperiment {
  id: string;
  title: string;
  hypothesis: string;
  status: 'PLANNED' | 'VALIDATED' | 'REVISED' | 'FAILED' | 'IN_PROGRESS';
  learning?: string;
  metrics?: { label: string; value: string }[];
}

export const labExperiments: LabExperiment[] = [
  {
    id: 'exp-01',
    title: 'EXP-01: Reciprocal Rank Fusion vs Weighted Score Fusion',
    hypothesis: 'RRF provides more stable retrieval rank orders across diverse PDF schemas without score normalization drift.',
    status: 'VALIDATED',
    learning: 'Normalizing dense cosine similarity and sparse BM25 scores introduces threshold instability; RRF rank-based blending eliminates score divergence.',
  },
  {
    id: 'exp-02',
    title: 'EXP-02: Local Embedding Latency under Memory Constraints',
    hypothesis: 'Running a quantized small-embedding model locally reduces TTFB compared to external API calls for small chunks.',
    status: 'REVISED',
    learning: 'CPU inference spikes under burst requests caused memory contention; hybrid local cache + batched external API proved superior.',
  },
  {
    id: 'exp-03',
    title: 'EXP-03: Semantic Caching Eviction Policies for Multi-turn RAG',
    hypothesis: 'Cosine-similarity based cache eviction yields higher hit rates than LRU for conversational RAG patterns over 10-turn limits.',
    status: 'PLANNED',
  },
  {
    id: 'exp-04',
    title: 'EXP-04: Tool Selection Context Decay in ReAct Agents',
    hypothesis: 'Zero-shot ReAct agent reasoning degrades non-linearly when provided with more than 5 complex API tools due to context fragmentation.',
    status: 'PLANNED',
  }
];
