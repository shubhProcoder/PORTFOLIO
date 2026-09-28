'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { QueryResult } from '@/lib/knowledge/types';
import { QueryInput } from './QueryInput';
import { QueryExamples } from './QueryExamples';
import { AnswerView } from './AnswerView';
import { EvidencePanel } from './EvidencePanel';
import { RelatedEntities } from './RelatedEntities';

interface AskTerminalProps {
  initialQuery?: string;
  result?: QueryResult | null;
  exampleQueries: string[];
  indexStats: { totalEntities: number; totalProjects: number; totalRelationships: number };
}

export function AskTerminal({
  initialQuery = '',
  result = null,
  exampleQueries,
  indexStats,
}: AskTerminalProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setIsSubmitting(true);
    router.push(`/ask?q=${encodeURIComponent(trimmed)}`);
  };

  // Scroll to results when they appear
  useEffect(() => {
    if (result && resultsRef.current) {
      setIsSubmitting(false);
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  return (
    <main
      className="min-h-screen pt-16"
      style={{
        backgroundColor: '#0A0B0D',
        color: '#D4D0C8',
        fontFamily: 'var(--font-machine)',
      }}
    >
      {/* ── HERO: Ask My Portfolio ── */}
      <section className="relative px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-20 max-w-[1200px] mx-auto">
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          {/* System status tag */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: '#C084FC' }}
              aria-hidden="true"
            />
            <span
              className="text-xs tracking-[0.2em] uppercase font-bold"
              style={{ color: '#8B8680', fontFamily: 'var(--font-machine)' }}
            >
              PORTFOLIO KNOWLEDGE INTERFACE // PUBLISHED RECORD
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6"
            style={{
              fontFamily: 'var(--font-editorial)',
              color: '#FAF7F2',
              fontWeight: 400,
            }}
          >
            Ask My Portfolio
          </h1>

          {/* Subtitle */}
          <p
            className="text-sm md:text-base max-w-[620px] leading-relaxed mb-6 text-[#8B8680]"
          >
            Search the systems, architectures, decisions, experiments, and engineering record behind this portfolio. Every answer is grounded in published YAML source records.
          </p>

          {/* System Identity Strip */}
          <div className="mb-12 py-3 border-y border-white/5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-[11px] tracking-[0.2em] font-bold text-[#C084FC]" style={{ fontFamily: 'var(--font-machine)' }}>
              INDEX
            </span>
            <div className="flex gap-4 text-[11px] tracking-[0.1em] text-[#8B8680]" style={{ fontFamily: 'var(--font-machine)' }}>
              <span>{indexStats.totalEntities} ENTITIES</span>
              <span>{indexStats.totalProjects} PROJECTS</span>
              <span>{indexStats.totalEntities} RECORDS</span>
              <span>{indexStats.totalRelationships} RELATIONSHIPS ACTIVE</span>
            </div>
          </div>

          {/* Query Input Box */}
          <QueryInput
            initialValue={query}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />

          {/* Example queries */}
          {!result && (
            <QueryExamples
              onSelect={handleSubmit}
            />
          )}
        </motion.div>
      </section>

      {/* ── RESULTS VIEW ── */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            ref={resultsRef}
            key={result.query}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Divider */}
            <div
              className="mx-6 md:mx-12 max-w-[1200px] lg:mx-auto"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            />

            {/* Query Echo Header */}
            <section className="px-6 md:px-12 pt-10 pb-4 max-w-[1200px] mx-auto">
              <div className="flex flex-col gap-1 mb-4" style={{ fontFamily: 'var(--font-machine)' }}>
                <span className="text-[10px] tracking-[0.15em] uppercase text-[#8B8680]">QUERY / ACTIVE</span>
                <span className="text-xs tracking-[0.2em] uppercase text-[#C084FC]">
                  SYSTEM QUERY
                </span>
              </div>
              <p
                className="text-xl md:text-2xl text-[#FAF7F2] font-normal"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                &ldquo;{result.query}&rdquo;
              </p>
              <div
                className="mt-6"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              />
            </section>

            {/* Validated Answer */}
            <AnswerView
              answer={result.answer}
              supportStatus={result.supportStatus}
              trustNote={result.trustNote}
              keyDataPoints={result.keyDataPoints}
              evidenceCount={result.evidence.length}
              totalSearched={result.totalEntitiesSearched}
            />

            {/* Structured Evidence Panel */}
            {result.evidence.length > 0 && (
              <EvidencePanel evidence={result.evidence} />
            )}

            {/* Graph-Related Entities */}
            {result.relatedEntities.length > 0 && (
              <RelatedEntities entities={result.relatedEntities} />
            )}

            {/* Source Index */}
            {result.evidence.length > 0 && (
              <section className="px-6 md:px-12 py-8 max-w-[1200px] mx-auto">
                <div className="mb-6">
                  <span
                    className="text-xs tracking-[0.2em] uppercase text-[#C084FC]"
                    style={{ fontFamily: 'var(--font-machine)' }}
                  >
                    SOURCE INDEX
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {result.evidence.map((item, i) => (
                    <div key={item.entityId} className="flex items-center gap-4 text-[11px] tracking-[0.1em]" style={{ fontFamily: 'var(--font-machine)' }}>
                      <span className="text-[#8B8680]">{String(i + 1).padStart(2, '0')}</span>
                      <a href={item.route} className="text-[#D4D0C8] hover:text-[#C084FC] transition-colors">
                        content/{item.sourcePath}
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Record Boundary */}
            <section className="px-6 md:px-12 pt-8 max-w-[1200px] mx-auto">
              <div
                className="py-6 flex flex-col gap-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-[11px] tracking-[0.15em] uppercase text-[#5A564F]" style={{ fontFamily: 'var(--font-machine)' }}>
                  RECORD BOUNDARY
                </span>
                <p className="text-xs text-[#5A564F] tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                  This interface answers from published portfolio records. Absence of evidence in the record does not imply that an event did not occur.
                </p>
              </div>
            </section>

            {/* Retrieval Telemetry Bar */}
            <section className="px-6 md:px-12 py-6 max-w-[1200px] mx-auto">
              <div
                className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-[#5A564F]"
                style={{ fontFamily: 'var(--font-machine)' }}
              >
                <span>ENTITIES SEARCHED / {result.totalEntitiesSearched}</span>
                <span>EVIDENCE RETURNED / {result.evidence.length}</span>
                <span>RELATED / {result.relatedEntities.length}</span>
                <span>RETRIEVAL / DETERMINISTIC LEXICAL + GRAPH</span>
                <span>GROUNDING / STRICT SOURCE ATTRIBUTION</span>
              </div>
            </section>

            {/* Follow-up Query Section */}
            <section className="px-6 md:px-12 py-10 pb-20 max-w-[1200px] mx-auto">
              <div
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                className="pt-8"
              >
                <p
                  className="text-xs tracking-[0.15em] uppercase mb-6 text-[#5A564F]"
                >
                  ASK ANOTHER SYSTEM QUESTION
                </p>
                <QueryInput
                  initialValue=""
                  onSubmit={handleSubmit}
                  isLoading={isSubmitting}
                />
                <QueryExamples
                  onSelect={handleSubmit}
                />
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FOOTER TELEMETRY ── */}
      {!result && (
        <section className="px-6 md:px-12 py-16 max-w-[1200px] mx-auto">
          <div
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            className="pt-8"
          >
            <div
              className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-[#3A3632]"
              style={{ fontFamily: 'var(--font-machine)' }}
            >
              <span>SYSTEM / PORTFOLIO KNOWLEDGE INTERFACE</span>
              <span>RETRIEVAL / LEXICAL + GRAPH + ENTITY TRUTH</span>
              <span>SOURCE / MACHINE-READABLE YAML MODELS</span>
              <span>INTEGRITY / STRICT FACTUAL GROUNDING</span>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
