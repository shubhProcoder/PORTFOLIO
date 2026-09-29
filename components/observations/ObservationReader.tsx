'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ObservationCanvas } from './ObservationCanvas';

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

// ─── Design token palette ──────────────────────────────────────────────────
// Page background  #F4F3EF  (warm paper)
// Primary surface  #FAFAF7  (bright paper)
// Secondary surface #ECEAE4 (warm gray)
// Text             #171717  (near-black ink)
// Muted text       #6F6D68  (warm stone)
// Border           #D9D6CE  (parchment)
// Blue             #315EA8  (cobalt — semantic: systems/links)
// Amber            #B78318  (amber — semantic: numbers/hypotheses/active)
// ──────────────────────────────────────────────────────────────────────────

export function ObservationReader() {
  const [activeId, setActiveId] = useState<string>(observationsData[0].id);
  const activeArticle = observationsData.find((o) => o.id === activeId) || observationsData[0];

  return (
    // Warm paper canvas — the entire page is the document
    <div className="relative min-h-screen bg-[#F4F3EF] text-[#171717] selection:bg-[#315EA8]/20 selection:text-[#315EA8]">

      {/* Silent background — discovered, not noticed */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ObservationCanvas activeTheme={activeArticle.theme} />
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <header className="relative z-10 pt-28 pb-14 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">

        {/* Breadcrumb docket — mono metadata layer */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-[#6F6D68]">
            <span className="text-[#B78318] font-bold">CHAPTER // 02</span>
            <span className="text-[#D9D6CE]">/</span>
            <span>FIELD NOTES & ESSAYS</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-[#6F6D68]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B78318]" />
            LIVING DOCUMENT
          </div>
        </div>

        {/* Hero headline — serif, near-black, with semantic color accents */}
        <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#171717] max-w-4xl leading-[0.94]">
          Field Notes on{' '}
          <span className="italic text-[#315EA8]">Emergent</span>{' '}
          Systems &amp;{' '}
          <span className="italic text-[#B78318]">Non-Obvious</span>{' '}
          Failures.
        </h1>

        {/* Supporting copy — clean sans */}
        <p className="mt-8 text-[#6F6D68] font-sans text-[15px] max-w-xl leading-relaxed tracking-wide uppercase font-medium">
          Rigorous post-mortems, architectural observations, and engineering hypotheses
          documented during the build cycle. Not generic advice — verifiable field research.
        </p>

        {/* Thin divider */}
        <div className="mt-14 h-px bg-[#D9D6CE]" />
      </header>

      {/* ── MAIN LAYOUT ───────────────────────────────────────────────────── */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── LEFT: Editorial Index ────────────────────────────────────── */}
          <aside className="lg:col-span-4 sticky top-24">
            {/* Index header */}
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#6F6D68] mb-6 flex items-center justify-between">
              <span>INDEX OF OBSERVATIONS</span>
              <span className="text-[#B78318]">[{observationsData.length.toString().padStart(2, '0')}]</span>
            </div>

            {/* Observation index items */}
            <div className="space-y-0">
              {observationsData.map((obs, idx) => {
                const isActive = obs.id === activeId;
                return (
                  <button
                    key={obs.id}
                    onClick={() => setActiveId(obs.id)}
                    className="w-full text-left group relative transition-colors duration-200"
                  >
                    {/* Top rule */}
                    <div className={`h-px w-full mb-0 transition-colors duration-200 ${isActive ? 'bg-[#B78318]' : 'bg-[#D9D6CE] group-hover:bg-[#171717]/30'}`} />

                    <div className={`flex gap-0 transition-colors duration-200 ${isActive ? '' : ''}`}>
                      {/* Amber active marker — left vertical rule */}
                      <div className={`w-px flex-shrink-0 mr-5 transition-colors duration-200 ${isActive ? 'bg-[#B78318]' : 'bg-transparent group-hover:bg-[#D9D6CE]'}`} />

                      <div className="py-6 flex-1">
                        {/* Obs number + status */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <span className={`font-mono text-[11px] font-bold tracking-[0.2em] ${isActive ? 'text-[#B78318]' : 'text-[#6F6D68] group-hover:text-[#171717]'}`}>
                            {obs.number}
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#6F6D68]/70">
                            {obs.status}
                          </span>
                        </div>

                        {/* Title — serif */}
                        <h2 className={`font-editorial text-xl font-normal leading-snug transition-colors ${isActive ? 'text-[#171717]' : 'text-[#6F6D68] group-hover:text-[#171717]'}`}>
                          {obs.title}
                        </h2>

                        {/* Metadata footer */}
                        <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                          <span className={isActive ? 'text-[#315EA8]' : 'text-[#6F6D68]/60'}>{obs.category}</span>
                          <span className="text-[#6F6D68]/50">{obs.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom rule on last item */}
                    {idx === observationsData.length - 1 && (
                      <div className="h-px bg-[#D9D6CE]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Archive note — quiet footnote */}
            <p className="mt-10 font-mono text-[10px] tracking-[0.12em] text-[#6F6D68]/50 leading-relaxed max-w-[26ch]">
              BACKGROUND TOPOLOGY CORRESPONDS TO THE ACTIVE OBSERVATION&apos;S SYSTEM DIAGRAM.
            </p>
          </aside>

          {/* ── RIGHT: Research Document ─────────────────────────────────── */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeArticle.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                // Paper surface: off-white, very subtle border, no heavy shadow
                className="bg-[#FAFAF7] border border-[#D9D6CE] max-w-[760px]"
              >
                {/* Document top rule */}
                <div className="h-[3px] bg-[#B78318]" />

                <div className="px-10 sm:px-14 py-12 sm:py-16">

                  {/* Metadata docket — mono layer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-8 mb-10 border-b border-[#D9D6CE]">
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase">
                      <span className="text-[#B78318] font-bold">OBSERVATION {activeArticle.number}</span>
                      <span className="text-[#D9D6CE] mx-3">—</span>
                      <span className="text-[#315EA8]">{activeArticle.category}</span>
                    </div>
                    <div className="font-mono text-[10px] tracking-widest text-[#6F6D68] uppercase">
                      {activeArticle.date}
                    </div>
                  </div>

                  {/* Article Headline — serif, ink black */}
                  <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#171717] leading-[1.08] tracking-tight">
                    {activeArticle.title}
                  </h2>

                  {/* ABSTRACT section label */}
                  <div className="mt-10 mb-4 font-mono text-[10px] tracking-[0.22em] uppercase text-[#6F6D68]">
                    ABSTRACT
                  </div>

                  {/* Abstract — borderless, the text IS the callout */}
                  <p className="text-[#171717] font-sans text-[17px] leading-[1.75] border-l-2 border-[#315EA8] pl-5">
                    {activeArticle.summary}
                  </p>

                  {/* Divider */}
                  <div className="my-12 h-px bg-[#ECEAE4]" />

                  {/* Body sections */}
                  <div className="space-y-12">
                    {activeArticle.body.map((sec, idx) => (
                      <section key={idx}>
                        {/* Section number + title */}
                        <h3 className="font-editorial text-2xl font-normal text-[#171717] leading-snug flex items-baseline gap-4 mb-4">
                          <span className="font-mono text-[11px] text-[#B78318] font-bold flex-shrink-0">
                            §{String(idx + 1).padStart(2, '0')}
                          </span>
                          {sec.sectionTitle}
                        </h3>
                        <p className="font-sans text-[#6F6D68] text-[16px] leading-[1.85]">
                          {sec.content}
                        </p>
                      </section>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="mt-14 mb-12 h-px bg-[#ECEAE4]" />

                  {/* Unresolved Research Hypothesis */}
                  <div className="border border-[#B78318]/30 bg-[#B78318]/[0.03] p-8">
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#B78318] font-bold mb-5">
                      UNRESOLVED RESEARCH HYPOTHESIS
                    </div>
                    <p className="font-editorial text-[#171717] text-xl leading-relaxed italic">
                      &ldquo;{activeArticle.keyQuestion}&rdquo;
                    </p>
                  </div>

                  {/* Footer: Related project + tech */}
                  <div className="mt-12 pt-8 border-t border-[#D9D6CE] grid grid-cols-1 sm:grid-cols-2 gap-10 font-mono text-[11px]">
                    <div>
                      <div className="uppercase tracking-[0.18em] text-[#6F6D68] mb-4 text-[10px]">
                        CORRESPONDING SYSTEM IN ARCHIVE
                      </div>
                      <Link
                        href={activeArticle.relatedProjectHref}
                        className="inline-flex items-center gap-2 text-[#315EA8] hover:text-[#171717] font-bold tracking-wide transition-colors group"
                      >
                        <span className="w-3 h-px bg-current" />
                        <span>{activeArticle.relatedProject}</span>
                        <span className="text-[#D9D6CE] group-hover:text-[#315EA8] transition-colors">↗</span>
                      </Link>
                    </div>

                    <div>
                      <div className="uppercase tracking-[0.18em] text-[#6F6D68] mb-4 text-[10px]">
                        RELEVANT TECHNICAL PRIMITIVES
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeArticle.relatedTech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 border border-[#D9D6CE] text-[#6F6D68] text-[9px] tracking-widest uppercase bg-[#ECEAE4]"
                          >
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
