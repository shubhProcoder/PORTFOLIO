import { getPerson, getJourney } from '@/lib/content';
import { AboutEditorial } from '@/components/about/AboutEditorial';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Shubh Mehrotra',
  description: 'AI Product Builder & Software Engineer.',
};

export default function AboutPage() {
  const person = getPerson();
  const journey = getJourney();
  
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#11100F] selection:bg-[#2563EB] selection:text-white pt-24 md:pt-32 pb-24">
      <AboutEditorial person={person} journey={journey} />
    </main>
  );
}
