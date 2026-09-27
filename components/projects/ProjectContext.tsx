interface Props {
  context?: string;
  type?: string;
}

export function ProjectContext({ context, type }: Props) {
  if (!context && !type) return null;
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xs font-bold tracking-widest text-[#38BDF8] uppercase border-b border-[#38BDF8]/20 pb-2">
        01 / Context
      </h2>
      <div className="flex flex-col gap-2">
        {type && (
          <p className="text-sm font-bold text-white uppercase tracking-widest">
            TYPE: {type.replace(/_/g, ' ')}
          </p>
        )}
        {context && (
          <p className="text-sm md:text-base leading-relaxed text-neutral-300">
            {context}
          </p>
        )}
      </div>
    </section>
  );
}
