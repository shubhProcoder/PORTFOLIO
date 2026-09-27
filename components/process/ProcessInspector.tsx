import Link from 'next/link';
import { ProcessStage } from './processData';

interface ProcessInspectorProps {
  stage: ProcessStage;
  onClose: () => void;
}

export function ProcessInspector({ stage, onClose }: ProcessInspectorProps) {
  return (
    <div
      className="p-6 md:p-8 rounded-xl bg-[#091824] border-2 border-[#38BDF8] shadow-[0_12px_40px_rgba(2,132,199,0.15)] relative font-mono text-xs transition-all duration-300"
      role="region"
      aria-label={`Process Inspector — ${stage.name}`}
    >
      {/* Blueprint Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#38BDF8]/30">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8] font-bold">
            STAGE // {stage.number}
          </span>
          <span className="text-white text-sm font-bold tracking-wider">{stage.name}</span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-400">{stage.category}</span>
        </div>

        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-white px-2 py-1 rounded border border-white/10 hover:border-white/30 transition-colors"
          aria-label="Close Inspector"
        >
          [ESC / CLOSE ×]
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Purpose, Core Activities, Failure Trigger */}
        <div className="md:col-span-7 space-y-5">
          <div>
            <span className="text-[#38BDF8] block text-[10px] uppercase font-bold tracking-wider mb-1">
              PURPOSE &amp; GOAL
            </span>
            <p className="font-sans text-neutral-200 text-sm leading-relaxed">{stage.description}</p>
          </div>

          <div>
            <span className="text-[#7DD3FC]/80 block text-[10px] uppercase font-bold tracking-wider mb-2">
              CORE OPERATIONAL ACTIVITIES
            </span>
            <ul className="space-y-1.5 list-none p-0 m-0 text-neutral-300 font-sans text-xs">
              {stage.activities.map((act, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#38BDF8] font-mono">›</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {stage.failureVector && (
            <div className="p-3.5 rounded bg-red-950/30 border border-red-500/40 text-neutral-300 space-y-1">
              <div className="flex items-center justify-between text-red-400 font-bold text-[10px] uppercase">
                <span>FAILURE VECTOR TRIGGER</span>
                <span>BACKTRACK TO: {stage.backtrackTarget}</span>
              </div>
              <p className="font-sans text-xs">{stage.failureVector}</p>
            </div>
          )}
        </div>

        {/* Right Column: Technical Inputs, Outputs, and Connected Systems */}
        <div className="md:col-span-5 space-y-5 bg-[#06121D] p-5 rounded-lg border border-[#38BDF8]/20">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase font-bold tracking-wider mb-1.5">
              STAGE INPUTS
            </span>
            <div className="flex flex-wrap gap-1.5">
              {stage.inputs.map((inp, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300 text-[11px]">
                  {inp}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-emerald-400 block text-[10px] uppercase font-bold tracking-wider mb-1.5">
              DELIVERABLE OUTPUTS
            </span>
            <div className="flex flex-wrap gap-1.5">
              {stage.outputs.map((out, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px]">
                  {out}
                </span>
              ))}
            </div>
          </div>

          {stage.connectedProjects && stage.connectedProjects.length > 0 && (
            <div className="pt-2 border-t border-white/10">
              <span className="text-[#38BDF8] block text-[10px] uppercase font-bold tracking-wider mb-2">
                VERIFIED SYSTEMS IN ARCHIVE
              </span>
              <div className="space-y-2">
                {stage.connectedProjects.map((proj, idx) => (
                  <div key={idx} className="text-[11px]">
                    <Link
                      href={proj.href}
                      className="text-white hover:text-[#38BDF8] font-bold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>→ {proj.name}</span>
                    </Link>
                    <p className="text-neutral-400 font-sans text-[11px] mt-0.5">{proj.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
