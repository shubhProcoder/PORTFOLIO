import { getNow } from '@/lib/content';
import { NowEditorial } from '@/components/now/NowEditorial';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now — Shubh Mehrotra',
  description: 'What I am currently building, learning, and investigating.',
};

export default function NowPage() {
  const nowData = getNow();
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#11100F] selection:bg-[#2563EB] selection:text-white pt-24 md:pt-32 pb-24">
      <NowEditorial data={nowData} />
    </main>
  );
}
