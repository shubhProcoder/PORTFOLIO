export function ProcessHero() {
  return (
    <header className="relative pt-28 pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-b border-[#38BDF8]/20">
      {/* Top Drafting Header Block */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 font-mono text-xs text-[#7DD3FC]/70">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#38BDF8] tracking-[0.2em] uppercase">CHAPTER // 03</span>
          <span className="text-[#38BDF8]/30">/</span>
          <span className="tracking-[0.16em] uppercase">SYSTEM BLUEPRINT</span>
        </div>

        {/* Blueprint Title Block Details */}
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span>DWG NO: SM-ARCH-2026-03</span>
          <span className="w-1 h-1 rounded-full bg-[#38BDF8]/50" />
          <span>SCALE: 1:1 ITERATIVE LOOP</span>
          <span className="w-1 h-1 rounded-full bg-[#38BDF8]/50" />
          <span className="text-[#38BDF8] font-bold">STATUS: APPROVED SPEC</span>
        </div>
      </div>

      {/* Main Philosophy Headline */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-block px-3 py-1 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 font-mono text-xs text-[#38BDF8] font-semibold uppercase tracking-wider">
          ENGINEERING METHODOLOGY // NON-LINEAR SYSTEMS
        </div>

        <h1 className="font-mono text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.05]">
          I don&apos;t follow a fixed sequence.
          <br />
          <span className="text-[#38BDF8]">I build a loop</span> that gets sharper with every iteration.
        </h1>

        <p className="font-sans text-neutral-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          Building emergent AI architectures is not an assembly line. It is a continuous feedback circuit:
          observing raw friction, framing mathematical boundaries, stressing runtimes under chaos, and converting
          empirical failures into hardened architectural invariants.
        </p>
      </div>

      {/* Blueprint Legend Bar */}
      <div className="mt-12 pt-6 border-t border-[#38BDF8]/15 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div>
          <span className="text-[#7DD3FC]/60 block text-[10px] uppercase">PHASE 1–2</span>
          <span className="text-white font-bold">DISCOVERY &amp; SIGNALS</span>
        </div>
        <div>
          <span className="text-[#7DD3FC]/60 block text-[10px] uppercase">PHASE 3–5</span>
          <span className="text-[#38BDF8] font-bold">SYNTHESIS &amp; SPIKES</span>
        </div>
        <div>
          <span className="text-[#7DD3FC]/60 block text-[10px] uppercase">PHASE 6–8</span>
          <span className="text-amber-400 font-bold">EXECUTION &amp; CHAOS</span>
        </div>
        <div>
          <span className="text-[#7DD3FC]/60 block text-[10px] uppercase">PHASE 9–11</span>
          <span className="text-emerald-400 font-bold">INVARIANTS &amp; LOOP</span>
        </div>
      </div>
    </header>
  );
}
