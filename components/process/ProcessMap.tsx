'use client';

import { useState } from 'react';
import { processStages, ProcessStage } from './processData';
import { ProcessInspector } from './ProcessInspector';

export function ProcessMap() {
  const [selectedStageId, setSelectedStageId] = useState<string>('observe');
  const [showFailureLoops, setShowFailureLoops] = useState<boolean>(true);

  const selectedStage = processStages.find((s) => s.id === selectedStageId) || processStages[0];

  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto space-y-12">
      {/* Section Header & View Mode Switcher */}
      <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-[#38BDF8]/20">
        <div>
          <div className="font-mono text-xs text-[#38BDF8] uppercase tracking-[0.2em] mb-2">
            SECTION 02 // SPATIAL PROCESS MAP
          </div>
          <h2 className="font-mono text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight">
            The 11-Stage <span className="text-[#38BDF8]">Feedback Loop</span>.
          </h2>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-neutral-400 hidden sm:inline">CIRCUIT MODE:</span>
          <button
            onClick={() => setShowFailureLoops(false)}
            className={`px-3 py-1.5 rounded border transition-colors ${
              !showFailureLoops
                ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8] font-bold'
                : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            IDEAL PATH (01→11)
          </button>
          <button
            onClick={() => setShowFailureLoops(true)}
            className={`px-3 py-1.5 rounded border transition-colors flex items-center gap-1.5 ${
              showFailureLoops
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            REAL FAILURE &amp; BACKTRACK LOOPS
          </button>
        </div>
      </div>

      {/* Non-Linearity Blueprint Callout (when failure loop is active) */}
      {showFailureLoops && (
        <div className="p-4 sm:p-5 rounded-lg bg-[#14120A] border border-amber-500/40 font-mono text-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-amber-400 font-bold text-sm">⚠</span>
            <div>
              <span className="text-amber-300 font-bold uppercase tracking-wider block">
                EMPIRICAL OBSERVATION // FAILURE IS ARCHITECTURAL TELEMETRY
              </span>
              <p className="text-neutral-300 font-sans text-xs mt-1 max-w-3xl leading-relaxed">
                Production AI engineering never runs 01 → 11 linearly. When Stage 08 (Validate) fails latency or
                accuracy budgets, the loop backtracks into Stage 04 (Research) or Stage 03 (Reframe) to alter foundational
                invariants before rebuild.
              </p>
            </div>
          </div>
          <div className="text-[11px] text-amber-400/80 px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/20 whitespace-nowrap">
            ACTIVE BACKTRACK: 08 (FAIL) ➔ 04 (RESEARCH)
          </div>
        </div>
      )}

      {/* Main Grid of Interactive Process Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {processStages.map((stage) => {
          const isSelected = stage.id === selectedStageId;
          const isFailureNode = stage.id === 'validate-fail';
          const isBacktrackTarget = showFailureLoops && (stage.id === 'research' || stage.id === 'frame');

          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              className={`text-left p-5 rounded-lg border transition-all duration-200 relative group flex flex-col justify-between min-h-[170px] ${
                isSelected
                  ? 'bg-[#0A1A29] border-[#38BDF8] shadow-[0_0_25px_rgba(56,189,248,0.2)]'
                  : isFailureNode && showFailureLoops
                  ? 'bg-[#18110E] border-amber-500/60 hover:border-amber-400'
                  : isBacktrackTarget
                  ? 'bg-[#091522] border-[#38BDF8]/50 hover:border-[#38BDF8]'
                  : 'bg-[#07131D]/80 border-[#38BDF8]/15 hover:border-[#38BDF8]/40 hover:bg-[#0A1826]'
              }`}
            >
              {/* Corner Coordinate Tick */}
              <div className="flex items-center justify-between w-full font-mono text-[11px] mb-3">
                <span
                  className={`font-bold tracking-wider ${
                    isSelected
                      ? 'text-[#38BDF8]'
                      : isFailureNode
                      ? 'text-amber-400'
                      : 'text-neutral-400 group-hover:text-[#7DD3FC]'
                  }`}
                >
                  {stage.number} // {stage.category}
                </span>

                {isFailureNode && showFailureLoops && (
                  <span className="text-amber-400 font-bold animate-pulse text-[10px]">
                    [FAIL VECTOR]
                  </span>
                )}
                {isBacktrackTarget && (
                  <span className="text-[#38BDF8] font-bold text-[10px]">
                    [RE-ENTRY TARGET]
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="font-mono text-lg font-bold text-white tracking-wide group-hover:text-[#7DD3FC] transition-colors">
                  {stage.name}
                </h3>
                <p className="font-sans text-neutral-400 text-xs mt-1 leading-snug">
                  {stage.tagline}
                </p>
              </div>

              {/* Bottom Technical Status Bar */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-neutral-500 w-full">
                <span>INPUTS: {stage.inputs.length}</span>
                <span className={isSelected ? 'text-[#38BDF8] font-bold' : 'group-hover:text-white'}>
                  {isSelected ? 'INSPECTING ●' : 'CLICK TO INSPECT →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Inline Technical Process Inspector */}
      {selectedStage && (
        <div className="pt-4">
          <ProcessInspector
            stage={selectedStage}
            onClose={() => setSelectedStageId('')}
          />
        </div>
      )}
    </section>
  );
}
