import assert from 'node:assert';
import { ObservationSchema, Observation } from '../lib/schema/observation.schema';
import { validateObservation } from '../lib/validation/observation-validator';
import {
  getObservations,
  getPublishedObservations,
  getAllObservations,
  getObservation,
  getRelatedObservations,
  getObservationsByType,
  searchObservations,
} from '../lib/content';
import { retrieve, invalidateIndex } from '../lib/knowledge';

console.log('================================================================');
console.log('OBSERVATIONS SYSTEM — COMPREHENSIVE AUTOMATED TEST SUITE');
console.log('PRD Sections 21–29: Architecture, Schema, Repo, Validation, RAG');
console.log('================================================================\n');

let passedTests = 0;
let failedTests = 0;

function runTest(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err: any) {
    console.error(`  ✕ FAIL: ${name}`);
    console.error(`    Error: ${err.message}\n`);
    failedTests++;
  }
}

// ── 1. CONTENT ARCHITECTURE & SCHEMA VALIDATION (PHASE O1) ──
console.log('--- 1. CONTENT ARCHITECTURE & SCHEMA TESTS ---');

runTest('Valid native observation parses successfully', () => {
  const validNative: Observation = {
    title: 'Testing Epistemic Boundaries in Hybrid RAG',
    excerpt: 'Detailed analysis of cosine similarity degradation on technical manuals.',
    type: 'TECHNICAL_NOTE',
    status: 'PUBLISHED',
    createdAt: '2024-09-01',
    source: {
      kind: 'NATIVE',
      canonicalLocation: 'PORTFOLIO',
      availability: 'AVAILABLE',
    },
    blocks: [
      {
        type: 'observation',
        label: 'WHAT I NOTICED',
        editorial: 'PERSONAL_OBSERVATION',
        content: 'Cosine similarity scores fail on alphanumeric IDs.',
      },
    ],
    tags: ['rag', 'retrieval'],
    relatedProjects: ['enterprise-hybrid-rag'],
    relatedLabs: ['exp-01-rrf-vs-weighted-fusion'],
    relatedObservations: [],
    relatedTechnologies: ['BM25', 'ChromaDB'],
    draft: false,
  };

  const parsed = ObservationSchema.parse(validNative);
  assert.strictEqual(parsed.title, validNative.title);
  assert.strictEqual(parsed.source.kind, 'NATIVE');
});

runTest('Valid external observation parses successfully', () => {
  const validExternal: Observation = {
    title: 'External Supply Chain Breakdown',
    excerpt: 'Analyzing micro-fulfillment dark store networks for ultra-fast delivery.',
    type: 'EXTERNAL_PUBLICATION',
    status: 'PUBLISHED',
    createdAt: '2024-05-15',
    source: {
      kind: 'EXTERNAL',
      platform: 'LINKEDIN',
      originalUrl: 'https://linkedin.com/in/shubh/post-1',
      canonicalLocation: 'EXTERNAL',
      availability: 'AVAILABLE',
    },
    blocks: [
      {
        type: 'analysis',
        content: 'Dark store density reduces travel radius to < 2km.',
      },
    ],
    tags: ['logistics', 'systems'],
    relatedProjects: [],
    relatedLabs: [],
    relatedObservations: [],
    relatedTechnologies: ['Distributed Systems'],
    draft: false,
  };

  const parsed = ObservationSchema.parse(validExternal);
  assert.strictEqual(parsed.source.kind, 'EXTERNAL');
  assert.strictEqual(parsed.source.platform, 'LINKEDIN');
});

runTest('Invalid observation fails schema validation', () => {
  const invalid = {
    title: '', // empty title
    type: 'UNKNOWN_TYPE', // invalid enum
  };
  const result = ObservationSchema.safeParse(invalid);
  assert.strictEqual(result.success, false);
});

// ── 2. EDITORIAL VALIDATION & READINESS (PHASE O6) ──
console.log('\n--- 2. EDITORIAL VALIDATION & READINESS REPORT TESTS ---');

runTest('External observation requires valid originalUrl', () => {
  const invalidExternal: Partial<Observation> = {
    title: 'Missing Source Link Article',
    excerpt: 'Some summary text for external article.',
    type: 'EXTERNAL_PUBLICATION',
    status: 'PUBLISHED',
    createdAt: '2024-05-15',
    source: {
      kind: 'EXTERNAL',
      platform: 'LINKEDIN',
      originalUrl: '', // INVALID empty URL
      canonicalLocation: 'EXTERNAL',
      availability: 'AVAILABLE',
    },
    blocks: [{ type: 'observation', content: 'Observed content.' }],
    draft: false,
  };

  const report = validateObservation(invalidExternal);
  assert.strictEqual(report.isValid, false);
  assert.strictEqual(report.canPublish, false);
  const sourceCheck = report.checks.find((c) => c.id === 'source_declared');
  assert.strictEqual(sourceCheck?.status, 'FAIL');
});

runTest('Draft cannot enter public collection (Draft Protection)', () => {
  const draftObs: Partial<Observation> = {
    title: 'Draft in Progress Notes',
    excerpt: 'Draft content that should remain unreleased.',
    type: 'TECHNICAL_NOTE',
    status: 'DRAFT',
    createdAt: '2024-10-01',
    source: {
      kind: 'NATIVE',
      canonicalLocation: 'PORTFOLIO',
      availability: 'AVAILABLE',
    },
    blocks: [{ type: 'observation', content: 'Work in progress.' }],
    draft: true,
  };

  const report = validateObservation(draftObs);
  assert.strictEqual(report.isValid, true);
  // canPublish MUST be false because it is a draft
  assert.strictEqual(report.canPublish, false);
  assert(report.summary.includes('DRAFT'));
});

runTest('Status PUBLISHED with draft: true triggers draft protection error', () => {
  const contradictory: Partial<Observation> = {
    title: 'Contradictory Status Record',
    excerpt: 'Some valid excerpt of sufficient length.',
    type: 'TECHNICAL_NOTE',
    status: 'PUBLISHED',
    createdAt: '2024-10-01',
    source: {
      kind: 'NATIVE',
      canonicalLocation: 'PORTFOLIO',
      availability: 'AVAILABLE',
    },
    blocks: [{ type: 'observation', content: 'Content text.' }],
    draft: true, // Contradiction!
  };

  const report = validateObservation(contradictory);
  assert.strictEqual(report.isValid, false);
  const draftCheck = report.checks.find((c) => c.id === 'draft_protection');
  assert.strictEqual(draftCheck?.status, 'FAIL');
});

// ── 3. CONTENT REPOSITORY TESTS (PHASE O2) ──
console.log('\n--- 3. CONTENT REPOSITORY METHOD TESTS ---');

runTest('getObservations() returns only non-draft published records', () => {
  const published = getObservations();
  assert(published.length > 0, 'Should find published observations in content/');
  for (const obs of published) {
    assert.strictEqual(obs.draft, false, `Observation ${obs.slug} must not be draft`);
    assert.notStrictEqual(obs.status, 'DRAFT', `Observation ${obs.slug} status must not be DRAFT`);
    assert(Boolean(obs.slug), `Observation ${obs.slug} must have hydrated slug`);
  }
});

runTest('getPublishedObservations() matches getObservations()', () => {
  const obs1 = getObservations();
  const obs2 = getPublishedObservations();
  assert.strictEqual(obs1.length, obs2.length);
  assert.deepStrictEqual(obs1.map((o) => o.slug), obs2.map((o) => o.slug));
});

runTest('getObservation(slug) returns correct item or undefined for unknown', () => {
  const obs = getObservation('evaluating-retrieval');
  assert(obs !== undefined);
  assert.strictEqual(obs?.slug, 'evaluating-retrieval');

  const unknown = getObservation('non-existent-random-slug-999');
  assert.strictEqual(unknown, undefined);
});

runTest('getRelatedObservations(slug) retrieves related items without self', () => {
  const related = getRelatedObservations('evaluating-retrieval');
  assert(Array.isArray(related));
  for (const r of related) {
    assert.notStrictEqual(r.slug, 'evaluating-retrieval', 'Should not relate to itself');
  }
});

runTest('getObservationsByType(type) filters accurately', () => {
  const techNotes = getObservationsByType('TECHNICAL_NOTE');
  assert(techNotes.length > 0);
  for (const t of techNotes) {
    assert.strictEqual(t.type, 'TECHNICAL_NOTE');
  }

  const external = getObservationsByType('EXTERNAL_PUBLICATION');
  assert(external.length > 0);
  for (const e of external) {
    assert.strictEqual(e.type, 'EXTERNAL_PUBLICATION');
  }
});

runTest('searchObservations(query) correctly matches text across title and blocks', () => {
  const results = searchObservations('fusion');
  assert(results.length > 0);
  assert(results.some((r) => r.slug === 'evaluating-retrieval'));

  const emptyResults = searchObservations('xyzqwertynonexistentquery123');
  assert.strictEqual(emptyResults.length, 0);
});

// ── 4. KNOWLEDGE & RAG RETRIEVAL EVALUATION (PHASE O8 & O9) ──
console.log('\n--- 4. KNOWLEDGE INTEGRATION & RETRIEVAL EVALUATION TESTS ---');

// Invalidate cache to ensure freshly normalized graph
invalidateIndex();

runTest('Query 1: What has Shubh learned about retrieval?', () => {
  const result = retrieve('What has Shubh learned about retrieval?');
  assert(result.evidence.length > 0, 'Must find evidence for retrieval');
  const top = result.evidence[0];
  assert(
    top.entityId.includes('retrieval') || top.entityTitle.toLowerCase().includes('retrieval'),
    `Top evidence was: ${top.entityTitle}`
  );
  assert(result.answer.toLowerCase().includes('retrieval'));
  assert.strictEqual(result.supportStatus, 'VERIFIED_FACT');
});

runTest('Query 2: What observations are connected to the Enterprise RAG project?', () => {
  const result = retrieve('What observations are connected to the Enterprise RAG project?');
  assert(result.evidence.length > 0);
  const hasRagEvidence = result.evidence.some(
    (e) => e.entityId.includes('hybrid-rag') || e.entityId.includes('retrieval')
  );
  assert(hasRagEvidence, 'Should retrieve Enterprise RAG or connected retrieval observation');
});

runTest('Query 3: What changed in Shubh thinking after building the RAG system?', () => {
  const result = retrieve("What changed in Shubh's thinking after building the RAG system?");
  assert(result.evidence.length > 0);
  assert(
    result.answer.includes('Reciprocal Rank Fusion') ||
    result.answer.includes('RRF') ||
    result.answer.includes('retrieval')
  );
});

runTest('Query 4: What has Shubh written about product systems?', () => {
  const result = retrieve('What has Shubh written about product systems?');
  assert(result.evidence.length > 0);
  const found = result.evidence.some(
    (e) => e.entityId.includes('planning') || e.entityTitle.includes('Planning') || e.entityTitle.includes('Daily')
  );
  assert(found, 'Should find mechanics of daily planning or daily sahayak');
});

runTest('Query 5: Show external publications about AI', () => {
  const result = retrieve('Show external publications about AI');
  assert(result.evidence.length > 0);
  const hasExternal = result.evidence.some(
    (e) => e.entityId.includes('blinkit') || e.sourcePath.includes('blinkit') || e.structuredData?.sourcePlatform
  );
  assert(hasExternal, 'Should retrieve Blinkit external publication');
  assert(result.answer.includes('LinkedIn') || result.answer.includes('Blinkit'));
});

runTest('Grounding & Negative Query: Unverified scale check refuses false claims', () => {
  const result = retrieve('Did Shubh handle production workloads for 100K+ users?');
  assert(
    result.answer.includes('NO PUBLISHED EVIDENCE FOUND') ||
    result.answer.includes('no published evidence'),
    'Must refuse unverified scale claim'
  );
  assert.notStrictEqual(result.supportStatus, 'VERIFIED_FACT');
});

// ── 5. EVALUATION CORPUS EXPANSION (PROVENANCE, LEAKAGE, EPISTEMIC) ──
console.log('\n--- 5. EVALUATION CORPUS EXPANSION TESTS ---');

runTest('Evaluation: Draft Leakage - drafts never appear in retrieval results', () => {
  const result = retrieve('draft in progress notes');
  // We expect no draft to leak, so either no results or unrelated results
  const draftFound = result.evidence.some(e => e.entityTitle.includes('Draft'));
  assert.strictEqual(draftFound, false, 'Draft observations must not leak into retrieval');
});

runTest('Evaluation: Explicit Provenance - Observation units contain block-level provenance', () => {
  const result = retrieve('What did Shubh learn about retrieval?');
  const obsEvidence = result.evidence.filter(e => e.entityType === 'OBSERVATION');
  if (obsEvidence.length > 0) {
    const prov = obsEvidence[0].provenance;
    assert(prov !== undefined, 'Provenance must be explicit on observation evidence units');
    assert(prov.sourceKind === 'NATIVE' || prov.sourceKind === 'EXTERNAL');
    assert(prov.author === 'Shubh Mehrotra');
    assert(prov.blockType !== undefined, 'Block type must be identified in provenance');
  }
});

runTest('Evaluation: Epistemic Classification - verified facts vs self reported', () => {
  const result = retrieve('AgentForge sandbox');
  if (result.evidence.length > 0) {
    const agentforge = result.evidence.find(e => e.entityId.includes('agentforge'));
    if (agentforge) {
      assert(
        agentforge.evidenceState === 'SELF_REPORTED' || 
        agentforge.evidenceState === 'IN_PROGRESS' ||
        agentforge.evidenceState === 'PLANNED',
        'Active/In-progress projects should not be classified as verified facts'
      );
    }
  }
});

console.log('\n================================================================');
console.log(`EVALUATION SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log('================================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('ALL ACCEPTANCE CRITERIA AND INTEGRATION TESTS PASSED PERFECTLY!\n');
}
