'use client';

export function HeroTicker() {
  const tickerItems = (
    <>
      <span className="font-mono text-xs md:text-[13px] tracking-[0.2em] uppercase text-[#11100F] font-bold">
        SHUBH MEHROTRA
      </span>
      <span className="text-[#2563EB] font-bold text-sm mx-1.5">*</span>
      <span className="font-mono text-xs md:text-[13px] tracking-[0.2em] uppercase text-[#2563EB] font-semibold">
        DEVELOPER
      </span>
      <span className="text-neutral-400 mx-4">✳</span>
      <span className="font-mono text-xs md:text-[13px] tracking-[0.2em] uppercase text-neutral-600 font-medium">
        AI SYSTEMS
      </span>
      <span className="text-neutral-400 mx-4">✳</span>
      <span className="font-mono text-xs md:text-[13px] tracking-[0.2em] uppercase text-[#11100F] font-bold">
        SHUBH MEHROTRA
      </span>
      <span className="text-[#2563EB] font-bold text-sm mx-1.5">*</span>
      <span className="font-mono text-xs md:text-[13px] tracking-[0.2em] uppercase text-[#2563EB] font-semibold">
        DEVELOPER
      </span>
      <span className="text-neutral-400 mx-4">✳</span>
      <span className="font-mono text-xs md:text-[13px] tracking-[0.2em] uppercase text-neutral-600 font-medium">
        RAG ARCHITECTURES
      </span>
      <span className="text-neutral-400 mx-4">✳</span>
      <span className="font-mono text-xs md:text-[13px] tracking-[0.2em] uppercase text-[#11100F] font-bold">
        SHUBH MEHROTRA
      </span>
      <span className="text-[#2563EB] font-bold text-sm mx-1.5">*</span>
      <span className="font-mono text-xs md:text-[13px] tracking-[0.2em] uppercase text-[#2563EB] font-semibold">
        DEVELOPER
      </span>
      <span className="text-neutral-400 mx-4">✳</span>
      <span className="font-mono text-xs md:text-[13px] tracking-[0.2em] uppercase text-neutral-600 font-medium">
        AGENT RELIABILITY
      </span>
      <span className="text-neutral-400 mx-4">✳</span>
    </>
  );

  return (
    <div
      className="w-full backdrop-blur-md bg-white/70 border-t border-neutral-200/80 overflow-hidden py-3 md:py-3.5 select-none relative z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]"
      aria-label="Identity Marquee — SHUBH MEHROTRA * Developer"
    >
      <div className="animate-ticker flex items-center whitespace-nowrap">
        <div className="flex items-center px-4">{tickerItems}</div>
        <div className="flex items-center px-4" aria-hidden="true">{tickerItems}</div>
        <div className="flex items-center px-4" aria-hidden="true">{tickerItems}</div>
        <div className="flex items-center px-4" aria-hidden="true">{tickerItems}</div>
      </div>
    </div>
  );
}
