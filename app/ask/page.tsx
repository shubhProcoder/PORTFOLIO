import type { Metadata } from 'next';
import { retrieve, getExampleQueries, getIndexStats } from '@/lib/knowledge';
import { AskTerminal } from '@/components/ask/AskTerminal';

export const metadata: Metadata = {
  title: 'Ask My Portfolio — Shubh Mehrotra',
  description:
    'Query the systems, architectures, engineering trade-offs, and failure modes behind this site. Every answer is grounded in published YAML source files.',
  openGraph: {
    title: 'Ask My Portfolio — Knowledge Interface',
    description: 'Query the work, thinking, experiments, and systems behind this site.',
    type: 'website',
  },
};

interface AskPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AskPage({ searchParams }: AskPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() || '';
  const result = query ? retrieve(query) : null;
  const exampleQueries = getExampleQueries();
  const indexStats = getIndexStats();

  return (
    <AskTerminal
      initialQuery={query}
      result={result}
      exampleQueries={exampleQueries}
      indexStats={indexStats}
    />
  );
}
