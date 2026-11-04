'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { projectsData, ProjectRecord } from './WorkFallback';

interface WorkOverlayProps {
  progress: number;
  activeIndex: number;
  onJumpToStation?: (index: number) => void;
}

export function WorkOverlay({ progress, activeIndex, onJumpToStation }: WorkOverlayProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="relative z-10 w-full text-[#E5E7EB] pointer-events-none select-none">
      {/* ── Fixed Sticky Top Header HUD ─────────────────────────────────── */}
      <header className="fixed top-20 md:top-24 left-0 right-0 z-30 px-6 md:px-12 max-w-[1440px] mx-auto pointer-events-auto">
        <div className="p-4 md:p-5 rounded-2xl bg-[#090B10]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-wrap items-center justify-between gap-4">
          {/* Left Title & Status */}
          <div className="flex items-center gap-3.5">
            <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <div>
              <div className="font-editorial text-xl sm:text-2xl text-white tracking-tight flex items-center gap-2">
                <span>Built Systems</span>
                <span className="italic text-[#38BDF8] font-light">Archive</span>
              </div>
              <div className="font-mono text-[10px] md:text-[11px] text-neutral-400 uppercase tracking-widest">
                CHAPTER // 01 · 3D SPATIAL WORKBENCH
              </div>
            </div>
          </div>

          {/* Quick Jump Station Dock */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            {projectsData.map((project, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={project.id}
                  onClick={() => onJumpToStation?.(idx)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 font-bold shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
                  }`}
                  title={project.title}
                >
                  <span>{project.number}</span>
                  <span className="hidden md:inline text-[11px] font-normal text-neutral-300">
                    {project.id === 'enterprise-hybrid-rag'
                      ? 'Hybrid RAG'
                      : project.id === 'agentforge'
                      ? 'AgentForge'
                      : project.id === 'geointel-ai'
                      ? 'GeoIntel'
                      : 'Sahayak'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progress Indicator */}
          <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-neutral-400">
            <span>STATION 0{activeIndex + 1} / 04</span>
            <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] transition-all duration-150"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Scroll Track Stops (4 Viewport sections driving the camera) ─── */}
      <div className="pt-[140px]">
        {/* Intro Section */}
        <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-[1440px] mx-auto pointer-events-auto">
          <div className="max-w-2xl bg-[#090B10]/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/[0.08] shadow-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-[#38BDF8] uppercase tracking-widest mb-4">
              SPATIAL CASE REPOSITORIES
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl text-white font-normal tracking-tight leading-[1.05]">
              Physical Architecture,{' '}
              <span className="italic text-[#38BDF8]">Spatial Evidence</span>.
            </h1>
            <p className="mt-4 text-neutral-300 font-sans text-base md:text-lg leading-relaxed font-light">
              Scroll down to navigate the 3D workbench. Each station inspects a verified system architecture with its
              concrete failure boundaries, evaluation benchmarks, and live source repositories.
            </p>
            <div className="mt-6 flex items-center gap-3 font-mono text-xs text-neutral-400">
              <span className="animate-bounce text-[#38BDF8]">↓</span>
              <span>SCROLL TO ADVANCE 3D CAMERA</span>
            </div>
          </div>
        </section>

        {/* 4 Project Narrative Stations */}
        {projectsData.map((project, idx) => {
          const isExpanded = expandedId === project.id;
          const isActive = activeIndex === idx;

          return (
            <section
              key={project.id}
              id={`station-${idx}`}
              className="min-h-[100vh] flex items-center px-6 md:px-16 lg:px-24 max-w-[1440px] mx-auto pointer-events-none py-20"
            >
              {/* Floating Story Card on the Left */}
              <div
                className={`max-w-xl w-full p-8 md:p-10 rounded-3xl bg-[#090B10]/85 backdrop-blur-2xl border transition-all duration-500 shadow-2xl pointer-events-auto ${
                  isActive
                    ? 'border-[#38BDF8]/40 ring-1 ring-[#38BDF8]/20 opacity-100 translate-y-0'
                    : 'border-white/[0.08] opacity-60 translate-y-4'
                }`}
              >
                {/* Station Tag */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08] font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#38BDF8] font-bold">STATION 0{idx + 1}</span>
                    <span className="text-white/20">/</span>
                    <span className="text-neutral-400 uppercase text-[11px]">
                      {project.type.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      project.status === 'COMPLETED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === 'COMPLETED' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                      }`}
                    />
                    {project.status}
                  </span>
                </div>

                {/* Project Title & Context */}
                {project.context && (
                  <div className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider mb-2">
                    {project.context}
                  </div>
                )}
                <h2 className="font-editorial text-3xl sm:text-4xl text-white tracking-tight leading-snug">
                  {project.title}
                </h2>

                <div className="mt-3 font-mono text-xs text-neutral-400">
                  <span className="text-neutral-500">ROLE // </span>
                  <span className="text-neutral-300">{project.role}</span>
                </div>

                {/* Stack Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Problem & Solution Callout */}
                <div className="mt-6 space-y-3.5">
                  <div className="p-4 rounded-xl bg-amber-500/[0.04] border-l-2 border-amber-400/70 border border-white/[0.04]">
                    <span className="font-mono text-[11px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
                      THE ARCHITECTURAL PROBLEM
                    </span>
                    <p className="font-sans text-neutral-300 text-sm leading-relaxed">
                      {project.architecturalChallenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/[0.04] border-l-2 border-emerald-400/70 border border-white/[0.04]">
                    <span className="font-mono text-[11px] text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                      VERIFIED ENGINEERING OUTCOME
                    </span>
                    <p className="font-sans text-neutral-300 text-sm leading-relaxed">
                      {project.solutionOutcome}
                    </p>
                  </div>

                  {isExpanded && (
                    <div className="p-4 rounded-xl bg-red-950/25 border-l-2 border-red-400 border border-white/[0.04] text-xs font-mono space-y-1">
                      <span className="text-red-400 font-bold uppercase tracking-wider block">
                        FAILURE BOUNDARY &amp; MITIGATION
                      </span>
                      <p className="text-neutral-300 leading-relaxed font-sans">{project.failureBoundary}</p>
                    </div>
                  )}
                </div>

                {/* Links Strip */}
                <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={`/work/${project.id}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#38BDF8] hover:text-white transition-colors font-bold uppercase tracking-wider"
                  >
                    <span>READ FULL CASE STUDY</span>
                    <span>↗</span>
                  </Link>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    className="font-mono text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-wider"
                  >
                    {isExpanded ? '[-] HIDE FAILURES' : '[+] VIEW FAILURES'}
                  </button>

                  {project.evidenceLink && (
                    <a
                      href={project.evidenceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1"
                    >
                      <span>REPO ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </section>
          );
        })}

        {/* Bottom Exit Track */}
        <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-6 max-w-2xl mx-auto pointer-events-auto py-24">
          <div className="p-8 rounded-3xl bg-[#090B10]/85 backdrop-blur-xl border border-white/[0.08] shadow-2xl w-full">
            <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-widest block mb-2">
              CHAPTER 01 COMPLETE
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
              Proceed Through the Knowledge Graph
            </h3>
            <p className="mt-3 text-neutral-400 font-sans text-sm leading-relaxed">
              Explore the experimental hypotheses in the Lab or inspect the reasoning essays in Observations.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/observations"
                className="px-5 py-2.5 rounded-full bg-[#38BDF8] hover:bg-sky-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors"
              >
                FIELD OBSERVATIONS →
              </Link>
              <Link
                href="/labs"
                className="px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/20 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
              >
                ENTER LABS →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

