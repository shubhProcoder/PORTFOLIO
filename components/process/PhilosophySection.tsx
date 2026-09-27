export function PhilosophySection() {
  const tenets = [
    {
      number: '01',
      title: 'Understand the Problem Before Reaching for a Model',
      body: 'Most AI application failures are fundamentally data architecture and workflow definition problems. No LLM can fix a chaotic ingestion pipeline or an ambiguous state model.',
    },
    {
      number: '02',
      title: 'Engineer the System Boundaries for Inevitable Failure',
      body: 'AI components will hallucinate, APIs will rate-limit, and OCR will encounter corrupted pixels. True engineering resilience lives in the deterministic fallbacks, sandboxes, and verification guards wrapping the model.',
    },
    {
      number: '03',
      title: 'Treat Failure Modes as First-Class Telemetry',
      body: 'A failed benchmark or a 1.2-second rerank latency spike is not an annoyance; it is an invaluable compass showing where the software boundary is brittle. We log it, bound it, and codify it into a permanent assertion.',
    },
    {
      number: '04',
      title: 'Separate Useful Software from Flashy Demos',
      body: 'Building a prototype that succeeds once in a recorded video takes hours. Building a system that holds up across 10,000 multi-turn edge cases requires rigorous idempotency verification, chaos testing, and defensive engineering.',
    },
  ];

  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-t border-[#38BDF8]/20">
      <div className="pb-8 border-b border-[#38BDF8]/15 mb-12">
        <div className="font-mono text-xs text-[#38BDF8] uppercase tracking-[0.2em] mb-2">
          SECTION 06 // CURRENT BUILDING PHILOSOPHY
        </div>
        <h2 className="font-mono text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight">
          Four Invariant <span className="text-[#38BDF8]">Principles</span>.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tenets.map((tenet) => (
          <div
            key={tenet.number}
            className="p-8 rounded-xl bg-[#081522] border border-[#38BDF8]/20 space-y-4 hover:border-[#38BDF8]/50 transition-colors"
          >
            <div className="font-mono text-xs text-[#38BDF8] font-bold">PRINCIPLE // {tenet.number}</div>
            <h3 className="font-mono text-xl font-bold text-white tracking-wide">{tenet.title}</h3>
            <p className="font-sans text-neutral-300 text-sm leading-relaxed">{tenet.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
