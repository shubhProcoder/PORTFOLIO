import type { Metadata } from 'next';
import { LabsInstrument } from '@/components/labs/LabsInstrument';

export const metadata: Metadata = {
  title: 'Computational Laboratory — Shubh Mehrotra',
  description:
    'Experimental sandbox for testing AI hypotheses, architectural assumptions, and retrieval limits.',
};

export default function LabsPage() {
  return <LabsInstrument />;
}
