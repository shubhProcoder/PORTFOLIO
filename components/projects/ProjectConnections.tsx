import { Project } from '@/lib/schema/project.schema';
import Link from 'next/link';

interface Props {
  project: Project;
}

export function ProjectConnections({ project }: Props) {
  const hasConnections = 
    (project.related_projects && project.related_projects.length > 0) ||
    (project.related_experiments && project.related_experiments.length > 0) ||
    (project.related_articles && project.related_articles.length > 0);

  if (!hasConnections) return null;

  return (
    <section className="flex flex-col gap-6 sticky top-24">
      <h2 className="text-xs font-bold tracking-widest text-neutral-500 uppercase border-b border-white/10 pb-2">
        Connected Knowledge
      </h2>
      
      <div className="flex flex-col gap-8">
        {project.related_experiments && project.related_experiments.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-[#10B981] tracking-widest uppercase">RELATED EXPERIMENTS</span>
            <ul className="flex flex-col gap-2">
              {project.related_experiments.map((id) => (
                <li key={id}>
                  <Link href="/labs" className="text-sm text-neutral-400 hover:text-[#10B981] hover:underline transition-colors block truncate">
                    ↳ {id}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.related_projects && project.related_projects.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-[#38BDF8] tracking-widest uppercase">RELATED SYSTEMS</span>
            <ul className="flex flex-col gap-2">
              {project.related_projects.map((id) => (
                <li key={id}>
                  <Link href={`/work/${id}`} className="text-sm text-neutral-400 hover:text-[#38BDF8] hover:underline transition-colors block truncate">
                    ↳ {id}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.related_articles && project.related_articles.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-[#F59E0B] tracking-widest uppercase">FIELD NOTES</span>
            <ul className="flex flex-col gap-2">
              {project.related_articles.map((id) => (
                <li key={id}>
                  <Link href={`/observations`} className="text-sm text-neutral-400 hover:text-[#F59E0B] hover:underline transition-colors block truncate">
                    ↳ {id}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
