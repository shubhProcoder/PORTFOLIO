interface Props {
  architecture?: string;
  build?: string;
  stack?: string[];
  coreFeatures?: string[];
}

export function ProjectArchitecture({ architecture, build, stack, coreFeatures }: Props) {
  if (!architecture && !build && (!stack || stack.length === 0) && (!coreFeatures || coreFeatures.length === 0)) return null;
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-xs font-bold tracking-widest text-[#38BDF8] uppercase border-b border-[#38BDF8]/20 pb-2">
          04 / System & Build
        </h2>
        
        {architecture && (
          <div className="p-4 border border-white/10 bg-[#0C0E14] mb-4">
            <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase block mb-2">DATA FLOW</span>
            <code className="text-xs text-[#38BDF8]">{architecture}</code>
          </div>
        )}

        {build && (
          <p className="text-sm md:text-base leading-relaxed text-neutral-300 mb-4">
            {build}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stack && stack.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">TECHNOLOGIES</span>
              <ul className="flex flex-wrap gap-2">
                {stack.map((item) => (
                  <li key={item} className="text-xs px-2 py-1 border border-neutral-700 bg-neutral-900 text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {coreFeatures && coreFeatures.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">CORE COMPONENTS</span>
              <ul className="flex flex-col gap-2">
                {coreFeatures.map((item) => (
                  <li key={item} className="text-xs text-neutral-300 flex items-start gap-2">
                    <span className="text-[#38BDF8] mt-1">▰</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
