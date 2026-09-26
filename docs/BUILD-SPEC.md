# BUILD-SPEC.md

## The Engineering Translation & Implementation Architecture
### Portfolio of Shubh Mehrotra — AI Product Builder, Systems Thinker & Engineer

**Document Status:** Source of Truth for Engineering Architecture  
**Version:** 1.0  
**Date:** 2026-09-26  
**Derived From:** `ARCHITECTURE.md`, `DESIGN.md`, `FLOW.md`, `CONTENT-MODEL.md`, `VISUAL-MOTION.md`  
**Governs:** Technology stack, rendering architecture, performance budgets, deployment, and phased implementation.

---

## 1. ENGINEERING PRINCIPLES

The engineering implementation must optimize for visual fidelity, performance, maintainability, and content portability, while strictly avoiding over-engineering. Technical decisions must be **reversible** to allow the portfolio to evolve organically.

> **CONTENT FIRST → PRESENTATION SECOND → INTERACTION THIRD → COMPUTATION ONLY WHERE IT ADDS MEANING**

**Core Tenets:**
- **No Premature Scaling:** We will not use a managed vector database, graph database, or microservices until the static/local alternative mathematically fails to perform.
- **Progressive Enhancement:** The site must function perfectly with JavaScript disabled, gracefully scaling up to full WebGL kinetics on capable devices.
- **Maintainable by a Builder:** The architecture must not become a maintenance burden that distracts from actual AI product building.

---

## 2. HIGH-LEVEL SYSTEM ARCHITECTURE

The portfolio is primarily a high-performance content engine with a sophisticated generative visual layer, backed by an optional AI retrieval service.

```text
┌──────────────────────────────────────────────────────────────┐
│                      BROWSER (CLIENT)                        │
│  ┌───────────────┐ ┌─────────────────┐ ┌──────────────────┐  │
│  │ A. PRESENTATION │ C. INTERACTION    │ D. GENERATIVE      │  │
│  │ (React/CSS)     │ (State/Motion)    │ (WebGL/Canvas/SVG) │  │
│  └───────▲───────┘ └────────▲────────┘ └────────▲─────────┘  │
└──────────│──────────────────│───────────────────│────────────┘
           │                  │                   │
┌──────────│──────────────────│───────────────────│────────────┐
│          ▼                  ▼                   ▼            │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ B. NEXT.JS APPLICATION (SERVER)                        │  │
│  │ Static Generation (SSG) / Server Components (RSC)      │  │
│  └──────────────────────────▲─────────────────────────────┘  │
│                             │                                │
│  ┌──────────────────────────▼─────────────────────────────┐  │
│  │ CONTENT LAYER (File System / MDX / YAML)               │  │
│  └──────────────────────────▲─────────────────────────────┘  │
└─────────────────────────────│────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────┐
│ E. OPTIONAL AI / RAG SERVICE (FastAPI / External)            │
│ Retrieval → Evidence Assembly → LLM Generation               │
└──────────────────────────────────────────────────────────────┘
```

- **A. Presentation:** React Server Components (RSC) parsing MDX to HTML.
- **B. Content:** A Git-backed repository of YAML/MDX adhering to `CONTENT-MODEL.md`.
- **C. Interaction:** Contextual Story/System toggles and Node Inspector HUDs.
- **D. Generative:** A highly decoupled rendering loop injecting the Field grammar.
- **E. AI/RAG Layer:** The `Ask My Portfolio` engine, loosely coupled via API.

---

## 3. FRONTEND STACK

We adopt a modern, minimal-dependency Next.js architecture. 

| Layer | Selection | Rationale | Replaces / Avoids |
|---|---|---|---|
| **Framework** | **Next.js (App Router)** | Best-in-class SSG/SSR, native React Server Components, optimal SEO and routing. | SPA React (Vite), which harms SEO and initial load. |
| **Language** | **TypeScript** | Type safety for the strict `CONTENT-MODEL.md` schemas. | Vanilla JS. |
| **Styling** | **Tailwind CSS + CSS Variables** | Utility-first speed with strict adherence to Design Tokens (colors, spacing). | Heavy runtime CSS-in-JS (Styled Components). |
| **Animation** | **Motion for React + GSAP** | **Motion for React** (`motion`) for UI logic (hover, presence, layout shifts). **GSAP** for cinematic sequences, continuous marquees, and SVG provenance traces. | Single-library constraints that fail at either layout or complex timelines. |
| **Generative** | **Raw WebGL / Canvas API** | Lightweight, direct control over shaders for the Field physics. | Three.js (overkill for a 2D dithered vector field, heavy bundle). |
| **State** | **React Context / Zustand** | Simple global state for Story/System mode, avoiding heavy boilerplate. | Redux (massive over-engineering). |
| **Content** | **MDX / Contentlayer** | Type-safe Markdown parsing with React component injection. | Heavy external Headless CMS. |

---

## 4. RENDERING ARCHITECTURE

**Progressive Enhancement Matrix:**

| Capability | Preferred Rendering | Fallback | Reason |
|---|---|---|---|
| **Text / Content** | HTML (RSC) | HTML | Content must be indexable and readable with JS disabled. |
| **Story/System Mode** | Framer Motion Layout | CSS Display Toggle | Ensures immediate data access regardless of JS state. |
| **Generative Field** | WebGL Shader | Canvas 2D / Static SVG | Fallback saves battery/CPU on low-end or mobile devices. |
| **Node Traces** | SVG Vector Lines | CSS Borders | Complex DOM-to-DOM traces require JS/SVG sync. |
| **Typography** | Web Fonts | System Fonts | Fallback ensures no FOUT/FOIT blocks reading. |

---

## 5. GENERATIVE FIELD IMPLEMENTATION

The Computational Field is **one reusable engine**, not six different components.

- **Architecture:** A single `<GenerativeSubstrate />` component mounted at the layout level, rendered via a custom WebGL fragment shader.
- **State Configuration:** The Next.js router passes the current route state to the shader via uniforms:
  - `Hero`: High entropy, cursor dipole uniform active.
  - `Work`: Grid snapping active, entropy approaches zero.
  - `Lab`: Scanline distortion uniform activated.
- **Text Exclusion:** Text bounding boxes (`getBoundingClientRect`) are passed to the shader as collision uniforms to repel particles, ensuring legibility.
- **Lifecycle:**
  - `IntersectionObserver` pauses the render loop when the canvas is off-screen.
  - `matchMedia('(prefers-reduced-motion: reduce)')` immediately freezes the `requestAnimationFrame` loop.

---

## 6. MOTION ARCHITECTURE

**The Triad Engine: Motion for React + GSAP + Canvas.**
To prevent animation systems from fighting, we enforce strict ownership boundaries:

1. **Motion for React (formerly Framer Motion):** 
   - **Ownership:** Interface intelligence. Declarative component interactions, presence (`<AnimatePresence>`), layout transitions (crucial for `Story <-> System` swaps), hover/focus states, and lightweight UI motion (`whileInView`).
   - **Package:** Installed as `motion` (imported from `motion/react`).
2. **GSAP (+ ScrollTrigger):** 
   - **Ownership:** Cinematic choreography. Imperative timeline sequences, continuous infinite marquees, complex scroll scrubbing, and SVG provenance path drawing. Uses `@gsap/react` `useGSAP()` for proper React cleanup.
3. **Canvas / WebGL:** 
   - **Ownership:** Computational atmosphere. The generative field rendering loop, completely decoupled from DOM state.

**Strict Rule:** No element should be simultaneously animated by Motion and GSAP. If GSAP owns an element's transform, Motion must not touch it. React owns the semantic state (e.g., `selectedProject = "agentforge"`); the animation engines own the visual interpolation.

**Animation Tokens (Constants):**
- `duration.fast`: `0.15s`
- `duration.base`: `0.25s`
- `duration.slow`: `0.4s`
- `easing.mechanical`: `cubic-bezier(0.05, 0.7, 0.1, 1.0)`

---

## 7. APPLICATION STATE

State is strictly delineated to prevent "global state soup":

- **Global State (Zustand/Context):**
  - `viewMode`: `STORY` | `SYSTEM` (Contextual, default Story).
  - `visualTier`: `WEBGL` | `CANVAS` | `STATIC` (Derived from capability checks).
- **Local UI State (useState):**
  - Node Inspector visibility (hover state).
  - Mobile menu toggle.
- **Server State (RSC):**
  - Content fetching (Projects, Articles, Evidence).
- **AI State (SWR/React Query):**
  - `Ask My Portfolio` query streaming, retrieval status.

---

## 8. CONTENT ARCHITECTURE

**Storage Strategy:** Git-backed local filesystem.
- **Format:** YAML frontmatter + MDX bodies.
- **Why:** Maximum portability, zero vendor lock-in, free version control, easily parsable by future RAG ingestion scripts.
- **Validation:** Zod schemas matching `CONTENT-MODEL.md` to guarantee structural integrity at build time.

*Migration Path:* If the content volume exceeds a few hundred entities, we will migrate to a local SQLite database or lightweight CMS, but not before.

---

## 9. KNOWLEDGE GRAPH / RELATIONSHIPS

**Implementation:** Content references via frontmatter IDs.
No graph database (Neo4j) will be used initially. 

- **Structure:** A Project MDX file contains `related_articles: ['article-retrieval-eval']`.
- **Build-Time Resolution:** A script parses all MDX files, validates that reference IDs exist (throwing a build error if a link is broken), and constructs a lightweight static JSON graph for the frontend to render the Node Inspector and Provenance Traces.

---

## 10. ASK MY PORTFOLIO (AI ARCHITECTURE)

**The AI retrieval pipeline is isolated.**

- **Architecture:** 
  `User Query → API Route → Embed Query → Retrieve Chunks → Rerank → Assemble Evidence → LLM Stream → UI`
- **Retrieval Engine (Phase 1):** Static/Local. Local embedding generation matching against a pre-computed JSON index or local SQLite + pgvector/sqlite-vss. No expensive Pinecone/Weaviate yet.
- **Generation Model:** OpenAI / Anthropic accessed via Vercel AI SDK.
- **Provenance:** The UI enforces strict citation mapping. The LLM must return structured data containing the specific `chunk_id`, which the frontend maps to the Evidence Panel.

---

## 11. BACKEND / API

**Phase 1 relies entirely on Next.js API Routes (Serverless).** No dedicated backend.

- `GET /api/health` - System telemetry.
- `POST /api/ask` - Handles the RAG query, returns a streamed `text/event-stream` and structured evidence array.

*Migration Path:* If local retrieval becomes too slow or we require heavy background indexing, we will spin up a dedicated **FastAPI** Python service (aligning with the builder's backend focus).

---

## 12. DATA / STORAGE

- **Canonical Content:** Git repository (GitHub).
- **Compiled Search/Vector Index:** Pre-computed during the CI/CD build step and stored statically, or a lightweight Turso (LibSQL) database.
- **Analytics:** Privacy-first (Plausible or Vercel Web Analytics). No invasive tracking.

---

## 13. SECURITY

- **Secrets:** LLM API keys remain strictly on the Server (Next.js API routes). NEVER exposed to the client.
- **Rate Limiting:** IP-based rate limiting (Upstash Redis or Vercel KV) on the `/api/ask` endpoint to prevent LLM billing abuse.
- **Prompt Injection:** The RAG system prompt strictly limits the persona. Queries unrelated to the portfolio are politely rejected.

---

## 14. PERFORMANCE BUDGETS

- **Initial Load (LCP):** `< 1.2s` (Achieved via SSG/RSC).
- **JavaScript Payload:** `< 150KB` gzipped (excluding generative canvas).
- **Generative Field Frame Rate:** Target `60 FPS`. Throttle to `30 FPS` on sustained load. Disable if `< 20 FPS`.
- **RAG TTFB (Time to First Byte):** `< 800ms`.

---

## 15. CAPABILITY DETECTION / FALLBACKS

**The Capability Ladder:**
1. **FULL:** WebGL fragment shader (Desktop, hardware acceleration enabled).
2. **REDUCED:** 2D Canvas / CSS representations (Tablet, mid-tier).
3. **STATIC:** SVG dither patterns (Mobile, Low Power Mode, `prefers-reduced-motion`).
4. **NO-JS:** HTML content only.

*Detection:* On initial load, a micro-benchmark (e.g., rendering a single complex frame) or Battery Status API checks determine the visual tier.

---

## 16. RESPONSIVE ARCHITECTURE

- **Desktop (1200px+):** Full 12-column architectural spreads, hover-driven Node Inspector.
- **Tablet (768px+):** 8-column layout. Story/System diagrams convert from complex SVG to simplified CSS flowcharts.
- **Mobile (<768px):** 4-column layout. Vertical stacking. Canvas becomes static. Node Inspector converts to tap-to-expand accordions to preserve touch targets.

---

## 17. ACCESSIBILITY

- **Semantic HTML:** `<article>`, `<section>`, `<nav>`, `<aside>` enforced.
- **Keyboard Parity:** Every hover-based Node Inspector must be fully triggerable via `Tab` + `Enter`. Focus outlines are sharp and highly visible (`--signal-amber`).
- **Screen Readers:** Story/System toggles use `aria-pressed` and announce changes via `aria-live` regions.

---

## 18. SEO / DISCOVERABILITY

- **Metadata:** Dynamic generation of `title`, `description`, and Open Graph images for every Project and Article.
- **Structured Data:** JSON-LD injected for Articles (BlogPosting) and Projects.
- **Routing:** Clean, predictable URLs (`/work/enterprise-rag`, `/thinking/evaluating-retrieval`).

---

## 19. ANALYTICS / OBSERVABILITY

- **Usage:** Privacy-first analytics (Vercel Analytics). Tracking page views and Story/System toggle usage to gauge audience technical depth.
- **Errors:** Sentry (free tier) to capture JS exceptions and RAG API failures.
- **RAG Telemetry:** Logging queries and retrieval confidence scores server-side to improve the chunking strategy over time.

---

## 20. TESTING STRATEGY

- **Unit Tests:** Vitest for utility functions (e.g., markdown parsing, chunking logic).
- **Integration Tests:** React Testing Library for the Node Inspector and Story/System toggle behaviors.
- **E2E:** Playwright for critical paths (Homepage -> Project -> Story/System toggle -> Ask My Portfolio query).
- **RAG Evaluation:** Manual/scripted evaluation against a ground-truth dataset of 20 expected questions to ensure zero hallucination.

---

## 21. DEPLOYMENT

- **Host:** Vercel (optimal for Next.js App Router and Edge APIs).
- **CI/CD:** GitHub Actions triggers Vercel deployment. Build step verifies MDX schema integrity.
- **Environment:** `production`, `preview` (for PRs), `development`.

---

## 22. REPOSITORY STRUCTURE

```text
/
├── app/                  # Next.js App Router pages and API routes
├── components/           # React components
│   ├── ui/               # Base design system (Buttons, Typography)
│   ├── layout/           # Header, Footer, Grids
│   └── visual/           # Story/System toggles, Node Inspector
├── content/              # The canonical data (MDX/YAML)
│   ├── projects/
│   ├── thinking/
│   └── ...
├── lib/                  # Utilities, types, Zod schemas, content parsers
├── shaders/              # GLSL fragment/vertex shaders for the Field
├── ai/                   # RAG logic, chunking, LLM prompts
└── public/               # Static assets, fonts, media
```

---

## 23. IMPLEMENTATION PHASES

**PHASE 0: Foundation**
- Next.js setup, Tailwind configuration, Design Tokens (colors, fonts).

**PHASE 1: Content-Driven Skeleton**
- Build Zod schemas, MDX parsing, basic routing for Home, Work, and Thinking. (No animation).

**PHASE 2: Visual Identity & Interaction**
- Implement Story/System toggle, layout shifts, Node Inspector logic.

**PHASE 3: Motion Engine**
- Framer Motion integration. Add the WebGL Generative Field layer and coordinate/fallback logic.

**PHASE 4: Refinement**
- Project, Lab, and Journey pages populated. Mobile optimization.

**PHASE 5: Ask My Portfolio (RAG)**
- Local embedding generation, Vercel AI SDK integration, Evidence Panel UI.

---

## 24. DECISION LOG

| Decision | Reason | Alternative | Trade-off / Reversibility |
|---|---|---|---|
| **Next.js App Router** | Native RSC aligns perfectly with content-heavy static sites. | Vite / Astro | Slower initial dev speed, but highly reversible to Astro if RSC becomes too complex. |
| **Motion for React + GSAP** | Clean separation: Motion for declarative UI layout, GSAP for imperative timelines. | Single Library | Trying to force GSAP to do layout transitions or Motion to do infinite marquees creates brittle code. |
| **Local MDX Content** | Zero operational overhead, perfect version control. | Sanity / Contentful | Harder for non-devs to edit, but author is a developer. Easily reversible to CMS later. |
| **Serverless API RAG** | Keeps infrastructure unified on Vercel for v1. | Python FastAPI | FastAPI allows better ML libraries. Reversible by repointing the frontend fetch URL. |
| **Raw WebGL Field** | High performance 2D shaders without library bloat. | Three.js | Harder to author shaders, but saves 150kb+ in bundle size. |

---

## 25. ENGINEERING ANTI-PATTERNS

**Strictly Prohibited:**
- Microservices for a portfolio.
- Using both Motion for React *and* GSAP to animate the same CSS property simultaneously.
- Storing static portfolio data in a global Redux store.
- Spinning up a dedicated Pinecone/Qdrant cluster before local SQLite vector search is exhausted.
- Using Three.js when a 2D fragment shader suffices.
- Hardcoding content facts inside React components (violates `CONTENT-MODEL.md`).
- Client-side LLM calls containing API keys.

---

## 26. FINAL ARCHITECTURE DECISION

**The Recommended Stack:**

```text
Browser
  ↓
Next.js (App Router, RSC, Tailwind, Motion for React, GSAP)
  ↓
Content System (MDX + Zod Validation)
  ↓
Visual Engine (Raw WebGL + capability fallbacks)
  ↓
Serverless API Layer (Next.js API Routes)
  ↓
Retrieval (Local Vector Index) + LLM (Vercel AI SDK)
```

### Final Reporting

**10 Major Engineering Decisions:**
1. Next.js App Router with React Server Components for maximum content SEO and performance.
2. Local MDX/YAML filesystem storage instead of a headless CMS.
3. Strict animation ownership: Motion for React (UI/layout), GSAP (cinematics/marquees), WebGL (atmosphere).
4. Raw WebGL shaders for the Generative Field instead of heavy libraries like Three.js.
5. Strict 3-tier capability fallback (WebGL -> Canvas -> Static) for graphics, unified under `prefers-reduced-motion`.
6. Story/System toggle handled via React state driving Motion `<AnimatePresence>` layout animations.
7. Relationships (Knowledge Graph) resolved statically at build time, no Graph DB.
8. RAG Retrieval initially handled locally/in-memory before upgrading to external vector DBs.
9. Vercel AI SDK for model-agnostic text streaming and evidence mapping.
10. Sentry and Vercel Analytics for privacy-first observability.

**5 Highest-Risk Technical Decisions:**
1. Managing the WebGL canvas lifecycle and text-bounding-box deflection efficiently in React.
2. Orchestrating seamless layout animations (Story/System) on complex SVG/DOM architecture trees.
3. Ensuring the static build-time relation resolution doesn't become exponentially slow as content grows.
4. Latency of Serverless API cold starts affecting the "Ask My Portfolio" TTFB.
5. Accurate detection of device capability to trigger WebGL fallbacks without false positives.

**5 Decisions Intentionally Deferred:**
1. Selection of a production Vector Database (Pinecone, Qdrant).
2. Selection of a dedicated backend framework (FastAPI).
3. Implementation of user analytics beyond basic page views.
4. Migration to a Headless CMS.
5. Complex user authentication or admin dashboards.

**5 Things That Should NOT Be Built in v1:**
1. User accounts or login systems.
2. Dedicated Python microservices.
3. 3D models or heavy asset loading.
4. Real-time websocket telemetry.
5. A complex CI/CD pipeline beyond Vercel's default GitHub integration.

**Exact Recommended Implementation Order:**
`PHASE 0 (Setup)` → `PHASE 1 (Content/MDX)` → `PHASE 2 (UI/Story-System)` → `PHASE 3 (Motion/WebGL)` → `PHASE 4 (Pages)` → `PHASE 5 (RAG/Ask)`
