interface Props {
  learnings?: string[];
}

export function ProjectLearnings({ learnings }: Props) {
  if (!learnings || learnings.length === 0) return null;
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xs font-bold tracking-widest text-[#F59E0B] uppercase border-b border-[#F59E0B]/20 pb-2">
        08 / Observations & Learnings
      </h2>
      <ul className="flex flex-col gap-4 mt-2">
        {learnings.map((item, idx) => (
          <li key={idx} className="text-sm md:text-base text-neutral-300 flex flex-col gap-1 border-l border-[#F59E0B]/30 pl-4">
            <span className="text-[10px] font-bold text-[#F59E0B] tracking-widest uppercase">LEARNING {String(idx + 1).padStart(2, '0')}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
