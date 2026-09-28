# ARCHITECTURE.md

## Portfolio of Shubh Mehrotra

**Document status:** Source of truth for product architecture
**Version:** 1.0
**Date:** 2026-09-26
**Author:** Architecture phase — pre-design, pre-implementation

**This document is the foundation for:**

- `DESIGN.md` — visual system, typography, color, motion philosophy
- `FLOW.md` — interaction flows, transitions, micro-interactions
- `VISUAL-MOTION.md` — animation system, generative graphics, canvas behavior
- `CONTENT-MODEL.md` — detailed content schemas, data formats, file structures
- `BUILD-SPEC.md` — technology stack, implementation plan, deployment

**No implementation decisions are made in this document.**

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [Core Concept](#2-core-concept)
3. [Information Architecture](#3-information-architecture)
4. [Homepage Architecture](#4-homepage-architecture)
5. [Work Architecture](#5-work-architecture)
6. [Thinking Architecture](#6-thinking-architecture)
7. [Lab Architecture](#7-lab-architecture)
8. [Journey Architecture](#8-journey-architecture)
9. [Now Architecture](#9-now-architecture)
10. [About Architecture](#10-about-architecture)
11. [Ask My Portfolio Architecture](#11-ask-my-portfolio-architecture)
12. [Content Model](#12-content-model)
13. [Knowledge Relationships](#13-knowledge-relationships)
14. [User Journeys](#14-user-journeys)
15. [Navigation](#15-navigation)
16. [Routing](#16-routing)
17. [Content / Presentation Separation](#17-content--presentation-separation)
18. [Future RAG Boundary](#18-future-rag-boundary)
19. [Media Architecture](#19-media-architecture)
20. [Achievement Architecture](#20-achievement-architecture)
21. [Contact Architecture](#21-contact-architecture)
22. [SEO Requirements](#22-seo-requirements)
23. [Performance Requirements](#23-performance-requirements)
24. [Accessibility Requirements](#24-accessibility-requirements)
25. [Technology Decisions to Make Later](#25-technology-decisions-to-make-later)
26. [Architectural Principles](#26-architectural-principles)
27. [Explicit Non-Goals](#27-explicit-non-goals)

---

## 1. Product Vision

### What This Is

A premium personal portfolio website for **Shubh Mehrotra**.

### Positioning

| Role | |
|---|---|
| AI Product Builder | Conceives and ships AI-powered products end-to-end |
| Systems Thinker | Approaches problems as interconnected systems, not isolated features |
| AI / Backend Engineer | Builds the infrastructure, pipelines, and intelligence layers |
| Experimenter | Tests hypotheses, prototypes ideas, documents what works and what doesn't |
| B.Tech Computer Science Student | Currently completing formal education while actively building |

### What This Is NOT

This portfolio is **not**:

- An online résumé
- A conventional developer portfolio
- A collection of project cards with tech-stack badges
- A certificate showcase
- A template-driven personal website

### What This IS

**The Personal System of a Builder.**

The website communicates a person who operates in a continuous cycle:

```
THINKS
  → OBSERVES
    → IDENTIFIES PROBLEMS
      → BUILDS
        → EXPERIMENTS
          → TESTS
            → LEARNS
              → SHARES
                → ITERATES
```

The portfolio is a **living body of work** — not a static document. It should evolve as Shubh builds, learns, and publishes new thinking.

### What the Visitor Should Understand

After visiting, any visitor should be able to answer:

| Question | Answered by |
|---|---|
| Who is Shubh? | About, Hero, narrative voice |
| What does he build? | Work, Selected Work |
| How does he think? | Thinking, How I Build |
| What has he learned? | Journey, Thinking, project lessons |
| What is he exploring? | Lab, Now |
| What has he actually done? | Work case studies, Journey evidence |
| How do his projects connect to his thinking? | Knowledge relationships, cross-references |

### The Nine Pillars

The portfolio combines nine distinct functions into one coherent system:

1. **Personal brand** — identity, voice, positioning
2. **AI / product-building portfolio** — proof of what he builds and why
3. **Engineering portfolio** — technical depth, architecture, decisions
4. **Project case-study archive** — deep narratives, not shallow cards
5. **Thinking / writing platform** — observations, notes, evolving ideas
6. **Experimental lab** — hypotheses, prototypes, unfinished explorations
7. **Learning and journey archive** — development over time, milestones
8. **Current activity / NOW page** — living snapshot of present focus
9. **AI-powered portfolio knowledge interface** — future "Ask My Portfolio"

---

## 2. Core Concept

### Two-Layer Architecture

The portfolio operates on two distinct layers:

```
┌─────────────────────────────────────────┐
│         LAYER 1 — HUMAN EXPERIENCE      │
│                                         │
│   Art-directed editorial portfolio      │
│   Visual narrative                      │
│   Emotional and intellectual impact     │
│                                         │
│   Sections:                             │
│   WORK · THINKING · LAB · JOURNEY ·    │
│   NOW · ABOUT                          │
└─────────────────┬───────────────────────┘
                  │
                  │ consumes
                  │
┌─────────────────▼───────────────────────┐
│       LAYER 2 — KNOWLEDGE SYSTEM        │
│                                         │
│   Structured content model              │
│   Entity relationships                  │
│   Metadata and cross-references         │
│   Future: indexing, retrieval, RAG      │
│                                         │
│   Powers:                               │
│   ASK MY PORTFOLIO                      │
└─────────────────────────────────────────┘
```

### Four Architectural Concerns

These four concerns must remain **separated** throughout the system:

| Concern | Responsibility |
|---|---|
| **CONTENT** | Structured data: projects, articles, experiments, events, metadata |
| **PRESENTATION** | Visual rendering: layout, typography, color, animation, interaction |
| **KNOWLEDGE** | Relationships between entities: cross-references, graph connections |
| **RETRIEVAL** | Future indexing, search, vector embeddings, RAG pipeline |

**Critical constraint:** The future RAG system must **not** be tightly coupled to the visual frontend. Content and knowledge must be accessible independently of presentation.

---

## 3. Information Architecture

### Site Map

```
PORTFOLIO
│
├── HOME
│   └── (narrative sequence — see §4)
│
├── WORK
│   ├── Project Index
│   │   └── filterable list of all projects
│   └── Project Case Study (/work/[slug])
│       └── deep narrative for one project
│
├── THINKING
│   ├── Article Index
│   │   └── filterable list of all articles
│   └── Individual Article (/thinking/[slug])
│       └── full article with cross-references
│
├── LAB
│   ├── Experiment Index
│   │   └── filterable list with status indicators
│   └── Experiment Detail (/lab/[slug])
│       └── hypothesis → experiment → observation → result
│
├── JOURNEY
│   └── Timeline / Milestones
│       └── chronological development with connections
│
├── NOW
│   └── living snapshot of current activities
│
├── ABOUT
│   └── narrative identity + professional facts
│
└── ASK MY PORTFOLIO
    └── AI-powered conversational interface (future)
```

### Architectural Decisions on Structure

**No "Skills" page.** Technologies appear as attributes of projects, experiments, and articles — not as isolated lists of logos. A visitor understands technical capability through evidence, not self-reported skill bars.

**No "Services" page.** This is a personal portfolio, not an agency or freelance site.

**No "Testimonials" page.** No testimonials are included because none have been provided. The architecture does not fabricate social proof.

**No "Contact" page.** Contact information appears as a section within the homepage and footer, not as a standalone page. There is insufficient content to justify a full page.

**Every page has a purpose:**

| Page | Purpose |
|---|---|
| Home | Narrative entry point — who is Shubh, what does he build, why should you care |
| Work | Evidence of building — deep case studies, not shallow cards |
| Thinking | Evidence of intellectual depth — observations, learning, product thinking |
| Lab | Evidence of curiosity and experimentation — hypotheses, prototypes, exploration |
| Journey | Evidence of development over time — growth, milestones, context |
| Now | Evidence of current momentum — what's active right now |
| About | Narrative identity — who he is beyond the work |
| Ask My Portfolio | Future knowledge interface — ask questions, get grounded answers |

---

## 4. Homepage Architecture

The homepage is a **narrative sequence**, not a dashboard. Each section answers a specific visitor question and moves the visitor deeper into the portfolio.

### Section 1: Hero

| Property | Value |
|---|---|
| **Purpose** | Establish identity, positioning, and first impression |
| **Visitor question** | "Who is this person?" |
| **Information displayed** | Name, positioning statement, brief framing of what Shubh does |
| **Relationship** | Sets the tone for the entire portfolio |
| **Static / Dynamic** | Static content, potentially dynamic visual treatment |
| **Requires content data** | Person entity (name, positioning, tagline) |
| **Links to** | Scroll continuation; potentially About |

### Section 2: Signal / Proof

| Property | Value |
|---|---|
| **Purpose** | Immediately establish credibility through evidence, not claims |
| **Visitor question** | "Should I take this person seriously?" |
| **Information displayed** | Concrete signals — number of projects shipped, key affiliations, notable programs, current status. Only verifiable facts. |
| **Relationship** | Validates the Hero's positioning |
| **Static / Dynamic** | Semi-static — updated when new signals are earned |
| **Requires content data** | Achievement entities, JourneyEvent entities (filtered to high-signal items) |
| **Links to** | Individual evidence sources (Work, Journey) |

**Important:** This section must contain only real, verifiable signals. No invented metrics. No inflated numbers. If there are only four meaningful signals, show four.

### Section 3: Selected Work

| Property | Value |
|---|---|
| **Purpose** | Showcase the strongest projects as proof of building |
| **Visitor question** | "What has this person actually built?" |
| **Information displayed** | 3–4 selected projects with title, category, short description, key technology signals |
| **Relationship** | Subset of Work; each item links to its full case study |
| **Static / Dynamic** | Dynamic — pulls from Project content |
| **Requires content data** | Project entities (filtered, ordered by prominence) |
| **Links to** | `/work/[project]` for each project; `/work` for full index |

### Section 4: How I Build

| Property | Value |
|---|---|
| **Purpose** | Communicate building philosophy and systems-thinking approach |
| **Visitor question** | "How does this person approach problems?" |
| **Information displayed** | The building cycle: think → observe → identify → build → experiment → test → learn → share → iterate. Possibly with brief supporting text. |
| **Relationship** | Philosophical foundation that connects Work, Thinking, and Lab |
| **Static / Dynamic** | Static content |
| **Requires content data** | Person entity (philosophy / approach text) |
| **Links to** | Thinking, Lab |

### Section 5: Thinking Preview

| Property | Value |
|---|---|
| **Purpose** | Signal intellectual depth and ongoing reflection |
| **Visitor question** | "Does this person think deeply about what they build?" |
| **Information displayed** | 2–3 recent or selected articles with title, category, thesis/summary |
| **Relationship** | Subset of Thinking |
| **Static / Dynamic** | Dynamic — pulls from Article content |
| **Requires content data** | Article entities (filtered, ordered by recency or curation) |
| **Links to** | `/thinking/[article]` for each; `/thinking` for full index |

### Section 6: Lab Preview

| Property | Value |
|---|---|
| **Purpose** | Signal curiosity, experimentation, and comfort with the unfinished |
| **Visitor question** | "What is this person exploring?" |
| **Information displayed** | 2–3 experiments with title, status, brief description |
| **Relationship** | Subset of Lab |
| **Static / Dynamic** | Dynamic — pulls from Experiment content |
| **Requires content data** | Experiment entities |
| **Links to** | `/lab/[experiment]` for each; `/lab` for full index |

### Section 7: Journey Preview

| Property | Value |
|---|---|
| **Purpose** | Show development and trajectory over time |
| **Visitor question** | "How did this person get here?" |
| **Information displayed** | Condensed timeline — 4–6 key milestones |
| **Relationship** | Subset of Journey |
| **Static / Dynamic** | Dynamic — pulls from JourneyEvent content |
| **Requires content data** | JourneyEvent entities (filtered to highlights) |
| **Links to** | `/journey` |

### Section 8: Now

| Property | Value |
|---|---|
| **Purpose** | Show current momentum and active focus |
| **Visitor question** | "What is this person doing right now?" |
| **Information displayed** | Current activities grouped by category (building, exploring, learning, writing, experimenting) |
| **Relationship** | Mirrors Now page content |
| **Static / Dynamic** | Dynamic — pulls from NowItem content |
| **Requires content data** | NowItem entities |
| **Links to** | `/now` (if Now has additional detail); individual activity links |

### Section 9: About Preview

| Property | Value |
|---|---|
| **Purpose** | Personal connection — humanize the builder |
| **Visitor question** | "Who is this person beyond the work?" |
| **Information displayed** | Brief narrative excerpt, photo if available |
| **Relationship** | Preview of About page |
| **Static / Dynamic** | Static content |
| **Requires content data** | Person entity (narrative excerpt) |
| **Links to** | `/about` |

### Section 10: Ask My Portfolio

| Property | Value |
|---|---|
| **Purpose** | Introduce the AI-powered knowledge interface |
| **Visitor question** | "Can I explore this portfolio in my own way?" |
| **Information displayed** | Brief explanation, example questions, entry point to the interface |
| **Relationship** | Gateway to the retrieval layer |
| **Static / Dynamic** | Dynamic once RAG is implemented; static teaser initially |
| **Requires content data** | Example question prompts |
| **Links to** | `/ask` |

### Section 11: Contact

| Property | Value |
|---|---|
| **Purpose** | Make it easy to reach out |
| **Visitor question** | "How do I contact this person?" |
| **Information displayed** | Email, LinkedIn, GitHub, resume link |
| **Relationship** | Terminal section — call to action |
| **Static / Dynamic** | Static |
| **Requires content data** | Contact/ExternalLink entities |
| **Links to** | External profiles |

---

## 5. Work Architecture

### Philosophy

Projects are **case studies**, not cards. Each project tells a story:

```
PROBLEM
  → CONTEXT
    → MOTIVATION
      → SOLUTION
        → ARCHITECTURE
          → TECHNICAL DECISIONS
            → CHALLENGES
              → TRADE-OFFS
                → OUTCOME
                  → LESSONS LEARNED
```

The visitor should understand not just *what* was built, but *why* it was built, *how* decisions were made, and *what was learned*.

### Project Data Structure

```
Project
├── title              : string
├── slug               : string (URL-safe identifier)
├── year               : number
├── category           : enum [AI_PRODUCT, ENGINEERING, TOOL, RESEARCH, OTHER]
├── status             : enum [COMPLETED, IN_PROGRESS, MAINTAINED]
├── featured           : boolean (eligible for homepage selection)
├── shortDescription   : string (1–2 sentences)
├── problem            : text (what problem does this solve?)
├── context            : text (what situation gave rise to this?)
├── motivation         : text (why did Shubh personally care?)
├── role               : string (Shubh's role in this project)
├── personalContribution : text (what specifically did Shubh do?)
├── solution           : text (what was built?)
├── architecture       : text (how is the system designed?)
├── technicalDecisions : TechnicalDecision[] (key decisions and rationale)
├── technologies       : Technology[] (references to Technology entities)
├── challenges         : text (what was hard?)
├── tradeOffs          : text (what compromises were made and why?)
├── experiments        : text (what was tested or tried?)
├── evaluation         : text (how was the result assessed?)
├── outcome            : text (what happened? only real outcomes)
├── lessonsLearned     : text (what did Shubh learn?)
├── screenshots        : MediaAsset[]
├── diagrams           : MediaAsset[]
├── demo               : ExternalLink (optional)
├── repository         : ExternalLink (optional)
├── relatedArticles    : Article[] (references)
├── relatedExperiments : Experiment[] (references)
├── relatedJourneyEvents : JourneyEvent[] (references)
└── metadata           : ContentMetadata
```

```
TechnicalDecision
├── decision    : string (what was decided)
├── context     : string (why it mattered)
├── rationale   : string (why this choice)
└── alternative : string (what was considered instead)
```

### Initial Projects

The architecture must account for these four projects. Content will be populated later from verified information.

| # | Title | Slug | Notes |
|---|---|---|---|
| 1 | Enterprise Knowledge Assistant | `enterprise-knowledge-assistant` | Hybrid RAG system, built during Groto internship |
| 2 | AgentForge | `agentforge` | AI agent framework/tool |
| 3 | GeoIntel AI | `geointel-ai` | Geospatial intelligence, likely SIH-related |
| 4 | Daily Sahayak | `daily-sahayak` | Daily utility / assistant |

**No additional projects are invented. No metrics are fabricated. No outcomes are assumed.**

### Project ↔ Other Entity Connections

A project is not an island. It connects to the rest of the portfolio:

```
PROJECT
│
├──→ THINKING
│    A project can produce lessons that become articles.
│    Example: Building the Enterprise Knowledge Assistant
│    → Learning about RAG evaluation
│    → Article: "What I Learned About Retrieval Evaluation"
│
├──→ LAB
│    A project can spawn experiments.
│    Example: Enterprise Knowledge Assistant
│    → Experimenting with hybrid retrieval strategies
│    → Lab Experiment: "Dense vs Sparse Retrieval Comparison"
│
├──→ JOURNEY
│    A project exists in a timeline context.
│    Example: Enterprise Knowledge Assistant
│    → Groto Internship (journey milestone)
│    → SIH Hackathon (journey milestone)
│
└──→ TECHNOLOGIES
     A project uses specific technologies.
     These technologies also appear in other projects,
     creating implicit connections.
```

### Work Index Page

The Work index page displays all projects with:

- Filtering by category
- Filtering by technology (optional)
- Sort by year (default: newest first)
- Each project shows: title, year, category, short description, key technologies

The index is a gateway to case studies, not a destination itself.

---

## 6. Thinking Architecture

### Philosophy

"Thinking" is a **first-class part of the personal brand**. It is not a blog. It is not a changelog. It is a space where Shubh publishes:

- Observations from building
- Technical learning and analysis
- Product thinking and frameworks
- Things discovered during research
- Things he changed his mind about
- Industry observations
- Field notes from experiments

The Thinking section should grow into a **substantial personal publication** over time. The architecture must support this growth.

### Categories

| Category | Description |
|---|---|
| BUILD NOTES | Lessons, reflections, and observations from building projects |
| AI SYSTEMS | Technical thinking about AI architectures, RAG, agents, evaluation |
| PRODUCT OBSERVATIONS | Product thinking, design decisions, user problems |
| LEARNING NOTES | Structured notes from studying a topic in depth |
| FIELD NOTES | Raw observations, discoveries, things noticed during research or work |

Categories may evolve. The architecture should not hardcode them.

### Article Data Structure

```
Article
├── title             : string
├── slug              : string (URL-safe identifier)
├── date              : date
├── updatedAt         : date (optional, for revised articles)
├── category          : enum [BUILD_NOTES, AI_SYSTEMS, PRODUCT_OBSERVATIONS,
│                             LEARNING_NOTES, FIELD_NOTES]
├── thesis            : string (one-sentence core argument or observation)
├── summary           : string (2–3 sentence summary)
├── content           : rich text / markdown (full article body)
├── tags              : string[]
├── featured          : boolean
├── relatedProjects   : Project[] (references)
├── relatedExperiments: Experiment[] (references)
├── sources           : Source[] (external references, papers, links)
└── metadata          : ContentMetadata
```

```
Source
├── title : string
├── url   : string (optional)
├── type  : enum [PAPER, ARTICLE, DOCUMENTATION, BOOK, TALK, OTHER]
└── note  : string (optional — why this source matters)
```

### Article ↔ Other Entity Connections

```
ARTICLE
│
├──→ PROJECTS
│    An article can reference one or more projects it arose from.
│    "This article came from building [Project X]."
│
├──→ EXPERIMENTS
│    An article can reference lab experiments.
│    "I explored this further in [Experiment Y]."
│
└──→ OTHER ARTICLES
     Articles can reference each other (via tags, explicit links,
     or shared projects/experiments). The relationship is implicit
     through shared entities, not a separate "related articles" field
     that requires manual curation.
```

### Article Index Page

The Thinking index page displays:

- All articles, newest first
- Filtering by category
- Filtering by tag
- Each article shows: title, date, category, thesis or summary

---

## 7. Lab Architecture

### Philosophy

Lab is the space for **experimentation, unfinished ideas, and hypotheses**. It is fundamentally different from Work:

| Dimension | WORK | LAB |
|---|---|---|
| Maturity | Completed or mature projects | Exploration, prototypes, in-progress |
| Narrative | Full case study with outcome | Hypothesis → experiment → observation |
| Expectation | Polished, complete story | May be unfinished, uncertain, or failed |
| Purpose | Demonstrate capability | Demonstrate curiosity and process |
| Tone | Authoritative | Exploratory |

**Lab normalizes the unfinished.** Not everything needs to ship. The act of experimenting, observing, and learning is valuable.

### Experiment States

```
IDEA        → Conceived but not yet started
EXPLORING   → Actively researching and gathering information
PROTOTYPE   → Initial implementation exists
BUILDING    → Actively developing
TESTING     → Evaluating results
SHIPPED     → Completed and potentially graduated to WORK
```

An experiment can remain in any state indefinitely. "IDEA" is a valid permanent state.

### Experiment Data Structure

```
Experiment
├── title             : string
├── slug              : string
├── status            : enum [IDEA, EXPLORING, PROTOTYPE, BUILDING, TESTING, SHIPPED]
├── date              : date (started)
├── updatedAt         : date
├── hypothesis        : string (what is being tested or explored?)
├── problem           : text (what problem or question motivates this?)
├── experiment        : text (what is being tried?)
├── approach          : text (how is the experiment structured?)
├── observations      : text (what has been noticed so far?)
├── result            : text (optional — what was the outcome?)
├── lesson            : text (optional — what was learned?)
├── technologies      : Technology[]
├── relatedProjects   : Project[] (references)
├── relatedArticles   : Article[] (references — thinking that arose from this)
└── metadata          : ContentMetadata
```

### Current Experiment Concepts

These are concept areas for experiments. Content details will be added later.

- AI agents
- RAG evaluation
- Knowledge systems
- Saved content → structured knowledge
- AI FinOps

**No implementation details are invented.**

### Lab ↔ Work Graduation

An experiment can graduate to Work when it matures into a meaningful project:

```
LAB EXPERIMENT (status: SHIPPED)
        │
        ↓
WORK PROJECT (created from experiment)
        │
        └── relatedExperiments includes original experiment
```

The original experiment remains in Lab as a record of the exploration process.

### Lab Index Page

The Lab index page displays:

- All experiments with status indicators
- Filtering by status
- Filtering by technology
- Visual differentiation between states (e.g., IDEA vs BUILDING vs SHIPPED)

---

## 8. Journey Architecture

### Philosophy

Journey represents **development over time**. It answers: "How did Shubh get here?"

Journey is **not** a certificate gallery. Each milestone should connect to something meaningful — a project, an article, a lesson, a shift in thinking.

### Journey Event Types

| Type | Description |
|---|---|
| EDUCATION | B.Tech milestones, academic achievements |
| PROGRAM | Google Startup School, Microsoft Startup School, McKinsey Forward |
| INTERNSHIP | Groto internship, other professional experience |
| HACKATHON | SIH, other hackathons |
| PROJECT | Major project milestones (overlaps with Work) |
| EVENT | Workshops, conferences, community events |
| EXPERIMENT | Significant experiment milestones (overlaps with Lab) |
| LEARNING | Key learning moments, skill acquisitions, perspective shifts |

### Journey Event Data Structure

```
JourneyEvent
├── date              : date (or date range for longer events)
├── endDate           : date (optional, for ranges)
├── title             : string
├── type              : enum [EDUCATION, PROGRAM, INTERNSHIP, HACKATHON,
│                             PROJECT, EVENT, EXPERIMENT, LEARNING]
├── description       : text (what happened, what it meant)
├── artifact          : MediaAsset (optional — photo, certificate, screenshot)
├── lesson            : text (optional — what was learned from this)
├── relatedProject    : Project (optional reference)
├── relatedArticle    : Article (optional reference)
├── externalLink      : ExternalLink (optional)
└── metadata          : ContentMetadata
```

### Potential Timeline Events

These are known timeline areas. Specific events and dates will be populated from verified information.

- B.Tech (Computer Science)
- AI workshops
- Google Startup School
- Microsoft Startup School
- McKinsey Forward
- Groto internship
- Hackathons (including SIH)
- Major projects
- Community events
- Learning milestones

### Journey ↔ Other Entity Connections

```
JOURNEY EVENT
│
├──→ PROJECT
│    "During [Groto Internship], I built [Enterprise Knowledge Assistant]."
│
├──→ ARTICLE
│    "After [McKinsey Forward], I wrote about [Product Thinking]."
│
├──→ EXPERIMENT
│    "At [SIH], I started exploring [GeoIntel AI approach]."
│
└──→ ARTIFACT
     A photo, certificate, or other evidence from the event.
```

### Journey Page

The Journey page presents events chronologically, likely as a vertical timeline. Events are grouped or connected to show trajectories — how one event led to another.

---

## 9. Now Architecture

### Philosophy

Now is a **living snapshot** of Shubh's current focus. It answers: "What is Shubh doing right now?"

Inspired by the [/now page movement](https://nownownow.com/about), this page should be:

- Easy to update (content change only, no frontend code changes)
- Lightweight and current
- A signal of active momentum

### Now Categories

| Category | Description |
|---|---|
| BUILDING | Projects currently being developed |
| EXPLORING | Topics or technologies being investigated |
| LEARNING | Courses, books, concepts being studied |
| WRITING | Articles or thinking currently in progress |
| EXPERIMENTING | Active lab experiments |

### NowItem Data Structure

```
NowItem
├── category    : enum [BUILDING, EXPLORING, LEARNING, WRITING, EXPERIMENTING]
├── title       : string
├── description : string (1–2 sentences)
├── status      : string (optional — e.g., "early stages", "wrapping up")
├── updatedAt   : date
└── link        : string (optional — URL to project, article, experiment, or external resource)
```

### Update Mechanism

The Now page must be updatable by modifying **content data only**. No component code should need to change when Shubh updates what he's currently doing.

This is a content-driven page: change the data, the page reflects it.

---

## 10. About Architecture

### Philosophy

About is **not a résumé duplicate**. It is a narrative space that answers:

| Question | Type of content |
|---|---|
| Who is Shubh? | Personal narrative |
| What does he care about? | Interests, motivations |
| Why does he build? | Personal philosophy |
| What problems interest him? | Problem domains, curiosities |
| How does he approach building? | Building philosophy, systems thinking |
| What is he trying to understand? | Current intellectual pursuits |

### Two Layers of About Content

**Layer A: Personal Narrative**

The human story — voice, perspective, what drives him. This is written content, not data fields.

**Layer B: Professional Facts**

Structured, verifiable information:

```
ProfessionalFacts
├── education        : string (B.Tech Computer Science, institution)
├── currentRole      : string (student, builder, etc.)
├── experience       : ExperienceItem[] (internships, roles — from verified info only)
├── programs         : string[] (Google Startup School, McKinsey Forward, etc.)
├── interests        : string[] (AI systems, product building, etc.)
└── links            : ExternalLink[] (GitHub, LinkedIn, etc.)
```

### Content Constraints

- **Do not invent personality traits.** About content comes from Shubh.
- **Do not create exaggerated claims.** Every statement should be supportable.
- **Separate narrative from facts.** The narrative voice is editorial; the facts are verifiable.

---

## 11. Ask My Portfolio Architecture

### Concept

"Ask anything about my work."

An AI-powered conversational interface that lets visitors explore the portfolio through natural-language questions.

### Example Questions

- "What did Shubh build during his internship?"
- "How does the Hybrid RAG system work?"
- "Which projects involve evaluation?"
- "What is Shubh currently exploring?"
- "What did he learn from building AgentForge?"
- "What technologies does Shubh use most?"
- "How did the GeoIntel AI project start?"

### System Architecture (Boundary Only)

```
PORTFOLIO CONTENT (Projects, Articles, Experiments, Journey, Now, About)
        │
        ↓
CONTENT MODEL (structured entities with metadata and relationships)
        │
        ↓
STRUCTURED KNOWLEDGE (flattened, chunked, enriched for retrieval)
        │
        ↓
INDEXING (embedding and storing in vector/hybrid index)
        │
        ↓
RETRIEVAL (finding relevant content for a query)
        │
        ↓
LLM (generating a grounded answer from retrieved content)
        │
        ↓
GROUNDED ANSWER (response with inline source references)
        │
        ↓
SOURCE REFERENCES (links back to actual portfolio pages)
```

### Critical Requirement: Source Grounding

Every answer from the AI assistant must be traceable to portfolio content:

| Source type | Link target |
|---|---|
| Project | `/work/[slug]` |
| Article | `/thinking/[slug]` |
| Experiment | `/lab/[slug]` |
| Journey event | `/journey` (with anchor or highlight) |
| Now item | `/now` |
| About content | `/about` |

The assistant never invents information. It retrieves and synthesizes from the portfolio content.

### Architectural Boundary

The RAG system is architecturally independent:

```
┌──────────────────────┐     ┌──────────────────────┐
│   FRONTEND (Layer 1) │     │   RAG SYSTEM          │
│                      │     │                      │
│   Renders portfolio  │     │   Indexes content    │
│   pages from content │     │   Retrieves answers  │
│   data               │     │   References sources │
│                      │     │                      │
└──────────┬───────────┘     └──────────┬───────────┘
           │                            │
           │    both consume            │
           │                            │
      ┌────▼────────────────────────────▼────┐
      │         CONTENT LAYER                 │
      │                                       │
      │   Structured content: Projects,       │
      │   Articles, Experiments, Journey,     │
      │   Now, About                          │
      └───────────────────────────────────────┘
```

### Implementation Deferred

The following decisions are **not made here**:

- Vector database choice
- Embedding model choice
- LLM choice
- Chunking strategy
- Retrieval strategy (dense, sparse, hybrid)
- API architecture
- Rate limiting and abuse prevention
- Conversation memory

These belong in `BUILD-SPEC.md` or a dedicated `RAG-SPEC.md`.

---

## 12. Content Model

### Entity Definitions

```
┌─────────────────────────────────────────────────────────────┐
│                       CONTENT MODEL                         │
│                                                             │
│  Person ──────────────────────────────────────────────────  │
│  │  name, positioning, philosophy, narrative, links         │
│  │                                                          │
│  ├── Project ─────────────────────────────────────────────  │
│  │   title, slug, year, category, problem, solution,        │
│  │   architecture, decisions, technologies, outcome,        │
│  │   lessons, media                                         │
│  │                                                          │
│  ├── Article ─────────────────────────────────────────────  │
│  │   title, slug, date, category, thesis, summary,          │
│  │   content, tags, sources                                 │
│  │                                                          │
│  ├── Experiment ──────────────────────────────────────────  │
│  │   title, slug, status, hypothesis, problem,              │
│  │   experiment, observations, result, lesson               │
│  │                                                          │
│  ├── JourneyEvent ────────────────────────────────────────  │
│  │   date, title, type, description, artifact, lesson       │
│  │                                                          │
│  ├── NowItem ─────────────────────────────────────────────  │
│  │   category, title, description, status, updatedAt        │
│  │                                                          │
│  ├── Achievement ─────────────────────────────────────────  │
│  │   title, type, date, description, evidence, lesson       │
│  │                                                          │
│  ├── Technology ──────────────────────────────────────────  │
│  │   name, slug, category                                   │
│  │                                                          │
│  ├── ExternalLink ────────────────────────────────────────  │
│  │   label, url, type                                       │
│  │                                                          │
│  └── MediaAsset ──────────────────────────────────────────  │
│      filename, alt, caption, type, width, height            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Content Metadata (shared across entities)

```
ContentMetadata
├── id          : string (stable, unique identifier)
├── type        : enum [PROJECT, ARTICLE, EXPERIMENT, JOURNEY_EVENT,
│                       NOW_ITEM, ACHIEVEMENT, TECHNOLOGY, MEDIA]
├── createdAt   : date
├── updatedAt   : date
├── publishedAt : date (optional)
└── status      : enum [DRAFT, PUBLISHED, ARCHIVED]
```

### Entity Relationships

```
Person
├── has many → Projects
├── has many → Articles
├── has many → Experiments
├── has many → JourneyEvents
├── has many → NowItems
├── has many → Achievements
└── has many → ExternalLinks

Project
├── has many → Technologies
├── has many → MediaAssets (screenshots, diagrams)
├── references many → Articles (related thinking)
├── references many → Experiments (related exploration)
├── references many → JourneyEvents (timeline context)
├── has optional → ExternalLink (demo)
└── has optional → ExternalLink (repository)

Article
├── has many → Tags (string[])
├── has many → Sources
├── references many → Projects (arose from building these)
└── references many → Experiments (connected exploration)

Experiment
├── has many → Technologies
├── references many → Projects (spawned from these)
└── references many → Articles (thinking that arose from this)

JourneyEvent
├── has optional → Project (connected project)
├── has optional → Article (connected article)
├── has optional → MediaAsset (artifact / evidence)
└── has optional → ExternalLink

Achievement
├── has optional → MediaAsset (certificate, photo)
├── has optional → Project (connected project)
├── has optional → JourneyEvent (connected milestone)
└── has optional → ExternalLink

Technology
└── referenced by many → Projects, Experiments
```

### Relationship Directionality

Relationships are **bidirectional in concept** but may be **stored unidirectionally** for simplicity. For example:

- A Project stores `relatedArticles: ["article-slug-1", "article-slug-2"]`
- An Article stores `relatedProjects: ["project-slug-1"]`

At build time or runtime, the system can resolve both directions. The content model does not require a separate join table — slugs serve as foreign keys.

---

## 13. Knowledge Relationships

### The Portfolio as a Knowledge Graph

The portfolio is not a collection of isolated pages. It is a **connected knowledge system** where entities reference each other, forming a graph of relationships.

### Example Relationship Chains

**Chain 1: Internship → Project → Learning → Writing → New Exploration**

```
GROTO INTERNSHIP (JourneyEvent)
        │
        ↓ led to building
ENTERPRISE KNOWLEDGE ASSISTANT (Project)
        │
        ├── used: RAG, FastAPI, Retrieval, Evaluation (Technologies)
        │
        ↓ produced learning about
RETRIEVAL EVALUATION (potential Article)
        │
        ↓ which identified a gap
RAG EVALUATION EXPERIMENT (potential Experiment)
```

**Chain 2: Hackathon → Project → Technology Discovery → Learning**

```
SIH HACKATHON (JourneyEvent)
        │
        ↓ resulted in
GEOINTEL AI (Project)
        │
        ├── used: OCR, RAG, Document Intelligence (Technologies)
        │
        ↓ deepened understanding of
DOCUMENT INTELLIGENCE (potential Article / learning)
```

**Chain 3: Experiment → Insight → Article → Improved Project**

```
LAB EXPERIMENT (Experiment)
        │
        ↓ observation
INSIGHT ABOUT [X] (observation within experiment)
        │
        ↓ formalized as
THINKING ARTICLE (Article)
        │
        ↓ applied back to
PROJECT IMPROVEMENT (Project iteration)
```

### Why This Matters

1. **For visitors:** Cross-references create serendipitous discovery. A visitor reading a project case study sees related thinking, related experiments, and timeline context.

2. **For the AI assistant:** The knowledge graph enables rich retrieval. A question about "RAG" surfaces the project, the experiment, the article, and the journey event — not just one page.

3. **For Shubh's brand:** The connections demonstrate systems thinking. The portfolio itself is a system.

### Knowledge Graph — Entity Relationship Diagram

```
                    ┌─────────┐
                    │ PERSON  │
                    └────┬────┘
          ┌──────────────┼──────────────┐
          │              │              │
     ┌────▼────┐   ┌────▼────┐   ┌─────▼─────┐
     │ PROJECT │   │ ARTICLE │   │EXPERIMENT  │
     └────┬────┘   └────┬────┘   └─────┬──────┘
          │              │              │
          │    ┌─────────┼──────────────┤
          │    │         │              │
          ▼    ▼         ▼              ▼
     ┌────────────┐ ┌────────────┐ ┌──────────┐
     │ TECHNOLOGY │ │  JOURNEY   │ │   NOW    │
     │            │ │  EVENT     │ │   ITEM   │
     └────────────┘ └──────┬─────┘ └──────────┘
                           │
                    ┌──────▼──────┐
                    │ ACHIEVEMENT │
                    └─────────────┘

     ─── references / connects to ───

     Project ←→ Article      (project spawns thinking; article references project)
     Project ←→ Experiment   (project spawns experiment; experiment informs project)
     Project ←→ JourneyEvent (project is milestone in journey)
     Article ←→ Experiment   (thinking about experiments; experiment produces thinking)
     JourneyEvent ←→ Article (milestone produces reflection)
     Achievement ←→ Project  (achievement connected to meaningful work)
     Achievement ←→ JourneyEvent (achievement is a journey milestone)
     Technology ←→ Project   (used in)
     Technology ←→ Experiment (used in)
```

---

## 14. User Journeys

### Journey A: Recruiter

**Goal:** Quickly assess whether Shubh is a strong candidate.

```
LANDING (Hero)
  → IDENTITY ("AI Product Builder, Systems Thinker, AI/Backend Engineer")
    → SIGNAL / PROOF (programs, internship, hackathons — concrete evidence)
      → SELECTED WORK (3–4 strongest projects)
        → PROJECT CASE STUDY (technical depth, architecture, decisions)
          → TECHNICAL EVIDENCE (code quality, system design, problem-solving)
            → CONTACT (email, LinkedIn, resume)
```

**Key needs:** Speed, credibility, evidence of real work, technical depth.
**Critical sections:** Hero, Signal, Selected Work, Project Case Study, Contact.

### Journey B: Startup Founder / Hiring Manager

**Goal:** Understand Shubh's product thinking and building capability.

```
LANDING (Hero)
  → HOW I BUILD (building philosophy, systems thinking approach)
    → PROJECTS (what has he shipped?)
      → PROJECT CASE STUDY (product decisions, trade-offs, outcomes)
        → THINKING (does he think deeply about product and systems?)
          → CONTACT (reach out for conversation)
```

**Key needs:** Product intuition, building philosophy, evidence of end-to-end ownership.
**Critical sections:** How I Build, Work, Thinking, Contact.

### Journey C: Technical Reviewer

**Goal:** Evaluate technical depth and engineering quality.

```
LANDING (Hero)
  → WORK (all projects)
    → PROJECT CASE STUDY (deep dive into one project)
      → ARCHITECTURE (system design, component relationships)
        → TECHNICAL DECISIONS (rationale, trade-offs, alternatives considered)
          → GITHUB / DEMO (view code, try the product)
```

**Key needs:** Architecture, code quality, technical decision-making.
**Critical sections:** Work, Project Case Study (architecture + decisions), repository/demo links.

### Journey D: Curious Visitor

**Goal:** Explore and discover — understand what Shubh is about.

```
LANDING (Hero)
  → THINKING (interesting articles, observations)
    → LAB (what's being explored?)
      → JOURNEY (how did he get here?)
        → PROJECTS (what has he built?)
          → ASK MY PORTFOLIO (explore freely)
```

**Key needs:** Interesting content, discovery, serendipity.
**Critical sections:** Thinking, Lab, Journey, Ask My Portfolio.

### Journey E: AI Assistant User

**Goal:** Get specific answers about Shubh's work through conversation.

```
ASK MY PORTFOLIO
  → QUESTION (natural language query)
    → RETRIEVAL (system finds relevant content)
      → ANSWER (grounded response with context)
        → SOURCE (link to project/article/experiment/event)
          → RELATED CONTENT (discover more through connections)
```

**Key needs:** Accurate answers, source transparency, easy navigation to source material.
**Critical sections:** Ask My Portfolio, all content sections (as sources).

---

## 15. Navigation

### Primary Navigation

Always visible or accessible from any page:

| Item | Route | Purpose |
|---|---|---|
| Work | `/work` | Projects and case studies |
| Thinking | `/thinking` | Articles and observations |
| Lab | `/lab` | Experiments and exploration |
| Journey | `/journey` | Development over time |
| About | `/about` | Identity and narrative |

### Secondary Navigation

Present but less prominent:

| Item | Route | Purpose |
|---|---|---|
| Now | `/now` | Current activities |
| Ask | `/ask` | AI-powered knowledge interface |

### Contextual Navigation

Appears within specific content types:

**Project Case Study:**
- Previous / Next project
- Related articles
- Related experiments
- Related journey events
- Back to Work index

**Article:**
- Previous / Next article
- Related projects
- Related experiments
- Back to Thinking index

**Experiment:**
- Related projects
- Related articles
- Back to Lab index

### Footer Navigation

Present on all pages:

- All primary navigation items
- Contact links (Email, LinkedIn, GitHub)
- Resume link
- Copyright / credits

### Navigation Behavior Notes

- Navigation should not assume all items are always visible. On mobile, primary navigation may collapse.
- The current page should be indicated in navigation.
- Navigation should support keyboard traversal.
- The logo / name in navigation should link to Home.

---

## 16. Routing

### URL Structure

```
/                          → Home
/work                      → Project Index
/work/[project-slug]       → Project Case Study
/thinking                  → Article Index
/thinking/[article-slug]   → Individual Article
/lab                       → Experiment Index
/lab/[experiment-slug]     → Experiment Detail
/journey                   → Timeline / Milestones
/about                     → About
/now                       → Now
/ask                       → Ask My Portfolio
```

### URL Design Principles

1. **Human-readable.** URLs use lowercase slugs, not IDs.
2. **Predictable.** The structure mirrors the information architecture.
3. **Stable.** Once published, URLs should not change. This is critical for SEO and for the RAG system's source references.
4. **No unnecessary nesting.** `/work/enterprise-knowledge-assistant` is sufficient — no need for `/work/projects/ai/enterprise-knowledge-assistant`.

### Slug Convention

All slugs are:
- Lowercase
- Hyphen-separated
- Derived from the title
- Unique within their content type

Examples:
- `enterprise-knowledge-assistant`
- `agentforge`
- `geointel-ai`
- `daily-sahayak`

### 404 Handling

The architecture should account for a meaningful 404 page that:
- Acknowledges the broken link
- Offers navigation to main sections
- Optionally suggests similar content

---

## 17. Content / Presentation Separation

### The Fundamental Rule

```
Content exists independently of its visual presentation.
```

A project is a **data entity** with structured fields. The UI **consumes** that entity and renders it.

### Correct Architecture

```
┌──────────────────────┐
│   CONTENT LAYER      │
│                      │
│   /content/          │
│   ├── projects/      │
│   │   ├── project-1  │ ← structured data (JSON, MDX, YAML, etc.)
│   │   └── project-2  │
│   ├── articles/      │
│   ├── experiments/   │
│   ├── journey/       │
│   ├── now/           │
│   └── about/         │
│                      │
└──────────┬───────────┘
           │
           │ consumed by
           │
┌──────────▼───────────┐
│   PRESENTATION LAYER │
│                      │
│   Components that    │
│   render content     │
│   data into visual   │
│   layouts            │
│                      │
└──────────┬───────────┘
           │
           │ produces
           │
┌──────────▼───────────┐
│   RENDERED PAGES     │
│                      │
│   /work/project-1    │
│   /thinking/article  │
│   etc.               │
│                      │
└──────────────────────┘
```

### Incorrect Architecture (Anti-Pattern)

```
❌ Project information hardcoded inside React components
❌ Article content embedded in page files
❌ Journey events defined in component state
❌ Now items hardcoded in JSX
```

### Why This Matters

1. **Content portability.** The same content can be consumed by the frontend AND the RAG system without duplication.
2. **Maintainability.** Shubh can update content without touching UI code.
3. **Future-proofing.** If the frontend framework changes, content survives.
4. **Knowledge indexing.** The RAG system can directly index content files without parsing UI components.

### Content Format Decision (Deferred)

The specific format for content files (JSON, MDX, YAML, CMS, database) is a technology decision to be made later. The architectural requirement is the separation itself.

---

## 18. Machine Knowledge Layer & Grounded Truth Architecture (`/ask`)

### Core Engineering Philosophy

The portfolio should not merely assert:
*"I know RAG, agents, FastAPI, etc."*

Instead, the portfolio must demonstrate:
**"I understand how to turn messy information into a reliable software system."**

The portfolio itself serves as the living, verifiable proof of that engineering capability.

### Dual System Topology

```
                 SHUBH
                   │
          ┌────────┴────────┐
          │                 │
       HUMAN              MACHINE
          │                 │
       Portfolio         Structured
       Experience        Knowledge
          │                 │
          └────────┬────────┘
                   │
             KNOWLEDGE LAYER
                   │
        ┌──────────┼──────────┐
        │          │          │
     Projects   Skills     Evidence
        │          │          │
        └──────────┼──────────┘
                   │
             RETRIEVAL LAYER
                   │
        ┌──────────┼──────────┐
        │          │          │
      Lexical   Semantic     Graph
                   │
                   ↓
             EVIDENCE SET
                   │
                   ↓
          VALIDATION ENGINE / LLM
                   │
                   ↓
          VALIDATED ANSWER
                   │
        ┌──────────┼──────────┐
        ↓          ↓          ↓
     Answer     Evidence   Relations
```

### High-Trust Factual Grounding in System Query Mode

Rather than treating `/ask` as a generic chatbot or building a keyword-gimmick "ATS optimizer", the **Ask My Portfolio** system interface is built as a **Grounded Truth Engine**:

1. **Concrete Real Data Returns:**
   Every query response extracts practical, verifiable facts directly from underlying YAML source files (`content/projects/*.yaml`, `content/lab/*.yaml`, `content/thinking/*.yaml`):
   - Explicit separation of **Personal Contribution** vs **Collaborative Team Scope** (e.g. SIH GeoIntel AI).
   - Real **Architecture Pipelines** (e.g. `Document Ingestion -> Chunking -> Embeddings & BM25 -> RRF -> BGE Reranker -> Grounded Generation`).
   - Verifiable **Outcomes & Placement Metrics** (e.g. Smart India Hackathon Top 65 of 111 teams).
   - Documented **Failure Modes & Trade-offs** (e.g. BM25 vs dense score divergence solved via Reciprocal Rank Fusion; CPU memory spikes under burst load).

2. **Strict Negative & Scale Scope Validation:**
   When a visitor or reviewer queries an ungrounded claim or unverified scale:
   - Example Query: *"Did Shubh handle production workloads for 100K+ users?"*
   - Status: `NO EVIDENCE IN PUBLISHED RECORDS`
   - Validated Response: Explicitly clarifies that the portfolio contains no published evidence for 100K+ concurrent user deployments, grounding the response in actual documented scopes (internal enterprise prototypes and SIH competition rounds).

3. **Immutable Source Attribution:**
   Every returned evidence record cites the exact relative YAML path (e.g. `content/projects/enterprise-hybrid-rag.yaml`), ensuring full auditability and senior-level software defensibility.



---

## 19. Media Architecture

### Media Types

| Type | Examples | Usage |
|---|---|---|
| Project screenshot | UI captures, terminal output, application views | Project case studies |
| Project demo | Video recordings, GIF demos | Project case studies |
| Architecture diagram | System diagrams, flow charts, component maps | Project case studies, articles |
| Photograph | Event photos, workshop photos | Journey, About |
| Certificate | Program completions, awards | Achievements (used sparingly) |
| Event image | Conference, hackathon, workshop imagery | Journey |
| Article image | Diagrams, illustrations, charts within articles | Thinking |
| Generative graphic | Procedural, algorithmic, or AI-generated visuals | Site-wide visual identity (future) |

### MediaAsset Data Structure

```
MediaAsset
├── id          : string (stable identifier)
├── filename    : string
├── alt         : string (accessibility — describes the image)
├── caption     : string (optional — contextual description)
├── type        : enum [SCREENSHOT, DEMO, DIAGRAM, PHOTO, CERTIFICATE,
│                       EVENT_IMAGE, ARTICLE_IMAGE, GENERATIVE]
├── format      : enum [PNG, JPG, WEBP, SVG, GIF, MP4, WEBM]
├── width       : number (pixels)
├── height      : number (pixels)
├── fileSize    : number (bytes, for performance budgeting)
└── metadata    : ContentMetadata
```

### Media Principles

1. **Media has metadata.** No randomly hardcoded image paths. Every image is a structured MediaAsset.
2. **Alt text is required.** Every image must have meaningful alt text for accessibility.
3. **Format optimization.** Images should be served in modern formats (WebP) with fallbacks.
4. **Lazy loading.** Media below the fold should load lazily.
5. **Responsive sizing.** Multiple resolutions should be available for different viewports.
6. **No invented assets.** This architecture does not create or assume any actual media files. Those will be added when real content is populated.

### Media Organization (Deferred)

The physical organization of media files (folder structure, CDN, image optimization pipeline) is a technology decision to be made later. The requirement is that media is structured and referenced, not embedded inline.

---

## 20. Achievement Architecture

### Philosophy

Achievements exist as **structured content** but should **not dominate** the portfolio. An achievement is meaningful when it connects to something — a project built, a skill learned, a perspective gained.

Not every certificate is an achievement. The bar for inclusion: "Did this meaningfully contribute to who Shubh is as a builder?"

### Achievement Categories

| Category | Description |
|---|---|
| HACKATHON | Competition participation and results |
| PROGRAM | Structured programs (Google Startup School, McKinsey Forward, etc.) |
| INTERNSHIP | Professional experience |
| WORKSHOP | Hands-on learning events |
| COMPETITION | Technical competitions beyond hackathons |
| COMMUNITY | Events, meetups, contributions |
| LEARNING_MILESTONE | Significant self-directed learning achievements |

### Achievement Data Structure

```
Achievement
├── title           : string
├── type            : enum [HACKATHON, PROGRAM, INTERNSHIP, WORKSHOP,
│                          COMPETITION, COMMUNITY, LEARNING_MILESTONE]
├── date            : date
├── description     : text (what it was, why it mattered)
├── evidence        : AchievementEvidence (optional)
├── lesson          : text (optional — what was gained beyond the credential)
├── relatedProject  : Project (optional — project connected to this)
├── relatedJourneyEvent : JourneyEvent (optional — timeline context)
├── externalLink    : ExternalLink (optional)
└── metadata        : ContentMetadata
```

```
AchievementEvidence
├── photo       : MediaAsset (optional)
├── certificate : MediaAsset (optional)
├── result      : string (optional — e.g., "Finalist", "Selected participant")
└── reflection  : text (optional — personal reflection on significance)
```

### Integration

Achievements surface in three places:

1. **Signal / Proof** section on the homepage (high-signal items only)
2. **Journey** timeline (as milestone events)
3. **About** page (professional facts)

They do **not** have their own dedicated page. They are woven into the narrative.

---

## 21. Contact Architecture

### Contact Data Structure

```
ContactInfo
├── email     : string (to be populated with verified address)
├── linkedin  : ExternalLink
├── github    : ExternalLink
├── resume    : ExternalLink (link to downloadable resume)
└── other     : ExternalLink[] (optional — Twitter/X, other professional profiles)
```

**No URLs are invented.** All contact information will be populated from verified sources.

### Contact Placement

Contact information appears in:

1. **Homepage** — Contact section at the bottom
2. **Footer** — Present on every page
3. **About** — Professional links

There is no standalone Contact page. The content does not justify a full page.

### Contact Interaction

The architecture should consider:

- Direct email link (`mailto:`)
- Social profile links (open in new tab)
- Resume download
- Optional: copy-to-clipboard for email

A contact form is not included in the initial architecture. If added later, it would require a backend service.

---

## 22. SEO Requirements

### Page-Level Requirements

Every rendered page must have:

| Element | Requirement |
|---|---|
| `<title>` | Descriptive, unique per page. Pattern: `[Page Title] — Shubh Mehrotra` |
| `<meta description>` | Compelling 150–160 character summary of page content |
| `<link rel="canonical">` | Self-referencing canonical URL |
| Open Graph `og:title` | Same as or derived from `<title>` |
| Open Graph `og:description` | Same as or derived from `<meta description>` |
| Open Graph `og:image` | Representative image for social sharing |
| Open Graph `og:url` | Canonical URL |
| Open Graph `og:type` | `website` for most pages; `article` for Thinking articles |
| Twitter Card | `summary_large_image` with appropriate metadata |

### Content-Type-Specific SEO

**Projects:**
- Structured data (Schema.org `CreativeWork` or `SoftwareApplication`)
- Rich descriptions including technologies and problem domain

**Articles:**
- Structured data (Schema.org `Article` or `BlogPosting`)
- `datePublished`, `dateModified`, `author`
- Article-specific OG tags

**Person:**
- Structured data (Schema.org `Person`)
- On About page and potentially homepage

### Technical SEO

| Requirement | Description |
|---|---|
| Sitemap | XML sitemap at `/sitemap.xml` listing all public pages |
| Robots | `robots.txt` allowing crawling of public content |
| Clean URLs | No query parameters for navigation; slug-based routing |
| Performance | Fast load times (see §23) |
| Mobile-friendly | Responsive design that passes mobile usability tests |
| Heading hierarchy | Single `<h1>` per page, logical heading structure |
| Internal linking | Cross-references create a healthy internal link graph |

### SEO for Dynamic Content

As content grows (more articles, experiments, projects), the sitemap must update automatically. New content should be indexable without manual SEO intervention.

---

## 23. Performance Requirements

### Context

The portfolio may eventually include:

- Generative graphics (canvas, WebGL, procedural art)
- Complex animations (scroll-based, parallax, micro-interactions)
- Rich media (project screenshots, demos, diagrams)
- AI-powered chat interface

Performance cannot be an afterthought.

### Architectural Constraints

| Constraint | Requirement |
|---|---|
| Progressive loading | Content should be visible before heavy assets load. Text-first. |
| Lazy-loaded media | Images and videos below the fold load on demand |
| Reduced motion | `prefers-reduced-motion` must be respected. All animations must have a no-motion fallback. |
| Mobile performance | The site must perform well on mid-range mobile devices. GPU-heavy visuals should degrade gracefully. |
| GPU isolation | Canvas/WebGL elements should be isolatable so they don't block content rendering |
| JavaScript budget | Content must be accessible without JavaScript where possible. Core information should not depend on client-side rendering alone. |
| Animation isolation | Animations must not prevent content from being read or navigated |
| First Contentful Paint | Target: under 1.5 seconds on a fast 3G connection |
| Cumulative Layout Shift | Target: minimal — content should not jump as assets load |

### Performance Tiers

The architecture should support a tiered experience:

```
TIER 1 — FULL EXPERIENCE
  Canvas/WebGL, rich animations, generative graphics
  (modern desktop, fast connection, GPU capable)

TIER 2 — REDUCED MOTION
  No animations, static visual alternatives
  (user preference or accessibility need)

TIER 3 — LIGHTWEIGHT
  Minimal JavaScript, optimized images, no canvas
  (slow connection, older device, mobile data)

TIER 4 — NO JAVASCRIPT
  Static HTML content, basic styling
  (JavaScript disabled, crawler, screen reader)
```

Content must be accessible at all tiers.

---

## 24. Accessibility Requirements

### Architectural Standards

The portfolio must support accessibility as a first-class architectural concern, not a retrofit.

| Requirement | Description |
|---|---|
| Semantic HTML | Use appropriate HTML5 elements: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`, `<aside>` |
| Keyboard navigation | All interactive elements must be reachable and operable via keyboard |
| Screen reader compatibility | Content must be understandable when read by a screen reader |
| Focus states | Visible focus indicators on all interactive elements |
| Color contrast | Text must meet WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text) |
| Reduced motion | Respect `prefers-reduced-motion` — provide static alternatives for all animations |
| Skip links | "Skip to main content" link for keyboard users |
| Accessible navigation | Navigation menu must be keyboard-traversable with clear active states |
| Accessible images | All images must have meaningful `alt` text |
| Accessible forms | If contact form is added, labels, error messages, and states must be accessible |
| Accessible AI assistant | The Ask My Portfolio interface must support keyboard input, screen reader output, and not rely solely on visual cues |
| ARIA where needed | Use ARIA landmarks and labels when semantic HTML is insufficient (e.g., complex interactive widgets) |

### Animation and Accessibility

The visual experience must **not depend entirely on animation**. Every animated element must have a static fallback that communicates the same information.

```
ANIMATED STATE
  → communicates [meaning X]

STATIC FALLBACK
  → also communicates [meaning X] without motion
```

---

## 25. Technology Decisions to Make Later

The following decisions are **intentionally deferred**. They should be made in `BUILD-SPEC.md` after the architecture and design phases are complete.

### Frontend Framework

- **Next.js** (App Router) vs **Astro** vs **Remix** vs **SvelteKit** vs another framework?
- Static generation vs server-side rendering vs hybrid?
- Considerations: content-driven site favors static generation; AI chat requires server interaction

### Visual / Motion Technology

- **Canvas API** vs **WebGL** vs **Three.js** vs **p5.js** for generative graphics?
- **GSAP** vs **Framer Motion** vs **CSS animations** for motion?
- Performance implications of each approach on mobile?

### Content Management

- **MDX** files in repository vs **headless CMS** (Contentful, Sanity, Strapi) vs **flat JSON/YAML**?
- Considerations: small scale favors MDX; growth favors CMS; RAG favors structured data

### Content Storage

- Static content files vs database?
- If database, which one?
- Considerations: content/presentation separation is the requirement, format is flexible

### API Architecture

- Serverless functions vs dedicated API?
- Required for: Ask My Portfolio, potentially contact form
- Edge vs origin?

### RAG Architecture

- Vector database: Pinecone, Weaviate, Chroma, pgvector, other?
- Embedding model: OpenAI, Cohere, open-source?
- LLM: GPT-4, Claude, Gemini, open-source?
- Retrieval strategy: dense, sparse, hybrid, reranking?
- Chunking strategy?

### Search

- Client-side search (Fuse.js, Lunr) vs server-side?
- Separate from RAG or integrated?

### Analytics

- Privacy-respecting analytics: Plausible, Fathom, Umami?
- Event tracking for key user journeys?

### Deployment

- Vercel, Netlify, Cloudflare Pages, self-hosted?
- CI/CD pipeline?
- Preview deployments for content changes?

### Domain

- Custom domain?
- SSL?

---

## 26. Architectural Principles

These principles govern all decisions across the architecture and all downstream documents.

### 1. Content Before Decoration

The information must be valuable without any visual treatment. If the content is empty, no amount of animation or visual polish will save the portfolio.

### 2. Evidence Before Claims

Never state capability without supporting evidence. "AI Engineer" is supported by projects that demonstrate AI engineering. Skills are demonstrated through work, not listed as badges.

### 3. Projects Before Technologies

A visitor should first understand *what was built and why*, then discover *how*. The technology stack serves the project, not the other way around.

### 4. Problem → Solution → Trade-off → Outcome

Every project narrative follows this arc. Skip none of these stages. Trade-offs and lessons are what differentiate a thoughtful builder from a tutorial follower.

### 5. Thinking is a First-Class Part of the Brand

Thinking is not a secondary blog. It is as important as Work in communicating who Shubh is. The architecture treats Thinking with the same structural rigor as Work.

### 6. Experiments Can Remain Unfinished

Lab is a space for exploration. An experiment in "IDEA" or "EXPLORING" state is valid content. The ability to think publicly about unfinished work signals intellectual honesty.

### 7. The Portfolio Should Evolve Over Time

The architecture supports growth. New projects, articles, experiments, and journey events can be added without structural changes. The system scales with Shubh's career.

### 8. Content Must Be Reusable by the Future AI Assistant

Content is structured, metadata is consistent, relationships are explicit. The RAG system can index the same content the frontend renders without transformation.

### 9. Presentation Must Remain Independent from Content

Content can change without touching UI code. UI can change without touching content. They communicate through well-defined data structures, not tight coupling.

### 10. Motion Must Support Meaning

Every animation should communicate something — hierarchy, transition, state change, emphasis. Decorative-only motion is acceptable sparingly, but motion that confuses or distracts violates the architecture.

### 11. Visual Experimentation Must Not Compromise Usability

The portfolio may push visual boundaries, but content must remain readable, navigable, and accessible. A visitor on a slow connection or using a screen reader must still understand the portfolio.

### 12. Never Invent Achievements, Metrics, or Experience

If a metric, outcome, testimonial, or achievement is not real, it does not appear. The architecture does not include fields for fabricated social proof.

### 13. The Portfolio Should Demonstrate Systems Thinking Through Its Own Architecture

The way the portfolio is built — the content model, the knowledge relationships, the separation of concerns — is itself a demonstration of how Shubh thinks about systems.

---

## 27. Explicit Non-Goals

The following are **explicitly excluded** from this architecture phase:

| Non-Goal | Reason |
|---|---|
| UI design or components | Belongs in `DESIGN.md` |
| React/Svelte/framework components | Belongs in `BUILD-SPEC.md` |
| CSS framework selection (Tailwind, etc.) | Belongs in `BUILD-SPEC.md` |
| Animation library installation | Belongs in `BUILD-SPEC.md` |
| Canvas/WebGL/pixel effects | Belongs in `VISUAL-MOTION.md` |
| RAG implementation | Belongs in `RAG-SPEC.md` |
| Database creation | Belongs in `BUILD-SPEC.md` |
| API endpoint design | Belongs in `BUILD-SPEC.md` |
| Color palette selection | Belongs in `DESIGN.md` |
| Typography selection | Belongs in `DESIGN.md` |
| Final visual direction | Belongs in `DESIGN.md` |
| Invented project metrics | Violates Principle 12 |
| Invented achievements | Violates Principle 12 |
| Invented testimonials | Violates Principle 12 |
| Invented clients or users | Violates Principle 12 |
| Invented business results | Violates Principle 12 |
| Fake case study content | Violates Principle 12 |
| Polished page generation | Premature — architecture first |

---

## Appendix A: Document Dependency Chain

```
ARCHITECTURE.md (this document)
        │
        ├──→ DESIGN.md
        │    Visual system, typography, color, grid, component design,
        │    visual direction (Signal/Paper vs Information Field vs
        │    Blueprint/System)
        │
        ├──→ FLOW.md
        │    Interaction flows, page transitions, user journey
        │    micro-interactions
        │
        ├──→ VISUAL-MOTION.md
        │    Animation system, generative graphics, canvas/WebGL
        │    specifications, motion grammar
        │
        ├──→ CONTENT-MODEL.md
        │    Detailed content schemas, file format specifications,
        │    data validation rules, content authoring guide
        │
        └──→ BUILD-SPEC.md
             Technology stack, implementation plan, deployment,
             development workflow, testing strategy
```

Each downstream document inherits the principles and constraints defined here and must not contradict them.

---

*End of ARCHITECTURE.md — Version 1.0*
