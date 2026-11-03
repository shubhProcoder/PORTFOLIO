'use client';

import React from 'react';
import { ObservationBlock, EditorialDistinction } from '@/lib/schema/observation.schema';

interface BlockEditorProps {
  blocks: ObservationBlock[];
  onChange: (blocks: ObservationBlock[]) => void;
}

const BLOCK_TYPES: { id: ObservationBlock['type']; label: string }[] = [
  { id: 'observation', label: 'What I Noticed (Observation)' },
  { id: 'context', label: 'Context / Background' },
  { id: 'analysis', label: 'Analysis / Mechanism' },
  { id: 'learning', label: 'What I Learned' },
  { id: 'impact', label: 'Impact on Work / Thinking' },
  { id: 'question', label: 'Open Research Question' },
  { id: 'code', label: 'Code Snippet' },
  { id: 'quote', label: 'Quote / Field Observation' },
  { id: 'image', label: 'Image / Diagram' },
  { id: 'link', label: 'Reference Link' },
];

const EDITORIAL_DISTINCTIONS: { id: EditorialDistinction; label: string }[] = [
  { id: 'PERSONAL_OBSERVATION', label: 'Personal Observation' },
  { id: 'EXPERIMENTAL_RESULT', label: 'Experimental Result' },
  { id: 'SOURCE_DERIVED', label: 'Source Derived' },
  { id: 'INTERPRETATION', label: 'Interpretation / Analysis' },
  { id: 'PROJECT_EVIDENCE', label: 'Project Evidence' },
  { id: 'OPEN_QUESTION', label: 'Open Question' },
];

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const addBlock = (type: ObservationBlock['type']) => {
    const defaultLabels: Record<string, string> = {
      observation: 'WHAT I NOTICED',
      context: 'CONTEXT',
      analysis: 'ANALYSIS',
      learning: 'WHAT I LEARNED',
      impact: 'IMPACT ON MY WORK',
      question: 'OPEN QUESTION',
      code: 'IMPLEMENTATION REFERENCE',
      quote: 'FIELD OBSERVATION',
      image: 'FIGURE',
      link: 'REFERENCE',
    };

    const newBlock: ObservationBlock = {
      type,
      label: defaultLabels[type] || type.toUpperCase(),
      content: '',
      editorial: type === 'learning' ? 'EXPERIMENTAL_RESULT' : 'PERSONAL_OBSERVATION',
    };

    onChange([...blocks, newBlock]);
  };

  const updateBlock = (index: number, updates: Partial<ObservationBlock>) => {
    const updated = [...blocks];
    updated[index] = { ...updated[index], ...updates };
    onChange(updated);
  };

  const removeBlock = (index: number) => {
    const updated = blocks.filter((_, i) => i !== index);
    onChange(updated);
  };

  const moveBlock = (index: number, direction: 'UP' | 'DOWN') => {
    if (
      (direction === 'UP' && index === 0) ||
      (direction === 'DOWN' && index === blocks.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  return (
    <section className="bg-[#FAFAF7] border border-[#D9D6CE] p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-[#D9D6CE]">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#B78318] font-bold">
          02 / STRUCTURED CONTENT BLOCKS ({blocks.length})
        </div>
        <div className="font-mono text-[10px] text-[#6F6D68] uppercase tracking-wider">
          Evidence Units
        </div>
      </div>

      {/* Block List */}
      <div className="space-y-6">
        {blocks.length === 0 ? (
          <div className="py-8 text-center border border-dashed border-[#D9D6CE] font-mono text-[11px] text-[#6F6D68] uppercase tracking-wider">
            No blocks added yet. Click one of the buttons below to add structured content.
          </div>
        ) : (
          blocks.map((block, idx) => (
            <div
              key={idx}
              className="p-5 bg-white border border-[#D9D6CE] shadow-xs space-y-4 transition-all focus-within:border-[#171717]"
            >
              {/* Block Header Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EAE8E1]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#171717] text-[#FAFAF7] font-mono text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#171717] font-semibold">
                    {block.type}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <button
                    type="button"
                    onClick={() => moveBlock(idx, 'UP')}
                    disabled={idx === 0}
                    className="px-2 py-1 bg-[#FAFAF7] border border-[#D9D6CE] text-[#6F6D68] hover:text-[#171717] disabled:opacity-30 disabled:pointer-events-none"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBlock(idx, 'DOWN')}
                    disabled={idx === blocks.length - 1}
                    className="px-2 py-1 bg-[#FAFAF7] border border-[#D9D6CE] text-[#6F6D68] hover:text-[#171717] disabled:opacity-30 disabled:pointer-events-none"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeBlock(idx)}
                    className="px-2.5 py-1 bg-[#FAFAF7] border border-[#D9D6CE] text-red-600 hover:bg-red-50 hover:border-red-300"
                    title="Delete block"
                  >
                    REMOVE
                  </button>
                </div>
              </div>

              {/* Label & Epistemic Distinction */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
                    Block Heading / Label
                  </label>
                  <input
                    type="text"
                    value={block.label || ''}
                    onChange={(e) => updateBlock(idx, { label: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#FAFAF7] border border-[#D9D6CE] font-mono text-[11px] text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
                    Epistemic Distinction (Claim Classification)
                  </label>
                  <select
                    value={block.editorial || 'PERSONAL_OBSERVATION'}
                    onChange={(e) =>
                      updateBlock(idx, {
                        editorial: e.target.value as EditorialDistinction,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-[#FAFAF7] border border-[#D9D6CE] font-mono text-[10px] uppercase tracking-wider text-[#171717] focus:outline-none focus:border-[#171717]"
                  >
                    {EDITORIAL_DISTINCTIONS.map((ed) => (
                      <option key={ed.id} value={ed.id}>
                        {ed.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Type-Specific Content Fields */}
              {block.type === 'code' ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
                        Language
                      </label>
                      <input
                        type="text"
                        value={block.language || ''}
                        onChange={(e) => updateBlock(idx, { language: e.target.value })}
                        placeholder="python, typescript, sql..."
                        className="w-full px-3 py-1.5 bg-[#FAFAF7] border border-[#D9D6CE] font-mono text-[11px] text-[#171717] focus:outline-none focus:border-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
                        Caption
                      </label>
                      <input
                        type="text"
                        value={block.caption || ''}
                        onChange={(e) => updateBlock(idx, { caption: e.target.value })}
                        placeholder="e.g. Reciprocal Rank Fusion implementation"
                        className="w-full px-3 py-1.5 bg-[#FAFAF7] border border-[#D9D6CE] font-mono text-[11px] text-[#171717] focus:outline-none focus:border-[#171717]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
                      Code Snippet
                    </label>
                    <textarea
                      rows={6}
                      value={block.content || ''}
                      onChange={(e) => updateBlock(idx, { content: e.target.value })}
                      placeholder="def reciprocal_rank_fusion(rankings, k=60): ..."
                      className="w-full px-3 py-2 bg-[#171717] text-[#FAFAF7] font-mono text-[12px] leading-relaxed border border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#B78318]"
                    />
                  </div>
                </div>
              ) : block.type === 'quote' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
                      Quote Text
                    </label>
                    <textarea
                      rows={3}
                      value={block.content || ''}
                      onChange={(e) => updateBlock(idx, { content: e.target.value })}
                      placeholder="Enter quote or cited principle..."
                      className="w-full px-3 py-2 bg-[#FAFAF7] border border-[#D9D6CE] font-editorial italic text-[16px] text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
                      Attribution
                    </label>
                    <input
                      type="text"
                      value={block.attribution || ''}
                      onChange={(e) => updateBlock(idx, { attribution: e.target.value })}
                      placeholder="e.g. Don Norman, The Design of Everyday Things"
                      className="w-full px-3 py-1.5 bg-[#FAFAF7] border border-[#D9D6CE] font-sans text-[13px] text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>
              ) : block.type === 'image' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
                      Image URL (src)
                    </label>
                    <input
                      type="text"
                      value={block.src || ''}
                      onChange={(e) => updateBlock(idx, { src: e.target.value })}
                      placeholder="/images/observations/diagram.png"
                      className="w-full px-3 py-1.5 bg-[#FAFAF7] border border-[#D9D6CE] font-mono text-[11px] text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
                      Alt Text
                    </label>
                    <input
                      type="text"
                      value={block.alt || ''}
                      onChange={(e) => updateBlock(idx, { alt: e.target.value })}
                      placeholder="Architecture diagram of hybrid retrieval pipeline"
                      className="w-full px-3 py-1.5 bg-[#FAFAF7] border border-[#D9D6CE] font-sans text-[13px] text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>
              ) : block.type === 'link' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
                      Target URL
                    </label>
                    <input
                      type="text"
                      value={block.url || ''}
                      onChange={(e) => updateBlock(idx, { url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 bg-[#FAFAF7] border border-[#D9D6CE] font-mono text-[11px] text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
                      Link Text
                    </label>
                    <input
                      type="text"
                      value={block.linkText || ''}
                      onChange={(e) => updateBlock(idx, { linkText: e.target.value })}
                      placeholder="Read paper on RRF"
                      className="w-full px-3 py-1.5 bg-[#FAFAF7] border border-[#D9D6CE] font-sans text-[13px] text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
                    Body Prose Content
                  </label>
                  <textarea
                    rows={4}
                    value={block.content || ''}
                    onChange={(e) => updateBlock(idx, { content: e.target.value })}
                    placeholder="Write detailed analysis, concrete technical observations, or empirical evidence..."
                    className="w-full px-3 py-2 bg-[#FAFAF7] border border-[#D9D6CE] font-sans text-[14px] leading-relaxed text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Block Toolbar */}
      <div className="pt-4 border-t border-[#D9D6CE]">
        <div className="font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-3">
          + ADD EVIDENCE BLOCK
        </div>
        <div className="flex flex-wrap gap-2">
          {BLOCK_TYPES.map((bt) => (
            <button
              key={bt.id}
              type="button"
              onClick={() => addBlock(bt.id)}
              className="px-3 py-1.5 bg-white border border-[#D9D6CE] font-mono text-[10px] uppercase tracking-wider text-[#171717] hover:bg-[#171717] hover:text-[#FAFAF7] transition-colors"
            >
              + {bt.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
