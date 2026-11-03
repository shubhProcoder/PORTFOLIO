'use client';

import React from 'react';
import { Observation, ObservationType } from '@/lib/schema/observation.schema';

interface MetadataEditorProps {
  observation: Partial<Observation>;
  onChange: (updates: Partial<Observation>) => void;
}

const OBSERVATION_TYPES: { id: ObservationType; label: string }[] = [
  { id: 'TECHNICAL_NOTE', label: 'Technical Note' },
  { id: 'BUSINESS_PRODUCT_NOTE', label: 'Business / Product Note' },
  { id: 'CASE_STUDY', label: 'Case Study' },
  { id: 'FIELD_NOTE', label: 'Field Note' },
  { id: 'LEARNING', label: 'Learning' },
  { id: 'EXTERNAL_PUBLICATION', label: 'External Publication' },
];

export function MetadataEditor({ observation, onChange }: MetadataEditorProps) {
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const tags = raw.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);
    onChange({ tags });
  };

  return (
    <section className="bg-[#FAFAF7] border border-[#D9D6CE] p-6 sm:p-8 space-y-6">
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#B78318] font-bold pb-2 border-b border-[#D9D6CE]">
        01 / CORE METADATA
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
            Observation Title *
          </label>
          <input
            type="text"
            value={observation.title || ''}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Evaluating Retrieval in Real-World RAG: Beyond Toy Benchmarks"
            className="w-full px-4 py-2.5 bg-white border border-[#D9D6CE] font-editorial text-[20px] text-[#171717] focus:outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717]"
          />
        </div>

        {/* Subtitle */}
        <div className="md:col-span-2">
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
            Subtitle / Deck
          </label>
          <input
            type="text"
            value={observation.subtitle || ''}
            onChange={(e) => onChange({ subtitle: e.target.value })}
            placeholder="e.g. Why standard top-k metrics consistently fail on production documents"
            className="w-full px-4 py-2 bg-white border border-[#D9D6CE] font-sans text-[15px] text-[#171717] focus:outline-none focus:border-[#171717]"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
            URL Slug (kebab-case)
          </label>
          <input
            type="text"
            value={observation.slug || ''}
            onChange={(e) => onChange({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
            placeholder="auto-generated-if-empty"
            className="w-full px-4 py-2 bg-white border border-[#D9D6CE] font-mono text-[12px] text-[#171717] focus:outline-none focus:border-[#171717]"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
            Observation Type *
          </label>
          <select
            value={observation.type || 'TECHNICAL_NOTE'}
            onChange={(e) => onChange({ type: e.target.value as ObservationType })}
            className="w-full px-4 py-2 bg-white border border-[#D9D6CE] font-mono text-[11px] uppercase tracking-widest text-[#171717] focus:outline-none focus:border-[#171717]"
          >
            {OBSERVATION_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Excerpt */}
        <div className="md:col-span-2">
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
            Executive Summary / Excerpt *
          </label>
          <textarea
            rows={3}
            value={observation.excerpt || ''}
            onChange={(e) => onChange({ excerpt: e.target.value })}
            placeholder="Dense, rigorous 2–3 sentence synthesis of what was observed, why it matters, and the empirical takeaway..."
            className="w-full px-4 py-2 bg-white border border-[#D9D6CE] font-sans text-[15px] leading-relaxed text-[#171717] focus:outline-none focus:border-[#171717]"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={(observation.tags || []).join(', ')}
            onChange={handleTagsChange}
            placeholder="retrieval, rag, embeddings, production-systems"
            className="w-full px-4 py-2 bg-white border border-[#D9D6CE] font-mono text-[11px] text-[#171717] focus:outline-none focus:border-[#171717]"
          />
        </div>

        {/* Created Date */}
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
            Creation Date (YYYY-MM-DD)
          </label>
          <input
            type="date"
            value={observation.createdAt || ''}
            onChange={(e) => onChange({ createdAt: e.target.value })}
            className="w-full px-4 py-2 bg-white border border-[#D9D6CE] font-mono text-[11px] text-[#171717] focus:outline-none focus:border-[#171717]"
          />
        </div>
      </div>
    </section>
  );
}
