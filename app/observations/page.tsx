import type { Metadata } from 'next';
import { ObservationArchive } from '@/components/observations/ObservationArchive';
import { getObservations } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Observations & Field Notes — Shubh Mehrotra',
  description:
    'Living computational journal documenting architectural observations, retrieval evaluations, failure modes, and systems research.',
};

export default function ObservationsPage() {
  const observations = getObservations();
  
  if (!observations || observations.length === 0) {
    return (
      <div className="min-h-screen bg-[#F4F3EF] flex items-center justify-center text-[#171717] font-mono tracking-widest text-[11px]">
        NO OBSERVATIONS FOUND IN ARCHIVE
      </div>
    );
  }

  return <ObservationArchive observations={observations} />;
}
