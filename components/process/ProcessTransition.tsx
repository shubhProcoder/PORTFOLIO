import Link from 'next/link';

export function ProcessTransition() {
  return (
    <footer className="relative py-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-t border-[#38BDF8]/20 font-mono text-xs">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className="flex items-center gap-2 text-[#7DD3FC]/60 uppercase tracking-[0.2em] text-[11px]">
          <span>CIRCUIT TRANSITION</span>
          <span className="w-12 h-px bg-[#38BDF8]/40" />
          <span>NEXT CHAPTER</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          PROCESS ➔ <span className="text-[#38BDF8]">EXPERIMENTATION</span>
        </h3>

        <p className="font-sans text-neutral-400 text-sm max-w-md leading-relaxed">
          Where engineering hypotheses are subjected to raw benchmark instruments, chaos harnesses, and empirical stress tests.
        </p>

        <div className="pt-4">
          <Link
            href="/#labs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[#38BDF8] bg-[#38BDF8]/10 text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06101B] font-bold tracking-wider uppercase transition-all duration-150"
          >
            <span>PROCEED TO CHAPTER 04 // LABS</span>
            <span>→</span>
          </Link>
        </div>

        {/* Blueprint Footer Revision Stamp */}
        <div className="pt-16 text-[10px] text-[#7DD3FC]/40 flex flex-wrap items-center justify-center gap-4">
          <span>SPECIFICATION: IEEE-STD / ARCHITECTURAL LOOP</span>
          <span>•</span>
          <span>SYSTEM VERIFICATION: ACTIVE</span>
          <span>•</span>
          <span>PORTFOLIO WORLD: BLUEPRINT</span>
        </div>
      </div>
    </footer>
  );
}
