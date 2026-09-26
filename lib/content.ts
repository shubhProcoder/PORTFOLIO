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
