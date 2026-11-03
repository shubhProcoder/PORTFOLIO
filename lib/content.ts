import fs from "fs";
import path from "path";
import yaml from "yaml";
import { PersonSchema, Person } from "./schema/person.schema";
import { ProjectSchema, Project } from "./schema/project.schema";
import { ThinkingSchema, Thinking } from "./schema/thinking.schema";
import { LabSchema, Lab } from "./schema/lab.schema";
import { JourneySchema, Journey } from "./schema/journey.schema";
import { NowSchema, Now } from "./schema/now.schema";
import { TaxonomySchema, Taxonomy } from "./schema/taxonomy.schema";
import { ObservationSchema, HydratedObservation } from "./schema/observation.schema";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readYamlFile<T>(filePath: string, schema: any): T {
  const fullPath = path.join(CONTENT_DIR, filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Content file not found: ${fullPath}`);
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const parsedYaml = yaml.parse(fileContents);
  return schema.parse(parsedYaml);
}

function readYamlDirectory<T>(dirPath: string, schema: any): T[] {
  const fullDirPath = path.join(CONTENT_DIR, dirPath);
  if (!fs.existsSync(fullDirPath)) {
    return [];
  }
  const fileNames = fs.readdirSync(fullDirPath).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));
  return fileNames.map((fileName) => {
    const fullPath = path.join(fullDirPath, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const parsedYaml = yaml.parse(fileContents);
    return schema.parse(parsedYaml);
  });
}

export function getPerson(): Person {
  return readYamlFile<Person>("person/shubh.yaml", PersonSchema);
}

export function getProjects(): Project[] {
  return readYamlDirectory<Project>("projects", ProjectSchema).filter(p => !p.draft);
}

export function getThinking(): Thinking[] {
  return readYamlDirectory<Thinking>("thinking", ThinkingSchema).filter(t => !t.draft);
}

export function getLabExperiments(): Lab[] {
  return readYamlDirectory<Lab>("lab", LabSchema).filter(l => !l.draft);
}

export function getJourney(): Journey[] {
  return readYamlDirectory<Journey>("journey", JourneySchema).filter(j => !j.draft);
}

export function getNow(): Now {
  return readYamlFile<Now>("now/now.yaml", NowSchema);
}

export function getTaxonomy(): Taxonomy {
  return readYamlFile<Taxonomy>("technologies/taxonomy.yaml", TaxonomySchema);
}

/**
 * Get all observations (including drafts) - for authoring / internal admin only.
 */
export function getAllObservations(): HydratedObservation[] {
  const observations = readYamlDirectory<HydratedObservation>("observations", ObservationSchema);
  return observations
    .map(obs => ({
      ...obs,
      slug: obs.slug || obs.id || obs.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Get published observations (drafts strictly excluded)
 */
export function getObservations(): HydratedObservation[] {
  return getAllObservations().filter(obs => !obs.draft && obs.status !== 'DRAFT');
}

/**
 * Explicit alias for public published observations
 */
export function getPublishedObservations(): HydratedObservation[] {
  return getObservations();
}

/**
 * Retrieve a single observation by slug (published only)
 */
export function getObservation(slug: string): HydratedObservation | undefined {
  return getObservations().find(obs => obs.slug === slug);
}

export function getObservationBySlug(slug: string): HydratedObservation | undefined {
  return getObservation(slug);
}

/**
 * Retrieve related observations for a given observation slug
 */
export function getRelatedObservations(slug: string): HydratedObservation[] {
  const current = getObservation(slug);
  if (!current) return [];

  const all = getObservations().filter(o => o.slug !== slug);
  const relatedSlugs = new Set(current.relatedObservations || []);
  const currentProjects = new Set(current.relatedProjects || []);
  const currentTags = new Set(current.tags || []);

  return all.filter(obs => {
    // Explicitly linked in relatedObservations
    if (relatedSlugs.has(obs.slug)) return true;
    // Shared related projects
    if (obs.relatedProjects && obs.relatedProjects.some(p => currentProjects.has(p))) return true;
    // Shared tags (at least 2 matching tags)
    const matchingTags = (obs.tags || []).filter(t => currentTags.has(t));
    if (matchingTags.length >= 2) return true;
    return false;
  });
}

/**
 * Filter observations by type
 */
export function getObservationsByType(type: string): HydratedObservation[] {
  return getObservations().filter(obs => obs.type === type);
}

/**
 * Search observations by query string
 */
export function searchObservations(query: string): HydratedObservation[] {
  const q = query.trim().toLowerCase();
  if (!q) return getObservations();

  return getObservations().filter(obs => {
    if (obs.title.toLowerCase().includes(q)) return true;
    if (obs.subtitle && obs.subtitle.toLowerCase().includes(q)) return true;
    if (obs.excerpt.toLowerCase().includes(q)) return true;
    if (obs.tags.some(t => t.toLowerCase().includes(q))) return true;
    if (obs.blocks.some(b => b.content && b.content.toLowerCase().includes(q))) return true;
    return false;
  });
}

