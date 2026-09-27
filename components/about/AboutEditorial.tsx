import { Person } from '@/lib/schema/person.schema';
import { Journey } from '@/lib/schema/journey.schema';
import Link from 'next/link';

interface Props {
  person: Person;
  journey: Journey[];
}

export function AboutEditorial({ person, journey }: Props) {
  return (
    <article className="max-w-[800px] mx-auto px-6 md:px-12 flex flex-col gap-24">
      <header className="flex flex-col gap-8">
        <Link href="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 hover:text-[#2563EB] transition-colors w-fit">
          ← Return to Cover
        </Link>
        <div className="flex flex-col gap-6">
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-[#11100F] leading-none">
            {person.name}.
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            {person.title}
          </p>
        </div>
        
        {person.manifesto && (
          <p className="font-serif text-2xl md:text-3xl text-[#2563EB] italic leading-snug mt-8 border-l border-[#2563EB]/30 pl-6">
            &ldquo;{person.manifesto}&rdquo;
          </p>
        )}
      </header>

      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 border-b border-neutral-200/60 pb-4">
          Biography
        </h2>
        {person.bio_short && (
          <p className="font-sans text-lg md:text-xl text-neutral-700 leading-relaxed font-light">
            {person.bio_short}
          </p>
        )}
        <div className="flex flex-col gap-4 mt-4 font-mono text-xs text-neutral-500">
          <p><span className="uppercase tracking-widest w-32 inline-block">Education:</span> {person.education}</p>
          <p><span className="uppercase tracking-widest w-32 inline-block">Focus:</span> {person.primary_focus}</p>
          <p><span className="uppercase tracking-widest w-32 inline-block">Location:</span> {person.location} ({person.timezone})</p>
          <p className="flex items-center gap-4">
            <span className="uppercase tracking-widest w-32 inline-block">Status:</span> 
            <span>{person.status}</span>
            <Link href="/now" className="text-[#2563EB] hover:underline uppercase tracking-widest">
              [Read Now Page ↗]
            </Link>
          </p>
        </div>
      </section>

      {journey && journey.length > 0 && (
        <section className="flex flex-col gap-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 border-b border-neutral-200/60 pb-4">
            Evolution & Experience
          </h2>
          <div className="flex flex-col gap-12 mt-4">
            {journey.map((event, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-12 group">
                <div className="w-32 shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 pt-2">
                  {event.year}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-sans text-lg font-medium text-[#11100F] group-hover:text-[#2563EB] transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                    <span className="px-2 py-0.5 border border-neutral-200">{event.organization}</span>
                  </div>
                  {event.description && (
                    <p className="font-sans text-sm md:text-base text-neutral-600 leading-relaxed mt-2">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="pt-24 pb-12 flex flex-col items-center gap-6 border-t border-neutral-200/60">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">
          Connect
        </h2>
        <div className="flex gap-8">
          {person.channels.github && (
            <a href={person.channels.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-widest hover:text-[#2563EB] transition-colors">
              GitHub ↗
            </a>
          )}
          {person.channels.linkedin && (
            <a href={person.channels.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-widest hover:text-[#2563EB] transition-colors">
              LinkedIn ↗
            </a>
          )}
        </div>
      </footer>
    </article>
  );
}
