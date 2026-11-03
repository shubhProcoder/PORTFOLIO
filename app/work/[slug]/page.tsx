import { getProjects } from '@/lib/content';
import { ProjectCaseStudy } from '@/components/projects/ProjectCaseStudy';
import { AuroraCanvas } from '@/components/visual/AuroraCanvas';
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
    /* Paper & Whisper — light reading surface with ultra-low edge glows */
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1A1816] overflow-hidden selection:bg-[#2B4AE8] selection:text-white">
      <AuroraCanvas variant="light" />
      <ProjectCaseStudy project={project} />
    </main>
  );
}
