import type { Metadata } from 'next';
import { ObservationReader } from '@/components/observations/ObservationReader';

export const metadata: Metadata = {
  title: 'Observations & Field Notes — Shubh Mehrotra',
  description:
    'Living computational journal documenting architectural observations, retrieval evaluations, failure modes, and systems research.',
};

export default function ObservationsPage() {
  return <ObservationReader />;
}
