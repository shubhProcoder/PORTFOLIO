import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getObservations, getObservationBySlug, getRelatedObservations } from '@/lib/content';
import { ObservationDetail } from '@/components/observations/ObservationDetail';

export async function generateStaticParams() {
  const observations = getObservations();
  return observations.map((obs) => ({
    slug: obs.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const observation = getObservationBySlug(slug);

  if (!observation) return {};

  const isExternal = observation.source.kind === 'EXTERNAL';
  const canonicalUrl = isExternal && observation.source.canonicalLocation === 'EXTERNAL' && observation.source.originalUrl
    ? observation.source.originalUrl
    : `https://shubhmehrotra.com/observations/${observation.slug}`;

  return {
    title: `${observation.title} — Shubh Mehrotra`,
    description: observation.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: observation.title,
      description: observation.excerpt,
      type: 'article',
      url: `/observations/${observation.slug}`,
      publishedTime: observation.publishedAt || observation.createdAt,
      modifiedTime: observation.updatedAt || observation.publishedAt || observation.createdAt,
      authors: ['Shubh Mehrotra'],
      tags: observation.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: observation.title,
      description: observation.excerpt,
    },
  };
}

export default async function ObservationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const observations = getObservations();
  const observation = getObservationBySlug(slug);

  if (!observation) {
    notFound();
  }

  const relatedObservations = getRelatedObservations(slug);

  return (
    <ObservationDetail
      observation={observation}
      allObservationsCount={observations.length}
      relatedObservations={relatedObservations}
    />
  );
}

