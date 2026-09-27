import { Project } from '@/lib/schema/project.schema';
import Link from 'next/link';

interface Props {
  project: Project;
}

export function ProjectHeader({ project }: Props) {
  return (
    <header className="flex flex-col gap-6 border-b border-white/10 pb-12">
      <div className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-widest uppercase">
        <Link href="/work" className="text-neutral-500 hover:text-white transition-colors">
          ← WORK
        </Link>
        <span className="text-neutral-700">/</span>
        <span className="text-[#38BDF8]">{project.id || project.slug || "PROJECT"}</span>
        <span className={`px-2 py-1 border ${
          project.status === 'COMPLETED' ? 'text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10' :
          project.status === 'IN_PROGRESS' ? 'text-[#F59E0B] border-[#F59E0B]/30 bg-[#F59E0B]/10' :
          'text-neutral-500 border-neutral-700'
        }`}>
          {project.status}
        </span>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-snug">
        {project.title}
      </h1>
      
      <div className="flex flex-wrap gap-4 mt-4">
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#38BDF8] hover:underline uppercase tracking-widest border border-[#38BDF8]/30 px-4 py-2">
            View Repository ↗
          </a>
        )}
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#F59E0B] hover:underline uppercase tracking-widest border border-[#F59E0B]/30 px-4 py-2">
            Live Demo ↗
          </a>
        )}
      </div>
    </header>
  );
}
