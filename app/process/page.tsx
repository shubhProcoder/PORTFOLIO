import type { Metadata } from 'next';
import { ProcessHero } from '@/components/process/ProcessHero';
import { ProcessMap } from '@/components/process/ProcessMap';
import { DecisionLayers } from '@/components/process/DecisionLayers';
import { CaseTraces } from '@/components/process/CaseTraces';
import { PhilosophySection } from '@/components/process/PhilosophySection';
import { ProcessTransition } from '@/components/process/ProcessTransition';

export const metadata: Metadata = {
  title: 'Process & System Blueprint — Shubh Mehrotra',
  description:
    'Architectural blueprint documenting how Shubh Mehrotra investigates, builds, stress-tests, and iterates on complex AI systems.',
};

export default function ProcessPage() {
  return (
    <div className="relative min-h-screen bg-[#06101B] text-[#E2E8F0] selection:bg-[#38BDF8] selection:text-black">
      {/* Background Architectural Drafting Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* Secondary Major Coordinate Grid Lines */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #FFFFFF 1.5px, transparent 1.5px), linear-gradient(to bottom, #FFFFFF 1.5px, transparent 1.5px)',
          backgroundSize: '144px 144px',
        }}
        aria-hidden="true"
      />

      {/* Content Assembly */}
      <div className="relative z-10">
        <ProcessHero />
        <ProcessMap />
        <DecisionLayers />
        <CaseTraces />
        <PhilosophySection />
        <ProcessTransition />
      </div>
    </div>
  );
}
