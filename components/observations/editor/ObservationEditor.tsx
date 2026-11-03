'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { HydratedObservation, Observation } from '@/lib/schema/observation.schema';
import { validateObservation, PublicationReadinessReport } from '@/lib/validation/observation-validator';
import { MetadataEditor } from './MetadataEditor';
import { BlockEditor } from './BlockEditor';
import { SourceEditor } from './SourceEditor';
import { RelationshipEditor } from './RelationshipEditor';
import { EditorialChecklist } from './EditorialChecklist';
import { PublishControls } from './PublishControls';
import { ObservationDetail } from '../ObservationDetail';

interface ObservationEditorProps {
  initialObservation?: Partial<Observation>;
  existingObservations?: { slug: string; title: string }[];
  knownProjectSlugs?: string[];
  knownLabSlugs?: string[];
  onSaveSuccess?: (observation: Observation) => void;
}

export function ObservationEditor({
  initialObservation,
  existingObservations = [],
  knownProjectSlugs = ['enterprise-hybrid-rag', 'agentforge', 'daily-sahayak', 'geointel-ai'],
  knownLabSlugs = ['exp-01-rrf-vs-weighted-fusion', 'exp-02-local-embedding-latency'],
  onSaveSuccess,
}: ObservationEditorProps) {
  const [observation, setObservation] = useState<Partial<Observation>>(() => {
    return (
      initialObservation || {
        title: '',
        subtitle: '',
        excerpt: '',
        type: 'TECHNICAL_NOTE',
        status: 'DRAFT',
        createdAt: new Date().toISOString().split('T')[0],
        source: {
          kind: 'NATIVE',
          canonicalLocation: 'PORTFOLIO',
          availability: 'AVAILABLE',
        },
        blocks: [],
        tags: [],
        relatedProjects: [],
        relatedLabs: [],
        relatedObservations: [],
        relatedTechnologies: [],
        editorial: {
          keyQuestion: '',
          hypothesis: '',
        },
        draft: true,
      }
    );
  });

  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Compute live validation report
  const report: PublicationReadinessReport = useMemo(() => {
    return validateObservation(observation, {
      existingSlugs: existingObservations.map((o) => o.slug),
      currentSlug: observation.slug,
      knownProjectSlugs,
      knownLabSlugs,
    });
  }, [observation, existingObservations, knownProjectSlugs, knownLabSlugs]);

  const updateObservation = (updates: Partial<Observation>) => {
    setObservation((prev) => ({ ...prev, ...updates }));
    setMessage(null);
  };

  const handleAction = async (
    action: 'SAVE_DRAFT' | 'PUBLISH' | 'UNPUBLISH' | 'ARCHIVE' | 'VALIDATE'
  ) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      let token = null;
      if (action !== 'VALIDATE') {
        token = sessionStorage.getItem('observations_admin_token');
        if (!token) {
          token = window.prompt("Admin action requires authorization token:");
          if (!token) throw new Error('Authorization required');
          sessionStorage.setItem('observations_admin_token', token);
        }
      }

      const res = await fetch('/api/observations', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ action, observation }),
      });

      const data = await res.json();

      if (res.status === 401) {
        sessionStorage.removeItem('observations_admin_token');
        throw new Error(data.error || 'Unauthorized - Token cleared. Please try again.');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to perform action');
      }

      if (data.observation) {
        setObservation(data.observation);
      }

      if (action === 'VALIDATE') {
        setMessage({
          text: `Validation report updated: ${data.report?.summary}`,
          type: data.report?.isValid ? 'success' : 'error',
        });
      } else {
        setMessage({
          text: `Action "${action}" succeeded! Observation saved to content/observations/${data.slug}.yaml.`,
          type: 'success',
        });
        if (onSaveSuccess && data.observation) {
          onSaveSuccess(data.observation);
        }
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hydrate object for live preview
  const hydratedForPreview: HydratedObservation = {
    title: observation.title || 'Untitled Observation',
    subtitle: observation.subtitle,
    excerpt: observation.excerpt || 'No summary excerpt provided.',
    type: observation.type || 'TECHNICAL_NOTE',
    status: observation.status || 'DRAFT',
    createdAt: observation.createdAt || new Date().toISOString().split('T')[0],
    updatedAt: observation.updatedAt,
    publishedAt: observation.publishedAt || observation.createdAt,
    source: observation.source || {
      kind: 'NATIVE',
      canonicalLocation: 'PORTFOLIO',
      availability: 'AVAILABLE',
    },
    blocks: observation.blocks || [],
    tags: observation.tags || [],
    relatedProjects: observation.relatedProjects || [],
    relatedLabs: observation.relatedLabs || [],
    relatedObservations: observation.relatedObservations || [],
    relatedTechnologies: observation.relatedTechnologies || [],
    editorial: observation.editorial,
    draft: observation.draft ?? true,
    slug: observation.slug || 'preview-mode',
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#171717] pb-32">
      {/* Sticky Top Controls */}
      <PublishControls
        status={observation.status || 'DRAFT'}
        isDraft={observation.draft ?? true}
        canPublish={report.canPublish}
        isPreviewing={isPreviewing}
        isSubmitting={isSubmitting}
        onAction={handleAction}
        onTogglePreview={() => setIsPreviewing(!isPreviewing)}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/observations"
            className="font-mono text-[10px] tracking-widest uppercase text-[#6F6D68] hover:text-[#171717]"
          >
            ← BACK TO ARCHIVE
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#B78318]">
            INTERNAL AUTHORING ENVIRONMENT
          </div>
        </div>

        {/* Status Notification Message */}
        {message && (
          <div
            className={`mb-8 p-4 font-mono text-[11px] uppercase tracking-wide border ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200 text-[#2E7D32]'
                : 'bg-red-50 border-red-200 text-[#C62828]'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Main Workspace: Split between Editor and Readiness Report OR Live Preview */}
        {isPreviewing ? (
          <div className="border border-[#D9D6CE] bg-[#FAFAF7] p-4 sm:p-8">
            <div className="mb-6 pb-3 border-b border-[#D9D6CE] font-mono text-[10px] tracking-[0.2em] uppercase text-[#315EA8] font-bold">
              ● LIVE READER PREVIEW MODE (EXACT DETAIL PAGE SIMULATION)
            </div>
            <ObservationDetail
              observation={hydratedForPreview}
              allObservationsCount={existingObservations.length}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left 2 Cols: Form Editors */}
            <div className="lg:col-span-2 space-y-8">
              <MetadataEditor
                observation={observation}
                onChange={updateObservation}
              />

              <BlockEditor
                blocks={observation.blocks || []}
                onChange={(blocks) => updateObservation({ blocks })}
              />

              <SourceEditor
                source={observation.source}
                onChange={(source) => updateObservation({ source })}
              />

              <RelationshipEditor
                observation={observation}
                onChange={updateObservation}
                knownProjectSlugs={knownProjectSlugs}
                knownLabSlugs={knownLabSlugs}
                existingObservations={existingObservations}
              />
            </div>

            {/* Right 1 Col: Editorial Readiness Checklist */}
            <div className="lg:col-span-1 sticky top-24 space-y-6">
              <EditorialChecklist
                report={report}
                onRefreshValidation={() => handleAction('VALIDATE')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
