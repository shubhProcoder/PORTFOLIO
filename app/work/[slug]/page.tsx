import { getProjects } from '@/lib/content';
import { ProjectCaseStudy } from '@/components/projects/ProjectCaseStudy';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug || project.id || project.title.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const projects = getProjects();
  const project = projects.find(
    (p) => (p.slug || p.id || p.title.toLowerCase().replace(/\s+/g, '-')) === params.slug
  );

  if (!project) return {};

  return {
    title: `${project.title} — Shubh Mehrotra`,
    description: project.context || `Case study for ${project.title}`,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const projects = getProjects();
  const project = projects.find(
    (p) => (p.slug || p.id || p.title.toLowerCase().replace(/\s+/g, '-')) === params.slug
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0C0E14] text-neutral-300 selection:bg-[#38BDF8] selection:text-[#0C0E14]">
      <ProjectCaseStudy project={project} />
    </main>
  );
}
