import { Now } from '@/lib/schema/now.schema';
import Link from 'next/link';

interface Props {
  data: Now;
}

export function NowEditorial({ data }: Props) {
  return (
    <article className="max-w-[800px] mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-24">
      <header className="flex flex-col gap-6">
        <Link href="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 hover:text-[#2563EB] transition-colors w-fit">
          ← Return to Cover
        </Link>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-[#11100F] leading-none">
          Now.
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Last updated: {data.last_updated}
        </p>
      </header>

      <section className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 w-32 shrink-0">
            Current Build
          </h2>
          <p className="font-serif text-2xl md:text-3xl text-[#11100F] leading-snug">
            {data.current_build}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 border-t border-neutral-200/60 pt-12">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 w-32 shrink-0">
            Learning
          </h2>
          <p className="font-sans text-lg md:text-xl text-neutral-700 leading-relaxed font-light">
            {data.current_learning}
          </p>
        </div>

        {data.current_question && (
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 border-t border-neutral-200/60 pt-12">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 w-32 shrink-0">
              Open Question
            </h2>
            <p className="font-serif text-2xl text-[#2563EB] italic leading-snug">
              &ldquo;{data.current_question}&rdquo;
            </p>
          </div>
        )}

        {data.current_reading && (
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 border-t border-neutral-200/60 pt-12">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 w-32 shrink-0">
              Reading
            </h2>
            <p className="font-sans text-lg md:text-xl text-neutral-700 leading-relaxed font-light">
              {data.current_reading}
            </p>
          </div>
        )}

        {data.bandwidth_allocation && (
          <div className="flex flex-col gap-6 border-t border-neutral-200/60 pt-12">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">
              Bandwidth Allocation
            </h2>
            <div className="flex flex-col gap-4">
              {Object.entries(data.bandwidth_allocation).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-2">
                  <div className="flex justify-between font-mono text-xs text-neutral-600">
                    <span className="uppercase tracking-widest">{key}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="w-full h-[1px] bg-neutral-200">
                    <div 
                      className="h-full bg-[#11100F] transition-all duration-1000 ease-out" 
                      style={{ width: `${value}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </article>
  );
}
