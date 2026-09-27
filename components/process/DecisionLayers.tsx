import { decisionLayers } from './processData';

export function DecisionLayers() {
  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-t border-[#38BDF8]/20">
      {/* Section Header */}
      <div className="pb-8 border-b border-[#38BDF8]/15 mb-12">
        <div className="font-mono text-xs text-[#38BDF8] uppercase tracking-[0.2em] mb-2">
          SECTION 04 // CROSS-SECTIONAL ARCHITECTURE
        </div>
        <h2 className="font-mono text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight">
          Simultaneous <span className="text-[#38BDF8]">Decision Layers</span>.
        </h2>
        <p className="mt-4 text-neutral-400 font-sans text-base max-w-2xl leading-relaxed">
          No architectural decision lives in a vacuum. Every prototype, test, and build is evaluated simultaneously
          across four cross-cutting engineering dimensions.
        </p>
      </div>

      {/* Layered Cross-Section Schematic */}
      <div className="space-y-6">
        {decisionLayers.map((layer, idx) => (
          <div
            key={layer.title}
            className="p-6 md:p-8 rounded-xl bg-[#081522] border border-[#38BDF8]/20 relative overflow-hidden group hover:border-[#38BDF8]/50 transition-all duration-300"
          >
            {/* Left Blueprint Dimension Line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1.5"
              style={{ backgroundColor: layer.color }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Layer Title & Coordinate Stamp */}
              <div className="lg:col-span-4 space-y-2">
                <div className="font-mono text-xs font-bold tracking-wider" style={{ color: layer.color }}>
                  PLANE // 0{idx + 1}
                </div>
                <h3 className="font-mono text-xl font-bold text-white tracking-wide">
                  {layer.title}
                </h3>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                  {layer.subtitle}
                </p>
              </div>

              {/* Layer Invariant Constraints */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {layer.focusAreas.map((area, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded bg-[#06101B] border border-white/5 font-mono text-xs text-neutral-300 flex items-start gap-2.5"
                    >
                      <span className="text-[#38BDF8] text-[10px] mt-0.5">§{i + 1}</span>
                      <span className="font-sans text-xs leading-relaxed">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
