interface Props {
  failures?: string[];
}

export function ProjectFailures({ failures }: Props) {
  if (!failures || failures.length === 0) return null;
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xs font-bold tracking-widest text-red-500 uppercase border-b border-red-500/20 pb-2">
        07 / Failure Modes & Limitations
      </h2>
      <div className="bg-red-500/5 border border-red-500/20 p-4">
        <ul className="flex flex-col gap-3">
          {failures.map((item, idx) => (
            <li key={idx} className="text-sm md:text-base text-red-200 flex items-start gap-3">
              <span className="text-red-500 mt-1">✕</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
