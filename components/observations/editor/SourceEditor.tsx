'use client';

import React from 'react';
import { ObservationSource } from '@/lib/schema/observation.schema';

interface SourceEditorProps {
  source?: ObservationSource;
  onChange: (source: ObservationSource) => void;
}

export function SourceEditor({ source, onChange }: SourceEditorProps) {
  const currentSource: ObservationSource = source || {
    kind: 'NATIVE',
    canonicalLocation: 'PORTFOLIO',
    availability: 'AVAILABLE',
  };

  const updateSource = (updates: Partial<ObservationSource>) => {
    onChange({ ...currentSource, ...updates });
  };

  const isExternal = currentSource.kind === 'EXTERNAL';

  return (
    <section className="bg-[#FAFAF7] border border-[#D9D6CE] p-6 sm:p-8 space-y-6">
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#B78318] font-bold pb-2 border-b border-[#D9D6CE]">
        03 / PUBLICATION SOURCE & ORIGIN
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Kind */}
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
            Publication Kind *
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() =>
                updateSource({
                  kind: 'NATIVE',
                  canonicalLocation: 'PORTFOLIO',
                })
              }
              className={`flex-1 py-2 font-mono text-[11px] uppercase tracking-widest border transition-colors ${
                !isExternal
                  ? 'bg-[#171717] text-[#FAFAF7] border-[#171717]'
                  : 'bg-white text-[#6F6D68] border-[#D9D6CE] hover:text-[#171717]'
              }`}
            >
              NATIVE (WRITTEN HERE)
            </button>
            <button
              type="button"
              onClick={() =>
                updateSource({
                  kind: 'EXTERNAL',
                  platform: currentSource.platform || 'LINKEDIN',
                  canonicalLocation: 'EXTERNAL',
                })
              }
              className={`flex-1 py-2 font-mono text-[11px] uppercase tracking-widest border transition-colors ${
                isExternal
                  ? 'bg-[#315EA8] text-[#FAFAF7] border-[#315EA8]'
                  : 'bg-white text-[#6F6D68] border-[#D9D6CE] hover:text-[#315EA8]'
              }`}
            >
              EXTERNAL (LINKEDIN/MEDIUM)
            </button>
          </div>
        </div>

        {/* Canonical Location */}
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
            Canonical Location
          </label>
          <select
            value={currentSource.canonicalLocation}
            onChange={(e) =>
              updateSource({
                canonicalLocation: e.target.value as 'PORTFOLIO' | 'EXTERNAL',
              })
            }
            className="w-full px-4 py-2 bg-white border border-[#D9D6CE] font-mono text-[11px] uppercase tracking-widest text-[#171717] focus:outline-none focus:border-[#171717]"
          >
            <option value="PORTFOLIO">Portfolio (Canonical)</option>
            <option value="EXTERNAL">External Origin (Canonical)</option>
          </select>
        </div>

        {/* If External, Platform and Original URL are required */}
        {isExternal && (
          <>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
                External Platform *
              </label>
              <select
                value={currentSource.platform || 'LINKEDIN'}
                onChange={(e) =>
                  updateSource({
                    platform: e.target.value as 'LINKEDIN' | 'MEDIUM' | 'OTHER',
                  })
                }
                className="w-full px-4 py-2 bg-white border border-[#D9D6CE] font-mono text-[11px] uppercase tracking-widest text-[#171717] focus:outline-none focus:border-[#171717]"
              >
                <option value="LINKEDIN">LinkedIn</option>
                <option value="MEDIUM">Medium</option>
                <option value="OTHER">Other Platform</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
                Original URL *
              </label>
              <input
                type="url"
                value={currentSource.originalUrl || ''}
                onChange={(e) => updateSource({ originalUrl: e.target.value })}
                placeholder="https://linkedin.com/in/shubh/post-..."
                className="w-full px-4 py-2 bg-white border border-[#D9D6CE] font-mono text-[11px] text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>
          </>
        )}

        {/* Availability */}
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#6F6D68] mb-2">
            Source Availability
          </label>
          <select
            value={currentSource.availability}
            onChange={(e) =>
              updateSource({
                availability: e.target.value as
                  | 'AVAILABLE'
                  | 'MOVED'
                  | 'UNAVAILABLE'
                  | 'ARCHIVED',
              })
            }
            className="w-full px-4 py-2 bg-white border border-[#D9D6CE] font-mono text-[11px] uppercase tracking-widest text-[#171717] focus:outline-none focus:border-[#171717]"
          >
            <option value="AVAILABLE">Available</option>
            <option value="MOVED">Moved</option>
            <option value="UNAVAILABLE">Unavailable</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>
    </section>
  );
}
