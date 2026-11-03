import { Observation, ObservationSchema } from '../schema/observation.schema';

export interface ValidationCheck {
  id: string;
  name: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
  field?: string;
}

export interface PublicationReadinessReport {
  isValid: boolean;
  canPublish: boolean;
  summary: string;
  checks: ValidationCheck[];
}

export interface ExistingContext {
  existingSlugs?: string[];
  currentSlug?: string;
  knownProjectSlugs?: string[];
  knownLabSlugs?: string[];
}

/**
 * Validate an observation and generate a publication readiness report
 */
export function validateObservation(
  data: Partial<Observation>,
  context: ExistingContext = {}
): PublicationReadinessReport {
  const checks: ValidationCheck[] = [];

  // 1. Schema Base Parse Check
  const parseResult = ObservationSchema.safeParse(data);
  if (!parseResult.success) {
    const errorMessages = parseResult.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join('; ');
    checks.push({
      id: 'schema_validity',
      name: 'Schema Validity',
      status: 'FAIL',
      message: `Schema errors: ${errorMessages}`,
    });
  } else {
    checks.push({
      id: 'schema_validity',
      name: 'Schema Validity',
      status: 'PASS',
      message: 'All fields match canonical Observation schema.',
    });
  }

  // 2. Required Metadata
  const hasTitle = Boolean(data.title && data.title.trim().length > 3);
  const hasExcerpt = Boolean(data.excerpt && data.excerpt.trim().length >= 10);
  const hasType = Boolean(data.type);
  const hasCreatedAt = Boolean(data.createdAt && /^\d{4}-\d{2}-\d{2}$/.test(data.createdAt));

  if (hasTitle && hasExcerpt && hasType && hasCreatedAt) {
    checks.push({
      id: 'required_metadata',
      name: 'Required Metadata',
      status: 'PASS',
      message: 'Title, excerpt, type, and creation date are properly defined.',
    });
  } else {
    const missing: string[] = [];
    if (!hasTitle) missing.push('title (min 3 chars)');
    if (!hasExcerpt) missing.push('excerpt (min 10 chars)');
    if (!hasType) missing.push('type');
    if (!hasCreatedAt) missing.push('createdAt (YYYY-MM-DD)');
    checks.push({
      id: 'required_metadata',
      name: 'Required Metadata',
      status: 'FAIL',
      message: `Missing or invalid required metadata: ${missing.join(', ')}`,
      field: missing[0],
    });
  }

  // 3. Content Structure
  const blocks = data.blocks || [];
  const substantiveBlocks = blocks.filter(
    (b) => (b.content && b.content.trim().length > 0) || (b.type === 'image' && b.src)
  );

  if (substantiveBlocks.length > 0) {
    checks.push({
      id: 'content_structure',
      name: 'Content Structure',
      status: 'PASS',
      message: `${substantiveBlocks.length} structured content block(s) verified.`,
    });
  } else {
    checks.push({
      id: 'content_structure',
      name: 'Content Structure',
      status: 'FAIL',
      message: 'At least one substantive block with content is required.',
      field: 'blocks',
    });
  }

  // 4. Source & External URL Validation
  const source = data.source;
  if (!source) {
    checks.push({
      id: 'source_declared',
      name: 'Source Declared',
      status: 'FAIL',
      message: 'Source declaration is completely missing.',
      field: 'source',
    });
  } else if (source.kind === 'EXTERNAL') {
    const isValidUrl =
      Boolean(source.originalUrl) &&
      /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(source.originalUrl || '');

    if (isValidUrl) {
      checks.push({
        id: 'source_declared',
        name: 'Source Declared',
        status: 'PASS',
        message: `External publication source verified (${source.platform || 'EXTERNAL'} via ${source.originalUrl}).`,
      });
    } else {
      checks.push({
        id: 'source_declared',
        name: 'Source Declared',
        status: 'FAIL',
        message: 'External observations MUST specify a valid http(s) originalUrl.',
        field: 'source.originalUrl',
      });
    }
  } else {
    // NATIVE observation
    checks.push({
      id: 'source_declared',
      name: 'Source Declared',
      status: 'PASS',
      message: 'Native observation confirmed; canonical location is portfolio.',
    });
  }

  // 5. Claims & Editorial Review
  const hasEditorialMeta = Boolean(data.editorial?.keyQuestion || data.editorial?.hypothesis);
  const hasBlockDistinctions = blocks.some((b) => b.editorial);

  if (hasBlockDistinctions || hasEditorialMeta) {
    checks.push({
      id: 'claims_reviewed',
      name: 'Claims Reviewed',
      status: 'PASS',
      message: 'Epistemic distinctions and research hypotheses are explicitly declared.',
    });
  } else {
    checks.push({
      id: 'claims_reviewed',
      name: 'Claims Reviewed',
      status: 'WARN',
      message: 'No epistemic distinctions (e.g. EXPERIMENTAL_RESULT, SOURCE_DERIVED) attached to blocks.',
    });
  }

  // 6. Related Work Validity
  const invalidProjects: string[] = [];
  if (context.knownProjectSlugs && data.relatedProjects) {
    for (const p of data.relatedProjects) {
      if (!context.knownProjectSlugs.includes(p)) {
        invalidProjects.push(p);
      }
    }
  }

  const invalidLabs: string[] = [];
  if (context.knownLabSlugs && data.relatedLabs) {
    for (const l of data.relatedLabs) {
      if (!context.knownLabSlugs.includes(l)) {
        invalidLabs.push(l);
      }
    }
  }

  if (invalidProjects.length > 0 || invalidLabs.length > 0) {
    const issues = [
      ...invalidProjects.map((p) => `Unknown project "${p}"`),
      ...invalidLabs.map((l) => `Unknown lab "${l}"`),
    ];
    checks.push({
      id: 'related_work_valid',
      name: 'Related Work Valid',
      status: 'WARN',
      message: `Unverified references: ${issues.join(', ')}`,
      field: 'relatedProjects',
    });
  } else {
    checks.push({
      id: 'related_work_valid',
      name: 'Related Work Valid',
      status: 'PASS',
      message: 'All linked projects and labs are recognized.',
    });
  }

  // 7. Slug Available & Syntax Check
  const slug = data.slug;
  if (!slug) {
    checks.push({
      id: 'slug_available',
      name: 'Slug Available',
      status: 'WARN',
      message: 'No custom slug specified; slug will be automatically derived from title.',
    });
  } else {
    const isKebabCase = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
    if (!isKebabCase) {
      checks.push({
        id: 'slug_available',
        name: 'Slug Available',
        status: 'FAIL',
        message: `Slug "${slug}" must be lowercase alphanumeric with hyphens.`,
        field: 'slug',
      });
    } else if (
      context.existingSlugs &&
      context.existingSlugs.includes(slug) &&
      slug !== context.currentSlug
    ) {
      checks.push({
        id: 'slug_available',
        name: 'Slug Available',
        status: 'FAIL',
        message: `Slug "${slug}" is already in use by another observation.`,
        field: 'slug',
      });
    } else {
      checks.push({
        id: 'slug_available',
        name: 'Slug Available',
        status: 'PASS',
        message: `Slug "${slug}" is valid and available.`,
      });
    }
  }

  // 8. Draft Protection & Status Coherence
  if (data.status === 'PUBLISHED' && data.draft === true) {
    checks.push({
      id: 'draft_protection',
      name: 'Draft Protection',
      status: 'FAIL',
      message: 'Observation is marked as PUBLISHED but draft flag is still true.',
      field: 'draft',
    });
  } else {
    checks.push({
      id: 'draft_protection',
      name: 'Draft Protection',
      status: 'PASS',
      message: `Publication state is consistent (status: ${data.status || 'DRAFT'}, draft: ${data.draft ? 'true' : 'false'}).`,
    });
  }

  const failures = checks.filter((c) => c.status === 'FAIL');
  const isValid = failures.length === 0;
  const canPublish = isValid && data.status !== 'DRAFT' && !data.draft;

  return {
    isValid,
    canPublish,
    summary: isValid
      ? canPublish
        ? 'READY TO PUBLISH'
        : 'VALID DRAFT (READY FOR EDITORIAL REVIEW)'
      : `VALIDATION FAILED (${failures.length} issues)`,
    checks,
  };
}
