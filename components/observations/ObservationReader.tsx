'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ObservationMatrix } from './ObservationMatrix';

interface Observation {
  id: string;
  number: string;
  title: string;
  category: string;
  status: string;
  date: string;
  theme: 'retrieval' | 'planning';
  summary: string;
  body: {
    sectionTitle: string;
    content: string;
  }[];
  relatedProject: string;
  relatedProjectHref: string;
  relatedTech: string[];
  keyQuestion: string;
}

const observationsData: Observation[] = [
  {
    id: 'evaluating-retrieval',
    number: '01',
    title: 'Evaluating Retrieval in Real-World RAG: Beyond Toy Benchmarks',
    category: 'RETRIEVAL ARCHITECTURES',
    status: 'ACTIVE RESEARCH NOTE',
    date: '2024 – PRESENT',
    theme: 'retrieval',
    summary:
      'Why standard top-k vector cosine similarity consistently degrades on complex enterprise manuals, how Reciprocal Rank Fusion preserves deterministic keyword veracity, and the empirical trade-off between reranking precision and token latency.',
    body: [
      {
        sectionTitle: 'The Semantic Drift of Naive Dense Search',
        content:
          'When indexing multi-page PDFs with nested tables, part numbers, and error codes, pure dense embedding retrieval frequently fails. High cosine similarity matches semantic conceptual descriptions while completely missing precise alphanumeric identifiers. In enterprise document QA, a user asking for "Section 4.1.2 torque limit" does not want semantic proximity to torque; they require exact lexical coordinates.',
      },
      {
        sectionTitle: 'Reciprocal Rank Fusion as an Invariant Arbiter',
        content:
          'Weighted score fusion between BM25 (sparse) and dense cosine scores requires score normalization that collapses across varied chunk lengths and vocabularies. RRF bypasses score calibration by evaluating rank positions: RRF_score(d) = Σ 1 / (k + rank(d)). Empirically, this rank-based blending guarantees that documents matching both exact sparse keys and deep conceptual context always rise to the top k=5.',
      },
      {
        sectionTitle: 'The Reranking Latency Ceiling',
        content:
          'Introducing a cross-encoder reranker (such as BGE-reranker) provides an immediate 15–22% gain in MRR@5. However, cross-encoders incur a quadratic compute penalty against retrieved token length. The critical architectural boundary is limiting the rerank pool to top-25 chunks and caching MD5 hash signatures of frequent query-document pairs to maintain sub-400ms end-to-end response budgets.',
      },
    ],
    relatedProject: 'Enterprise Knowledge Assistant (Hybrid RAG)',
    relatedProjectHref: '/work#hybrid-rag',
    relatedTech: ['LlamaIndex', 'ChromaDB', 'BM25', 'BGE-Reranker', 'FastAPI'],
    keyQuestion:
      'Can sub-50ms token-level speculative reranking supersede heavy cross-encoders on domain-specific documentation?',
  },
  {
    id: 'mechanics-of-daily-planning',
    number: '02',
    title: 'The Mechanics of Daily Planning: Turning Intent into Execution',
    category: 'SYSTEMS ENGINEERING & PRODUCT',
    status: 'FIELD STUDY & OBSERVATION',
    date: '2024 – PRESENT',
    theme: 'planning',
    summary:
      'Why algorithmic time-blocking fails in practice: human schedule rigidity, state-machine friction, task fragmentation, and why adaptive replanning loops must prioritize friction reduction over mathematical optimality.',
    body: [
      {
        sectionTitle: 'The Fallacy of Optimal Timetabling',
        content:
          'Traditional scheduling software treats time as a knapsack problem: pack the highest-priority tasks into fixed calendar slots. But humans do not operate like linear constraint solvers. An unexpected interruption destroys the entire downstream sequence, triggering decision fatigue and total abandonment of the schedule.',
      },
      {
        sectionTitle: 'State-Machine Friction and Graceful Degradation',
        content:
          'A resilient planning harness must treat the schedule as a state machine with explicit failure transitions. If a 45-minute task overflows, the system must not flag an error or guilt the user; it must dynamically recalculate remaining slack, demote non-critical milestones, and present a revised, friction-free agenda in real time.',
      },
      {
        sectionTitle: 'Adaptive Replanning as a Core Product Primitive',
        content:
          'In Daily Sahayak, priority scoring is weighted across urgency, cognitive energy load, and hard deadlines. By separating schedule generation from calendar commitment, the system allows the user to accept micro-adjustments with a single gesture, maintaining momentum rather than rigid compliance.',
      },
    ],
    relatedProject: 'Daily Sahayak',
    relatedProjectHref: '/work#daily-sahayak',
    relatedTech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'State Machines'],
    keyQuestion:
      'How can an autonomous agent calibrate task difficulty dynamically without overwhelming the user with confirmation prompts?',
  },
];

export function ObservationReader() {
  const [activeId, setActiveId] = useState<string>(observationsData[0].id);
  const activeArticle = observationsData.find((o) => o.id === activeId) || observationsData[0];

  return (
    <div className="relative min-h-screen bg-[#08090B] text-[#E2E8F0] selection:bg-[#F59E0B] selection:text-black">
      {/* Background Interactive Halftone Matrix */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <ObservationMatrix activeTheme={activeArticle.theme} />
      </div>

      {/* Hero Atmosphere Strip */}
      <header className="relative z-10 pt-28 pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#F59E0B] uppercase">
              CHAPTER // 02
            </span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs tracking-[0.16em] text-neutral-400 uppercase">
              FIELD NOTES &amp; ESSAYS
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            LIVING COMPUTATIONAL MAGAZINE
          </div>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white max-w-4xl leading-[0.96]">
          Field Notes on <span className="italic text-[#60A5FA]">Emergent</span> Systems &amp;{' '}
          <span className="italic text-[#F59E0B]">Non-Obvious</span> Failures.
        </h1>

        <p className="mt-8 text-neutral-400 font-sans text-base md:text-lg max-w-2xl leading-relaxed">
          Rigorous post-mortems, architectural observations, and engineering hypotheses documented during the build
          cycle. Not generic advice — verifiable field research.
        </p>
      </header>

      {/* Main Magazine Layout: Article Index on Left, Longform Reading on Right */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Editorial Index */}
          <aside className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="font-mono text-xs tracking-[0.18em] uppercase text-neutral-500 mb-6 flex items-center justify-between">
              <span>INDEX OF OBSERVATIONS</span>
              <span>[{observationsData.length.toString().padStart(2, '0')}]</span>
            </div>

            <div className="space-y-3">
              {observationsData.map((obs) => {
                const isActive = obs.id === activeId;
                return (
                  <button
                    key={obs.id}
                    onClick={() => setActiveId(obs.id)}
                    className={`w-full text-left p-5 rounded-lg border transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-[#12151B]/95 border-[#F59E0B]/50 shadow-[0_8px_30px_rgba(245,158,11,0.08)]'
                        : 'bg-[#0E1015]/60 border-white/5 hover:border-white/20 hover:bg-[#12151B]/80'
                    }`}
                  >
                    {/* Active Accent Bar */}
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#F59E0B] rounded-l-lg" />
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`font-mono text-xs font-bold tracking-wider ${
                          isActive ? 'text-[#F59E0B]' : 'text-neutral-500 group-hover:text-neutral-300'
                        }`}
                      >
                        OBS // {obs.number}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                        {obs.status}
                      </span>
                    </div>

                    <h2
                      className={`font-editorial text-lg md:text-xl font-normal leading-snug transition-colors ${
                        isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                      }`}
                    >
                      {obs.title}
                    </h2>

                    <div className="mt-3 flex items-center justify-between text-xs font-mono text-neutral-500">
                      <span>{obs.category}</span>
                      <span>{obs.date}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Matrix Control Note */}
            <div className="mt-8 p-4 rounded-lg bg-[#0E1015]/40 border border-white/5 text-[11px] font-mono text-neutral-500 leading-relaxed">
              <span className="text-[#60A5FA] font-bold">INTERFERENCE ENGINE:</span> Canvas background simulates dual-source
              wave diffraction. Move cursor over the page to modulate wave density; select articles to trigger phase shifts.
            </div>
          </aside>

          {/* Right Column: Longform Calm Reading Experience */}
          <article className="lg:col-span-8 bg-[#0D0F14]/90 backdrop-blur-md border border-white/10 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
            {/* Article Metadata Docket */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] font-bold uppercase">
                  OBSERVATION {activeArticle.number}
                </span>
                <span className="text-neutral-400 uppercase tracking-wider">{activeArticle.category}</span>
              </div>
              <div className="text-neutral-500">{activeArticle.date}</div>
            </div>

            {/* Article Headline */}
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-white leading-[1.08] tracking-tight">
              {activeArticle.title}
            </h2>

            {/* Abstract / Summary Callout */}
            <div className="my-10 p-6 rounded-xl bg-white/[0.03] border-l-2 border-[#60A5FA] text-neutral-300 font-sans text-base sm:text-lg leading-relaxed italic">
              {activeArticle.summary}
            </div>

            {/* Observation Body Sections */}
            <div className="space-y-12 my-12">
              {activeArticle.body.map((sec, idx) => (
                <section key={idx} className="space-y-4">
                  <h3 className="font-editorial text-2xl font-normal text-[#F1F5F9] flex items-center gap-3">
                    <span className="font-mono text-xs text-[#F59E0B] font-bold">§{idx + 1}</span>
                    {sec.sectionTitle}
                  </h3>
                  <p className="font-sans text-neutral-300 text-base sm:text-[17px] leading-[1.8] font-normal">
                    {sec.content}
                  </p>
                </section>
              ))}
            </div>

            {/* Related System Nodes & Key Question */}
            <div className="mt-14 pt-10 border-t border-white/10 space-y-8">
              {/* Key Unresolved Question */}
              <div className="p-6 rounded-xl bg-[#F59E0B]/[0.04] border border-[#F59E0B]/20">
                <div className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[#F59E0B] mb-2">
                  UNRESOLVED RESEARCH HYPOTHESIS
                </div>
                <p className="font-sans text-neutral-200 text-base leading-relaxed">
                  &ldquo;{activeArticle.keyQuestion}&rdquo;
                </p>
              </div>

              {/* Related Project Link & Tech Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider block mb-2">
                    CORRESPONDING SYSTEM IN ARCHIVE
                  </span>
                  <Link
                    href={activeArticle.relatedProjectHref}
                    className="inline-flex items-center gap-2 text-white hover:text-[#60A5FA] font-bold transition-colors"
                  >
                    <span>→ {activeArticle.relatedProject}</span>
                  </Link>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase tracking-wider block mb-2">
                    RELEVANT TECHNICAL PRIMITIVES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeArticle.relatedTech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>

        </div>
      </main>
    </div>
  );
}
