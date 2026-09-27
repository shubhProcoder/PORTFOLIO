interface Props {
  personal?: string[];
  team?: string[];
}

export function ProjectContribution({ personal, team }: Props) {
  if ((!personal || personal.length === 0) && (!team || team.length === 0)) return null;
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xs font-bold tracking-widest text-[#38BDF8] uppercase border-b border-[#38BDF8]/20 pb-2">
        05 / Contribution
      </h2>
      
      <div className="flex flex-col gap-8">
        {personal && personal.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-white bg-neutral-800 px-2 py-1 w-fit tracking-widest uppercase">
              MY CONTRIBUTION
            </span>
            <ul className="flex flex-col gap-2">
              {personal.map((item, idx) => (
                <li key={idx} className="text-sm md:text-base text-neutral-300 flex items-start gap-3">
                  <span className="text-[#38BDF8] opacity-50 mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {team && team.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-neutral-400 bg-neutral-900 px-2 py-1 w-fit tracking-widest uppercase border border-neutral-700">
              TEAM CONTRIBUTION
            </span>
            <ul className="flex flex-col gap-2">
              {team.map((item, idx) => (
                <li key={idx} className="text-sm md:text-base text-neutral-400 flex items-start gap-3">
                  <span className="text-neutral-600 mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
