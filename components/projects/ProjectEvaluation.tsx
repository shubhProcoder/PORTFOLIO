interface Props {
  evaluation?: string;
  results?: string[];
}

export function ProjectEvaluation({ evaluation, results }: Props) {
  if (!evaluation && (!results || results.length === 0)) return null;
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xs font-bold tracking-widest text-[#38BDF8] uppercase border-b border-[#38BDF8]/20 pb-2">
        06 / Evaluation & Results
      </h2>
      
      {evaluation && (
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase block mb-1">EVALUATION METHOD</span>
          <p className="text-sm md:text-base leading-relaxed text-neutral-300">
            {evaluation}
          </p>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-[#10B981] tracking-widest uppercase block mb-1">MEASURED RESULTS</span>
          <ul className="flex flex-col gap-2">
            {results.map((item, idx) => (
              <li key={idx} className="text-sm md:text-base text-neutral-300 flex items-start gap-3 bg-[#10B981]/5 border border-[#10B981]/20 p-3">
                <span className="text-[#10B981] mt-1 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
