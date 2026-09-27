export interface ProcessStage {
  id: string;
  number: string;
  name: string;
  tagline: string;
  category: 'DISCOVERY' | 'SYNTHESIS' | 'EXECUTION' | 'VERIFICATION' | 'EVOLUTION';
  description: string;
  activities: string[];
  inputs: string[];
  outputs: string[];
  failureVector?: string;
  backtrackTarget?: string;
  connectedProjects?: {
    name: string;
    href: string;
    note: string;
  }[];
}

export const processStages: ProcessStage[] = [
  {
    id: 'observe',
    number: '01',
    name: 'OBSERVE',
    tagline: 'Signals before solutions.',
    category: 'DISCOVERY',
    description:
      'Begin by observing raw operational friction in existing workflows, unindexed data structures, and edge-case failure points rather than assuming a solution.',
    activities: [
      'Audit manual user workarounds and task drop-offs',
      'Inspect unindexed PDF structures, tables, and alphanumeric codes',
      'Identify non-deterministic behavior in current tools',
      'Catalog recurring latency and timeout bottlenecks',
    ],
    inputs: ['Production logs', 'Unstructured documents', 'User interaction friction'],
    outputs: ['Empirical friction map', 'List of observed anomalies'],
    connectedProjects: [
      {
        name: 'Enterprise Hybrid RAG',
        href: '/work#hybrid-rag',
        note: 'Observed standard search failing on multi-page technical manuals and table part-numbers.',
      },
      {
        name: 'Daily Sahayak',
        href: '/work#daily-sahayak',
        note: 'Observed rigid time-blocking apps collapsing under task overflow.',
      },
    ],
  },
  {
    id: 'identify',
    number: '02',
    name: 'IDENTIFY',
    tagline: 'Isolate high-leverage bottlenecks.',
    category: 'DISCOVERY',
    description:
      'Distinguish cosmetic symptoms from core architectural limits. Focus strictly on the single failure point that dictates end-to-end system reliability.',
    activities: [
      'Separate interface friction from algorithmic limits',
      'Measure cost-to-solve against operational impact',
      'Identify invariant constraints (e.g. sub-500ms latency requirement)',
      'Establish technical viability thresholds',
    ],
    inputs: ['Observed anomalies', 'Resource constraints', 'SLA budgets'],
    outputs: ['Explicit bottleneck definition', 'Target leverage point'],
  },
  {
    id: 'frame',
    number: '03',
    name: 'FRAME',
    tagline: 'Define trade-offs and boundary invariants.',
    category: 'SYNTHESIS',
    description:
      'Formulate the engineering problem in terms of competing constraints: precision vs recall, reranking quality vs token latency, or state machine rigidity vs user freedom.',
    activities: [
      'Define mathematical & empirical success criteria',
      'Establish explicit failure conditions',
      'Model system boundary contracts and data flow budgets',
      'Formulate testable architectural hypotheses',
    ],
    inputs: ['Bottleneck specification', 'SLA thresholds'],
    outputs: ['System Boundary Document', 'Testable Hypothesis'],
  },
  {
    id: 'research',
    number: '04',
    name: 'RESEARCH',
    tagline: 'Ground in algorithms, prior art, and mechanics.',
    category: 'SYNTHESIS',
    description:
      'Investigate retrieval theory, rank fusion formulations, and systems literature to ground implementation in sound mathematical and mechanical primitives.',
    activities: [
      'Compare sparse BM25 vs dense cosine vector retrieval mechanics',
      'Analyze Reciprocal Rank Fusion (RRF) rank invariance formulations',
      'Study cross-encoder reranking compute penalties and quadratic token bounds',
      'Investigate deterministic chaos injection patterns for agent loops',
    ],
    inputs: ['Academic literature', 'Engine benchmarks', 'Open-source runtime code'],
    outputs: ['Algorithm specifications', 'Primitive candidates (RRF, BGE, PyMuPDF)'],
    connectedProjects: [
      {
        name: 'Hybrid RAG Architecture',
        href: '/work#hybrid-rag',
        note: 'Researched RRF rank-blending to bypass score normalization drift.',
      },
    ],
  },
  {
    id: 'prototype',
    number: '05',
    name: 'PROTOTYPE',
    tagline: 'Build the minimal verifiable spike.',
    category: 'SYNTHESIS',
    description:
      'Construct a minimal, disposable technical spike designed solely to stress-test the core uncertainty before writing production architecture.',
    activities: [
      'Build isolated Python scripts testing rank blending across 50 sample PDFs',
      'Benchmark local vs API embedding latency under memory limits',
      'Verify OCR contrast filters on noisy geological survey scans',
      'Validate state-machine transition logic with synthetic inputs',
    ],
    inputs: ['Algorithm candidates', 'Target sample dataset'],
    outputs: ['Verifiable spike script', 'Empirical latency/accuracy telemetry'],
  },
  {
    id: 'build',
    number: '06',
    name: 'BUILD',
    tagline: 'Engineer resilient production runtimes.',
    category: 'EXECUTION',
    description:
      'Transform the verified spike into production-grade architecture with sandboxed tool runtimes, caching layers, and graceful fallback paths.',
    activities: [
      'Implement dual-pipe BM25 + ChromaDB retrieval in FastAPI/LlamaIndex',
      'Construct Docker-isolated sandboxes for safe tool execution in AgentForge',
      'Integrate MD5 hash caching to eliminate redundant vector queries',
      'Engineer adaptive replanning engine in Next.js/TypeScript for Daily Sahayak',
    ],
    inputs: ['Verified spike', 'System contracts', 'Container specifications'],
    outputs: ['Hardened production codebase', 'Documented API boundaries'],
    connectedProjects: [
      {
        name: 'AgentForge',
        href: '/work#agentforge',
        note: 'Built sandboxed runtime and idempotency harness.',
      },
      {
        name: 'GeoIntel AI',
        href: '/work#geointel-ai',
        note: 'Built Pinecone RAG pipeline with page attribution.',
      },
    ],
  },
  {
    id: 'test',
    number: '07',
    name: 'TEST',
    tagline: 'Stress-test under chaos and adversarial conditions.',
    category: 'EXECUTION',
    description:
      'Subject the system to deliberate stress: network socket drops, rate limits, payload corruption, and adversarial inputs to uncover latent failure modes.',
    activities: [
      'Inject HTTP 429 rate-limits and socket timeouts into agent loops',
      'Evaluate retrieval rank order on corrupted and scanned PDF pages',
      'Verify tool call idempotency across duplicate synthetic retries',
      'Execute automated Pytest regression suites against state deltas',
    ],
    inputs: ['Production pipeline', 'Chaos injection suite', 'Edge-case corpora'],
    outputs: ['Execution traces', 'Stress-test benchmark logs'],
    connectedProjects: [
      {
        name: 'AgentForge Harness',
        href: '/work#agentforge',
        note: 'Simulated network dropouts to verify agent recovery.',
      },
    ],
  },
  {
    id: 'validate-fail',
    number: '08',
    name: 'VALIDATE / FAIL',
    tagline: 'The binary architectural threshold.',
    category: 'VERIFICATION',
    description:
      'Measure results strictly against the invariant boundaries established in Step 03. If the system fails latency or precision budgets, failure is treated as first-class signal.',
    activities: [
      'Measure end-to-end p95 response time against 400ms SLA budget',
      'Verify MRR@5 retrieval recall on complex tabular queries',
      'Evaluate agent state consistency after chaos recovery',
      'Flag regression vectors requiring architectural backtracking',
    ],
    inputs: ['Benchmark logs', 'Evaluation metrics'],
    outputs: ['Validation PASS certification OR explicit Failure Vector'],
    failureVector:
      'Cross-encoder reranking latency spiked to 1.2s; OCR failed on low-contrast historical mining maps.',
    backtrackTarget: '04 / RESEARCH → REFRAME',
  },
  {
    id: 'learn',
    number: '09',
    name: 'LEARN',
    tagline: 'Extract invariants from failure boundaries.',
    category: 'VERIFICATION',
    description:
      'Synthesize why the system failed or succeeded. Extract invariant design principles that permanently protect future builds from the same regression.',
    activities: [
      'Document why naive dense vectors fail on alphanumeric part codes',
      'Quantify the optimal rerank pool size (Top-25 chunks)',
      'Codify state machine demotion rules when tasks overflow schedule bounds',
      'Convert empirical findings into reusable testing assertions',
    ],
    inputs: ['Failure vectors', 'System post-mortems'],
    outputs: ['Documented Architectural Invariants', 'Refined test assertions'],
    connectedProjects: [
      {
        name: 'Evaluating Retrieval Field Note',
        href: '/observations',
        note: 'Codified RRF rank invariance and rerank latency bounds.',
      },
    ],
  },
  {
    id: 'share',
    number: '10',
    name: 'SHARE',
    tagline: 'Codify research and open-source harnesses.',
    category: 'EVOLUTION',
    description:
      'Publish findings, architecture whitepapers, and open-source testing harnesses so solutions become inspectable community artifacts rather than private silos.',
    activities: [
      'Open-source AgentForge reliability testing harness on GitHub',
      'Author technical observations on real-world RAG evaluation',
      'Publish architecture schematics and benchmark graphs on LinkedIn',
      'Deliver competition briefings for Smart India Hackathon internal rounds',
    ],
    inputs: ['Hardened code', 'Empirical findings'],
    outputs: ['Public repositories', 'Field notes & research documentation'],
  },
  {
    id: 'iterate',
    number: '11',
    name: 'ITERATE',
    tagline: 'Close the loop with higher fidelity.',
    category: 'EVOLUTION',
    description:
      'Feed the learned invariants back into Step 01. The second iteration starts with higher precision, narrower hypotheses, and faster validation cycles.',
    activities: [
      'Update baseline testing suites with new edge-case assertions',
      'Calibrate latency thresholds based on production telemetry',
      'Refine the observation instruments for the next cycle',
      'Loop back to Step 01 with hardened assumptions',
    ],
    inputs: ['Learned invariants', 'Production feedback'],
    outputs: ['Sharpened system loop ready for next cycle'],
  },
];

export interface DecisionLayer {
  title: string;
  subtitle: string;
  color: string;
  focusAreas: string[];
}

export const decisionLayers: DecisionLayer[] = [
  {
    title: 'TECHNICAL & MECHANICAL',
    subtitle: 'Latency, memory, determinism, compute bounds',
    color: '#38BDF8',
    focusAreas: [
      'Dual-retrieval pipeline overhead (sparse + dense latency budgets)',
      'Vector database chunking strategy (semantic boundaries vs character splits)',
      'Cross-encoder reranking computational complexity (O(N) quadratic token ceiling)',
      'MD5 hash signature caching for instant duplicate query retrieval',
    ],
  },
  {
    title: 'RELIABILITY & RESILIENCE',
    subtitle: 'Idempotency, sandboxes, chaos recovery, fallbacks',
    color: '#FB923C',
    focusAreas: [
      'Isolated Docker tool runtime to prevent side-effect pollution',
      'Idempotency verification across duplicated synthetic network retries',
      'Graceful degradation when dense embeddings fail on technical manuals',
      'Adaptive fallback to PyMuPDF OCR when native PDF text extraction fails',
    ],
  },
  {
    title: 'PRODUCT & COGNITIVE FRICTION',
    subtitle: 'User mental model, task inertia, interaction density',
    color: '#34D399',
    focusAreas: [
      'Eliminating schedule guilt when real-world tasks inevitably overflow',
      'Prioritizing frictionless single-gesture replanning over mathematical perfection',
      'Pinning exact document page citations so geologists trust mining insights',
      'Transparent multi-factor weighting (Urgency, Energy Load, Deadlines)',
    ],
  },
  {
    title: 'EMPIRICAL EVIDENCE',
    subtitle: 'Verifiable benchmarks, tests, source repositories',
    color: '#A78BFA',
    focusAreas: [
      'Automated Pytest suites asserting state deltas rather than fuzzy strings',
      'Measured p95 latency targets (<400ms end-to-end response times)',
      'Public GitHub repositories backing all system claims',
      'Documented post-mortems of what failed and why',
    ],
  },
];
