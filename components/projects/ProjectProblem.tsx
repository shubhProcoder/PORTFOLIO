interface Props {
  problem?: string;
  hypothesis?: string;
  approach?: string;
}

export function ProjectProblem({ problem, hypothesis, approach }: Props) {
  if (!problem && !hypothesis && !approach) return null;
  return (
    <section className="flex flex-col gap-8">
      {problem && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold tracking-widest text-[#38BDF8] uppercase border-b border-[#38BDF8]/20 pb-2">
            02 / Problem Space
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-neutral-300">
            {problem}
          </p>
        </div>
      )}
      
      {(hypothesis || approach) && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold tracking-widest text-[#38BDF8] uppercase border-b border-[#38BDF8]/20 pb-2">
            03 / Hypothesis & Approach
          </h2>
          <div className="flex flex-col gap-6">
            {hypothesis && (
              <div className="border-l-2 border-[#F59E0B] pl-4">
                <span className="text-[10px] font-bold text-[#F59E0B] tracking-widest uppercase block mb-1">HYPOTHESIS</span>
                <p className="text-sm italic text-neutral-400">{hypothesis}</p>
              </div>
            )}
            {approach && (
              <div>
                <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase block mb-1">APPROACH</span>
                <p className="text-sm md:text-base leading-relaxed text-neutral-300">{approach}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
