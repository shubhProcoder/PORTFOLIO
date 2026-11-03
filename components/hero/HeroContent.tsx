import Image from 'next/image';
import { HeroTicker } from '@/components/visual/HeroTicker';

export function HeroContent() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh)] flex flex-col justify-between pt-20 md:pt-24 overflow-hidden grain-overlay bg-[#FAF7F2]"
      aria-label="Hero — I Build Systems for Things That Don't Exist."
    >
      {/* Background Moving Identity — Frosted Glass Minimalist Stream (Right to Left) */}
      <div
        className="absolute top-28 md:top-24 left-0 right-0 overflow-hidden pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <div className="animate-ticker-slow flex whitespace-nowrap opacity-[0.12]">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="font-editorial text-[7rem] sm:text-[10rem] lg:text-[14rem] leading-none text-[#2563EB] tracking-tight whitespace-nowrap flex items-center pr-12"
            >
              SHUBH MEHROTRA{' '}
              <span className="text-[4rem] sm:text-[6rem] lg:text-[9rem] mx-6 font-sans font-light text-[#2563EB]">
                *
              </span>{' '}
              DEVELOPER <span className="mx-8 font-sans text-[4rem] sm:text-[6rem] lg:text-[8rem]">✳</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-8 md:py-14 flex-1 flex items-center relative z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Manifesto & Narrative */}
          <div className="lg:col-span-6 xl:col-span-6 z-10">
            <h1 className="font-editorial text-[3.6rem] sm:text-[4.6rem] md:text-[5.4rem] lg:text-[5.6rem] xl:text-[6.4rem] leading-[0.98] tracking-[-0.02em] text-[#11100F] font-normal select-none">
              I Build Systems
              <br />
              <span className="italic text-[#2563EB] font-normal">for Things</span> That
              <br />
              Don&apos;t Exist<span className="text-[#EF4444] font-bold">.</span>
            </h1>

            <p className="mt-6 md:mt-8 text-neutral-700 text-base md:text-[1.05rem] leading-[1.65] max-w-lg font-sans">
              Crafting technical architectures for emerging technologies. Merging rigorous engineering with intuitive product design to build resilient systems where no blueprints exist.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-mono text-xs md:text-[13px] font-bold tracking-[0.14em] uppercase shadow-sm hover:shadow transition-all duration-150"
              >
                EXPLORE SYSTEMS
              </a>
              <a
                href="#thinking"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-transparent hover:bg-black/5 text-[#11100F] border border-[#11100F] font-mono text-xs md:text-[13px] font-bold tracking-[0.14em] uppercase transition-all duration-150"
              >
                READ OBSERVATIONS
              </a>
            </div>

            {/* Focus Area Tags */}
            <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-2.5" aria-label="Core disciplines">
              {['RAG', 'AGENTS', 'EVALUATION', 'PRODUCT'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3.5 py-1 rounded-full border border-neutral-300/90 text-neutral-600 font-mono text-[11px] md:text-xs font-medium uppercase tracking-[0.1em] bg-white/40 select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Artifact with Subtle Backdrop */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end items-center">
            
            {/* Soft Ambient Depth Behind Artifact */}
            <div
              className="absolute -top-10 sm:-top-16 -right-4 sm:-right-8 font-editorial text-[6.5rem] sm:text-[9rem] lg:text-[11.5rem] leading-none text-[#2563EB]/[0.15] pointer-events-none select-none z-0 tracking-tight"
              aria-hidden="true"
            >
              4%BUILD
            </div>
            <div
              className="absolute -bottom-10 sm:-bottom-16 -right-6 sm:-right-10 font-editorial text-[7rem] sm:text-[10rem] lg:text-[13rem] leading-none text-[#2563EB]/[0.15] pointer-events-none select-none z-0 tracking-tight"
              aria-hidden="true"
            >
              BUILD
            </div>

            {/* The Workbench Card */}
            <div className="relative z-10 w-full max-w-[580px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.22)] border border-neutral-300/40 bg-white group">
              <Image
                src="/hero-workbench.jpg"
                alt="The Workbench — AI product builder's workspace with laptop, code, sticky notes, and system architecture diagrams"
                width={1200}
                height={850}
                priority
                className="w-full h-auto object-cover select-none block transition-transform duration-500 ease-out group-hover:scale-[1.01]"
              />

              {/* Overlay Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-neutral-300/80 rounded-full px-3.5 py-1.5 shadow-sm flex items-center select-none z-20">
                <span className="text-[10px] md:text-[11px] font-mono font-medium tracking-wider text-neutral-800 uppercase">
                  THE WORKBENCH — 2024-PRESENT
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Frosted Glass Minimalist Ticker Marquee */}
      <HeroTicker />
    </section>
  );
}
