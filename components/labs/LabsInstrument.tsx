'use client';

import { motion } from 'framer-motion';
import { labExperiments, LabExperiment } from './labsData';
import { useState } from 'react';

export function LabsInstrument() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(labExperiments[0].id);

  const completedExperiments = labExperiments.filter((e) =>
    ['VALIDATED', 'REVISED', 'FAILED'].includes(e.status)
  );
  const plannedExperiments = labExperiments.filter((e) => e.status === 'PLANNED');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VALIDATED':
        return 'text-[#10B981] border-[#10B981] bg-[#10B981]/10';
      case 'REVISED':
        return 'text-[#F59E0B] border-[#F59E0B] bg-[#F59E0B]/10';
      case 'FAILED':
        return 'text-[#EF4444] border-[#EF4444] bg-[#EF4444]/10';
      case 'PLANNED':
      default:
        return 'text-neutral-500 border-neutral-700 bg-neutral-900/50';
    }
  };

  return (
    <main className="min-h-screen bg-[#041310] text-[#10B981] font-mono selection:bg-[#10B981] selection:text-[#041310] pt-16">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Overlay Vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,#041310_100%)] z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
        
        {/* Left Column: Title & Index */}
        <div className="lg:col-span-4 flex flex-col gap-12">
          
          <header className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-xs tracking-widest text-[#10B981]/70">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              SYSTEM.LAB.ENVIRONMENT
            </div>
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
              Computational<br />Instrument
            </h1>
            <p className="text-sm text-[#10B981]/80 leading-relaxed max-w-sm mt-4">
              Experimental sandbox for testing AI hypotheses, architectural assumptions, and retrieval limits. Live readout from current ops.
            </p>
          </header>

          <nav className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-bold tracking-widest text-white border-b border-[#10B981]/20 pb-2">
                ACTIVE / COMPLETED OPS
              </h2>
              <ul className="flex flex-col gap-2">
                {completedExperiments.map(exp => (
                  <li key={exp.id}>
                    <button
                      onClick={() => setActiveExperiment(exp.id)}
                      className={`w-full text-left px-4 py-3 border text-xs tracking-wide transition-all ${
                        activeExperiment === exp.id
                          ? 'border-[#10B981] bg-[#10B981]/10 text-white'
                          : 'border-[#10B981]/20 text-[#10B981]/60 hover:border-[#10B981]/50 hover:text-[#10B981]'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="truncate pr-4">{exp.id.toUpperCase()}</span>
                        <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(exp.status)}`}>
                          {exp.status}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-bold tracking-widest text-neutral-500 border-b border-neutral-800 pb-2">
                PLANNED OPS
              </h2>
              <ul className="flex flex-col gap-2">
                {plannedExperiments.map(exp => (
                  <li key={exp.id}>
                    <button
                      onClick={() => setActiveExperiment(exp.id)}
                      className={`w-full text-left px-4 py-3 border text-xs tracking-wide transition-all ${
                        activeExperiment === exp.id
                          ? 'border-neutral-500 bg-neutral-800/50 text-white'
                          : 'border-neutral-800 text-neutral-600 hover:border-neutral-600 hover:text-neutral-400'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="truncate pr-4">{exp.id.toUpperCase()}</span>
                        <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(exp.status)}`}>
                          {exp.status}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Right Column: Active Readout */}
        <div className="lg:col-span-8 flex flex-col">
          {labExperiments.filter(e => e.id === activeExperiment).map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col border border-[#10B981]/30 bg-[#041310]/80 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(16,185,129,0.05)_50%)] bg-[length:100%_4px] z-10" />
              
              <div className="p-6 md:p-10 flex flex-col gap-8 relative z-20">
                
                {/* Header */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-xs font-bold tracking-widest">
                    <span className="text-white">OPERATION: {exp.id.toUpperCase()}</span>
                    <span className={`px-2 py-1 border ${getStatusColor(exp.status)}`}>
                      {exp.status}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                    {exp.title}
                  </h2>
                </div>

                {/* Body Fields */}
                <div className="flex flex-col gap-6">
                  
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-bold tracking-widest text-[#10B981]/50 uppercase">
                      Hypothesis
                    </h3>
                    <p className="text-sm md:text-base text-neutral-300 leading-relaxed border-l-2 border-[#10B981]/30 pl-4">
                      {exp.hypothesis}
                    </p>
                  </div>

                  {exp.learning && (
                    <div className="flex flex-col gap-2 mt-4">
                      <h3 className="text-xs font-bold tracking-widest text-[#10B981]/50 uppercase">
                        Outcome / Learning
                      </h3>
                      <div className="p-4 border border-[#10B981]/20 bg-[#10B981]/5 text-white text-sm md:text-base leading-relaxed">
                        {exp.learning}
                      </div>
                    </div>
                  )}

                  {exp.status === 'PLANNED' && (
                    <div className="mt-8 flex items-center justify-center p-8 border border-neutral-800 bg-neutral-900/30">
                      <p className="text-xs tracking-widest text-neutral-500 uppercase">
                        [ AWAITING EXECUTION CYCLE ]
                      </p>
                    </div>
                  )}

                </div>
              </div>
              
              {/* Decorative terminal footer */}
              <div className="px-6 py-3 border-t border-[#10B981]/20 bg-[#10B981]/5 flex items-center justify-between text-[10px] tracking-widest text-[#10B981]/60">
                <span>{exp.id}</span>
                <span>DATA INTEGRITY: VERIFIED</span>
                <span>END_TRANSMISSION</span>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </main>
  );
}
