import type { Metadata } from 'next';
import { WorkArchive } from '@/components/work/WorkArchive';

export const metadata: Metadata = {
  title: 'Work & Systems Archive — Shubh Mehrotra',
  description:
    'Technical archive of built AI systems: Hybrid RAG architectures, AgentForge evaluation harnesses, GeoIntel AI, and Daily Sahayak.',
};

export default function WorkPage() {
  return <WorkArchive />;
}
