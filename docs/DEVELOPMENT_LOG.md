# Portfolio Development Audit & Changelog

**Document Status:** Permanent Repository Changelog & Audit Record  
**Generated At:** 2026-09-28 13:05:00 IST  
**Author:** Shubh Mehrotra / Antigravity AI  
**Scope:** Complete chronological inventory of all 81 files developed, file metadata, timestamped changes, and structured 8-commit git execution plan.

---

## 1. Executive Summary & Repository Metrics

- **Total Source Files Tracked:** 81 files
- **Total Lines of Code & Content:** 17,458 lines
- **Total Repository Size:** ~1.64 MB (including visual assets)
- **Active Git State:** 0 commits committed (clean untracked tree, ready for atomic commits)
- **Recommended Atomic Commits:** **8 Commits** (chronologically partitioned by architectural phase)

---

## 2. Chronological Phase-by-Phase Development History

### Phase 1: Architectural Foundation & Design Contracts
*Timestamp Range: 2026-09-26 13:57:10 to 2026-09-27 04:59:33*

Before writing any user-facing code, the portfolio was planned as a personal knowledge system and engineering proof-of-work:
1. [docs/FLOW.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/FLOW.md) (2026-09-26 13:57:10 | 12,236 B | 215 lines): Established state transitions, page navigation flows, drawer mechanics, and terminal interaction lifecycles.
2. [docs/CONTENT-MODEL.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/CONTENT-MODEL.md) (2026-09-26 15:57:00 | 31,166 B | 1,645 lines): Defined the structural data contracts for `person`, `projects`, `journey`, `thinking`, `lab`, and `taxonomy`.
3. [docs/BUILD-SPEC.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/BUILD-SPEC.md) (2026-09-26 17:57:41 | 21,564 B | 404 lines): Detailed technology stack choices: Next.js 15 App Router, TypeScript, TailwindCSS, Zod, and motion engines.
4. [docs/IMPLEMENTATION-CONTRACT.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/IMPLEMENTATION-CONTRACT.md) (2026-09-26 18:14:23 | 61,799 B | 873 lines): Defined strict non-negotiable boundaries, component contracts, and UI constraints.
5. [docs/VISUAL-MOTION.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/VISUAL-MOTION.md) (2026-09-27 04:59:33 | 7,259 B | 248 lines): Defined motion choreographies, GSAP vs Motion split, glassmorphism tokens, and micro-interactions.
6. [docs/DESIGN.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/DESIGN.md) (2026-09-27 04:59:33 | 13,366 B | 360 lines): Established typographic scale, chromatic palette (neutral zincs, editorial accents), and spacing grid.
7. [docs/ARCHITECTURE.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/ARCHITECTURE.md) (2026-09-28 09:51:09 | 75,595 B | 1,977 lines): The overarching master blueprint detailing information architecture, content/presentation separation, and future RAG boundaries.

---

### Phase 2: Engine Scaffolding, Schemas & Seed Content
*Timestamp Range: 2026-09-27 00:12:45 to 2026-09-27 01:27:14*

Initial project configuration and strictly validated Zod schemas:
- **Build Configurations:**
  - [postcss.config.js](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/postcss.config.js) (2026-09-27 00:12:45 | 104 B | 7 lines): PostCSS Tailwind plugin configuration.
  - [package.json](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/package.json) (2026-09-27 00:39:10 | 770 B | 34 lines): Dependencies including Next 15, React 19, Lucide, Tailwind, and YAML parsers.
  - [package-lock.json](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/package-lock.json) (2026-09-27 00:38:38 | 242,062 B | 6,925 lines): Lockfile resolving deterministic dependency tree.
  - [eslint.config.mjs](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/eslint.config.mjs) (2026-09-27 00:39:25 | 128 B | 10 lines): Modern ESLint flat configuration for Next.js.
  - [next.config.js](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/next.config.js) (2026-09-27 00:42:40 | 372 B | 12 lines): Next.js build runtime options.
  - [tsconfig.json](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/tsconfig.json) (2026-09-27 01:25:50 | 781 B | 42 lines): Strict TypeScript compiler options with path aliases (`@/*`).
  - [.gitignore](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/.gitignore) (2026-09-28 13:02:04 | 228 B | 27 lines): Configured build cache exclusions.
  - [AGENTS.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/AGENTS.md) (2026-09-27 01:27:14 | 678 B | 9 lines): Next.js agent integration rules.
  - [CLAUDE.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/CLAUDE.md) (2026-09-27 01:27:14 | 11 B | 1 lines): AI assistant context link.

- **Zod Data Schemas & Content Loader:**
  - [lib/schema/person.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/person.schema.ts) (2026-09-27 00:40:02 | 503 B | 20 lines): Identity schema.
  - [lib/schema/thinking.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/thinking.schema.ts) (2026-09-27 00:40:06 | 289 B | 11 lines): Architectural thinking schema.
  - [lib/schema/lab.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/lab.schema.ts) (2026-09-27 00:40:08 | 305 B | 11 lines): Laboratory experiment schema.
  - [lib/schema/journey.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/journey.schema.ts) (2026-09-27 00:40:17 | 256 B | 11 lines): Milestones & timeline schema.
  - [lib/schema/now.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/now.schema.ts) (2026-09-27 00:40:21 | 354 B | 12 lines): Current focus schema.
  - [lib/schema/taxonomy.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/taxonomy.schema.ts) (2026-09-27 00:40:23 | 194 B | 8 lines): Skill classification schema.
  - [lib/content.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/content.ts) (2026-09-27 00:40:25 | 2,297 B | 64 lines): Robust filesystem YAML loader validating with Zod.

- **Initial Content Seeds:**
  - [content/person/shubh.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/person/shubh.yaml) (2026-09-27 00:40:35 | 678 B | 12 lines): Core bio, positioning, and philosophy.
  - [content/now/now.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/now/now.yaml) (2026-09-27 00:40:37 | 372 B | 8 lines): Active projects, reading list, and location.
  - [content/journey/01-rishihood-university.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/journey/01-rishihood-university.yaml) (2026-09-27 00:41:18 | 204 B | 4 lines): Academic foundation.
  - [content/journey/02-groto-internship.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/journey/02-groto-internship.yaml) (2026-09-27 00:41:20 | 163 B | 4 lines): Production backend engineering internship.
  - [content/journey/03-sih-geointel.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/journey/03-sih-geointel.yaml) (2026-09-27 00:41:22 | 200 B | 4 lines): Smart India Hackathon award & geo-intelligence work.

---

### Phase 3: Minimalist Landing Chapter & Motion System
*Timestamp Range: 2026-09-27 04:35:21 to 2026-09-27 07:58:09*

Built the landing chapter with visual elegance, moving kinetic typography, and computational aesthetics:
- [public/hero-workbench.jpg](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/public/hero-workbench.jpg) (2026-09-27 04:35:21 | 1,012,928 B): High-resolution physical workbench asset.
- [components/visual/ComputationalArtifact.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/visual/ComputationalArtifact.tsx) (2026-09-27 05:10:35 | 8,634 B | 197 lines): Canvas/SVG matrix and procedural visual generation.
- [components/visual/EditorialTicker.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/visual/EditorialTicker.tsx) (2026-09-27 05:18:39 | 1,377 B | 46 lines): Live status and philosophy marquee ticker.
- [components/visual/IdentityField.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/visual/IdentityField.tsx) (2026-09-27 07:40:11 | 2,289 B | 79 lines): Kinetic identity banner with interactive mouse glow.
- [components/visual/HeroTicker.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/visual/HeroTicker.tsx) (2026-09-27 07:57:49 | 2,694 B | 58 lines): Glassmorphic right-to-left marquee displaying "SHUBH MEHROTRA * Developer".
- [components/hero/HeroContent.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/hero/HeroContent.tsx) (2026-09-27 07:58:09 | 6,199 B | 123 lines): Interactive hero section unifying builder manifesto, proof-points, and primary actions.
- [app/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/page.tsx) (2026-09-27 07:46:42 | 291 B | 13 lines): Root landing page rendering the composed hero chapter.

---

### Phase 4: Observations Matrix, Process Map & Lab Instruments
*Timestamp Range: 2026-09-27 08:24:52 to 2026-09-27 08:50:56*

Implemented the engineering rigor section—documenting how ideas are formed, tested, and systematically solved:
- **Observations:**
  - [components/observations/ObservationMatrix.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/observations/ObservationMatrix.tsx) (2026-09-27 08:24:52 | 6,744 B | 217 lines): Categorized grid of real-world software engineering observations.
  - [components/observations/ObservationReader.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/observations/ObservationReader.tsx) (2026-09-27 08:25:09 | 14,601 B | 286 lines): Deep-reader modal detailing problem signals, hypotheses, and architectural implications.
  - [app/observations/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/observations/page.tsx) (2026-09-27 08:25:15 | 448 B | 12 lines): `/observations` route page.
- **Process Architecture:**
  - [components/process/processData.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/processData.ts) (2026-09-27 08:40:13 | 12,519 B | 310 lines): Data structure for the 6-stage engineering process (Explore, Model, Scaffold, Implement, Evaluate, Ship).
  - [components/process/ProcessHero.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/ProcessHero.tsx) (2026-09-27 08:40:23 | 3,145 B | 62 lines): Process introduction and conceptual framework.
  - [components/process/ProcessInspector.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/ProcessInspector.tsx) (2026-09-27 08:40:32 | 5,175 B | 123 lines): Interactive stage inspector with granular inputs and outputs.
  - [components/process/ProcessMap.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/ProcessMap.tsx) (2026-09-27 08:40:43 | 6,953 B | 155 lines): Connected graph visualizing feedback loops and phase transitions.
  - [components/process/DecisionLayers.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/DecisionLayers.tsx) (2026-09-27 08:40:51 | 2,967 B | 67 lines): Architectural trade-off analysis cards.
  - [components/process/CaseTraces.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/CaseTraces.tsx) (2026-09-27 08:41:03 | 8,628 B | 170 lines): Real execution traces demonstrating how decisions were made in practice.
  - [components/process/PhilosophySection.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/PhilosophySection.tsx) (2026-09-27 08:41:11 | 2,550 B | 50 lines): Core systems-thinking values.
  - [components/process/ProcessTransition.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/ProcessTransition.tsx) (2026-09-27 08:41:20 | 1,825 B | 42 lines): Animated step transitions.
  - [app/process/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/process/page.tsx) (2026-09-27 08:41:27 | 1,915 B | 51 lines): Composed `/process` route.
- **Labs:**
  - [components/labs/labsData.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/labs/labsData.ts) (2026-09-27 08:50:32 | 1,631 B | 37 lines): Benchmark benchmarks and empirical test data.
  - [components/labs/LabsInstrument.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/labs/LabsInstrument.tsx) (2026-09-27 08:50:56 | 8,693 B | 192 lines): Interactive experiment runner with latency and precision comparisons.
  - [app/labs/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/labs/page.tsx) (2026-09-27 08:50:23 | 389 B | 12 lines): `/labs` route page.

---

### Phase 5: Deep-Dive Projects, Work Archive, About & Now Pages
*Timestamp Range: 2026-09-27 09:26:11 to 2026-09-27 19:14:20*

Created real case studies covering problem, architecture, failures, and learnings:
- **Project Schemas & Production Case Studies:**
  - [lib/schema/project.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/project.schema.ts) (2026-09-27 09:26:11 | 1,197 B | 33 lines): Comprehensive project schema with metrics, failures, and evidence links.
  - [content/projects/enterprise-hybrid-rag.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/projects/enterprise-hybrid-rag.yaml) (2026-09-27 09:26:25 | 1,689 B | 31 lines): Hybrid RAG (Reciprocal Rank Fusion, BM25 + Vector).
  - [content/projects/daily-sahayak.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/projects/daily-sahayak.yaml) (2026-09-27 09:26:37 | 1,089 B | 25 lines): Multimodal AI task & routine assistant.
  - [content/projects/agentforge.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/projects/agentforge.yaml) (2026-09-27 09:26:46 | 797 B | 19 lines): Autonomous multi-agent coordination system.
  - [content/projects/geointel-ai.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/projects/geointel-ai.yaml) (2026-09-27 09:26:57 | 952 B | 23 lines): Satellite imagery and geospatial computer vision.
- **Project Case Study Components:**
  - [components/projects/ProjectCaseStudy.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectCaseStudy.tsx) (2026-09-27 09:35:41 | 1,867 B | 38 lines): Container orchestrating sub-modules.
  - [components/projects/ProjectHeader.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectHeader.tsx) (2026-09-27 09:35:52 | 1,789 B | 44 lines): Case study metadata header.
  - [components/projects/ProjectContext.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectContext.tsx) (2026-09-27 09:36:01 | 760 B | 27 lines): Background and problem space.
  - [components/projects/ProjectProblem.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectProblem.tsx) (2026-09-27 09:36:11 | 1,669 B | 45 lines): Core engineering bottleneck breakdown.
  - [components/projects/ProjectArchitecture.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectArchitecture.tsx) (2026-09-27 09:36:24 | 2,371 B | 61 lines): System block diagram and dataflow.
  - [components/projects/ProjectContribution.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectContribution.tsx) (2026-09-27 09:36:34 | 1,866 B | 49 lines): Exact personal technical ownership.
  - [components/projects/ProjectEvaluation.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectEvaluation.tsx) (2026-09-27 09:36:45 | 1,433 B | 38 lines): Quantitative benchmarks and evaluation metrics.
  - [components/projects/ProjectFailures.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectFailures.tsx) (2026-09-27 09:36:53 | 800 B | 24 lines): What broke, dead-ends, and unworkable approaches.
  - [components/projects/ProjectLearnings.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectLearnings.tsx) (2026-09-27 09:37:02 | 837 B | 22 lines): Architectural takeaways.
  - [components/projects/ProjectConnections.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectConnections.tsx) (2026-09-27 09:37:16 | 2,794 B | 70 lines): Connected entities, experiments, and thinking.
- **Work Archive & Dynamic Routes:**
  - [app/work/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/work/page.tsx) (2026-09-27 08:25:45 | 411 B | 12 lines): Work index page.
  - [app/work/[slug]/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/work/[slug]/page.tsx) (2026-09-27 09:37:39 | 1,321 B | 42 lines): Dynamic case study route.
  - [components/work/WorkArchive.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/work/WorkArchive.tsx) (2026-09-27 09:38:06 | 25,206 B | 468 lines): Interactive project filter, search, and deep-dive drawer.
- **About & Now Editorial:**
  - [app/now/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/now/page.tsx) (2026-09-27 17:12:06 | 549 B | 17 lines): Now page route.
  - [components/now/NowEditorial.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/now/NowEditorial.tsx) (2026-09-27 17:12:21 | 3,772 B | 90 lines): Real-time snapshot of current engineering projects.
  - [app/about/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/about/page.tsx) (2026-09-27 19:13:03 | 613 B | 19 lines): About page route.
  - [components/about/AboutEditorial.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/about/AboutEditorial.tsx) (2026-09-27 19:14:20 | 4,765 B | 105 lines): In-depth personal narrative, background, and intellectual influences.

---

### Phase 6: Knowledge Base Normalization & Graph Connections
*Timestamp Range: 2026-09-27 21:04:59 to 2026-09-28 00:35:59*

Transformed isolated content YAMLs into an interconnected knowledge graph with typed entities and cross-references:
- [lib/knowledge/normalize.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/knowledge/normalize.ts) (2026-09-27 21:04:59 | 9,776 B | 337 lines): Ingests all YAML collections and produces normalized knowledge documents.
- [scripts/debug.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/scripts/debug.ts) (2026-09-27 23:54:24 | 590 B | 16 lines): Knowledge inspection utility.
- [content/technologies/taxonomy.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/technologies/taxonomy.yaml) (2026-09-28 00:35:32 | 463 B | 28 lines): Technological taxonomy tree.
- [content/lab/exp-01-rrf-vs-weighted-fusion.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/lab/exp-01-rrf-vs-weighted-fusion.yaml) (2026-09-28 00:35:40 | 380 B | 6 lines): Reciprocal Rank Fusion experiment data.
- [content/lab/exp-02-local-embedding-latency.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/lab/exp-02-local-embedding-latency.yaml) (2026-09-28 00:35:46 | 363 B | 6 lines): Local embedding latency benchmarks.
- [content/thinking/evaluating-retrieval.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/thinking/evaluating-retrieval.yaml) (2026-09-28 00:35:51 | 455 B | 6 lines): Essay on retrieval evaluation metrics.
- [content/thinking/mechanics-of-daily-planning.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/thinking/mechanics-of-daily-planning.yaml) (2026-09-28 00:35:59 | 393 B | 6 lines): System design of personal productivity workflows.

---

### Phase 7: "Ask My Portfolio" In-Memory Hybrid Retrieval Engine & Terminal UI
*Timestamp Range: 2026-09-28 09:44:23 to 2026-09-28 10:54:50*

Built a custom, deterministic, local hybrid retrieval engine—operating completely in-memory with sub-5ms latency, explicit citation chains, and terminal UX:
- **Core Architecture & Retrieval Engine:**
  - [lib/knowledge/types.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/knowledge/types.ts) (2026-09-28 09:44:55 | 3,351 B | 131 lines): Types for queries, scores, citations, evidence, and answer synthesis.
  - [lib/knowledge/index.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/knowledge/index.ts) (2026-09-28 10:35:46 | 537 B | 18 lines): Barrel export for the retrieval module.
  - [lib/knowledge/retrieve.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/knowledge/retrieve.ts) (2026-09-28 10:54:50 | 27,461 B | 619 lines): The flagship retrieval engine featuring:
    - Intent recognition (RAG queries, tech queries, failures, background)
    - Normalized token matching & BM25-like scoring
    - Exact entity and taxonomy boost
    - Dynamic answer synthesis with inline citation anchors `[1]`, `[2]`
    - Graph relation lookups and evidence payload generation
  - [scripts/evaluate-retrieval.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/scripts/evaluate-retrieval.ts) (2026-09-28 09:48:02 | 1,808 B | 40 lines): Comprehensive test suite benchmarking precision, recall, and citation integrity.
- **Evidence & Architecture Visualization:**
  - [components/evidence/ArchitectureDiagram.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/evidence/ArchitectureDiagram.tsx) (2026-09-28 09:47:45 | 6,085 B | 134 lines): SVG architecture visualization diagram with interactive data flow animation.
  - [components/layout/Navigation.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/layout/Navigation.tsx) (2026-09-28 09:44:23 | 4,657 B | 133 lines): Global navigation bar with route awareness and status badge.
- **Global Theme & Styling:**
  - [tailwind.config.js](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/tailwind.config.js) (2026-09-28 10:31:54 | 938 B | 34 lines): Tailwind theme configured with custom font families, colors, and animations.
  - [app/globals.css](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/globals.css) (2026-09-28 10:32:06 | 3,003 B | 112 lines): Global CSS with typography tokens, glass effects, and marquee keyframes.
  - [app/layout.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/layout.tsx) (2026-09-28 10:31:46 | 1,321 B | 47 lines): Next.js root layout with JetBrains Mono and Inter fonts.
- **Ask Terminal Interface:**
  - [app/ask/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/ask/page.tsx) (2026-09-28 10:35:55 | 1,134 B | 35 lines): Route page providing container and SEO metadata.
  - [components/ask/AskTerminal.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/ask/AskTerminal.tsx) (2026-09-28 10:38:44 | 11,178 B | 296 lines): Interactive search console supporting history, latency meters, and keybindings.
  - [components/ask/QueryInput.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/ask/QueryInput.tsx) (2026-09-28 10:38:23 | 3,796 B | 119 lines): Styled terminal prompt input.
  - [components/ask/QueryExamples.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/ask/QueryExamples.tsx) (2026-09-28 10:36:32 | 1,609 B | 49 lines): One-click pre-configured benchmark prompts.
  - [components/ask/AnswerView.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/ask/AnswerView.tsx) (2026-09-28 10:43:49 | 10,050 B | 271 lines): Render synthesized answer with clickable citation tags, copy-to-clipboard, and metrics.
  - [components/ask/EvidencePanel.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/ask/EvidencePanel.tsx) (2026-09-28 10:37:15 | 7,788 B | 225 lines): Evidence drawer revealing ground-truth citations, confidence scores, and architectural diagrams.
  - [components/ask/RelatedEntities.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/ask/RelatedEntities.tsx) (2026-09-28 10:37:40 | 2,685 B | 86 lines): Graph connectivity pill links.

---

## 3. Complete File Inventory Table (Sorted Chronologically)

| # | Last Modified (IST) | File Path | Size | Lines | Module / Category | Architectural Purpose |
|---|---|---|---|---|---|---|
| 1 | 2026-09-26 13:57:10 | [docs/FLOW.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/FLOW.md) | 12.2 KB | 215 | Specification | Interaction flow, state transitions & UX logic |
| 2 | 2026-09-26 15:57:00 | [docs/CONTENT-MODEL.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/CONTENT-MODEL.md) | 31.2 KB | 1,645 | Specification | Content schemas & data dictionary |
| 3 | 2026-09-26 17:57:41 | [docs/BUILD-SPEC.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/BUILD-SPEC.md) | 21.6 KB | 404 | Specification | Engineering choices, Next.js & TypeScript spec |
| 4 | 2026-09-26 18:14:23 | [docs/IMPLEMENTATION-CONTRACT.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/IMPLEMENTATION-CONTRACT.md) | 61.8 KB | 873 | Specification | Non-negotiable implementation boundaries |
| 5 | 2026-09-27 00:12:45 | [postcss.config.js](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/postcss.config.js) | 104 B | 7 | Config | PostCSS configuration for Tailwind CSS |
| 6 | 2026-09-27 00:38:38 | [package-lock.json](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/package-lock.json) | 242 KB | 6,925 | Infrastructure | Deterministic dependency tree lockfile |
| 7 | 2026-09-27 00:39:10 | [package.json](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/package.json) | 770 B | 34 | Infrastructure | Project manifest, dependencies, scripts |
| 8 | 2026-09-27 00:39:25 | [eslint.config.mjs](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/eslint.config.mjs) | 128 B | 10 | Config | ESLint flat configuration |
| 9 | 2026-09-27 00:40:02 | [lib/schema/person.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/person.schema.ts) | 503 B | 20 | Schema | Zod validation for bio & identity |
| 10 | 2026-09-27 00:40:06 | [lib/schema/thinking.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/thinking.schema.ts) | 289 B | 11 | Schema | Zod validation for architectural essays |
| 11 | 2026-09-27 00:40:08 | [lib/schema/lab.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/lab.schema.ts) | 305 B | 11 | Schema | Zod validation for lab experiments |
| 12 | 2026-09-27 00:40:17 | [lib/schema/journey.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/journey.schema.ts) | 256 B | 11 | Schema | Zod validation for timeline journey |
| 13 | 2026-09-27 00:40:21 | [lib/schema/now.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/now.schema.ts) | 354 B | 12 | Schema | Zod validation for current focus |
| 14 | 2026-09-27 00:40:23 | [lib/schema/taxonomy.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/taxonomy.schema.ts) | 194 B | 8 | Schema | Zod validation for tech taxonomy |
| 15 | 2026-09-27 00:40:25 | [lib/content.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/content.ts) | 2.3 KB | 64 | Core Engine | Filesystem YAML loader & validator |
| 16 | 2026-09-27 00:40:35 | [content/person/shubh.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/person/shubh.yaml) | 678 B | 12 | Content | Identity, builder positioning, social links |
| 17 | 2026-09-27 00:40:37 | [content/now/now.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/now/now.yaml) | 372 B | 8 | Content | Real-time status, current projects |
| 18 | 2026-09-27 00:41:18 | [content/journey/01-rishihood-university.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/journey/01-rishihood-university.yaml) | 204 B | 4 | Content | Computer science academic background |
| 19 | 2026-09-27 00:41:20 | [content/journey/02-groto-internship.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/journey/02-groto-internship.yaml) | 163 B | 4 | Content | Backend engineering experience |
| 20 | 2026-09-27 00:41:22 | [content/journey/03-sih-geointel.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/journey/03-sih-geointel.yaml) | 200 B | 4 | Content | Smart India Hackathon victory record |
| 21 | 2026-09-27 00:42:40 | [next.config.js](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/next.config.js) | 372 B | 12 | Config | Next.js runtime configuration |
| 22 | 2026-09-27 01:25:50 | [tsconfig.json](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/tsconfig.json) | 781 B | 42 | Config | TypeScript strict configuration & paths |
| 23 | 2026-09-27 01:27:14 | [AGENTS.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/AGENTS.md) | 678 B | 9 | Config | AI pair programmer workspace guidelines |
| 24 | 2026-09-27 01:27:14 | [CLAUDE.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/CLAUDE.md) | 11 B | 1 | Config | Workspace pointer |
| 25 | 2026-09-27 04:35:21 | [public/hero-workbench.jpg](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/public/hero-workbench.jpg) | 1.01 MB | Binary | Asset | Hero visual background asset |
| 26 | 2026-09-27 04:59:33 | [docs/VISUAL-MOTION.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/VISUAL-MOTION.md) | 7.3 KB | 248 | Specification | Motion physics, curves & ticker guidelines |
| 27 | 2026-09-27 04:59:33 | [docs/DESIGN.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/DESIGN.md) | 13.4 KB | 360 | Specification | Visual design system, palette & typography |
| 28 | 2026-09-27 05:10:35 | [components/visual/ComputationalArtifact.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/visual/ComputationalArtifact.tsx) | 8.6 KB | 197 | Visual | Procedural computational grid display |
| 29 | 2026-09-27 05:18:39 | [components/visual/EditorialTicker.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/visual/EditorialTicker.tsx) | 1.4 KB | 46 | Visual | Marquee ticker with status indicators |
| 30 | 2026-09-27 07:40:11 | [components/visual/IdentityField.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/visual/IdentityField.tsx) | 2.3 KB | 79 | Visual | Identity banner with mouse interaction |
| 31 | 2026-09-27 07:46:42 | [app/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/page.tsx) | 291 B | 13 | Page Route | Landing page view entry |
| 32 | 2026-09-27 07:57:49 | [components/visual/HeroTicker.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/visual/HeroTicker.tsx) | 2.7 KB | 58 | Visual | Moving glass name marquee (RTL) |
| 33 | 2026-09-27 07:58:09 | [components/hero/HeroContent.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/hero/HeroContent.tsx) | 6.2 KB | 123 | UI Component | Hero chapter editorial container |
| 34 | 2026-09-27 08:24:52 | [components/observations/ObservationMatrix.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/observations/ObservationMatrix.tsx) | 6.7 KB | 217 | UI Component | Engineering observations grid |
| 35 | 2026-09-27 08:25:09 | [components/observations/ObservationReader.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/observations/ObservationReader.tsx) | 14.6 KB | 286 | UI Component | Deep reader modal for engineering observations |
| 36 | 2026-09-27 08:25:15 | [app/observations/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/observations/page.tsx) | 448 B | 12 | Page Route | `/observations` route page |
| 37 | 2026-09-27 08:25:45 | [app/work/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/work/page.tsx) | 411 B | 12 | Page Route | `/work` route page |
| 38 | 2026-09-27 08:40:13 | [components/process/processData.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/processData.ts) | 12.5 KB | 310 | Data Model | 6-stage engineering process data definition |
| 39 | 2026-09-27 08:40:23 | [components/process/ProcessHero.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/ProcessHero.tsx) | 3.1 KB | 62 | UI Component | Process methodology hero header |
| 40 | 2026-09-27 08:40:32 | [components/process/ProcessInspector.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/ProcessInspector.tsx) | 5.2 KB | 123 | UI Component | Stage inspector with inputs & deliverables |
| 41 | 2026-09-27 08:40:43 | [components/process/ProcessMap.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/ProcessMap.tsx) | 7.0 KB | 155 | UI Component | Interactive process graph visualization |
| 42 | 2026-09-27 08:40:51 | [components/process/DecisionLayers.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/DecisionLayers.tsx) | 3.0 KB | 67 | UI Component | Decision trade-offs card display |
| 43 | 2026-09-27 08:41:03 | [components/process/CaseTraces.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/CaseTraces.tsx) | 8.6 KB | 170 | UI Component | Empirical execution traces |
| 44 | 2026-09-27 08:41:11 | [components/process/PhilosophySection.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/PhilosophySection.tsx) | 2.6 KB | 50 | UI Component | Systems philosophy section |
| 45 | 2026-09-27 08:41:20 | [components/process/ProcessTransition.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/process/ProcessTransition.tsx) | 1.8 KB | 42 | UI Component | Animated stage transitions |
| 46 | 2026-09-27 08:41:27 | [app/process/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/process/page.tsx) | 1.9 KB | 51 | Page Route | `/process` route page |
| 47 | 2026-09-27 08:50:23 | [app/labs/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/labs/page.tsx) | 389 B | 12 | Page Route | `/labs` route page |
| 48 | 2026-09-27 08:50:32 | [components/labs/labsData.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/labs/labsData.ts) | 1.6 KB | 37 | Data Model | Empirical benchmark dataset |
| 49 | 2026-09-27 08:50:56 | [components/labs/LabsInstrument.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/labs/LabsInstrument.tsx) | 8.7 KB | 192 | UI Component | Interactive benchmark test bench instrument |
| 50 | 2026-09-27 09:26:11 | [lib/schema/project.schema.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/schema/project.schema.ts) | 1.2 KB | 33 | Schema | Comprehensive project case study schema |
| 51 | 2026-09-27 09:26:25 | [content/projects/enterprise-hybrid-rag.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/projects/enterprise-hybrid-rag.yaml) | 1.7 KB | 31 | Content | Enterprise Hybrid RAG case study |
| 52 | 2026-09-27 09:26:37 | [content/projects/daily-sahayak.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/projects/daily-sahayak.yaml) | 1.1 KB | 25 | Content | Daily Sahayak multimodal assistant |
| 53 | 2026-09-27 09:26:46 | [content/projects/agentforge.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/projects/agentforge.yaml) | 797 B | 19 | Content | AgentForge multi-agent architecture |
| 54 | 2026-09-27 09:26:57 | [content/projects/geointel-ai.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/projects/geointel-ai.yaml) | 952 B | 23 | Content | GeoIntel AI geospatial case study |
| 55 | 2026-09-27 09:35:41 | [components/projects/ProjectCaseStudy.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectCaseStudy.tsx) | 1.9 KB | 38 | UI Component | Case study layout container |
| 56 | 2026-09-27 09:35:52 | [components/projects/ProjectHeader.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectHeader.tsx) | 1.8 KB | 44 | UI Component | Case study title, metrics & summary |
| 57 | 2026-09-27 09:36:01 | [components/projects/ProjectContext.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectContext.tsx) | 760 B | 27 | UI Component | Problem context & background |
| 58 | 2026-09-27 09:36:11 | [components/projects/ProjectProblem.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectProblem.tsx) | 1.7 KB | 45 | UI Component | Bottleneck statement and scope |
| 59 | 2026-09-27 09:36:24 | [components/projects/ProjectArchitecture.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectArchitecture.tsx) | 2.4 KB | 61 | UI Component | System architecture flow |
| 60 | 2026-09-27 09:36:34 | [components/projects/ProjectContribution.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectContribution.tsx) | 1.9 KB | 49 | UI Component | Personal technical contributions |
| 61 | 2026-09-27 09:36:45 | [components/projects/ProjectEvaluation.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectEvaluation.tsx) | 1.4 KB | 38 | UI Component | Benchmark metrics & results |
| 62 | 2026-09-27 09:36:53 | [components/projects/ProjectFailures.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectFailures.tsx) | 800 B | 24 | UI Component | Documented engineering failures |
| 63 | 2026-09-27 09:37:02 | [components/projects/ProjectLearnings.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectLearnings.tsx) | 837 B | 22 | UI Component | Key takeaways & engineering principles |
| 64 | 2026-09-27 09:37:16 | [components/projects/ProjectConnections.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/projects/ProjectConnections.tsx) | 2.8 KB | 70 | UI Component | Connected knowledge graph entities |
| 65 | 2026-09-27 09:37:39 | [app/work/[slug]/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/work/[slug]/page.tsx) | 1.3 KB | 42 | Page Route | Dynamic project case study router |
| 66 | 2026-09-27 09:38:06 | [components/work/WorkArchive.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/work/WorkArchive.tsx) | 25.2 KB | 468 | UI Component | Interactive work archive & drawer |
| 67 | 2026-09-27 17:12:06 | [app/now/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/now/page.tsx) | 549 B | 17 | Page Route | `/now` route page |
| 68 | 2026-09-27 17:12:21 | [components/now/NowEditorial.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/now/NowEditorial.tsx) | 3.8 KB | 90 | UI Component | Editorial current focus view |
| 69 | 2026-09-27 19:13:03 | [app/about/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/about/page.tsx) | 613 B | 19 | Page Route | `/about` route page |
| 70 | 2026-09-27 19:14:20 | [components/about/AboutEditorial.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/about/AboutEditorial.tsx) | 4.8 KB | 105 | UI Component | Editorial bio & builder philosophy |
| 71 | 2026-09-27 21:04:59 | [lib/knowledge/normalize.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/knowledge/normalize.ts) | 9.8 KB | 337 | Knowledge Engine | Normalization into unified knowledge documents |
| 72 | 2026-09-27 23:54:24 | [scripts/debug.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/scripts/debug.ts) | 590 B | 16 | Script | Knowledge corpus verification script |
| 73 | 2026-09-28 00:35:32 | [content/technologies/taxonomy.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/technologies/taxonomy.yaml) | 463 B | 28 | Content | Technology taxonomy tree |
| 74 | 2026-09-28 00:35:40 | [content/lab/exp-01-rrf-vs-weighted-fusion.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/lab/exp-01-rrf-vs-weighted-fusion.yaml) | 380 B | 6 | Content | RRF vs weighted fusion experiment |
| 75 | 2026-09-28 00:35:46 | [content/lab/exp-02-local-embedding-latency.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/lab/exp-02-local-embedding-latency.yaml) | 363 B | 6 | Content | Local embedding latency experiment |
| 76 | 2026-09-28 00:35:51 | [content/thinking/evaluating-retrieval.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/thinking/evaluating-retrieval.yaml) | 455 B | 6 | Content | Retrieval evaluation essay |
| 77 | 2026-09-28 00:35:59 | [content/thinking/mechanics-of-daily-planning.yaml](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/content/thinking/mechanics-of-daily-planning.yaml) | 393 B | 6 | Content | Daily planning mechanics essay |
| 78 | 2026-09-28 09:44:23 | [components/layout/Navigation.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/layout/Navigation.tsx) | 4.7 KB | 133 | UI Component | Global navigation header bar |
| 79 | 2026-09-28 09:44:55 | [lib/knowledge/types.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/knowledge/types.ts) | 3.4 KB | 131 | Knowledge Engine | Type contracts for retrieval & evidence |
| 80 | 2026-09-28 09:47:31 | [next-env.d.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/next-env.d.ts) | 288 B | 7 | TypeScript | Next.js type declarations |
| 81 | 2026-09-28 09:47:45 | [components/evidence/ArchitectureDiagram.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/evidence/ArchitectureDiagram.tsx) | 6.1 KB | 134 | Evidence | Interactive animated SVG architecture diagram |
| 82 | 2026-09-28 09:48:02 | [scripts/evaluate-retrieval.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/scripts/evaluate-retrieval.ts) | 1.8 KB | 40 | Script | Retrieval engine benchmark evaluator |
| 83 | 2026-09-28 09:51:09 | [docs/ARCHITECTURE.md](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/docs/ARCHITECTURE.md) | 75.6 KB | 1,977 | Specification | Master architectural blueprint |
| 84 | 2026-09-28 10:31:46 | [app/layout.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/layout.tsx) | 1.3 KB | 47 | Core Layout | Root layout with fonts & metadata |
| 85 | 2026-09-28 10:31:54 | [tailwind.config.js](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/tailwind.config.js) | 938 B | 34 | Styling | Tailwind design system configuration |
| 86 | 2026-09-28 10:32:06 | [app/globals.css](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/globals.css) | 3.0 KB | 112 | Styling | Glass tokens, animations, base CSS |
| 87 | 2026-09-28 10:35:46 | [lib/knowledge/index.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/knowledge/index.ts) | 537 B | 18 | Knowledge Engine | Barrel export for retrieval module |
| 88 | 2026-09-28 10:35:55 | [app/ask/page.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/app/ask/page.tsx) | 1.1 KB | 35 | Page Route | `/ask` interface route |
| 89 | 2026-09-28 10:36:32 | [components/ask/QueryExamples.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/ask/QueryExamples.tsx) | 1.6 KB | 49 | UI Component | Pre-configured search query chips |
| 90 | 2026-09-28 10:37:15 | [components/ask/EvidencePanel.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/ask/EvidencePanel.tsx) | 7.8 KB | 225 | UI Component | Ground-truth citations & diagram drawer |
| 91 | 2026-09-28 10:37:40 | [components/ask/RelatedEntities.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/ask/RelatedEntities.tsx) | 2.7 KB | 86 | UI Component | Graph entity pills |
| 92 | 2026-09-28 10:38:23 | [components/ask/QueryInput.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/ask/QueryInput.tsx) | 3.8 KB | 119 | UI Component | Terminal input prompt |
| 93 | 2026-09-28 10:38:44 | [components/ask/AskTerminal.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/ask/AskTerminal.tsx) | 11.2 KB | 296 | UI Component | Complete terminal search console |
| 94 | 2026-09-28 10:43:49 | [components/ask/AnswerView.tsx](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/components/ask/AnswerView.tsx) | 10.1 KB | 271 | UI Component | Synthesized answer with citations |
| 95 | 2026-09-28 10:54:50 | [lib/knowledge/retrieve.ts](file:///Users/shubh2008mehrotragmail.com/PORTOFOLIO/lib/knowledge/retrieve.ts) | 27.5 KB | 619 | Core Engine | Deterministic hybrid retrieval algorithm |

---

## 4. Logical 8-Commit Git Plan

To organize the repository into an industry-grade, clean git history that reflects each development milestone rather than one cluttered dump, here is the recommended 8-commit roadmap:

```
[Commit 1] docs(specs): establish system architecture, design tokens, and engineering contracts
     ↓
[Commit 2] chore(scaffold): initialize Next.js 15, TypeScript config, and Zod content schemas
     ↓
[Commit 3] feat(home): build minimalist landing chapter, hero canvas, and motion ticker
     ↓
[Commit 4] feat(process-labs): implement engineering observation matrix, process map, and interactive labs
     ↓
[Commit 5] feat(work-editorial): author deep-dive project case studies, work archive, about, and now pages
     ↓
[Commit 6] feat(knowledge-graph): build knowledge normalization, entity schemas, and taxonomy graph
     ↓
[Commit 7] feat(ask-portfolio): implement deterministic hybrid retrieval engine and terminal interface
     ↓
[Commit 8] refine(ux-theme): polish glassmorphism theme, architecture diagrams, and retrieval evaluation
```

### Detailed Breakdown of the 8 Commits:

#### Commit 1: Architecture & System Specifications
- **Message:** `docs(specs): establish system architecture, design tokens, and engineering contracts`
- **Files Staged:**
  - `docs/ARCHITECTURE.md`
  - `docs/BUILD-SPEC.md`
  - `docs/CONTENT-MODEL.md`
  - `docs/DESIGN.md`
  - `docs/FLOW.md`
  - `docs/IMPLEMENTATION-CONTRACT.md`
  - `docs/VISUAL-MOTION.md`
- **Description:** Groundwork defining information architecture, content schemas, UI token system, motion contracts, and implementation constraints.

#### Commit 2: Engine Scaffolding & Content Model Validation
- **Message:** `chore(scaffold): initialize Next.js 15, TypeScript config, and Zod content schemas`
- **Files Staged:**
  - `.gitignore`
  - `package.json`
  - `package-lock.json`
  - `tsconfig.json`
  - `postcss.config.js`
  - `eslint.config.mjs`
  - `next.config.js`
  - `AGENTS.md`
  - `CLAUDE.md`
  - `lib/schema/person.schema.ts`
  - `lib/schema/thinking.schema.ts`
  - `lib/schema/lab.schema.ts`
  - `lib/schema/journey.schema.ts`
  - `lib/schema/now.schema.ts`
  - `lib/schema/taxonomy.schema.ts`
  - `lib/content.ts`
  - `content/person/shubh.yaml`
  - `content/now/now.yaml`
  - `content/journey/*.yaml`
- **Description:** Scaffolds Next.js 15 App Router workspace with strict TypeScript config, Zod schemas, filesystem YAML loader, and initial identity seeds.

#### Commit 3: Hero & Kinetic Identity System
- **Message:** `feat(home): build minimalist landing chapter, hero canvas, and motion ticker`
- **Files Staged:**
  - `public/hero-workbench.jpg`
  - `components/visual/ComputationalArtifact.tsx`
  - `components/visual/EditorialTicker.tsx`
  - `components/visual/IdentityField.tsx`
  - `components/visual/HeroTicker.tsx`
  - `components/hero/HeroContent.tsx`
  - `app/page.tsx`
- **Description:** Implements the visual landing chapter with glass kinetic name ticker, interactive mouse glow, procedural canvas matrix, and builder manifesto.

#### Commit 4: Engineering Process, Observations Matrix & Lab Instruments
- **Message:** `feat(process-labs): implement engineering observation matrix, process map, and interactive labs`
- **Files Staged:**
  - `components/observations/ObservationMatrix.tsx`
  - `components/observations/ObservationReader.tsx`
  - `app/observations/page.tsx`
  - `components/process/*`
  - `app/process/page.tsx`
  - `components/labs/*`
  - `app/labs/page.tsx`
- **Description:** Adds the 6-stage engineering process workflow, interactive process map, empirical observation matrix reader, and interactive lab instrument benchmark runner.

#### Commit 5: Production Projects, Work Archive & Editorial Pages
- **Message:** `feat(work-editorial): author deep-dive project case studies, work archive, about, and now pages`
- **Files Staged:**
  - `lib/schema/project.schema.ts`
  - `content/projects/*.yaml`
  - `components/projects/*`
  - `components/work/WorkArchive.tsx`
  - `app/work/page.tsx`
  - `app/work/[slug]/page.tsx`
  - `components/now/NowEditorial.tsx`
  - `app/now/page.tsx`
  - `components/about/AboutEditorial.tsx`
  - `app/about/page.tsx`
- **Description:** Delivers full case study deep-dives (Enterprise Hybrid RAG, Daily Sahayak, AgentForge, GeoIntel AI) with failure logs and architectural learnings, plus interactive work drawer, `/about`, and `/now` routes.

#### Commit 6: Knowledge Graph Normalization & Entity Corroboration
- **Message:** `feat(knowledge-graph): build knowledge normalization, entity schemas, and taxonomy graph`
- **Files Staged:**
  - `lib/knowledge/normalize.ts`
  - `scripts/debug.ts`
  - `content/technologies/taxonomy.yaml`
  - `content/lab/*.yaml`
  - `content/thinking/*.yaml`
- **Description:** Connects all content entities into a normalized knowledge graph, with bidirectional relationships between projects, experiments, and architectural essays.

#### Commit 7: In-Memory Hybrid Retrieval Engine & Search Terminal
- **Message:** `feat(ask-portfolio): implement deterministic hybrid retrieval engine and terminal interface`
- **Files Staged:**
  - `lib/knowledge/types.ts`
  - `lib/knowledge/index.ts`
  - `lib/knowledge/retrieve.ts`
  - `app/ask/page.tsx`
  - `components/ask/*`
- **Description:** Ships the deterministic hybrid retrieval engine with sub-5ms latency, BM25 scoring, intent matching, inline citation synthesis, and terminal-style search UX.

#### Commit 8: System Polish, Architecture Diagrams & Documentation Audit
- **Message:** `refine(ux-theme): polish glassmorphism theme, architecture diagrams, and retrieval evaluation`
- **Files Staged:**
  - `components/layout/Navigation.tsx`
  - `components/evidence/ArchitectureDiagram.tsx`
  - `scripts/evaluate-retrieval.ts`
  - `tailwind.config.js`
  - `app/globals.css`
  - `app/layout.tsx`
  - `next-env.d.ts`
  - `docs/DEVELOPMENT_LOG.md`
- **Description:** Adds global navigation, interactive SVG architecture dataflow diagram, retrieval evaluation benchmarks, refined typography/glassmorphic styling, and the complete development audit log.
