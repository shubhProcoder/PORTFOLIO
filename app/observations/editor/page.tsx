import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllObservations, getProjects, getLabExperiments } from '@/lib/content';
import { ObservationEditor } from '@/components/observations/editor/ObservationEditor';

export const metadata: Metadata = {
  title: 'Observation Authoring Studio — Shubh Mehrotra',
  description: 'Internal authoring interface for structured observations, research notes, and external publications.',
  robots: {
    index: false,
    follow: false,
  },
};

interface EditorPageProps {
  searchParams: Promise<{ slug?: string }>;
}

export default async function ObservationEditorPage({ searchParams }: EditorPageProps) {
  const params = await searchParams;
  const currentSlug = params.slug;

  const allObservations = getAllObservations();
  const projects = getProjects().map(p => p.slug || p.id || p.title.toLowerCase().replace(/\s+/g, '-'));
  const labs = getLabExperiments().map(l => l.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));

  const existingObservation = currentSlug
    ? allObservations.find(o => o.slug === currentSlug)
    : undefined;

  return (
    <div className="min-h-screen bg-[#F4F3EF] pt-8">
      {/* Top Bar for Switcher */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-6">
        <div className="p-4 bg-[#FAFAF7] border border-[#D9D6CE] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#B78318] font-bold">
              DOCUMENT:
            </span>
            <span className="font-mono text-[12px] font-semibold text-[#171717]">
              {existingObservation ? existingObservation.title : 'NEW OBSERVATION (UNSAVED)'}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
            <Link
              href="/observations/editor"
              className={`px-3 py-1.5 border transition-colors ${
                !currentSlug
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-white text-[#6F6D68] border-[#D9D6CE] hover:text-[#171717]'
              }`}
            >
              + NEW RECORD
            </Link>

            {allObservations.map((obs) => (
              <Link
                key={obs.slug}
                href={`/observations/editor?slug=${obs.slug}`}
                className={`px-2.5 py-1.5 border transition-colors ${
                  currentSlug === obs.slug
                    ? 'bg-[#315EA8] text-white border-[#315EA8]'
                    : 'bg-white text-[#6F6D68] border-[#D9D6CE] hover:text-[#171717]'
                }`}
              >
                {obs.slug.substring(0, 16)}..
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ObservationEditor
        key={currentSlug || 'new'}
        initialObservation={existingObservation}
        existingObservations={allObservations.map(o => ({ slug: o.slug, title: o.title }))}
        knownProjectSlugs={projects}
        knownLabSlugs={labs}
      />
    </div>
  );
}
