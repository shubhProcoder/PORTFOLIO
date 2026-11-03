'use client';

import React from 'react';
import { ObservationStatus } from '@/lib/schema/observation.schema';

interface PublishControlsProps {
  status: ObservationStatus;
  isDraft: boolean;
  canPublish: boolean;
  isPreviewing: boolean;
  isSubmitting: boolean;
  onAction: (action: 'SAVE_DRAFT' | 'PUBLISH' | 'UNPUBLISH' | 'ARCHIVE' | 'VALIDATE') => void;
  onTogglePreview: () => void;
}

export function PublishControls({
  status,
  isDraft,
  canPublish,
  isPreviewing,
  isSubmitting,
  onAction,
  onTogglePreview,
}: PublishControlsProps) {
  return (
    <div className="sticky top-0 z-30 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#D9D6CE] py-4 px-6 sm:px-8 mb-8 flex flex-wrap items-center justify-between gap-4">
      {/* Current State Indicator */}
      <div className="flex items-center gap-3">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            status === 'PUBLISHED' && !isDraft
              ? 'bg-[#2E7D32]'
              : status === 'ARCHIVED'
              ? 'bg-[#6F6D68]'
              : 'bg-[#B78318]'
          }`}
        />
        <div className="font-mono text-[11px] uppercase tracking-widest text-[#171717]">
          STATUS: <span className="font-bold">{status}</span>
          <span className="text-[#6F6D68] ml-2">
            ({isDraft ? 'DRAFT' : 'PUBLIC'})
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
        {/* Toggle Live Preview */}
        <button
          type="button"
          onClick={onTogglePreview}
          className={`px-3 py-2 border transition-colors ${
            isPreviewing
              ? 'bg-[#315EA8] text-white border-[#315EA8]'
              : 'bg-white text-[#171717] border-[#D9D6CE] hover:border-[#171717]'
          }`}
        >
          {isPreviewing ? 'EXIT PREVIEW' : 'PREVIEW'}
        </button>

        {/* Validate */}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => onAction('VALIDATE')}
          className="px-3 py-2 bg-white text-[#171717] border border-[#D9D6CE] hover:border-[#171717] transition-colors disabled:opacity-50"
        >
          VALIDATE
        </button>

        {/* Save Draft */}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => onAction('SAVE_DRAFT')}
          className="px-4 py-2 bg-white text-[#171717] border border-[#171717] hover:bg-[#171717] hover:text-white transition-colors disabled:opacity-50"
        >
          SAVE DRAFT
        </button>

        {/* Publish */}
        <button
          type="button"
          disabled={isSubmitting || !canPublish}
          onClick={() => onAction('PUBLISH')}
          title={!canPublish ? 'Resolve all validation errors before publishing' : ''}
          className="px-4 py-2 bg-[#2E7D32] text-white border border-[#2E7D32] hover:bg-[#1B5E20] transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          PUBLISH
        </button>

        {/* Unpublish */}
        {status === 'PUBLISHED' && (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onAction('UNPUBLISH')}
            className="px-3 py-2 bg-white text-[#B78318] border border-[#B78318] hover:bg-amber-50 transition-colors disabled:opacity-50"
          >
            UNPUBLISH
          </button>
        )}

        {/* Archive */}
        {status !== 'ARCHIVED' && (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onAction('ARCHIVE')}
            className="px-3 py-2 bg-white text-[#6F6D68] border border-[#D9D6CE] hover:text-[#171717] hover:border-[#6F6D68] transition-colors disabled:opacity-50"
          >
            ARCHIVE
          </button>
        )}
      </div>
    </div>
  );
}
