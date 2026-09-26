# CONTENT MODEL

## Personal AI/Product Builder Portfolio

**Document status:** Draft — Content Architecture Locked for Build Planning  
**Purpose:** Define the structured content system behind the portfolio, including the future **Ask My Portfolio** retrieval layer.

---

## 0. Role of this document

`CONTENT-MODEL.md` defines **what information the portfolio stores, how entities relate, what evidence supports each claim, and how content can later be retrieved by the portfolio AI assistant**.

It sits after:

```text
ARCHITECTURE.md  →  what exists
DESIGN.md        →  how it looks
FLOW.md          →  how it behaves
CONTENT-MODEL.md →  what the system knows
BUILD-SPEC.md    →  how the system is implemented
```

This is **not** a UI specification and **not** a database implementation document.

It must remain useful even if the underlying implementation changes from Markdown/JSON to a CMS, database, static content layer, or a RAG-oriented document store.

---

# 1. Content Philosophy

The portfolio is a **structured record of how Shubh thinks, builds, experiments, learns, and evolves**.

The content model must support questions such as:

- What has Shubh built?
- Why did he build it?
- What problem was he addressing?
- What was his personal contribution?
- What technologies were involved?
- What trade-offs did he make?
- What failed?
- What evidence supports a claim?
- What changed because of an experiment?
- How did one project lead to another?
- What is Shubh currently building or learning?
- Where can a visitor inspect the underlying evidence?

The model therefore prioritizes **relationships, provenance, chronology, and evidence** over isolated résumé fields.

---

# 2. Core Content Principles

## 2.1 Truth before polish

The portfolio must never manufacture metrics, users, revenue, performance numbers, production usage, or business outcomes.

Every externally meaningful claim should be traceable to a source or clearly marked as self-reported.

## 2.2 Separate facts from interpretation

Examples:

```text
FACT
"Built a FastAPI backend with document upload and chat endpoints."

OBSERVATION
"Long retrieval paths increased response latency during development."

INTERPRETATION
"Hybrid retrieval was chosen to balance exact-match and semantic search."

HYPOTHESIS
"A managed vector store could support larger deployment volumes."

UNVALIDATED
"This architecture could support X users."  ← do not publish as fact
```

## 2.3 Personal contribution must be explicit

For team projects, store:

- `team_contribution`
- `personal_contribution`
- `shared_contribution`
- `unknown_contribution`

Never turn team-level work into an individual claim.

## 2.4 Content should work in two representations

The same underlying data may appear as:

```text
STORY
Problem → Motivation → Approach → Result → Learning

SYSTEM
Architecture → Components → Data Flow → Constraints → Evaluation → Failure Modes
```

These are two representations of the same source content, not duplicate content.

## 2.5 Every important entity should connect to evidence

A project should ideally connect to some combination of:

```text
GitHub repository
Live demo
Screenshot / media
Technical specification
Benchmark / test result
Article / post
Certificate
External event page
LinkedIn entry
```

## 2.6 The model must support incomplete knowledge

The portfolio is allowed to contain partially developed information.

Examples:

```text
status: IN_PROGRESS
status: PLANNED
status: ABANDONED
status: PAUSED
status: UNKNOWN
```

Do not fill missing fields with invented content.

---

# 3. Entity Map

The canonical entities are:

```text
PERSON
│
├── EXPERIENCE
├── PROJECT
├── THINKING_ARTICLE
├── EXPERIMENT
├── JOURNEY_EVENT
├── NOW_ITEM
├── ACHIEVEMENT
├── TECHNOLOGY
├── SKILL
├── MEDIA_ASSET
├── EXTERNAL_LINK
└── EVIDENCE
```

Relationships create the knowledge graph:

```text
PERSON
 ├── worked_on ─────────────→ PROJECT
 ├── wrote ─────────────────→ THINKING_ARTICLE
 ├── ran ───────────────────→ EXPERIMENT
 ├── participated_in ───────→ JOURNEY_EVENT
 ├── currently_exploring ───→ NOW_ITEM
 ├── achieved ──────────────→ ACHIEVEMENT
 └── uses / learning ───────→ TECHNOLOGY / SKILL

PROJECT
 ├── uses ──────────────────→ TECHNOLOGY
 ├── emerged_from ──────────→ EXPERIMENT
 ├── discussed_in ──────────→ THINKING_ARTICLE
 ├── belongs_to ────────────→ JOURNEY_EVENT / ERA
 ├── supported_by ──────────→ EVIDENCE
 └── related_to ────────────→ PROJECT

EXPERIMENT
 ├── tests ─────────────────→ HYPOTHESIS
 ├── produces ──────────────→ OBSERVATION
 ├── informs ───────────────→ PROJECT
 └── leads_to ──────────────→ THINKING_ARTICLE / NEXT_QUESTION

THINKING_ARTICLE
 ├── references ─────────────→ PROJECT
 ├── inspired_by ───────────→ EXPERIENCE / EXPERIMENT
 └── supported_by ──────────→ EVIDENCE
```

---

# 4. Shared Base Schema

Every primary entity should share these fields.

| Field | Type | Required | Purpose |
|---|---|---:|---|
| `id` | string | Yes | Stable internal identifier |
| `slug` | string | Yes | URL/content identifier |
| `type` | enum | Yes | Entity type |
| `title` | string | Yes | Human-readable title |
| `summary` | string | Yes | Short description |
| `status` | enum | Yes | Lifecycle state |
| `visibility` | enum | Yes | Public/private/draft |
| `created_at` | date | Yes | Content record creation date |
| `updated_at` | date | Yes | Last content update |
| `start_date` | date | No | Activity start |
| `end_date` | date | No | Activity end |
| `tags` | string[] | No | Search/filter taxonomy |
| `topics` | string[] | No | Conceptual taxonomy |
| `relations` | Relation[] | No | Links to other entities |
| `evidence` | EvidenceRef[] | No | Supporting sources |
| `media` | MediaRef[] | No | Associated media |
| `links` | LinkRef[] | No | External destinations |
| `notes` | string | No | Editorial/internal notes |
| `source_quality` | enum | Yes | Trust level of the record |

---

# 5. Status Taxonomy

Use lifecycle status separately from evidence quality.

## 5.1 Lifecycle

```text
IDEA
PLANNED
IN_PROGRESS
ACTIVE
COMPLETED
PAUSED
ABANDONED
ARCHIVED
```

## 5.2 Evidence / knowledge state

```text
VERIFIED
SELF_REPORTED
OBSERVED
INFERRED
HYPOTHESIS
UNVALIDATED
UNKNOWN
```

These must never be conflated.

Example:

```yaml
status: COMPLETED
evidence_state: SELF_REPORTED
```

means the project is complete, but the claim comes primarily from the author's own description.

---

# 6. PERSON

The `PERSON` entity is the root identity record.

```yaml
id: person-shubh-mehrotra
type: PERSON
name: Shubh Mehrotra
headline: AI Product Builder / Software Engineer / Computer Science & Data Science Student
location_display: Moradabad, Uttar Pradesh, India
education:
  - institution: Rishihood University
    program: B.Tech in Computer Science
    focus:
      - Data Science
      - Business Studies
    start_year: 2025
current_stage: Undergraduate student
```

### Important person fields

- `name`
- `headline`
- `bio_short`
- `bio_long`
- `education`
- `current_stage`
- `interests`
- `principles`
- `focus_areas`
- `contact`
- `social_links`
- `profile_image`
- `resume`
- `current_vector`

The phrase **current_vector** should describe what the person is moving toward now, rather than pretending to be a permanent identity statement.

---

# 7. EXPERIENCE

Represents internships, work, volunteering, leadership, and structured professional experiences.

```yaml
id: experience-groto-ai-developer-intern
type: EXPERIENCE
title: AI Developer Intern — Groto
organization: Groto
role: AI Developer Intern
start_date: 2026-06-01
end_date: 2026-08-10
location_mode: onsite
summary: Worked with cross-functional teams on AI and automation workflows.
status: COMPLETED
evidence_state: SELF_REPORTED
personal_contribution:
  - Hybrid RAG system development
  - AI workflow and automation implementation
  - Backend/retrieval engineering
  - Technical problem breakdown and iteration
outcomes:
  - Hybrid RAG chatbot
  - n8n automation workflows
learnings:
  - Time-bounding AI workflows matters
  - Rate limits and reliability affect usability
  - A working AI demo is not automatically a reliable product
```

### Experience must support

- organization
- role
- employment type
- dates
- location
- context
- responsibilities
- personal contribution
- team contribution
- outputs
- outcomes
- technologies
- evidence
- learnings
- related projects

Do not automatically label an outcome as measurable unless a metric exists.

---

# 8. PROJECT

Projects are the portfolio's primary proof-of-building entities.

Projects need enough structure to support both recruiter-level summaries and deep technical inspection.

## 8.1 Project schema

```yaml
id:
slug:
type: PROJECT
title:
one_line:
summary:
status:
project_type:
start_date:
end_date:
role:
team_size:
personal_contribution:
team_contribution:
problem:
context:
motivation:
hypothesis:
approach:
architecture:
data_flow:
components:
stack:
constraints:
evaluation:
results:
failure_modes:
limitations:
tradeoffs:
learnings:
next_steps:
related_experiments:
related_articles:
related_journey_events:
links:
evidence:
media:
tags:
topics:
```

## 8.2 Required project narrative

Every major case study should support:

```text
Context
→ Problem
→ Hypothesis
→ Approach
→ System
→ Build
→ Evaluation
→ Result
→ Failure / Limitations
→ Learning
→ Next Question
```

## 8.3 Story representation

Use:

```text
WHY
WHAT PROBLEM
WHAT I BUILT
WHAT HAPPENED
WHAT I LEARNED
```

## 8.4 System representation

Use:

```text
ARCHITECTURE
DATA FLOW
COMPONENTS
TECHNOLOGIES
CONSTRAINTS
TESTING
FAILURES
TRADE-OFFS
```

---

# 9. Seed Project Inventory

The following records are known portfolio candidates. They should be validated against the final project files before publication.

## 9.1 Enterprise Hybrid RAG / Document Intelligence

```yaml
id: project-enterprise-hybrid-rag
title: Enterprise Knowledge Assistant — Hybrid RAG System
status: COMPLETED
project_type: AI_SYSTEM
role: Builder / developer
stack:
  - LlamaIndex
  - ChromaDB
  - FastAPI
  - React
  - TypeScript
  - Python
retrieval:
  - BM25
  - dense retrieval
  - Reciprocal Rank Fusion
  - BGE reranking
  - HyDE
pipeline:
  - document ingestion
  - extraction / OCR fallback
  - chunking
  - embeddings
  - lexical retrieval
  - dense retrieval
  - fusion
  - reranking
  - context selection
  - grounded generation
  - evidence verification
  - source attribution
```

Known implementation details from the project's current documentation/context include page attribution, provenance tracking, caching, a vector-store abstraction, multi-user/tenant-aware boundaries, and FastAPI endpoints. Public LinkedIn also describes the system as combining BM25 with dense retrieval, RRF, BGE reranking, PyMuPDF extraction with OCR fallback, MD5 caching, evidence verification, source attribution, and a VectorStore abstraction. [Source: LinkedIn project description]

Public GitHub also exposes a separate `RAG` repository with a Python implementation. [Source: GitHub]

Do not publish a single global latency, accuracy, or "production" claim unless backed by a specific benchmark or deployment artifact.

## 9.2 Daily Sahayak

```yaml
id: project-daily-sahayak
title: Daily Sahayak
type: PROJECT
status: IN_PROGRESS
project_type: PRODUCT
summary: Intelligent daily planning and execution assistant.
stack:
  - Next.js
  - TypeScript
features:
  - priority scoring
  - urgency calculation
  - importance weighting
  - effort estimation
  - schedule generation
  - calendar conflict detection
  - task splitting
  - focus execution mode
  - completion tracking
  - skip logging
  - review analytics
  - adaptive planning
  - natural language task input
```

The public repository describes Daily Sahayak as an intelligent daily planning system that prioritizes tasks, generates schedules, adapts using execution feedback, and includes planning, execution, review, and adaptive-planning components. [Source: GitHub Daily-Sahayak]

The model should preserve its product-oriented story: reducing execution friction and turning planning into action, while avoiding unsupported claims about user outcomes.

## 9.3 AgentForge / AI reliability & evaluation work

```yaml
id: project-agentforge
title: AgentForge
type: PROJECT
status: IN_PROGRESS
project_type: AI_RELIABILITY_EVALUATION
role: Builder / system designer
focus:
  - agent runtime
  - tool execution
  - evaluation harnesses
  - reliability
  - concurrency
  - idempotency
  - fault injection
  - hidden verification
  - structured traces
  - sandboxed execution
```

This record is based on the portfolio project context and should be linked to the actual repository/specification used by the project before public publication. Do not substitute similarly named public GitHub repositories belonging to other users.

## 9.4 GeoIntel AI

```yaml
id: project-geointel-ai
title: GeoIntel AI
type: PROJECT
status: COMPLETED
project_type: HACKATHON_TEAM_PROJECT
context: Smart India Hackathon internal round
focus:
  - OCR
  - RAG
  - vector search
  - Gemini reasoning
  - Pinecone retrieval
  - traceable answers
  - geological/mining reporting
team_project: true
```

Known portfolio context records an internal-round result of **Top 65 out of 111 teams**. The final published record should attach the appropriate competition/team evidence before treating that result as externally verified.

Personal contribution must be documented separately from team output.

---

# 10. THINKING_ARTICLE

Thinking is a first-class publication system, not a generic blog list.

## Schema

```yaml
id:
slug:
type: THINKING_ARTICLE
title:
dek:
summary:
status:
published_at:
updated_at:
format:
  - essay
  - technical_note
  - field_note
  - observation
  - teardown
  - build_log
  - opinionated_reflection
body:
key_questions:
claims:
evidence:
related_projects:
related_experiments:
related_journey_events:
topics:
tags:
reading_time:
```

### Article principle

Articles should document **thinking tied to evidence or experience**, not generic AI SEO content.

Strong article patterns:

```text
I built X and discovered Y.

I expected X, but observed Y.

This architecture solved A but introduced B.

What I learned building X.

Why I changed my approach from A → B.
```

---

# 11. EXPERIMENT

The Lab is powered by explicit experiments.

## Schema

```yaml
id:
slug:
type: EXPERIMENT
title:
status:
started_at:
ended_at:
hypothesis:
question:
context:
setup:
variables:
method:
observations:
result:
interpretation:
limitations:
decision:
next_question:
related_project:
related_article:
evidence:
```

## Experiment lifecycle

```text
QUESTION
   ↓
HYPOTHESIS
   ↓
EXPERIMENT
   ↓
OBSERVATION
   ↓
RESULT
   ↓
DECISION
   ↓
NEXT QUESTION
```

## Failure records

Use:

```text
[FAILED]
[ABANDONED]
[PAUSED]
[PARTIAL]
[VALIDATED]
```

A failure should contain a useful observation or decision. Avoid publishing a failure solely as a badge of activity.

---

# 12. JOURNEY_EVENT

Journey captures evolution rather than merely listing dates.

## Schema

```yaml
id:
type: JOURNEY_EVENT
title:
date:
category:
context:
what_happened:
why_it_mattered:
what_changed:
learning:
related_projects:
related_experiments:
related_articles:
evidence:
```

Suggested categories:

```text
EDUCATION
INTERNSHIP
HACKATHON
PROGRAM
WORKSHOP
COMMUNITY
LEADERSHIP
MILESTONE
PROJECT
REFLECTION
```

Examples from the current portfolio context include:

- Starting B.Tech at Rishihood University in 2025.
- Google Startup School / Prompt to Prototype.
- McKinsey Forward.
- Groto AI Developer Internship.
- Smart India Hackathon internal round.
- Microsoft startup/AI learning programs.
- Technical workshops and student ecosystem activity.

Exact dates and completion states must come from the final evidence set.

---

# 13. NOW_ITEM

`NOW` is a snapshot of current direction, not a permanent résumé section.

## Schema

```yaml
id:
type: NOW_ITEM
category:
label:
statement:
status:
started_at:
priority:
related_project:
related_skill:
related_experiment:
next_action:
```

Suggested categories:

```text
BUILDING
LEARNING
EXPLORING
QUESTION
EXPERIMENTING
READING
LOOKING_FOR
```

Potential current themes from the existing context include:

```text
AI agents
MCP
AI infrastructure
LLM engineering
scalable backend systems
system design
DSA / C++
product experimentation
building in public
```

These should be treated as a changing snapshot.

---

# 14. ACHIEVEMENT

Achievements store externally recognizable milestones without turning the portfolio into a trophy wall.

## Schema

```yaml
id:
type: ACHIEVEMENT
title:
issuer:
date:
category:
description:
result:
role:
team_context:
evidence:
links:
```

Possible categories:

```text
COMPETITION
CERTIFICATION
PROGRAM
CHALLENGE
ACADEMIC
LEADERSHIP
PUBLICATION
COMMUNITY
```

Examples currently known from the portfolio context:

- Smart India Hackathon internal round: Top 65 of 111 teams.
- HiDev AI safety / prompt-injection event: second place.
- McKinsey Forward selection.
- Google / Microsoft / Scaler / academic technical programs and certifications.

Do not imply that a certificate represents employment-level expertise.

---

# 15. TECHNOLOGY

Technology is an entity, not just a string inside project cards.

## Schema

```yaml
id:
type: TECHNOLOGY
name:
category:
status:
proficiency_note:
used_in_projects:
used_in_experiments:
related_articles:
```

Categories:

```text
LANGUAGE
FRAMEWORK
DATABASE
VECTOR_STORE
LLM
MODEL
ORCHESTRATION
API
CLOUD
DEVOPS
TESTING
FRONTEND
BACKEND
DATA
AI_EVALUATION
```

### Important rule

Do not represent proficiency as arbitrary percentages such as:

```text
Python: 94%
FastAPI: 87%
```

The portfolio should instead show evidence through usage:

```text
USED IN: Enterprise Hybrid RAG
USED IN: Daily Sahayak
CURRENTLY LEARNING
```

---

# 16. SKILL

Skills describe capabilities at a higher level than technologies.

Examples:

```text
AI Product Development
RAG Engineering
Backend Engineering
System Design
Agent Evaluation
Automation
Data Analysis
Technical Writing
Problem Decomposition
Product Experimentation
```

A `SKILL` record should connect to evidence-bearing projects rather than merely claim proficiency.

```yaml
id: skill-rag-engineering
type: SKILL
name: RAG Engineering
evidence_projects:
  - project-enterprise-hybrid-rag
  - project-geointel-ai
related_technologies:
  - LlamaIndex
  - ChromaDB
  - Pinecone
```

---

# 17. MEDIA_ASSET

Media supports the visual storytelling layer.

## Schema

```yaml
id:
type: MEDIA_ASSET
kind:
file:
alt:
caption:
credit:
entity_id:
role:
visibility:
```

Supported `kind` values:

```text
HERO
SCREENSHOT
ARCHITECTURE_DIAGRAM
TERMINAL_CAPTURE
PHOTOGRAPH
PORTRAIT
CERTIFICATE
DOCUMENT
LOGO
VIDEO
GIF
THUMBNAIL
```

Every visual must have useful alt text or an explicit decorative designation.

---

# 18. EXTERNAL_LINK

Links are structured so the interface can selectively expose them.

```yaml
id:
type: EXTERNAL_LINK
label:
url:
kind:
entity_id:
verified_at:
```

Suggested `kind` values:

```text
GITHUB
LINKEDIN
DEMO
CERTIFICATE
ARTICLE
DOCUMENTATION
CONTACT
EVENT
```

Known root links:

```yaml
github:
  label: GitHub
  url: https://github.com/shubhProcoder
linkedin:
  label: LinkedIn
  url: https://www.linkedin.com/in/shubh-mehrotra-m2823/
```

---

# 19. EVIDENCE

Evidence is one of the most important parts of the system.

## Evidence schema

```yaml
id:
type: EVIDENCE
source_type:
source_url:
source_title:
source_owner:
retrieved_at:
verified_at:
claim_supported:
entity_id:
excerpt:
location:
confidence:
```

## Source types

```text
GITHUB_REPOSITORY
GITHUB_COMMIT
GITHUB_ISSUE
LINKEDIN_PROFILE
LINKEDIN_PROJECT
LINKEDIN_EXPERIENCE
CERTIFICATE
DEPLOYMENT
BENCHMARK
TEST_RESULT
SCREENSHOT
VIDEO
DOCUMENT
USER_REPORTED
TEAM_REPORTED
```

## Evidence confidence

Use qualitative evidence states rather than pseudo-precision:

```text
DIRECT
CORROBORATED
SELF_REPORTED
INDIRECT
UNVERIFIED
```

### Example

```yaml
id: evidence-rag-linkedin-project
source_type: LINKEDIN_PROJECT
source_url: https://www.linkedin.com/in/shubh-mehrotra-m2823/
claim_supported: Hybrid RAG architecture and implementation description
confidence: SELF_REPORTED
```

This allows the RAG layer to answer responsibly:

> "According to the project description on Shubh's LinkedIn..."

instead of turning every self-authored claim into an objective external fact.

---

# 20. RELATION MODEL

Relations must be first-class objects.

```yaml
relation:
  from: project-enterprise-hybrid-rag
  type: informed_by
  to: experiment-hybrid-retrieval
  strength: strong
  description: Retrieval experiments informed the hybrid retrieval design.
```

Allowed relation types:

```text
WORKED_ON
BUILT
CONTRIBUTED_TO
USES
LEARNED
TESTED
INFORMED_BY
EMERGED_FROM
LED_TO
INSPIRED
REFERENCES
EXPANDS
CONTRADICTS
RELATED_TO
PART_OF
OCCURRED_DURING
SUPPORTED_BY
PROVES
```

Use relationship metadata sparingly. The graph should explain meaningful causality, not create decorative complexity.

---

# 21. Knowledge Graph Rules

The graph should support paths such as:

```text
Article
  ↓ references
Project
  ↓ uses
Technology
  ↓ learned through
Experiment
```

and:

```text
Journey Event
  ↓ led_to
Experiment
  ↓ informed
Project
  ↓ produced
Learning
  ↓ became
Thinking Article
```

The graph must never imply causality unless the content records support it.

Prefer:

```text
related_to
```

over:

```text
caused
```

when causality is uncertain.

---

# 22. RAG / ASK MY PORTFOLIO CONTENT MODEL

The future portfolio assistant should retrieve **atomic evidence-bearing content units**, not just entire pages.

## 22.1 Retrieval unit

```yaml
id:
entity_id:
entity_type:
section:
content:
summary:
keywords:
topics:
relations:
evidence_refs:
date_range:
visibility:
evidence_state:
```

## 22.2 Recommended retrieval granularity

A project should produce chunks such as:

```text
PROJECT_OVERVIEW
PROJECT_PROBLEM
PROJECT_PERSONAL_CONTRIBUTION
PROJECT_ARCHITECTURE
PROJECT_TECH_STACK
PROJECT_EVALUATION
PROJECT_FAILURES
PROJECT_LEARNINGS
PROJECT_LIMITATIONS
PROJECT_NEXT_STEPS
```

An article can produce:

```text
ARTICLE_ARGUMENT
ARTICLE_OBSERVATION
ARTICLE_EXAMPLE
ARTICLE_CONCLUSION
```

An experiment can produce:

```text
EXPERIMENT_HYPOTHESIS
EXPERIMENT_METHOD
EXPERIMENT_OBSERVATION
EXPERIMENT_RESULT
EXPERIMENT_DECISION
```

## 22.3 Retrieval metadata

Every chunk should carry metadata allowing filtered retrieval by:

```text
entity type
project
technology
time period
status
topic
evidence state
```

## 22.4 Answer provenance

The final assistant response should be able to expose:

```text
ANSWER
↓
SOURCE CHUNKS
↓
ENTITY
↓
ORIGINAL SOURCE
```

This directly supports the `Ask My Portfolio` split-pane evidence interface defined in FLOW.md.

---

# 23. Answering Rules for Ask My Portfolio

The assistant should follow these rules.

## Rule 1 — Never invent portfolio facts

If no evidence exists:

```text
I don't have enough information in Shubh's portfolio to answer that confidently.
```

## Rule 2 — Distinguish self-reported claims

Use language such as:

```text
According to the project documentation...
Shubh describes this as...
The available project evidence shows...
```

when appropriate.

## Rule 3 — Do not upgrade a technology mention into expertise

```text
USED FASTAPI IN PROJECT X
```

does not automatically mean:

```text
EXPERT IN FASTAPI
```

## Rule 4 — Team results must remain team results

Do not convert:

```text
team built X
```

to:

```text
Shubh built X
```

unless personal contribution is explicitly documented.

## Rule 5 — Current status matters

An old project should not be presented as current work merely because it remains on the portfolio.

## Rule 6 — Evidence should be visible

Answers should allow a visitor to inspect relevant sources when possible.

---

# 24. Content Freshness

Different entity types decay at different speeds.

| Entity | Suggested review frequency |
|---|---|
| PERSON | Quarterly |
| NOW_ITEM | Monthly / whenever direction changes |
| EXPERIENCE | At completion |
| PROJECT | After major milestone |
| THINKING_ARTICLE | After publication |
| EXPERIMENT | At experiment end |
| JOURNEY_EVENT | At event completion |
| TECHNOLOGY | When usage changes |
| ACHIEVEMENT | At award/completion |
| EXTERNAL_LINK | Periodic link check |
| EVIDENCE | Whenever source changes |

`NOW` should be the fastest-changing content surface.

---

# 25. Editorial Validation Checklist

Before publishing a record, verify:

```text
[ ] Is the claim factually accurate?
[ ] Is the lifecycle status correct?
[ ] Is the evidence state correct?
[ ] Is personal contribution separated from team contribution?
[ ] Are metrics backed by evidence?
[ ] Are technical details actually implemented?
[ ] Are planned features labeled as planned?
[ ] Are limitations visible where relevant?
[ ] Are links valid?
[ ] Is the record connected to related entities?
[ ] Could Ask My Portfolio retrieve and explain this content without ambiguity?
```

---

# 26. Content Anti-Patterns

Do not create:

### Fake precision

```text
AI Skills: 92%
System Design: 87%
```

### Empty superlatives

```text
World-class AI engineer
Revolutionary architecture
Enterprise-grade at scale
```

unless a concrete source or context genuinely supports the wording.

### Tool-badge dumping

Listing twenty frameworks without showing where they were used.

### Achievement inflation

Turning attendance into selection, selection into completion, or completion into expertise.

### Project inflation

Turning a prototype into a deployed production system without evidence.

### Team-credit leakage

Presenting team output as individual output.

### Timeline ambiguity

Leaving old work visually identical to active work.

### RAG hallucination through metadata

Never use metadata defaults to fabricate missing answers.

---

# 27. Seed Technology Taxonomy

The following technologies are candidates from the current portfolio context. Final status should be tied to actual project evidence.

## Languages

```text
Python
C++
TypeScript
JavaScript
SQL
```

## AI / LLM

```text
LlamaIndex
LLM APIs
Embeddings
Rerankers
HyDE
RAG
OCR
MCP
AI Agents
```

## Backend / Data

```text
FastAPI
ChromaDB
Pinecone
SQLite
Vector Stores
BM25
n8n
```

## Frontend

```text
React
Next.js
Tailwind CSS
Streamlit
```

## Engineering

```text
Docker
Pytest
Hypothesis
REST APIs
SSE
Concurrency
Idempotency
Caching
Multi-tenancy
```

This taxonomy is not a proficiency ranking. It is a controlled vocabulary for content retrieval and navigation.

---

# 28. Seed Narrative Themes

These are recurring themes that can connect otherwise separate content.

```text
AI AS EXECUTION TOOL
GROUNDED AI
RETRIEVAL QUALITY
AI RELIABILITY
SYSTEM DESIGN
PRODUCT ENGINEERING
EXECUTION FRICTION
EXPERIMENTATION
BUILDING IN PUBLIC
HUMAN + AI WORKFLOWS
LEARNING THROUGH FAILURE
TRACEABILITY / PROVENANCE
```

Themes should emerge from actual content. They should not be inserted into a project merely because they sound aligned with the portfolio brand.

---

# 29. Recommended Directory Structure

The implementation layer may later use:

```text
content/
├── person/
│   └── shubh.yaml
├── experience/
│   ├── groto.yaml
│   └── ...
├── projects/
│   ├── enterprise-hybrid-rag.yaml
│   ├── daily-sahayak.yaml
│   ├── agentforge.yaml
│   └── geointel-ai.yaml
├── thinking/
│   └── ...
├── experiments/
│   └── ...
├── journey/
│   └── ...
├── now/
│   └── now.yaml
├── achievements/
│   └── ...
├── technologies/
│   └── ...
├── skills/
│   └── ...
├── evidence/
│   └── ...
└── media/
    └── ...
```

Exact implementation format is a BUILD-SPEC decision.

---

# 30. Source Registry — Current Public Sources

The initial content model was informed by the following public profiles/repositories:

```text
GitHub profile:
https://github.com/shubhProcoder

GitHub Daily Sahayak:
https://github.com/shubhProcoder/Daily-Sahayak

GitHub RAG:
https://github.com/shubhProcoder/RAG

LinkedIn:
https://www.linkedin.com/in/shubh-mehrotra-m2823/
```

The public GitHub profile currently presents Shubh as an AI Product Builder / Software Engineer / Computer Science & Data Science student and lists projects including Daily Sahayak and RAG. [Source: GitHub profile]

The public LinkedIn profile describes the Rishihood University B.Tech program, Groto experience, certifications, project activity, and the Enterprise Hybrid RAG project. [Source: LinkedIn profile]

---

# 31. What This Document Does NOT Decide

Do not solve these here:

- database provider
- CMS provider
- vector database
- embedding model
- LLM provider
- frontend component architecture
- animation implementation
- WebGL/Canvas implementation
- authentication implementation
- hosting/deployment architecture
- analytics provider
- final URL routing implementation

Those belong in `BUILD-SPEC.md` or later engineering documents.

---

# 32. Completion Criteria

`CONTENT-MODEL.md` is considered complete when the implementation team can answer all of the following without inventing additional structure:

1. What kinds of things can exist in the portfolio?
2. How is each thing represented?
3. How do entities connect?
4. How are team contributions separated from personal contributions?
5. How are factual claims separated from hypotheses and observations?
6. How is evidence attached to claims?
7. How does content become retrieval-ready for Ask My Portfolio?
8. How does the model support current/in-progress/abandoned work?
9. How can the same content be represented in Story and System modes?
10. How can new projects, articles, experiments, and journey events be added without redesigning the entire information architecture?

---

# 33. Final Principle

The portfolio should not merely say:

> **Here is what I have done.**

It should make the underlying chain inspectable:

```text
OBSERVATION
    ↓
QUESTION
    ↓
HYPOTHESIS
    ↓
EXPERIMENT
    ↓
BUILD
    ↓
EVALUATE
    ↓
FAIL / SUCCEED / LEARN
    ↓
DECIDE
    ↓
BUILD AGAIN
```

That chain is the core content structure behind the portfolio's identity as a living system.
