'use client';

import React from 'react';
import { Observation } from '@/lib/schema/observation.schema';

interface RelationshipEditorProps {
  observation: Partial<Observation>;
  onChange: (updates: Partial<Observation>) => void;
  knownProjectSlugs?: string[];
  knownLabSlugs?: string[];
  existingObservations?: { slug: string; title: string }[];
}

export function RelationshipEditor({
  observation,
  onChange,
  knownProjectSlugs = ['enterprise-hybrid-rag', 'agentforge', 'daily-sahayak', 'geointel-ai'],
  knownLabSlugs = ['exp-01-rrf-vs-weighted-fusion', 'exp-02-local-embedding-latency'],
  existingObservations = [],
}: RelationshipEditorProps) {
  const toggleProject = (slug: string) => {
    const current = observation.relatedProjects || [];
    const updated = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    onChange({ relatedProjects: updated });
  };

  const toggleLab = (slug: string) => {
    const current = observation.relatedLabs || [];
    const updated = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    onChange({ relatedLabs: updated });
  };

  const toggleObservation = (slug: string) => {
    const current = observation.relatedObservations || [];
    const updated = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    onChange({ relatedObservations: updated });
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const relatedTechnologies = raw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    onChange({ relatedTechnologies });
  };

  const updateEditorial = (field: 'keyQuestion' | 'hypothesis', value: string) => {
    onChange({
      editorial: {
        ...observation.editorial,
        [field]: value,
      },
    });
  };

  return (
    <section className="bg-[#FAFAF7] border border-[#D9D6CE] p-6 sm:p-8 space-y-8">
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#B78318] font-bold pb-2 border-b border-[#D9D6CE]">
        04 / RELATIONSHIP LAYER & EDITORIAL HYPOTHESIS
      </div>

      {/* Editorial Hypothesis Section */}
      <div className="space-y-4 p-5 bg-white border border-[#D9D6CE]">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#B78318] font-semibold">
          Epistemic Boundary & Unresolved Research Hypothesis
        </div>

        <div>
          <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
            Key Unresolved Question
          </label>
          <input
            type="text"
            value={observation.editorial?.keyQuestion || ''}
            onChange={(e) => updateEditorial('keyQuestion', e.target.value)}
            placeholder="e.g. Can sub-50ms speculative reranking supersede heavy cross-encoders?"
            className="w-full px-3 py-2 bg-[#FAFAF7] border border-[#D9D6CE] font-editorial italic text-[16px] text-[#171717] focus:outline-none focus:border-[#171717]"
          />
        </div>

        <div>
          <label className="block font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] mb-1">
            Falsifiable Working Hypothesis
          </label>
          <textarea
            rows={2}
            value={observation.editorial?.hypothesis || ''}
            onChange={(e) => updateEditorial('hypothesis', e.target.value)}
            placeholder="e.g. Reranking precision is bounded not by model quality but by chunking granularity..."
            className="w-full px-3 py-2 bg-[#FAFAF7] border border-[#D9D6CE] font-sans text-[14px] text-[#171717] focus:outline-none focus:border-[#171717]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Connected Projects */}
        <div className="space-y-3">
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68]">
            Connected Projects (Related Work)
          </label>
          <div className="flex flex-wrap gap-2">
            {knownProjectSlugs.map((slug) => {
              const isSelected = (observation.relatedProjects || []).includes(slug);
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => toggleProject(slug)}
                  className={`px-3 py-1 font-mono text-[10px] uppercase tracking-wider border transition-colors ${
                    isSelected
                      ? 'bg-[#315EA8] text-white border-[#315EA8]'
                      : 'bg-white text-[#6F6D68] border-[#D9D6CE] hover:border-[#171717]'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {slug}
                </button>
              );
            })}
          </div>
        </div>

        {/* Connected Labs */}
        <div className="space-y-3">
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68]">
            Connected Labs (Related Experiments)
          </label>
          <div className="flex flex-wrap gap-2">
            {knownLabSlugs.map((slug) => {
              const isSelected = (observation.relatedLabs || []).includes(slug);
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => toggleLab(slug)}
                  className={`px-3 py-1 font-mono text-[10px] uppercase tracking-wider border transition-colors ${
                    isSelected
                      ? 'bg-[#B78318] text-white border-[#B78318]'
                      : 'bg-white text-[#6F6D68] border-[#D9D6CE] hover:border-[#171717]'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {slug}
                </button>
              );
            })}
          </div>
        </div>

        {/* Connected Observations */}
        {existingObservations.length > 0 && (
          <div className="md:col-span-2 space-y-3">
            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68]">
              Connected Observations (Related Thinking)
            </label>
            <div className="flex flex-wrap gap-2">
              {existingObservations
                .filter((o) => o.slug !== observation.slug)
                .map((obs) => {
                  const isSelected = (observation.relatedObservations || []).includes(obs.slug);
                  return (
                    <button
                      key={obs.slug}
                      type="button"
                      onClick={() => toggleObservation(obs.slug)}
                      className={`px-3 py-1 font-mono text-[10px] tracking-wider border transition-colors ${
                        isSelected
                          ? 'bg-[#171717] text-[#FAFAF7] border-[#171717]'
                          : 'bg-white text-[#6F6D68] border-[#D9D6CE] hover:border-[#171717]'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {obs.title.substring(0, 32)}...
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        {/* Related Technologies */}
        <div className="md:col-span-2">
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
            Relevant Primitives & Technologies (comma separated)
          </label>
          <input
            type="text"
            value={(observation.relatedTechnologies || []).join(', ')}
            onChange={handleTechChange}
            placeholder="LlamaIndex, BM25, ChromaDB, FastAPI, Python"
            className="w-full px-4 py-2 bg-white border border-[#D9D6CE] font-mono text-[11px] text-[#171717] focus:outline-none focus:border-[#171717]"
          />
        </div>
      </div>
    </section>
  );
}
