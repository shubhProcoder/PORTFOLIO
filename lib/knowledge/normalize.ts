// ============================================================
// KNOWLEDGE NORMALIZER
// Converts existing content model entities into normalized KnowledgeEntities
// ============================================================

import {
  getPerson,
  getProjects,
  getThinking,
  getLabExperiments,
  getJourney,
  getNow,
  getTaxonomy,
} from '../content';
import type {
  KnowledgeEntity,
  Relationship,
  KnowledgeIndex,
  EntityStatus,
  EvidenceState,
} from './types';

function classifyEvidenceState(status: EntityStatus, isDraft: boolean): EvidenceState {
  if (isDraft) return 'PLANNED';
  switch (status) {
    case 'COMPLETED':
    case 'PUBLISHED':
    case 'VALIDATED':
      return 'VERIFIED_FACT';
    case 'IN_PROGRESS':
    case 'ACTIVE':
      return 'IN_PROGRESS';
    case 'PLANNED':
      return 'PLANNED';
    case 'FAILED':
    case 'REVISED':
      return 'SELF_REPORTED';
    case 'ABANDONED':
      return 'SELF_REPORTED';
    case 'DRAFT':
      return 'PLANNED';
    default:
      return 'SELF_REPORTED';
  }
}

function buildSearchableText(fields: Record<string, string | string[] | undefined>): string {
  const parts: string[] = [];
  for (const [, value] of Object.entries(fields)) {
    if (!value) continue;
    if (Array.isArray(value)) {
      parts.push(value.join(' '));
    } else {
      parts.push(value);
    }
  }
  return parts.join(' ').toLowerCase();
}

export function normalizeContentToEntities(): { entities: KnowledgeEntity[]; relationships: Relationship[] } {
  const entities: KnowledgeEntity[] = [];
  const relationships: Relationship[] = [];

  // ── PERSON ──
  const person = getPerson();
  const personId = 'person-shubh';
  entities.push({
    id: personId,
    type: 'PERSON',
    title: person.name,
    status: 'ACTIVE' as EntityStatus,
    route: '/about',
    sourcePath: 'person/shubh.yaml',
    fields: {
      name: person.name,
      title: person.title,
      education: person.education,
      primary_focus: person.primary_focus,
      manifesto: person.manifesto,
      bio_short: person.bio_short,
      status: person.status,
      location: person.location,
    },
    searchableText: buildSearchableText({
      name: person.name,
      title: person.title,
      education: person.education,
      primary_focus: person.primary_focus,
      manifesto: person.manifesto,
      bio_short: person.bio_short,
      status: person.status,
      location: person.location,
    }),
    evidenceState: 'VERIFIED_FACT',
    isDraft: false,
  });

  // ── PROJECTS ──
  const allProjects = getProjects();
  for (const project of allProjects) {
    const projectId = project.id || `project-${project.slug || project.title.toLowerCase().replace(/\s+/g, '-')}`;
    const slug = project.slug || project.title.toLowerCase().replace(/\s+/g, '-');

    const fields: Record<string, string | string[] | undefined> = {
      title: project.title,
      type: project.type,
      context: project.context,
      problem: project.problem,
      hypothesis: project.hypothesis,
      approach: project.approach,
      architecture: project.architecture,
      build: project.build,
      personal_contribution: project.personal_contribution,
      team_contribution: project.team_contribution,
      evaluation: project.evaluation,
      failures: project.failures,
      results: project.results,
      learnings: project.learnings,
      stack: project.stack,
      core_features: project.core_features,
      evidence: project.evidence,
    };

    entities.push({
      id: projectId,
      type: 'PROJECT',
      title: project.title,
      status: project.status as EntityStatus,
      route: `/work/${slug}`,
      sourcePath: `projects/${slug}.yaml`,
      fields,
      searchableText: buildSearchableText(fields),
      evidenceState: classifyEvidenceState(project.status as EntityStatus, project.draft),
      isDraft: project.draft,
    });

    // PERSON → BUILT → PROJECT
    relationships.push({
      from: personId,
      to: projectId,
      type: 'BUILT',
      label: `Built ${project.title}`,
    });

    // PROJECT → USES → TECHNOLOGY
    for (const tech of project.stack) {
      const techId = `tech-${tech.toLowerCase().replace(/[\s.]+/g, '-')}`;
      // Only add tech entity if not already present
      if (!entities.find(e => e.id === techId)) {
        entities.push({
          id: techId,
          type: 'TECHNOLOGY',
          title: tech,
          status: 'ACTIVE' as EntityStatus,
          route: '/work',
          sourcePath: 'technologies/taxonomy.yaml',
          fields: { name: tech },
          searchableText: tech.toLowerCase(),
          evidenceState: 'VERIFIED_FACT',
          isDraft: false,
        });
      }
      relationships.push({
        from: projectId,
        to: techId,
        type: 'USES',
        label: `Uses ${tech}`,
      });
    }

    // PROJECT → RELATED_TO → EXPERIMENT
    if (project.related_experiments) {
      for (const expSlug of project.related_experiments) {
        relationships.push({
          from: projectId,
          to: `lab-${expSlug}`,
          type: 'TESTED_BY',
          label: `Tested by ${expSlug}`,
        });
      }
    }

    // PROJECT → RELATED_TO → ARTICLE
    if (project.related_articles) {
      for (const articleSlug of project.related_articles) {
        relationships.push({
          from: projectId,
          to: `thinking-${articleSlug}`,
          type: 'RELATED_TO',
          label: `Related to ${articleSlug}`,
        });
      }
    }
  }

  // ── THINKING ──
  const allThinking = getThinking();
  for (const article of allThinking) {
    const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const articleId = `thinking-${slug}`;
    const fields: Record<string, string | string[] | undefined> = {
      title: article.title,
      topic: article.topic,
    };

    entities.push({
      id: articleId,
      type: 'THINKING',
      title: article.title,
      status: article.status as EntityStatus,
      route: '/observations',
      sourcePath: `thinking/${slug}.yaml`,
      fields,
      searchableText: buildSearchableText(fields),
      evidenceState: classifyEvidenceState(article.status as EntityStatus, article.draft),
      isDraft: article.draft,
    });
  }

  // ── LAB EXPERIMENTS ──
  const allLab = getLabExperiments();
  for (const exp of allLab) {
    const slug = exp.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const expId = `lab-${slug}`;
    const fields: Record<string, string | string[] | undefined> = {
      title: exp.title,
      hypothesis: exp.hypothesis,
      learning: exp.learning,
    };

    entities.push({
      id: expId,
      type: 'LAB',
      title: exp.title,
      status: exp.status as EntityStatus,
      route: '/labs',
      sourcePath: `lab/${slug}.yaml`,
      fields,
      searchableText: buildSearchableText(fields),
      evidenceState: classifyEvidenceState(exp.status as EntityStatus, exp.draft),
      isDraft: exp.draft,
    });
  }

  // ── JOURNEY ──
  const allJourney = getJourney();
  for (const event of allJourney) {
    const slug = event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const eventId = `journey-${slug}`;
    const fields: Record<string, string | string[] | undefined> = {
      title: event.title,
      year: event.year,
      organization: event.organization,
      description: event.description,
    };

    entities.push({
      id: eventId,
      type: 'JOURNEY',
      title: event.title,
      status: 'COMPLETED' as EntityStatus,
      route: '/about',
      sourcePath: `journey/${slug}.yaml`,
      fields,
      searchableText: buildSearchableText(fields),
      evidenceState: 'VERIFIED_FACT',
      isDraft: false,
    });

    // PERSON → STUDIED → JOURNEY
    relationships.push({
      from: personId,
      to: eventId,
      type: 'STUDIED',
      label: `${event.title} at ${event.organization}`,
    });
  }

  // ── NOW ──
  const now = getNow();
  const nowId = 'now-current';
  const nowFields: Record<string, string | string[] | undefined> = {
    current_build: now.current_build,
    current_learning: now.current_learning,
    current_reading: now.current_reading,
    current_question: now.current_question,
    last_updated: now.last_updated,
  };

  entities.push({
    id: nowId,
    type: 'NOW',
    title: `Current State — ${now.last_updated}`,
    status: 'ACTIVE' as EntityStatus,
    route: '/now',
    sourcePath: 'now/now.yaml',
    fields: nowFields,
    searchableText: buildSearchableText(nowFields),
    evidenceState: 'SELF_REPORTED',
    isDraft: false,
  });

  // ── TECHNOLOGIES from taxonomy (fill in any not already added via projects) ──
  try {
    const taxonomy = getTaxonomy();
    for (const tech of taxonomy.technologies) {
      const techId = `tech-${tech.toLowerCase().replace(/[\s.]+/g, '-')}`;
      if (!entities.find(e => e.id === techId)) {
        entities.push({
          id: techId,
          type: 'TECHNOLOGY',
          title: tech,
          status: 'ACTIVE' as EntityStatus,
          route: '/work',
          sourcePath: 'technologies/taxonomy.yaml',
          fields: { name: tech },
          searchableText: tech.toLowerCase(),
          evidenceState: 'VERIFIED_FACT',
          isDraft: false,
        });
      }
    }
  } catch {
    // taxonomy file may not exist
  }

  return { entities, relationships };
}

export function buildKnowledgeIndex(): KnowledgeIndex {
  const { entities, relationships } = normalizeContentToEntities();
  return {
    entities,
    relationships,
    lastBuilt: new Date().toISOString(),
  };
}
