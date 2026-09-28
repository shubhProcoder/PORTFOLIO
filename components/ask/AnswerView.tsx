'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { QuerySupportStatus } from '@/lib/knowledge/types';

interface AnswerViewProps {
  answer: string;
  supportStatus?: QuerySupportStatus;
  trustNote?: string;
  keyDataPoints?: string[];
  evidenceCount: number;
  totalSearched: number;
}

export function AnswerView({
  answer,
  supportStatus = 'VERIFIED_FACT',
  trustNote,
  keyDataPoints = [],
  evidenceCount,
  totalSearched,
}: AnswerViewProps) {
  const [showMetadata, setShowMetadata] = useState(false);
  const isVerified = supportStatus === 'VERIFIED_FACT';
  const isSelfReported = supportStatus === 'SELF_REPORTED' || supportStatus === 'SUPPORTED';
  const isNotFound = supportStatus === 'NOT_FOUND';

  const statusColor = isVerified
    ? '#10B981' // Emerald
    : isSelfReported
    ? '#F59E0B' // Amber
    : '#EF4444'; // Rose

  const statusBg = isVerified
    ? 'rgba(16, 185, 129, 0.08)'
    : isSelfReported
    ? 'rgba(245, 158, 11, 0.08)'
    : 'rgba(239, 68, 68, 0.08)';

  const statusBorder = isVerified
    ? 'rgba(16, 185, 129, 0.25)'
    : isSelfReported
    ? 'rgba(245, 158, 11, 0.25)'
    : 'rgba(239, 68, 68, 0.25)';

  const STATUS_LABELS: Record<string, string> = {
    VERIFIED_FACT: 'PUBLISHED RECORD',
    SUPPORTED: 'SUPPORTED EVIDENCE',
    SELF_REPORTED: 'SELF-REPORTED',
    PARTIAL: 'PARTIAL RECORD',
    NOT_FOUND: 'NOT FOUND IN RECORD',
  };

  const statusLabel = STATUS_LABELS[supportStatus] || 'RECORD STATUS UNKNOWN';

  return (
    <section className="px-6 md:px-12 py-8 max-w-[1200px] mx-auto">
      {/* ── GROUNDING & TRUST HEADER ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span
            className="text-xs tracking-[0.2em] uppercase font-bold"
            style={{ color: '#C084FC', fontFamily: 'var(--font-machine)' }}
          >
            PUBLISHED RECORD
          </span>
          <span
            className="text-xs"
            style={{ color: '#5A564F', fontFamily: 'var(--font-machine)' }}
          >
            — {evidenceCount} source record{evidenceCount !== 1 ? 's' : ''} evaluated across {totalSearched} entities
          </span>
        </div>

        {/* Factual Trust Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-semibold tracking-wider uppercase border"
          style={{
            backgroundColor: statusBg,
            borderColor: statusBorder,
            color: statusColor,
            fontFamily: 'var(--font-machine)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: statusColor }}
            aria-hidden="true"
          />
          <span>{statusLabel}</span>
        </div>
      </div>

      {/* Trust note if present */}
      {trustNote && (
        <div
          className="mb-6 p-3 rounded text-sm text-[#9CA3AF] border border-white/5 bg-white/[0.02]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <span className="text-[#C084FC] uppercase tracking-wider mr-2 font-medium">TRUST PROTOCOL:</span>
          {trustNote}
        </div>
      )}


      {/* ── EVIDENCE TRACE ── */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-8 text-[10px] tracking-widest text-[#5A564F]" style={{ fontFamily: 'var(--font-machine)' }}>
        {['QUERY', 'ENTITY MATCH', 'FIELD MATCH', 'SOURCE RECORD', 'ANSWER'].map((step, i, arr) => (
          <div key={step} className="flex items-center gap-2 md:gap-4">
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.3 }}
              className={i === arr.length - 1 ? 'text-[#C084FC]' : ''}
            >
              {step}
            </motion.span>
            {i < arr.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.15 + 0.1, duration: 0.3 }}
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* ── WHY THIS RESULT ── */}
      <div className="mb-8" style={{ fontFamily: 'var(--font-machine)' }}>
        <button
          onClick={() => setShowMetadata(!showMetadata)}
          className="text-[10px] tracking-widest uppercase text-[#8B8680] hover:text-[#C084FC] transition-colors"
        >
          {showMetadata ? '▾ HIDE RETRIEVAL METADATA' : '▸ WHY THIS RESULT'}
        </button>
        <AnimatePresence>
          {showMetadata && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 border border-white/10 bg-black/40 text-[11px] text-[#8B8680]">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {keyDataPoints.length > 0 && (
                    <div className="md:col-span-2">
                      <strong className="block text-[#D4D0C8] mb-1 tracking-widest uppercase">Matched Fields</strong>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {keyDataPoints.map((pt, i) => (
                          <span key={i} className="px-1.5 py-0.5 border border-white/10 bg-white/5 rounded-sm">
                            {pt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <strong className="block text-[#D4D0C8] mb-1 tracking-widest uppercase">Sources</strong>
                    <span>{evidenceCount} yaml record(s) matched</span>
                  </div>
                  <div>
                    <strong className="block text-[#D4D0C8] mb-1 tracking-widest uppercase">Resolution</strong>
                    <span style={{ color: statusColor }}>{statusLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── ANSWER BODY ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="max-w-[800px] text-base md:text-lg leading-relaxed space-y-4"
          style={{
            color: '#FAF7F2',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {answer.split('\n\n').map((paragraph, i) => {
            // Render markdown code blocks
            if (paragraph.startsWith('```')) {
              const code = paragraph.replace(/```[a-z]*\n?/g, '');
              return (
                <pre
                  key={i}
                  className="p-4 my-3 rounded bg-black/60 border border-white/10 text-xs md:text-sm text-[#38BDF8] overflow-x-auto font-mono"
                >
                  <code>{code}</code>
                </pre>
              );
            }

            // Render headings
            if (paragraph.startsWith('### ')) {
              return (
                <h3
                  key={i}
                  className="text-xl md:text-2xl font-normal text-white pt-2 border-b border-white/10 pb-2"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }

            // Render bullet blocks
            if (paragraph.startsWith('• ') || paragraph.startsWith('**') || paragraph.includes('\n• ')) {
              const lines = paragraph.split('\n');
              return (
                <div key={i} className="space-y-2 py-1">
                  {lines.map((line, lineIdx) => {
                    const clean = line.replace(/^\s*•\s*/, '');
                    const isBullet = line.trim().startsWith('•');
                    return (
                      <div
                        key={lineIdx}
                        className={`text-sm md:text-base leading-relaxed ${
                          isBullet ? 'pl-4 flex items-start gap-2 text-[#D1D5DB]' : 'text-white'
                        }`}
                      >
                        {isBullet && <span className="text-[#C084FC] select-none">›</span>}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: clean
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
                              .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-[#C084FC] text-xs font-mono">$1</code>'),
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            }

            // Regular paragraph
            return (
              <p
                key={i}
                className="text-sm md:text-base leading-relaxed text-[#D1D5DB]"
                dangerouslySetInnerHTML={{
                  __html: paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
                    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-[#C084FC] text-xs font-mono">$1</code>'),
                }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Divider */}
      <div
        className="mt-10"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      />
    </section>
  );
}
