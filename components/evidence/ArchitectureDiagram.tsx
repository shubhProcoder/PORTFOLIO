'use client';

import { motion } from 'motion/react';

export function ArchitectureDiagram() {
  return (
    <div
      className="w-full rounded-lg p-6 md:p-10 my-8 overflow-x-auto"
      style={{
        backgroundColor: 'rgba(35, 235, 21, 0.8)',
        border: '1px solid rgba(222, 51, 51, 0.1)',
        fontFamily: 'var(--font-machine)',
      }}
    >
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#C084FC] mb-1">
            SYSTEM ARCHITECTURE
          </div>
          <h3 className="text-xl md:text-2xl text-white font-normal" style={{ fontFamily: 'var(--font-editorial)' }}>
            The Dual Human ↔ Machine Architecture
          </h3>
        </div>
        <div className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded bg-[#C084FC]/10 text-[#E9D5FF] border border-[#C084FC]/30">
          PROVABLE ENGINEERING RECORD
        </div>
      </div>

      <p className="text-xs md:text-sm text-[#8B8680] leading-relaxed max-w-2xl mb-8">
        This portfolio demonstrates the capability to turn unstructured builder experience into a deterministic, verifiable software system. Every claim is validated against machine-readable YAML records.
      </p>

      {/* Visual System Diagram */}
      <div className="min-w-[620px] flex flex-col items-center py-4">
        {/* Top Node: SHUBH */}
        <div className="px-6 py-2 rounded border border-white/30 bg-white/5 text-white font-bold tracking-widest text-xs">
          SHUBH MEHROTRA
        </div>

        {/* Branch Line */}
        <div className="w-[1px] h-6 bg-white/20" />
        <div className="w-[320px] h-[1px] bg-white/20" />

        {/* Dual Split: HUMAN vs MACHINE */}
        <div className="w-[320px] flex justify-between pt-0">
          {/* Left Branch: HUMAN */}
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="p-3 w-36 rounded border border-white/15 bg-white/[0.02] text-center">
              <div className="text-[10px] tracking-widest text-[#8B8680] uppercase">HUMAN LAYER</div>
              <div className="text-xs text-white mt-0.5">Portfolio Experience</div>
            </div>
          </div>

          {/* Right Branch: MACHINE */}
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="p-3 w-36 rounded border border-[#C084FC]/40 bg-[#C084FC]/5 text-center">
              <div className="text-[10px] tracking-widest text-[#C084FC] uppercase">MACHINE LAYER</div>
              <div className="text-xs text-white mt-0.5">Structured Knowledge</div>
            </div>
          </div>
        </div>

        {/* Convergence to KNOWLEDGE LAYER */}
        <div className="w-[320px] h-[1px] bg-white/20 mt-4" />
        <div className="w-[1px] h-6 bg-white/20" />

        <div className="p-3.5 w-72 rounded border border-white/20 bg-white/[0.04] text-center">
          <div className="text-[10px] tracking-[0.2em] text-[#A78BFA] uppercase">KNOWLEDGE LAYER</div>
          <div className="text-xs text-neutral-300 mt-1 flex justify-center gap-3">
            <span>Projects</span>
            <span>•</span>
            <span>Skills</span>
            <span>•</span>
            <span>Evidence</span>
          </div>
        </div>

        {/* Arrow Down to RETRIEVAL LAYER */}
        <div className="w-[1px] h-6 bg-white/20" />
        <div className="text-white/30 text-xs">▼</div>

        <div className="p-3.5 w-72 rounded border border-[#38BDF8]/40 bg-[#38BDF8]/5 text-center mt-1">
          <div className="text-[10px] tracking-[0.2em] text-[#38BDF8] uppercase">RETRIEVAL LAYER</div>
          <div className="text-xs text-neutral-300 mt-1 flex justify-center gap-3">
            <span>Lexical</span>
            <span>•</span>
            <span>Semantic</span>
            <span>•</span>
            <span>Graph</span>
          </div>
        </div>

        {/* Arrow Down to EVIDENCE SET */}
        <div className="w-[1px] h-6 bg-white/20" />
        <div className="text-white/30 text-xs">▼</div>

        <div className="px-5 py-2 rounded border border-emerald-500/40 bg-emerald-500/5 text-emerald-300 text-xs tracking-wider uppercase">
          EVIDENCE SET (Source YAML Ground Truth)
        </div>

        {/* Arrow Down to VALIDATION ENGINE / LLM */}
        <div className="w-[1px] h-6 bg-white/20" />
        <div className="text-white/30 text-xs">▼</div>

        <div className="p-3.5 w-72 rounded border border-purple-500/40 bg-purple-500/10 text-center">
          <div className="text-[10px] tracking-[0.2em] text-purple-300 uppercase">VALIDATION ENGINE / LLM</div>
          <div className="text-xs text-white mt-0.5">Strict Factual Claim Verification</div>
        </div>

        {/* Arrow Down to VALIDATED OUTPUT */}
        <div className="w-[1px] h-6 bg-white/20" />
        <div className="text-white/30 text-xs">▼</div>

        <div className="grid grid-cols-3 gap-3 w-80 mt-1">
          <div className="p-2 rounded border border-white/10 bg-white/5 text-center">
            <div className="text-[9px] uppercase tracking-wider text-[#8B8680]">VERDICT</div>
            <div className="text-[11px] text-white font-medium mt-0.5">Supported?</div>
          </div>
          <div className="p-2 rounded border border-white/10 bg-white/5 text-center">
            <div className="text-[9px] uppercase tracking-wider text-[#8B8680]">EVIDENCE</div>
            <div className="text-[11px] text-white font-medium mt-0.5">Source YAML</div>
          </div>
          
          <div className="p-2 rounded border border-white/10 bg-white/5 text-center">
            <div className="text-[9px] uppercase tracking-wider text-[#8B8680]">RELATIONS</div>
            <div className="text-[11px] text-white font-medium mt-0.5">Tech & Proof</div>
          </div>
        </div>
      </div>
    </div>
  );
}
