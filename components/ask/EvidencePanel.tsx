'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import type { EvidenceObject } from '@/lib/knowledge/types';

interface EvidencePanelProps {
  evidence: EvidenceObject[];
}

const TYPE_COLORS: Record<string, string> = {
  PROJECT: '#C084FC',
  THINKING: '#F59E0B',
  LAB: '#10B981',
  JOURNEY: '#38BDF8',
  NOW: '#F472B6',
  PERSON: '#FAF7F2',
  TECHNOLOGY: '#6366F1',
};

function EvidenceStateLabel({ state }: { state: string }) {
  const stateColors: Record<string, string> = {
    VERIFIED_FACT: '#10B981',
    SELF_REPORTED: '#F59E0B',
    HYPOTHESIS: '#6366F1',
    PLANNED: '#5A564F',
    IN_PROGRESS: '#38BDF8',
  };

  const stateLabels: Record<string, string> = {
    VERIFIED_FACT: 'VERIFIED FACT',
    SELF_REPORTED: 'SELF-REPORTED',
    HYPOTHESIS: 'HYPOTHESIS',
    PLANNED: 'PLANNED',
    IN_PROGRESS: 'IN PROGRESS',
  };

  const color = stateColors[state] || '#5A564F';
  const label = stateLabels[state] || state.replace(/_/g, ' ');

  return (
    <span
      className="text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 rounded border"
      style={{
        color,
        borderColor: `${color}40`,
        backgroundColor: `${color}10`,
        fontFamily: 'var(--font-machine)',
      }}
    >
      {label}
    </span>
  );
}

function EvidenceCard({ item, index }: { item: EvidenceObject; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const typeColor = TYPE_COLORS[item.entityType] || '#8B8680';
  const data = item.structuredData;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="p-0 transition-colors mb-12"
      style={{
        backgroundColor: 'transparent',
        borderLeft: `2px solid ${typeColor}`,
        paddingLeft: '1.5rem',
        fontFamily: 'var(--font-machine)',
      }}
    >
      <div className="flex flex-col gap-8">
        {/* Header Block */}
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[11px] tracking-[0.15em] text-[#8B8680]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[11px] tracking-[0.1em] uppercase font-bold" style={{ color: typeColor }}>
              {item.entityType}
            </span>
          </div>
          <Link
            href={item.route}
            className="block text-xl md:text-2xl font-normal transition-colors text-white hover:text-[#C084FC] uppercase"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            {item.entityTitle}
          </Link>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px]">
          <div>
            <span className="block tracking-[0.15em] text-[#8B8680] mb-1">STATUS</span>
            <span className="text-[#D4D0C8]">{item.status.replace(/_/g, ' ')}</span>
          </div>
          <div>
            <span className="block tracking-[0.15em] text-[#8B8680] mb-1">EVIDENCE SOURCE</span>
            <code className="text-[#C084FC]">content/{item.sourcePath}</code>
          </div>
        </div>

        {/* Structured Data */}
        {data && (
          <div className="flex flex-col gap-6 text-[11px]">
            {data.personalContribution && data.personalContribution.length > 0 && (
              <>
                <div className="h-[1px] w-full bg-white/10" />
                <div>
                  <span className="block tracking-[0.15em] text-[#8B8680] mb-3">DOCUMENTED CONTRIBUTION</span>
                  <ul className="space-y-2 text-[#D4D0C8] font-sans" style={{ fontFamily: 'var(--font-sans)', fontSize: '13px' }}>
                    {data.personalContribution.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <span className="text-[#8B8680] mt-0.5">›</span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {data.architecture && (
              <>
                <div className="h-[1px] w-full bg-white/10" />
                <div>
                  <span className="block tracking-[0.15em] text-[#8B8680] mb-3">ARCHITECTURE</span>
                  <code className="text-[#E0F2FE] block whitespace-pre-wrap leading-loose">
                    {data.architecture}
                  </code>
                </div>
              </>
            )}

            {(data.results && data.results.length > 0) && (
              <>
                <div className="h-[1px] w-full bg-white/10" />
                <div>
                  <span className="block tracking-[0.15em] text-[#8B8680] mb-3">OUTCOMES & RESULTS</span>
                  <ul className="space-y-2 text-[#D4D0C8] font-sans" style={{ fontFamily: 'var(--font-sans)', fontSize: '13px' }}>
                    {data.results.map((res, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-3">
                        <span className="text-[#8B8680] mt-0.5">›</span>
                        <span className="leading-relaxed">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2">
          <div className="h-[1px] w-full bg-white/10 mb-4" />
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[11px] tracking-[0.12em] uppercase text-[#8B8680] hover:text-[#C084FC] transition-colors inline-flex items-center gap-2 cursor-pointer"
            aria-expanded={expanded}
          >
            {expanded ? '[ HIDE RAW RECORD ]' : '[ VIEW SOURCE RECORD ]'}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <pre
                  className="text-[11px] leading-relaxed mt-4 p-4 bg-transparent border border-white/10 text-[#8B8680] whitespace-pre-wrap"
                >
                  {item.matchedContent}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

export function EvidencePanel({ evidence }: EvidencePanelProps) {
  return (
    <section className="px-6 md:px-12 py-8 max-w-[1200px] mx-auto">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-8">
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: '#C084FC', fontFamily: 'var(--font-machine)' }}
        >
          EVIDENCE INDEX (PUBLISHED SOURCES)
        </span>
        <span
          className="text-xs"
          style={{ color: '#5A564F', fontFamily: 'var(--font-machine)' }}
        >
          — {evidence.length} verified record{evidence.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Evidence cards */}
      <div className="space-y-6">
        {evidence.map((item, i) => (
          <EvidenceCard key={item.entityId} item={item} index={i} />
        ))}
      </div>

      {/* Divider */}
      <div
        className="mt-12"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      />
    </section>
  );
}
