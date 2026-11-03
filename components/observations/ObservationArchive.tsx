'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { HydratedObservation } from '@/lib/schema/observation.schema';
import { ObservationCanvas } from './ObservationCanvas';

interface ObservationArchiveProps {
  observations: HydratedObservation[];
}

const FILTERS = [
  { id: 'ALL', label: 'ALL' },
  { id: 'TECH', label: 'TECH' },
  { id: 'BUSINESS', label: 'BUSINESS' },
  { id: 'LEARNING', label: 'LEARNING' },
  { id: 'FIELD_NOTES', label: 'FIELD NOTES' },
  { id: 'EXTERNAL', label: 'EXTERNAL' }
];

export function ObservationArchive({ observations }: ObservationArchiveProps) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const matchesFilter = (obs: HydratedObservation, filter: string) => {
    if (filter === 'ALL') return true;
    if (filter === 'TECH' && obs.type === 'TECHNICAL_NOTE') return true;
    if (filter === 'BUSINESS' && (obs.type === 'BUSINESS_PRODUCT_NOTE' || obs.type === 'CASE_STUDY')) return true;
    if (filter === 'LEARNING' && obs.type === 'LEARNING') return true;
    if (filter === 'FIELD_NOTES' && obs.type === 'FIELD_NOTE') return true;
    if (filter === 'EXTERNAL' && (obs.type === 'EXTERNAL_PUBLICATION' || obs.source.kind === 'EXTERNAL')) return true;
    return false;
  };

  const matchesSearch = (obs: HydratedObservation, query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    if (obs.title.toLowerCase().includes(q)) return true;
    if (obs.subtitle && obs.subtitle.toLowerCase().includes(q)) return true;
    if (obs.excerpt.toLowerCase().includes(q)) return true;
    if (obs.tags.some(t => t.toLowerCase().includes(q))) return true;
    if (obs.blocks.some(b => b.content && b.content.toLowerCase().includes(q))) return true;
    return false;
  };

  const filtered = observations.filter(
    obs => matchesFilter(obs, activeFilter) && matchesSearch(obs, searchQuery)
  );
  
  // Take the first observation as featured only when in ALL and not searching
  const isSearchActive = searchQuery.trim().length > 0;
  const featured = (activeFilter === 'ALL' && !isSearchActive) ? filtered[0] : null;
  
  // The rest are latest (excluding featured if it's shown)
  const latestList = (activeFilter === 'ALL' && !isSearchActive) ? filtered.slice(1) : filtered;

  const formatType = (type: string) => type.replace(/_/g, ' ');
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
  };

  return (
    <div className="relative min-h-screen bg-[#F4F3EF] text-[#171717] selection:bg-[#315EA8]/20 selection:text-[#315EA8]">
      
      {/* Background canvas for aesthetic feel */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <ObservationCanvas activeTheme="retrieval" />
      </div>

      <main className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-32">
        
        {/* Header */}
        <header className="mb-14">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B78318] font-bold mb-4">
            FIELD LOG & ARCHIVE
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl font-normal tracking-tight text-[#171717] mb-6">
            Observations
          </h1>
          <p className="font-sans text-[17px] text-[#6F6D68] max-w-xl leading-relaxed">
            Things I&apos;m noticing, breaking down, testing, and carrying into my work.
          </p>
        </header>

        {/* Controls: Search & Filters */}
        <div className="mb-16 space-y-6">
          {/* Search bar */}
          <div role="search" className="relative">
            <label htmlFor="observation-search" className="sr-only">
              Search observations
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 font-mono text-[12px] text-[#6F6D68] pointer-events-none">
                ⌕
              </span>
              <input
                id="observation-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search observations by keyword, topic, or concept..."
                className="w-full pl-10 pr-10 py-3 bg-[#FAFAF7] border border-[#D9D6CE] font-mono text-[12px] text-[#171717] placeholder:text-[#9E9B93] focus:outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-4 font-mono text-[11px] text-[#6F6D68] hover:text-[#171717] focus:outline-none"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D9D6CE]">
            <nav aria-label="Filter observations by category" className="flex flex-wrap items-center gap-2">
              {FILTERS.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={activeFilter === filter.id}
                  className={`px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors focus:outline-none focus:ring-1 focus:ring-[#171717] ${
                    activeFilter === filter.id 
                      ? 'bg-[#171717] text-[#F4F3EF]' 
                      : 'text-[#6F6D68] hover:text-[#171717] hover:bg-[#D9D6CE]/40'
                  }`}
                >
                  [{filter.label}]
                </button>
              ))}
            </nav>

            <div className="font-mono text-[10px] tracking-widest text-[#6F6D68] uppercase">
              {filtered.length} {filtered.length === 1 ? 'RECORD' : 'RECORDS'} FOUND
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${searchQuery}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-24"
          >
            {/* FEATURED SECTION (Only visible on ALL) */}
            {featured && (
              <section>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#B78318] font-bold mb-8">
                  FEATURED
                </div>
                
                <Link 
                  href={`/observations/${featured.slug}`}
                  className="block group bg-[#FAFAF7] border border-[#D9D6CE] p-8 md:p-12 transition-colors hover:border-[#171717]/30"
                >
                  <div className="flex flex-col md:flex-row gap-8 md:items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4 font-mono text-[10px] uppercase tracking-widest">
                        <span className="text-[#315EA8]">{formatType(featured.type)}</span>
                        <span className="text-[#D9D6CE]">—</span>
                        <span className="text-[#6F6D68]">{formatDate(featured.publishedAt)}</span>
                      </div>
                      <h2 className="font-editorial text-3xl md:text-4xl text-[#171717] leading-snug mb-4 group-hover:text-[#315EA8] transition-colors">
                        {featured.title}
                      </h2>
                      <p className="font-sans text-[16px] text-[#6F6D68] leading-[1.6] max-w-2xl line-clamp-3">
                        {featured.excerpt}
                      </p>
                    </div>
                    {featured.source.kind === 'EXTERNAL' && (
                      <div className="hidden md:block px-3 py-1 bg-[#ECEAE4] border border-[#D9D6CE] font-mono text-[9px] uppercase tracking-widest text-[#6F6D68]">
                        EXTERNAL
                      </div>
                    )}
                  </div>
                </Link>
              </section>
            )}

            {/* LATEST SECTION */}
            <section>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6F6D68] mb-8 border-b border-[#D9D6CE] pb-4">
                LATEST
              </div>
              
              <div className="space-y-0">
                {latestList.length === 0 ? (
                  <div className="py-12 text-center font-mono text-[11px] uppercase tracking-widest text-[#6F6D68]">
                    No observations found for this filter.
                  </div>
                ) : (
                  latestList.map((obs, idx) => {
                    const globalIdx = observations.findIndex(o => o.id === obs.id || o.slug === obs.slug);
                    const displayNum = String(observations.length - globalIdx).padStart(3, '0');
                    
                    return (
                      <Link
                        key={obs.slug}
                        href={`/observations/${obs.slug}`}
                        className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-8 border-b border-[#D9D6CE] transition-colors hover:bg-[#FAFAF7]/50"
                      >
                        {/* Number & Type */}
                        <div className="w-48 flex-shrink-0">
                          <div className="font-mono text-[11px] font-bold tracking-[0.15em] text-[#B78318] mb-1">
                            {displayNum}
                          </div>
                          <div className="font-mono text-[9px] uppercase tracking-widest text-[#6F6D68]">
                            {formatType(obs.type)}
                          </div>
                        </div>

                        {/* Title & Summary */}
                        <div className="flex-1">
                          <h3 className="font-editorial text-xl sm:text-2xl text-[#171717] leading-snug mb-2 group-hover:text-[#315EA8] transition-colors">
                            {obs.title}
                          </h3>
                          {obs.subtitle && (
                            <p className="font-sans text-[15px] text-[#6F6D68] leading-relaxed line-clamp-2">
                              {obs.subtitle}
                            </p>
                          )}
                        </div>
                        
                        {/* Source Tag */}
                        {obs.source.kind === 'EXTERNAL' && (
                          <div className="hidden sm:block flex-shrink-0 mt-1">
                            <span className="px-2 py-1 bg-white/50 border border-[#D9D6CE] font-mono text-[9px] uppercase tracking-widest text-[#6F6D68]">
                              {obs.source.platform || 'EXTERNAL'} ↗
                            </span>
                          </div>
                        )}
                      </Link>
                    );
                  })
                )}
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
