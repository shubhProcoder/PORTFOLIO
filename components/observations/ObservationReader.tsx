'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
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
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1a1528] via-[#09090b] to-[#000000] text-zinc-300 selection:bg-amber-500/30 selection:text-amber-200 font-sans">
      {/* Background Interactive Halftone Matrix */}
      <div className="fixed inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <ObservationMatrix activeTheme={activeArticle.theme} />
      </div>

      {/* Atmospheric Glow */}
      <div className="fixed top-0 left-1/4 w-[50vw] h-[50vw] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

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

        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 max-w-4xl leading-[0.96]">
          Field Notes on <span className="italic text-blue-400">Emergent</span> Systems &amp;{' '}
          <span className="italic text-amber-400">Non-Obvious</span> Failures.
        </h1>

        <p className="mt-8 text-zinc-400 font-sans text-base md:text-lg max-w-2xl leading-relaxed font-light">
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
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? 'bg-white/[0.03] border-amber-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_30px_rgba(245,158,11,0.04)] backdrop-blur-xl'
                        : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'
                    }`}
                  >
                    {/* Active Accent Glow */}
                    {isActive && (
                      <span className="absolute -left-1 top-1/4 bottom-1/4 w-1 bg-amber-500/80 rounded-r-full blur-[2px]" />
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`font-mono text-[10px] font-bold tracking-widest ${
                          isActive ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-400'
                        }`}
                      >
                        OBS // {obs.number}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                        {obs.status}
                      </span>
                    </div>

                    <h2
                      className={`font-editorial text-lg md:text-xl font-normal leading-snug transition-colors ${
                        isActive ? 'text-zinc-100' : 'text-zinc-400 group-hover:text-zinc-200'
                      }`}
                    >
                      {obs.title}
                    </h2>

                    <div className="mt-4 flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-zinc-600">
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
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeArticle.id}
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/[0.02] backdrop-blur-3xl border border-white/[0.06] rounded-[2rem] p-8 sm:p-12 lg:p-16 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_16px_40px_rgba(0,0,0,0.4)]"
              >
                {/* Article Metadata Docket */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-white/[0.06] text-xs font-mono">
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-amber-500/90 font-bold tracking-widest text-[10px]">
                        OBSERVATION {activeArticle.number}
                      </span>
                    </div>
                    <span className="text-zinc-500 uppercase tracking-widest text-[10px]">{activeArticle.category}</span>
                  </div>
                  <div className="text-zinc-600 tracking-widest text-[10px] uppercase bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.05]">{activeArticle.date}</div>
                </div>

                {/* Article Headline */}
                <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-zinc-100 leading-[1.1] tracking-tight">
                  {activeArticle.title}
                </h2>

                {/* Abstract / Summary Callout */}
                <div className="my-10 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 to-transparent" />
                  <p className="text-zinc-300 font-sans text-lg leading-relaxed font-light">
                    {activeArticle.summary}
                  </p>
                </div>

                {/* Observation Body Sections */}
                <div className="space-y-14 my-14">
                  {activeArticle.body.map((sec, idx) => (
                    <section key={idx} className="space-y-5">
                      <h3 className="font-editorial text-2xl font-normal text-zinc-200 flex items-center gap-4">
                        <span className="font-mono text-xs text-amber-500/70 font-bold bg-amber-500/10 px-2 py-0.5 rounded">§{idx + 1}</span>
                        {sec.sectionTitle}
                      </h3>
                      <p className="font-sans text-zinc-400 text-[17px] leading-[1.8] font-light">
                        {sec.content}
                      </p>
                    </section>
                  ))}
                </div>

                {/* Related System Nodes & Key Question */}
                <div className="mt-16 pt-12 border-t border-white/[0.06] space-y-10">
                  {/* Key Unresolved Question */}
                  <div className="p-8 rounded-2xl bg-amber-500/[0.02] border border-amber-500/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-amber-500/80 mb-4">
                      UNRESOLVED RESEARCH HYPOTHESIS
                    </div>
                    <p className="font-sans text-zinc-200 text-lg leading-relaxed font-light italic">
                      &ldquo;{activeArticle.keyQuestion}&rdquo;
                    </p>
                  </div>

                  {/* Related Project Link & Tech Stack */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-mono">
                    <div>
                      <span className="text-zinc-600 uppercase tracking-widest block mb-4 text-[10px]">
                        CORRESPONDING SYSTEM IN ARCHIVE
                      </span>
                      <Link
                        href={activeArticle.relatedProjectHref}
                        className="group inline-flex items-center gap-3 p-3 pr-5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all text-zinc-300 hover:text-white"
                      >
                        <span className="p-1.5 rounded-lg bg-white/5 text-zinc-500 group-hover:text-zinc-300 group-hover:bg-white/10 transition-colors">↗</span>
                        <span className="font-semibold tracking-wide text-xs">{activeArticle.relatedProject}</span>
                      </Link>
                    </div>

                    <div>
                      <span className="text-zinc-600 uppercase tracking-widest block mb-4 text-[10px]">
                        RELEVANT TECHNICAL PRIMITIVES
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeArticle.relatedTech.map((t) => (
                          <span key={t} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-zinc-400 text-[10px] tracking-wider uppercase">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

        </div>
      </main>
    </div>
  );
}
