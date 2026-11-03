import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { getAllObservations, getProjects, getLabExperiments } from '@/lib/content';
import { Observation, ObservationSchema } from '@/lib/schema/observation.schema';
import { validateObservation } from '@/lib/validation/observation-validator';

const OBSERVATIONS_DIR = path.join(process.cwd(), 'content', 'observations');

export async function GET() {
  try {
    const observations = getAllObservations();
    const projects = getProjects().map(p => p.slug || p.id || p.title.toLowerCase().replace(/\s+/g, '-'));
    const labs = getLabExperiments().map(l => l.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));

    return NextResponse.json({
      observations,
      knownProjectSlugs: projects,
      knownLabSlugs: labs,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, observation } = body as {
      action: 'SAVE_DRAFT' | 'PUBLISH' | 'UNPUBLISH' | 'ARCHIVE' | 'VALIDATE';
      observation: Partial<Observation>;
    };

    if (!observation) {
      return NextResponse.json({ error: 'Missing observation payload' }, { status: 400 });
    }

    // Security Authorization Boundary
    if (action !== 'VALIDATE') {
      const authHeader = req.headers.get('authorization');
      const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
      const expectedToken = process.env.OBSERVATIONS_ADMIN_TOKEN;

      if (!expectedToken) {
        if (process.env.NODE_ENV === 'production') {
          return NextResponse.json(
            { error: 'Server configuration error: OBSERVATIONS_ADMIN_TOKEN is not set in production' },
            { status: 500 }
          );
        }
      } else if (token !== expectedToken) {
        return NextResponse.json(
          { error: 'Unauthorized: Invalid or missing admin token' },
          { status: 401 }
        );
      }
    }

    // Determine slug
    const slug = (
      observation.slug ||
      observation.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') ||
      `obs-${Date.now()}`
    ).trim();

    // Adjust status and draft flags according to action
    const nowIso = new Date().toISOString().split('T')[0];
    const updatedObservation: Observation = {
      ...observation,
      slug,
      title: observation.title || 'Untitled Observation',
      excerpt: observation.excerpt || '',
      type: observation.type || 'TECHNICAL_NOTE',
      status: observation.status || 'DRAFT',
      createdAt: observation.createdAt || nowIso,
      updatedAt: nowIso,
      draft: observation.draft ?? true,
      source: observation.source || {
        kind: 'NATIVE',
        canonicalLocation: 'PORTFOLIO',
        availability: 'AVAILABLE',
      },
      blocks: observation.blocks || [],
      tags: observation.tags || [],
      relatedProjects: observation.relatedProjects || [],
      relatedLabs: observation.relatedLabs || [],
      relatedObservations: observation.relatedObservations || [],
      relatedTechnologies: observation.relatedTechnologies || [],
    } as Observation;

    if (action === 'SAVE_DRAFT') {
      updatedObservation.status = 'DRAFT';
      updatedObservation.draft = true;
    } else if (action === 'PUBLISH') {
      updatedObservation.status = 'PUBLISHED';
      updatedObservation.draft = false;
      if (!updatedObservation.publishedAt) {
        updatedObservation.publishedAt = nowIso;
      }
    } else if (action === 'UNPUBLISH') {
      updatedObservation.status = 'EDITING';
      updatedObservation.draft = true;
    } else if (action === 'ARCHIVE') {
      updatedObservation.status = 'ARCHIVED';
      updatedObservation.draft = true;
    }

    // Get context for validation
    const existing = getAllObservations();
    const existingSlugs = existing.map(o => o.slug);
    const projects = getProjects().map(p => p.slug || p.id || p.title.toLowerCase().replace(/\s+/g, '-'));
    const labs = getLabExperiments().map(l => l.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));

    const report = validateObservation(updatedObservation, {
      existingSlugs,
      currentSlug: observation.slug,
      knownProjectSlugs: projects,
      knownLabSlugs: labs,
    });

    if (action === 'VALIDATE') {
      return NextResponse.json({ report, observation: updatedObservation });
    }

    if (action === 'PUBLISH' && !report.canPublish) {
      return NextResponse.json(
        {
          error: 'Cannot publish observation: readiness checks failed',
          report,
        },
        { status: 422 }
      );
    }

    // Ensure directory exists
    if (!fs.existsSync(OBSERVATIONS_DIR)) {
      fs.mkdirSync(OBSERVATIONS_DIR, { recursive: true });
    }

    // Serialize to YAML
    const filePath = path.join(OBSERVATIONS_DIR, `${slug}.yaml`);
    const yamlString = yaml.stringify(updatedObservation, { indent: 2 });
    fs.writeFileSync(filePath, yamlString, 'utf8');

    return NextResponse.json({
      success: true,
      action,
      slug,
      report,
      observation: updatedObservation,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
