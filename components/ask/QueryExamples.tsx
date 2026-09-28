'use client';

import { motion } from 'motion/react';

interface QueryExamplesProps {
  examples: string[];
  onSelect: (query: string) => void;
}

const CATEGORIES = [
  { label: 'PROJECTS', query: 'What AI systems has Shubh actually built?' },
  { label: 'AI / RAG', query: 'How does the hybrid RAG architecture work?' },
  { label: 'BACKEND', query: 'What backend systems and infrastructure are used?' },
  { label: 'EVALUATION', query: 'How is the AI evaluated for accuracy and safety?' },
  { label: 'CONTRIBUTION', query: 'What was Shubh\'s personal contribution to these projects?' },
  { label: 'CURRENT WORK', query: 'What is Shubh currently working on?' },
];

export function QueryExamples({ onSelect }: Omit<QueryExamplesProps, 'examples'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-6 flex flex-wrap gap-x-6 gap-y-3"
    >
      {CATEGORIES.map((cat, i) => (
        <button
          key={i}
          onClick={() => onSelect(cat.query)}
          className="text-left text-[11px] tracking-[0.1em] uppercase transition-colors"
          style={{
            color: '#8B8680',
            fontFamily: 'var(--font-machine)',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.color = '#C084FC';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.color = '#8B8680';
          }}
        >
          {cat.label}
        </button>
      ))}
    </motion.div>
  );
}
