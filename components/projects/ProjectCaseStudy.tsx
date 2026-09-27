import { Project } from '@/lib/schema/project.schema';
import { ProjectHeader } from './ProjectHeader';
import { ProjectContext } from './ProjectContext';
import { ProjectProblem } from './ProjectProblem';
import { ProjectArchitecture } from './ProjectArchitecture';
import { ProjectContribution } from './ProjectContribution';
import { ProjectEvaluation } from './ProjectEvaluation';
import { ProjectFailures } from './ProjectFailures';
import { ProjectLearnings } from './ProjectLearnings';
import { ProjectConnections } from './ProjectConnections';

interface ProjectCaseStudyProps {
  project: Project;
}

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  return (
    <article className="max-w-[1000px] mx-auto pt-24 pb-32 px-6 md:px-12 flex flex-col gap-16 md:gap-24 font-mono text-neutral-300">
      <ProjectHeader project={project} />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-8 flex flex-col gap-16 md:gap-24">
          <ProjectContext context={project.context} type={project.type} />
          <ProjectProblem problem={project.problem} approach={project.approach} hypothesis={project.hypothesis} />
          <ProjectArchitecture architecture={project.architecture} build={project.build} stack={project.stack} coreFeatures={project.core_features} />
          <ProjectContribution personal={project.personal_contribution} team={project.team_contribution} />
          <ProjectEvaluation evaluation={project.evaluation} results={project.results} />
          <ProjectFailures failures={project.failures} />
          <ProjectLearnings learnings={project.learnings} />
        </div>
        
        <aside className="md:col-span-4 flex flex-col gap-12">
          <ProjectConnections project={project} />
        </aside>
      </div>
    </article>
  );
}
