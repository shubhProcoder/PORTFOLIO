'use client';

import React from 'react';
import { PublicationReadinessReport } from '@/lib/validation/observation-validator';

interface EditorialChecklistProps {
  report: PublicationReadinessReport;
  onRefreshValidation?: () => void;
}

export function EditorialChecklist({ report, onRefreshValidation }: EditorialChecklistProps) {
  const getStatusIcon = (status: 'PASS' | 'FAIL' | 'WARN') => {
    switch (status) {
      case 'PASS':
        return <span className="text-[#2E7D32] font-bold">✓</span>;
      case 'FAIL':
        return <span className="text-[#C62828] font-bold">✕</span>;
      case 'WARN':
        return <span className="text-[#B78318] font-bold">!</span>;
    }
  };

  const getStatusBadge = (status: 'PASS' | 'FAIL' | 'WARN') => {
    switch (status) {
      case 'PASS':
        return (
          <span className="px-2 py-0.5 bg-green-50 border border-green-200 text-[#2E7D32] font-mono text-[9px] uppercase tracking-wider">
            PASS
          </span>
        );
      case 'FAIL':
        return (
          <span className="px-2 py-0.5 bg-red-50 border border-red-200 text-[#C62828] font-mono text-[9px] uppercase tracking-wider">
            FAIL
          </span>
        );
      case 'WARN':
        return (
          <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-[#B78318] font-mono text-[9px] uppercase tracking-wider">
            WARN
          </span>
        );
    }
  };

  return (
    <aside className="bg-[#FAFAF7] border border-[#D9D6CE] p-6 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#D9D6CE]">
        <div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6F6D68] font-bold">
            PUBLICATION READINESS REPORT
          </div>
          <div className="font-editorial text-[20px] text-[#171717] mt-1 font-semibold">
            {report.summary}
          </div>
        </div>
        {onRefreshValidation && (
          <button
            type="button"
            onClick={onRefreshValidation}
            className="px-2.5 py-1 bg-white border border-[#D9D6CE] font-mono text-[9px] uppercase tracking-widest text-[#6F6D68] hover:text-[#171717]"
          >
            RE-CHECK
          </button>
        )}
      </div>

      <div className="space-y-3">
        {report.checks.map((check) => (
          <div
            key={check.id}
            className="p-3 bg-white border border-[#EAE8E1] flex items-start gap-3 transition-colors"
          >
            <div className="mt-0.5 text-[14px] flex-shrink-0">
              {getStatusIcon(check.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-[11px] text-[#171717] font-semibold tracking-wide uppercase">
                  {check.name}
                </span>
                {getStatusBadge(check.status)}
              </div>
              <p className="font-sans text-[12px] text-[#6F6D68] leading-snug">
                {check.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#D9D6CE] font-mono text-[10px] text-[#6F6D68] uppercase tracking-wider">
        {report.canPublish ? (
          <span className="text-[#2E7D32] font-semibold">
            ● APPROVED FOR IMMEDIATE PUBLIC ACCESS
          </span>
        ) : (
          <span className="text-[#B78318] font-semibold">
            ● CONFINED TO AUTHORING WORKSPACE (DRAFT GUARD ACTIVE)
          </span>
        )}
      </div>
    </aside>
  );
}
