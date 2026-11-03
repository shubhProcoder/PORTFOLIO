'use client';

import Link from 'next/link';
import { ObservationCanvas } from './ObservationCanvas';
import { HydratedObservation, ObservationBlock } from '@/lib/schema/observation.schema';

interface ObservationDetailProps {
  observation: HydratedObservation;
  allObservationsCount: number;
  relatedObservations?: HydratedObservation[];
}

export function ObservationDetail({
  observation,
  allObservationsCount: _count,
  relatedObservations = [],
}: ObservationDetailProps) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
  };

  const formatType = (type: string) => type.replace(/_/g, ' ');

  const formatEditorial = (editorial?: string) => {
    if (!editorial) return null;
    return editorial.replace(/_/g, ' ');
  };

  const getTheme = (obs: HydratedObservation): 'retrieval' | 'planning' => {
    if (obs.tags.includes('planning-systems') || obs.tags.includes('product-design')) return 'planning';
    return 'retrieval';
  };

  const renderBlock = (block: ObservationBlock, idx: number) => {
    switch (block.type) {
      case 'code':
        return (
          <section key={idx} className="my-10" aria-label={block.label || 'Code implementation'}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-editorial text-2xl font-normal text-[#171717] leading-snug uppercase tracking-widest text-[14px]">
                {block.label || 'IMPLEMENTATION'}
              </h3>
              {block.language && (
                <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 border border-[#D9D6CE] text-[#6F6D68]">
                  {block.language}
                </span>
              )}
            </div>
            <div className="bg-[#171717] rounded-sm p-6 overflow-x-auto border border-[#171717] focus-within:ring-1 focus-within:ring-[#B78318]">
              <pre className="font-mono text-[13px] leading-[1.6] text-[#EFECE4] tab-4">
                <code>{block.content}</code>
              </pre>
            </div>
            {block.caption && (
              <p className="mt-3 font-mono text-[10px] tracking-wide text-[#6F6D68] uppercase">
                {block.caption}
              </p>
            )}
          </section>
        );
      
      case 'quote':
        return (
          <section key={idx} className="my-12 pl-6 md:pl-10 border-l-2 border-[#B78318]">
            {block.label && (
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#B78318] mb-3">
                {block.label}
              </div>
            )}
            <blockquote className="font-editorial text-2xl md:text-3xl text-[#171717] italic leading-relaxed">
              {block.content}
            </blockquote>
            {block.attribution && (
              <p className="mt-4 font-sans text-[15px] text-[#6F6D68] font-medium">
                — {block.attribution}
              </p>
            )}
          </section>
        );

      case 'image':
        return (
          <figure key={idx} className="my-12">
            {block.src && (
              <img
                src={block.src}
                alt={block.alt || block.caption || 'Observation media'}
                className="w-full h-auto border border-[#D9D6CE] rounded-sm"
                loading="lazy"
              />
            )}
            {(block.caption || block.label) && (
              <figcaption className="mt-3 font-mono text-[10px] tracking-wide text-[#6F6D68] uppercase">
                {block.label && <span className="font-bold text-[#171717] mr-2">[{block.label}]</span>}
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'link':
        return (
          <div key={idx} className="my-8 p-4 bg-[#FAFAF7] border border-[#D9D6CE] flex items-center justify-between">
            <span className="font-sans text-[15px] text-[#171717] font-medium">
              {block.content || block.label || 'Reference Link'}
            </span>
            {block.url && (
              <a
                href={block.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-widest text-[#315EA8] hover:text-[#171717] flex items-center gap-1.5 focus:outline-none focus:underline"
              >
                <span>{block.linkText || 'VISIT REFERENCE'}</span>
                <span>↗</span>
              </a>
            )}
          </div>
        );

      default:
        // context, observation, analysis, learning, impact, question
        return (
          <section key={idx} className="my-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3 className="font-editorial text-xl font-normal text-[#171717] leading-snug tracking-[0.08em] uppercase border-b border-[#D9D6CE] pb-1 inline-block">
                {block.label || block.type.toUpperCase()}
              </h3>
              {block.editorial && (
                <span className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 bg-[#EAE8E1] border border-[#D9D6CE] text-[#6F6D68]">
                  {formatEditorial(block.editorial)}
                </span>
              )}
            </div>
            <p className="font-sans text-[#4A4641] text-[17px] md:text-[18px] leading-[1.85] whitespace-pre-wrap max-w-3xl">
              {block.content}
            </p>
          </section>
        );
    }
  };

  const isExternal = observation.source.kind === 'EXTERNAL';

  return (
    <div className="relative min-h-screen bg-[#F4F3EF] text-[#171717] selection:bg-[#315EA8]/20 selection:text-[#315EA8]">
      
      {/* Background canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <ObservationCanvas activeTheme={getTheme(observation)} />
      </div>

      <main className="relative z-10 max-w-[800px] mx-auto px-6 md:px-12 pt-32 pb-32">
        
        {/* Navigation & Breadcrumbs */}
        <div className="mb-16">
          <Link
            href="/observations"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#6F6D68] hover:text-[#171717] focus:outline-none focus:underline transition-colors mb-8"
          >
            <span className="text-[#315EA8]">←</span> BACK TO ARCHIVE
          </Link>
          
          <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#6F6D68] mb-4">
            <span className="text-[#B78318] font-bold">OBSERVATION / {observation.slug.substring(0, 8)}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 border border-[#D9D6CE] bg-[#FAFAF7] font-mono text-[9px] uppercase tracking-widest text-[#171717]">
              {formatType(observation.type)}
            </span>
            {isExternal && (
              <span className="px-3 py-1 border border-[#315EA8]/30 bg-[#315EA8]/5 text-[#315EA8] font-mono text-[9px] uppercase tracking-widest">
                EXTERNAL PUBLICATION
              </span>
            )}
          </div>
        </div>

        {/* Title Block */}
        <header className="mb-16">
          <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl font-normal text-[#171717] leading-[1.05] tracking-tight mb-8">
            {observation.title}
          </h1>
          
          {observation.subtitle && (
            <p className="font-sans text-[20px] md:text-[22px] text-[#6F6D68] leading-[1.5] max-w-2xl mb-10">
              {observation.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[10px] tracking-widest text-[#6F6D68] uppercase border-y border-[#D9D6CE] py-4">
            <span>PUBLISHED {formatDate(observation.publishedAt || observation.createdAt)}</span>
            {observation.updatedAt && (
              <>
                <span className="text-[#D9D6CE]">|</span>
                <span>UPDATED {formatDate(observation.updatedAt)}</span>
              </>
            )}
            {isExternal && observation.source.platform && (
              <>
                <span className="text-[#D9D6CE]">|</span>
                <span>ORIGINALLY ON {observation.source.platform}</span>
              </>
            )}
            <span className="text-[#D9D6CE]">|</span>
            <span>{Math.ceil(observation.excerpt.length / 50 + observation.blocks.reduce((acc, b) => acc + (b.content?.length || 0), 0) / 1000)} MIN READ</span>
          </div>
        </header>

        {/* Article Body */}
        <article className="bg-transparent">
          {/* Abstract */}
          {observation.excerpt && (
            <div className="mb-16">
              <p className="text-[#171717] font-sans text-[19px] md:text-[21px] font-medium leading-[1.65] max-w-3xl">
                {observation.excerpt}
              </p>
            </div>
          )}

          {/* Dynamic Blocks */}
          <div className="space-y-4">
            {observation.blocks.map((block, idx) => renderBlock(block, idx))}
          </div>

          {/* Unresolved Hypothesis */}
          {observation.editorial?.keyQuestion && (
            <div className="mt-20 border border-[#B78318]/30 bg-[#B78318]/[0.02] p-8 md:p-10">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#B78318] font-bold mb-6">
                UNRESOLVED RESEARCH HYPOTHESIS
              </div>
              <p className="font-editorial text-[#171717] text-2xl md:text-3xl leading-relaxed italic mb-6">
                &ldquo;{observation.editorial.keyQuestion}&rdquo;
              </p>
              {observation.editorial.hypothesis && (
                <p className="font-sans text-[15px] md:text-[16px] text-[#6F6D68] leading-relaxed max-w-2xl">
                  <span className="font-bold text-[#171717] uppercase tracking-wide text-[11px] mr-2">Hypothesis:</span>
                  {observation.editorial.hypothesis}
                </p>
              )}
            </div>
          )}

          {/* Footer Metadata & Relationships */}
          <footer className="mt-24 pt-12 border-t border-[#D9D6CE]">
            {isExternal && observation.source.originalUrl && (
              <div className="mb-16 p-8 bg-[#FAFAF7] border border-[#D9D6CE] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#6F6D68] mb-2">
                    ORIGINAL PUBLICATION
                  </div>
                  <div className="font-sans text-[18px] text-[#171717] font-medium">
                    {observation.source.platform || 'External Platform'}
                  </div>
                </div>
                <a 
                  href={observation.source.originalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#171717] text-white font-mono text-[11px] uppercase tracking-widest hover:bg-[#315EA8] focus:outline-none focus:ring-2 focus:ring-[#171717] transition-colors"
                >
                  OPEN ORIGINAL ↗
                </a>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-[11px]">
              {/* RELATED WORK */}
              {observation.relatedProjects && observation.relatedProjects.length > 0 && (
                <div>
                  <div className="uppercase tracking-[0.18em] text-[#6F6D68] mb-4 text-[10px]">
                    RELATED WORK
                  </div>
                  <div className="space-y-3">
                    {observation.relatedProjects.map(projectSlug => (
                      <Link
                        key={projectSlug}
                        href={`/work/${projectSlug}`}
                        className="flex items-center gap-2 text-[#315EA8] hover:text-[#171717] font-bold tracking-wide transition-colors group focus:outline-none focus:underline"
                      >
                        <span className="w-4 h-px bg-current" />
                        <span>{projectSlug.replace(/-/g, ' ').toUpperCase()}</span>
                        <span className="text-[#D9D6CE] group-hover:text-[#315EA8] transition-colors">↗</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* RELATED EXPERIMENTS (Phase O7) */}
              {observation.relatedLabs && observation.relatedLabs.length > 0 && (
                <div>
                  <div className="uppercase tracking-[0.18em] text-[#6F6D68] mb-4 text-[10px]">
                    RELATED EXPERIMENT
                  </div>
                  <div className="space-y-3">
                    {observation.relatedLabs.map(labSlug => (
                      <Link
                        key={labSlug}
                        href="/labs"
                        className="flex items-center gap-2 text-[#B78318] hover:text-[#171717] font-bold tracking-wide transition-colors group focus:outline-none focus:underline"
                      >
                        <span className="w-4 h-px bg-current" />
                        <span>{labSlug.replace(/-/g, ' ').toUpperCase()}</span>
                        <span className="text-[#D9D6CE] group-hover:text-[#B78318] transition-colors">↗</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* RELATED THINKING / OBSERVATIONS (Phase O7) */}
              {relatedObservations && relatedObservations.length > 0 && (
                <div className="md:col-span-2 border-t border-[#D9D6CE] pt-8">
                  <div className="uppercase tracking-[0.18em] text-[#6F6D68] mb-4 text-[10px]">
                    RELATED THINKING
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedObservations.map(rel => (
                      <Link
                        key={rel.slug}
                        href={`/observations/${rel.slug}`}
                        className="p-4 bg-[#FAFAF7] border border-[#D9D6CE] hover:border-[#171717]/40 transition-colors group focus:outline-none focus:ring-1 focus:ring-[#171717]"
                      >
                        <div className="font-mono text-[9px] uppercase tracking-widest text-[#B78318] mb-1">
                          {formatType(rel.type)}
                        </div>
                        <div className="font-editorial text-[17px] text-[#171717] group-hover:text-[#315EA8] transition-colors">
                          {rel.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* RELEVANT PRIMITIVES */}
              {observation.relatedTechnologies && observation.relatedTechnologies.length > 0 && (
                <div className="md:col-span-2">
                  <div className="uppercase tracking-[0.18em] text-[#6F6D68] mb-4 text-[10px]">
                    RELEVANT PRIMITIVES
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {observation.relatedTechnologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 border border-[#D9D6CE] text-[#6F6D68] text-[9px] tracking-widest uppercase bg-[#FAFAF7]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}

