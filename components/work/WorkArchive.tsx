'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ProjectRecord {
  id: string;
  number: string;
  title: string;
  type: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'ABANDONED' | 'PLANNED';
  context?: string;
  stack: string[];
  core_features: string[];
  evidence: string;
  evidenceLink?: string;
  role: string;
  architecturalChallenge: string;
  solutionOutcome: string;
  failureBoundary: string;
  schematicType: 'rag' | 'agent' | 'geointel' | 'planning';
}

const projectsData: ProjectRecord[] = [
  {
    id: 'enterprise-hybrid-rag',
    number: '01',
    title: 'Enterprise Knowledge Assistant — Hybrid RAG System',
    type: 'AI_SYSTEM',
    status: 'COMPLETED',
    role: 'Lead Systems Architect & Fullstack Engineer',
    stack: ['LlamaIndex', 'ChromaDB', 'FastAPI', 'React', 'TypeScript', 'Python'],
    core_features: [
      'BM25 sparse + dense semantic vector retrieval',
      'Reciprocal Rank Fusion (RRF) rank-based blend',
      'BGE cross-encoder reranker with token-pool limits',
      'PyMuPDF fallback for complex table extraction',
      'MD5 hash-based query/chunk caching layer',
    ],
    evidence: 'Verified GitHub repository & LinkedIn architecture whitepaper',
    evidenceLink: 'https://github.com/shubhProcoder',
    architecturalChallenge:
      'Standard dense vector cosine search missed specific alphanumeric part numbers, technical error codes, and nested table metrics in heterogeneous technical PDFs.',
    solutionOutcome:
      'Implemented dual-pipeline retrieval combining BM25 exact lexical match with ChromaDB dense embeddings, blended via Reciprocal Rank Fusion, followed by a BGE reranking stage. Preserved exact match precision while maintaining semantic retrieval breadth.',
    failureBoundary:
      'Unbounded cross-encoder reranking caused 1.2s+ latency spikes. Constrained the rerank pool to top-25 chunks and introduced MD5 hash caching to keep response time <380ms.',
    schematicType: 'rag',
  },
  {
    id: 'agentforge',
    number: '02',
    title: 'AgentForge',
    type: 'AI_RELIABILITY_EVALUATION',
    status: 'IN_PROGRESS',
    role: 'Creator & Test Harness Engineer',
    stack: ['Python', 'Pytest', 'FastAPI', 'Docker'],
    core_features: [
      'Isolated sandbox tool execution runtime',
      'Idempotency verification across repeated tool invocations',
      'Deterministic chaos injection (latency, rate-limit, timeouts)',
      'Automated structured regression evaluation traces',
    ],
    evidence: 'System specification and automated testing harnesses',
    evidenceLink: 'https://github.com/shubhProcoder',
    architecturalChallenge:
      'Multi-turn AI agents frequently fail silently during production tool calls: infinite retries, non-idempotent side-effects, and state corruption on transient network drops.',
    solutionOutcome:
      'Constructed a sandboxed testing harness running in containerized environments. Replays synthetic failure scenarios (HTTP 429, payload corruption, socket timeout) to prove agent loop recovery and idempotency compliance.',
    failureBoundary:
      'Evaluating non-deterministic LLM behavior requires invariant baseline assertions. Established strict state-delta verification rather than fuzzy text output matching.',
    schematicType: 'agent',
  },
  {
    id: 'geointel-ai',
    number: '03',
    title: 'GeoIntel AI',
    type: 'HACKATHON_TEAM_PROJECT',
    context: 'Smart India Hackathon (SIH) Internal Round — Selected Top 65 / 111 Teams',
    status: 'COMPLETED',
    role: 'AI / RAG Pipeline Developer (Team Project)',
    stack: ['Gemini API', 'Pinecone', 'OCR', 'Python', 'Streamlit'],
    core_features: [
      'Multi-page geological survey report ingestion',
      'OCR document pre-processing and coordinate extraction',
      'Pinecone dense vector indexing with metadata tagging',
      'Traceable source page attribution in mining intelligence',
    ],
    evidence: 'SIH competition submission records & internal-round evaluation',
    architecturalChallenge:
      'Geologists and mining inspectors had to manually scan hundreds of pages of unindexed government survey records to locate specific mineral density reports.',
    solutionOutcome:
      'Built a document intelligence pipeline parsing historical geological scans into searchable vector indexes, with verifiable page citations returned alongside Gemini-synthesized insights.',
    failureBoundary:
      'Scanned documents with poor resolution failed standard OCR; incorporated adaptive image contrast pre-filters before running character recognition.',
    schematicType: 'geointel',
  },
  {
    id: 'daily-sahayak',
    number: '04',
    title: 'Daily Sahayak',
    type: 'PRODUCT',
    status: 'IN_PROGRESS',
    role: 'Product Architect & Fullstack Developer',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'State Machine Engine'],
    core_features: [
      'Multi-factor priority scoring (Urgency × Impact / Friction)',
      'Constraint-aware automated schedule generator',
      'Calendar conflict detection and automated resolution',
      'Frictionless replanning state machine',
    ],
    evidence: 'Public GitHub repository (shubhProcoder/Daily-Sahayak)',
    evidenceLink: 'https://github.com/shubhProcoder/Daily-Sahayak',
    architecturalChallenge:
      'Users abandon rigid time-blocking schedules when tasks inevitably overflow, causing decision paralysis and cascading plan failure.',
    solutionOutcome:
      'Engineered an adaptive planning state machine that treats scheduled slots as fluid intervals. When a task overflows, the system automatically recalibrates downstream commitments without guilt or rigid modal alerts.',
    failureBoundary:
      'Overly complex scoring heuristics confused users. Reduced the scoring formulation to 3 transparent dimensions: Deadline Urgency, Cognitive Load, and Time-to-Execute.',
    schematicType: 'planning',
  },
];

export function WorkArchive() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredProjects =
    activeFilter === 'ALL'
      ? projectsData
      : projectsData.filter((p) => p.type === activeFilter || (activeFilter === 'FEATURED' && p.status === 'COMPLETED'));

  return (
    <div className="relative min-h-screen bg-[#0C0E14] text-[#E5E7EB] selection:bg-[#38BDF8] selection:text-black">
      {/* Background Archival Coordinate Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Archive Header */}
      <header className="relative z-10 pt-28 pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#38BDF8] uppercase">
              CHAPTER // 01
            </span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs tracking-[0.16em] text-neutral-400 uppercase">
              CASE FILES &amp; BUILT SYSTEMS
            </span>
          </div>

          <div className="font-mono text-xs text-neutral-400 flex items-center gap-4">
            <span>REGISTRY: 04 REPOSITORIES</span>
            <span className="w-1 h-1 rounded-full bg-neutral-600" />
            <span className="text-[#38BDF8]">VERIFIED ARCHIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95]">
              Built Systems <span className="text-[#38BDF8]">Archive</span>.
            </h1>
            <p className="mt-6 text-neutral-400 font-sans text-base sm:text-lg max-w-2xl leading-relaxed">
              Technical case files documenting hybrid retrieval architectures, reliability evaluation harnesses, and
              resilient product engines. Every entry is backed by verified code repositories and system specifications.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="lg:col-span-4 flex flex-wrap gap-2 justify-start lg:justify-end">
            {['ALL', 'AI_SYSTEM', 'AI_RELIABILITY_EVALUATION', 'PRODUCT', 'HACKATHON_TEAM_PROJECT'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-mono text-[11px] tracking-wider uppercase px-3 py-1.5 rounded border transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#38BDF8]/15 border-[#38BDF8] text-[#38BDF8] font-bold'
                    : 'bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                {filter.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Case Files List */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16 space-y-24">
        {filteredProjects.map((project) => {
          const isExpanded = expandedId === project.id;

          return (
            <article
              key={project.id}
              id={project.id}
              className="relative p-8 md:p-12 rounded-2xl bg-[#10131A] border border-white/10 hover:border-white/25 transition-all duration-300 shadow-2xl group"
            >
              {/* Top Case Docket Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-white">DOCKET // {project.number}</span>
                  <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300 uppercase">
                    {project.type.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      project.status === 'COMPLETED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === 'COMPLETED' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                      }`}
                    />
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Main Content Layout: Left Specs & Narrative, Right Schematic Artifact */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                
                {/* Left Column: Project Title, Specs, Challenge, Outcome */}
                <div className="lg:col-span-7 space-y-6">
                  {project.context && (
                    <div className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">
                      CONTEXT: {project.context}
                    </div>
                  )}

                  <h2 className="font-mono text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                    {project.title}
                  </h2>

                  {/* Role Badge */}
                  <div className="inline-block px-3 py-1 rounded bg-white/[0.04] border border-white/10 font-mono text-xs text-neutral-300">
                    <span className="text-neutral-500">ROLE //</span> {project.role}
                  </div>

                  {/* Core Features */}
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block">
                      ARCHITECTURAL PRIMITIVES
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-neutral-300 font-sans list-none p-0 m-0">
                      {project.core_features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#38BDF8] font-mono">›</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Stack Tags */}
                  <div className="pt-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-2">
                      SYSTEM STACK
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs px-2.5 py-1 rounded bg-[#171C26] border border-white/10 text-neutral-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Narrative Accordion / Deep Dive */}
                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-amber-400 block mb-1">
                        THE ARCHITECTURAL PROBLEM
                      </span>
                      <p className="font-sans text-neutral-300 text-sm leading-relaxed">
                        {project.architecturalChallenge}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 block mb-1">
                        VERIFIED ENGINEERING SOLUTION
                      </span>
                      <p className="font-sans text-neutral-300 text-sm leading-relaxed">
                        {project.solutionOutcome}
                      </p>
                    </div>

                    {isExpanded && (
                      <div className="p-4 rounded-lg bg-red-950/20 border border-red-500/30 text-xs font-mono space-y-1">
                        <span className="text-red-400 font-bold uppercase tracking-wider block">
                          FAILURE BOUNDARY &amp; MITIGATION
                        </span>
                        <p className="text-neutral-300 leading-relaxed font-sans">{project.failureBoundary}</p>
                      </div>
                    )}

                      <div className="flex items-center gap-4 pt-4">
                        <Link href={`/work/${project.id}`} className="font-mono text-xs text-[#38BDF8] hover:underline uppercase tracking-wider font-bold">
                          READ FULL CASE STUDY ↗
                        </Link>
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : project.id)}
                          className="font-mono text-xs text-neutral-400 hover:text-white hover:underline uppercase tracking-wider"
                        >
                          {isExpanded ? '[-] HIDE FAILURE BOUNDARIES' : '[+] VIEW FAILURE BOUNDARIES'}
                        </button>

                        {project.evidenceLink && (
                          <a
                            href={project.evidenceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-white hover:text-[#38BDF8] uppercase tracking-wider flex items-center gap-1"
                          >
                            <span>INSPECT REPOSITORY</span>
                            <span>↗</span>
                          </a>
                        )}
                      </div>
                  </div>
                </div>

                {/* Right Column: Architectural Schematic Diagram Artifact */}
                <div className="lg:col-span-5 bg-[#090B0F] p-6 rounded-xl border border-white/10 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-neutral-400">
                    <span className="text-[#38BDF8] font-bold">PIPELINE SCHEMATIC</span>
                    <span>FIG. {project.number}.1</span>
                  </div>

                  {/* Custom SVG Architecture Visuals */}
                  {project.schematicType === 'rag' && (
                    <div className="space-y-4">
                      <div className="p-3 bg-[#131722] rounded border border-white/10 text-center">
                        <span className="text-neutral-400 block text-[10px]">INGESTION &amp; OCR</span>
                        <span className="text-white font-bold">Multi-Page Technical Manuals</span>
                      </div>
                      <div className="flex justify-center text-neutral-500">↓</div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2.5 bg-[#172033] rounded border border-[#38BDF8]/40">
                          <span className="text-[#38BDF8] block text-[10px]">SPARSE</span>
                          <span className="text-neutral-200">BM25 Lexical</span>
                        </div>
                        <div className="p-2.5 bg-[#172033] rounded border border-[#38BDF8]/40">
                          <span className="text-[#38BDF8] block text-[10px]">DENSE</span>
                          <span className="text-neutral-200">ChromaDB Vectors</span>
                        </div>
                      </div>
                      <div className="flex justify-center text-neutral-500">↓</div>
                      <div className="p-3 bg-[#1F293D] rounded border border-[#38BDF8] text-center">
                        <span className="text-[#38BDF8] block text-[10px]">RANK ARBITER</span>
                        <span className="text-white font-bold">Reciprocal Rank Fusion (k=60)</span>
                      </div>
                      <div className="flex justify-center text-neutral-500">↓</div>
                      <div className="p-3 bg-emerald-950/30 rounded border border-emerald-500/40 text-center">
                        <span className="text-emerald-400 block text-[10px]">CROSS-ENCODER</span>
                        <span className="text-white font-bold">BGE Reranker (Top 25) → Synthesizer</span>
                      </div>
                    </div>
                  )}

                  {project.schematicType === 'agent' && (
                    <div className="space-y-4">
                      <div className="p-3 bg-[#131722] rounded border border-white/10 text-center">
                        <span className="text-neutral-400 block text-[10px]">AGENT PLANNER</span>
                        <span className="text-white font-bold">Multi-Turn Tool Intent Graph</span>
                      </div>
                      <div className="flex justify-center text-neutral-500">↓</div>
                      <div className="p-3 bg-[#241B12] rounded border border-amber-500/50 text-center">
                        <span className="text-amber-400 block text-[10px]">CHAOS INJECTION LAYER</span>
                        <span className="text-white font-bold">429 Rate Limits / Corrupted Payloads</span>
                      </div>
                      <div className="flex justify-center text-neutral-500">↓</div>
                      <div className="p-3 bg-[#172033] rounded border border-[#38BDF8]/40 text-center">
                        <span className="text-[#38BDF8] block text-[10px]">SANDBOXED RUNTIME</span>
                        <span className="text-white font-bold">Isolated Docker Container Execution</span>
                      </div>
                      <div className="flex justify-center text-neutral-500">↓</div>
                      <div className="p-3 bg-emerald-950/30 rounded border border-emerald-500/40 text-center">
                        <span className="text-emerald-400 block text-[10px]">VERIFICATION SUITE</span>
                        <span className="text-white font-bold">Idempotency &amp; State Delta Asserts</span>
                      </div>
                    </div>
                  )}

                  {project.schematicType === 'geointel' && (
                    <div className="space-y-4">
                      <div className="p-3 bg-[#131722] rounded border border-white/10 text-center">
                        <span className="text-neutral-400 block text-[10px]">DATA SOURCE</span>
                        <span className="text-white font-bold">Historical Mining Surveys &amp; Scans</span>
                      </div>
                      <div className="flex justify-center text-neutral-500">↓</div>
                      <div className="p-3 bg-[#172033] rounded border border-[#38BDF8]/40 text-center">
                        <span className="text-[#38BDF8] block text-[10px]">PRE-PROCESSING</span>
                        <span className="text-white font-bold">OCR &amp; Coordinate Boundary Tagging</span>
                      </div>
                      <div className="flex justify-center text-neutral-500">↓</div>
                      <div className="p-3 bg-[#1F293D] rounded border border-[#38BDF8] text-center">
                        <span className="text-[#38BDF8] block text-[10px]">INDEXING</span>
                        <span className="text-white font-bold">Pinecone Dense Vector Storage</span>
                      </div>
                      <div className="flex justify-center text-neutral-500">↓</div>
                      <div className="p-3 bg-emerald-950/30 rounded border border-emerald-500/40 text-center">
                        <span className="text-emerald-400 block text-[10px]">ATTRIBUTED REASONING</span>
                        <span className="text-white font-bold">Gemini 1.5 + Page Reference Pinning</span>
                      </div>
                    </div>
                  )}

                  {project.schematicType === 'planning' && (
                    <div className="space-y-4">
                      <div className="p-3 bg-[#131722] rounded border border-white/10 text-center">
                        <span className="text-neutral-400 block text-[10px]">INTAKE BUFFER</span>
                        <span className="text-white font-bold">Unstructured Task &amp; Commitment Queue</span>
                      </div>
                      <div className="flex justify-center text-neutral-500">↓</div>
                      <div className="p-3 bg-[#241B12] rounded border border-amber-500/50 text-center">
                        <span className="text-amber-400 block text-[10px]">WEIGHT MATRIX</span>
                        <span className="text-white font-bold">Urgency × Energy Load × Deadlines</span>
                      </div>
                      <div className="flex justify-center text-neutral-500">↓</div>
                      <div className="p-3 bg-[#172033] rounded border border-[#38BDF8]/40 text-center">
                        <span className="text-[#38BDF8] block text-[10px]">CONSTRAINT RESOLVER</span>
                        <span className="text-white font-bold">Fluid Block Allocator</span>
                      </div>
                      <div className="flex justify-center text-neutral-500">↓</div>
                      <div className="p-3 bg-emerald-950/30 rounded border border-emerald-500/40 text-center">
                        <span className="text-emerald-400 block text-[10px]">RECOVERY LOOP</span>
                        <span className="text-white font-bold">Dynamic Task Demotion on Overflow</span>
                      </div>
                    </div>
                  )}

                  {/* Verification Stamp */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                    <span>EVIDENCE:</span>
                    <span className="text-white font-bold">{project.evidence}</span>
                  </div>
                </div>

              </div>
            </article>
          );
        })}
      </main>
    </div>
  );
}
