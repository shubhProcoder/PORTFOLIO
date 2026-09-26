# IMPLEMENTATION-CONTRACT.md

## The V1 Implementation Contract: Homepage & System Shell
### Portfolio of Shubh Mehrotra — AI Product Builder, Systems Thinker & Engineer

**Document Status:** Source of Truth for V1 Implementation  
**Version:** 1.0  
**Date:** 2026-09-26  
**Derived From:** `ARCHITECTURE.md`, `DESIGN.md`, `FLOW.md`, `CONTENT-MODEL.md`, `VISUAL-MOTION.md`, `BUILD-SPEC.md`  
**Purpose:** Bridge the architectural and design specification into an exact, binding engineering contract for the first implementation slice.

---

> ### CORE DIRECTIVE
> **Do NOT redesign anything.**  
> **Do NOT create a new visual direction.**  
> **Do NOT write application code in this step.**  
> This contract governs the exact scope, component tree, data schemas, visual ownership, responsive rules, performance thresholds, and acceptance tests for the **V1 Homepage**.

---

## 1. V1 OBJECTIVE

### 1.1 Objective Statement
Build a visually exceptional, production-grade homepage that establishes **Shubh Mehrotra** as an AI/product builder, systems thinker, and engineer, while demonstrating the portfolio's distinctive **editorial + computational visual language** (the synthesis of dark computational kinetics, structured architectural typography, and honest technical depth).

### 1.2 Success Criteria
V1 is successful if and only if all seven of the following conditions are satisfied:
1. **Identity is Immediately Clear:** Within 5 seconds, any visitor understands who Shubh Mehrotra is (AI Product Builder, CS/Data Science student @ Rishihood University), his technical focus (hybrid RAG, agent reliability, product engineering), and his aesthetic execution bar.
2. **Visual System is Distinctive:** The page creates a memorable aesthetic impression through its 3-layer parallax hero (deep atmospheric field + infinite outline name marquee + high-contrast typographic statement), mathematical hairlines, and curated dark/bone design tokens.
3. **Four Core Pillars Communicated:** The homepage communicates:
   - **Building** (Selected Work: real architectures, real systems)
   - **Thinking** (Articles: technical reasoning and trade-off analysis)
   - **Experimenting** (Lab: hypotheses, iterations, and honest failure modes)
   - **Evolution** (Journey & Now: chronological trajectory and current focus vector)
4. **Mobile Works Flawlessly:** Mobile is designed as an ergonomic, high-density touch experience—not a squished desktop layout. Heavy WebGL gracefully steps down to static vector dither, and touch targets meet 44px standards.
5. **Motion is Purposeful & Tripartite:** Motion reveals structure, signals system liveness, and rewards attention. Motion for React, GSAP, and Canvas/WebGL operate under strict, non-overlapping ownership boundaries.
6. **Real Content Grounding:** Every name, project, role, technology, and status is grounded in verified sources (`CONTENT-MODEL.md`). Zero invented metrics, zero fake telemetry, zero synthetic company names.
7. **Clean Engineering Architecture:** Next.js App Router, React Server Components (RSC), Tailwind CSS with CSS Variables, strict Zod content validation, and clean separation between data and presentation.

---

## 2. HOMEPAGE STRUCTURE

The V1 homepage renders an intentional, vertical narrative sequence of increasing depth:

```text
┌────────────────────────────────────────────────────────┐
│ 1. NAVIGATION (Sticky, Technical Header)               │
├────────────────────────────────────────────────────────┤
│ 2. HERO (3-Layer Parallax: Field + Marquee + Manifesto)│
├────────────────────────────────────────────────────────┤
│ ✳ SECTION DIVIDER MARQUEE (Taxonomy Stream)            │
├────────────────────────────────────────────────────────┤
│ 3. SELECTED WORK (Architectural Spreads)               │
├────────────────────────────────────────────────────────┤
│ ✳ SECTION DIVIDER MARQUEE (Taxonomy Stream)            │
├────────────────────────────────────────────────────────┤
│ 4. THINKING (Editorial Publication Grid)               │
├────────────────────────────────────────────────────────┤
│ 5. LAB (Computational Workbench & Failure Log)         │
├────────────────────────────────────────────────────────┤
│ 6. JOURNEY (Topological Evolution Stream)              │
├────────────────────────────────────────────────────────┤
│ 7. NOW (Current Bandwidth & Live Vector)               │
├────────────────────────────────────────────────────────┤
│ 8. FOOTER (System Colophon & Direct Channels)          │
└────────────────────────────────────────────────────────┘
```

Below is the definitive contract for each section.

---

### 2.1 Navigation

| Attribute | Specification |
|---|---|
| **Purpose** | Provide persistent orientation, section jumping, quick access to external channels, and resume link. |
| **Content Source** | `content/person/shubh.yaml` (name, status, links). |
| **Layout** | Fixed/sticky top bar (`h-14` / `56px`), full-width with max-width container (`1440px`), 12-column grid alignment. Left: Identity monomark (`SHUBH MEHROTRA // SYSTEM`). Center: Anchor links (`Work`, `Thinking`, `Lab`, `Journey`, `Now`). Right: Status pill (`[ACTIVE // RISHIHOOD]`) + Resume/Contact CTA. |
| **Visual Treatment** | Glassmorphic surface: `--inverse-ground` at 80% opacity with `backdrop-blur-md` and 0.5px hairline border bottom (`--inverse-border`). Monospace typography (`--type-micro-mono`). |
| **Motion** | CSS transition on scroll: compacts from 64px to 52px height after 80px scroll. Active link highlights smoothly via Motion for React layout indicator. |
| **Responsive Behavior** | **Desktop (1200px+):** Full horizontal bar with all links visible. <br>**Tablet (768–1199px):** Status pill hides; links remain visible. <br>**Mobile (<768px):** Collapses to Identity monomark + Status indicator + Minimalist geometric menu trigger (`[MENU]`). Menu opens full-screen overlay with rapid geometric wipe. |
| **Interaction** | Hovering links triggers `--signal-cobalt` color shift. Keyboard `Tab` focuses with sharp 2px `--signal-cobalt` ring. |
| **Fallback** | Static HTML sticky header with standard anchor tags. Fully functional with JavaScript disabled. |

---

### 2.2 Hero

| Attribute | Specification |
|---|---|
| **Purpose** | Establish the builder's philosophical stance, aesthetic high-water mark, and primary technical identity within the first 5 seconds. |
| **Content Source** | `content/person/shubh.yaml` (`name`, `role`, `manifesto`, `bio_short`, `primary_focus`, `location`, `timezone`). |
| **Layout** | Full viewport height (`min-h-[90vh]` to `100vh`), relative framing. Layer 0: Fullscreen canvas. Layer 1: Vertically centered horizontal marquee band. Layer 2: 12-column container with headline statement spanning columns 1–10, status block in columns 1–4, and CTA actions in columns 5–8. |
| **Visual Treatment** | Deep dark canvas (`--inverse-ground` `#11100F`). Giant display headline in Instrument Serif / Grotesk (`clamp(3.5rem, 8vw, 7.5rem)`). Marquee set in massive outlined glyphs (`-webkit-text-stroke: 1px rgba(244, 241, 236, 0.12)`). Subdued metadata in technical monospace (`11px`). |
| **Motion** | 3-Layer Parallax: Layer 0 runs continuous ambient shader drift with mouse dipole reaction. Layer 1 scrolls continuously left-to-right (GSAP timeline, 45s loop). Layer 2 scrolls at standard rate with subtle ScrollTrigger scrub against Layer 1. Text reveal via mask fade. |
| **Responsive Behavior** | **Desktop:** 3-layer parallax active, mouse dipole physics enabled. <br>**Tablet:** Dipole disabled; marquee opacity lowered to 8%; typography scaled down (`clamp(2.5rem, 6vw, 4.5rem)`). <br>**Mobile:** Layer 0 canvas steps down to lightweight 2D gradient/dither or static SVG. Marquee runs at reduced speed or pauses as single high-impact outline watermark. Stack layout becomes pure vertical single-column. |
| **Interaction** | Mouse movement perturbs generative field. Primary CTA ("Explore Systems") triggers smooth scroll to `#work`. Secondary CTA ("Read Observations") jumps to `#thinking`. |
| **Fallback** | Pure static HTML/CSS layout. Foreground text high-contrast off-white over deep charcoal background. Completely readable without JS or WebGL. |

---

### 2.3 Section Divider Marquee (Taxonomy Stream)

| Attribute | Specification |
|---|---|
| **Purpose** | Visually demarcate major narrative blocks while continuously communicating real technical taxonomy from `CONTENT-MODEL.md`. |
| **Content Source** | `content/technologies/taxonomy.yaml` & `content/themes/narrative_themes.yaml` (`HYBRID RAG`, `AGENT RELIABILITY`, `RECIPROCAL RANK FUSION`, `FASTAPI`, `LLAMAINDEX`, `NEXT.JS`, `SYSTEM DESIGN`, `EVIDENCE RETRIEVAL`). |
| **Layout** | Full bleed horizontal strip (`h-10` / `40px`), pinned between major sections. Top and bottom bordered by 0.5px hairline (`--surface-border-subtle`). |
| **Visual Treatment** | Surface: `--surface-recessed` / `--inverse-surface`. Text: Monospace (`--type-telemetry-mono`), uppercase, letter-spaced (`0.12em`), muted tone (`--ink-tertiary`), punctuated by crisp accent glyphs (`✳`, `//`). |
| **Motion** | Seamless infinite horizontal scroll powered by GSAP (`xPercent: -50`, linear ease, continuous looping). Direction alternates between odd and even section dividers. |
| **Responsive Behavior** | Maintained across all viewports. Motion speed slowed on mobile to reduce rendering cost and distraction. |
| **Interaction** | Hover pauses the marquee loop slightly (`timeScale: 0.2`) to allow inspection of taxonomy terms. |
| **Fallback** | CSS `@keyframes` marquee animation or static overflow-hidden text list. |

---

### 2.4 Selected Work (Architectural Spreads)

| Attribute | Specification |
|---|---|
| **Purpose** | Provide incontrovertible proof of building through deep architectural previews of top projects. |
| **Content Source** | `content/projects/*.yaml` (filtered by `featured: true`): <br>1. `project-enterprise-hybrid-rag` <br>2. `project-daily-sahayak` <br>3. `project-agentforge` <br>4. `project-geointel-ai` |
| **Layout** | 12-column architectural spread per project (alternating layout or stack). 7 columns for interactive schematic / UI preview canvas; 5 columns for project specification (Title, Tagline, Problem, Architecture Highlights, Stack Badges, Action Links). |
| **Visual Treatment** | Sharp card perimeter with 0.5px border (`--surface-border-strong`). Technical header block (`01 // PRODUCTION SYSTEM`, status badge `[COMPLETED]` or `[IN_PROGRESS]`). Monospace metadata paired with crisp serif project titles. |
| **Motion** | Scroll-triggered entrance: Cards rise 24px with high-damping mechanical ease (`duration: 0.35s`, staggered by 80ms). Hovering the card triggers subtle 1px border illumination (`--signal-cobalt`). |
| **Responsive Behavior** | **Desktop:** 7/5 column horizontal split with side-by-side architecture preview. <br>**Tablet:** 12-column stack: architecture diagram on top, specifications below. <br>**Mobile:** Single-column vertical stack; architecture diagram simplifies to high-contrast static flowchart SVG; stack tags collapse to 2-line wrap. |
| **Interaction** | Clicking "Inspect Architecture" triggers preview modal or deep-link to `/work/[slug]`. Hovering stack badges highlights related nodes. |
| **Fallback** | Clean semantic `<article>` tags with static SVG architecture block and plain text problem/outcome statements. |

---

### 2.5 Thinking (Editorial Publication Grid)

| Attribute | Specification |
|---|---|
| **Purpose** | Demonstrate intellectual rigor, reasoning capability, and how Shubh analyzes engineering trade-offs. |
| **Content Source** | `content/thinking/*.yaml` (seed articles: "Evaluating Retrieval in Real-World RAG", "The Mechanics of Daily Planning"). |
| **Layout** | 12-column asymmetric publication grid. Left 4 columns: Section manifesto and RSS/subscribe anchor. Right 8 columns: 2-column or list-format article preview cards with dates, read times, deks, and thematic tags. |
| **Visual Treatment** | Editorial feel: unbleached paper surface (`--surface-ground`), high-contrast dark ink (`--ink-primary`). Serif titles (`--type-heading-2`) paired with monospace dates and reading metadata. |
| **Motion** | Minimal motion. No scroll-jacking. Gentle opacity cross-fade on hover with a 2px horizontal nudge on the arrow glyph (`→`). |
| **Responsive Behavior** | **Desktop:** 4/8 column split. <br>**Tablet/Mobile:** Collapses into a clean, single-column vertical list with distinct hairline dividers between articles. |
| **Interaction** | Entire card is keyboard accessible. Click links directly to the article preview/detail. |
| **Fallback** | Plain semantic unordered list (`<ul>`) with standard `<a>` links. |

---

### 2.6 Lab (Computational Workbench & Failure Log)

| Attribute | Specification |
|---|---|
| **Purpose** | Highlight engineering velocity, curious prototyping, and learning through failure. Proves Shubh builds at the frontier. |
| **Content Source** | `content/lab/*.yaml` (seed experiments: Exp-01 RRF vs Weighted Score Fusion `[VALIDATED]`, Exp-02 Local Embedding Latency `[FAILED / REVISED]`). |
| **Layout** | 3-column modular workbench grid (desktop), each module styled as an active bench testing unit with hypothesis, live state, metrics, and failure learnings. |
| **Visual Treatment** | Terminal/laboratory dark surface (`--inverse-surface` `#1A1918`). Monospace dominant (`--type-telemetry-mono`). Status signals: `--signal-lime` for `[VALIDATED]`, `--signal-crimson` for `[FAILED]`, `--signal-ember` for `[ACTIVE]`. Subtle scanline background texture. |
| **Motion** | Metastable status indicators: subtle 150ms character-scramble on hover. `[FAILED]` cards exhibit rare, restrained CSS scanline glitch (never exceeding 2Hz). |
| **Responsive Behavior** | **Desktop:** 3 columns. <br>**Tablet:** 2 columns. <br>**Mobile:** Single-column swipeable cards or vertical stack. Glitch effects completely disabled on touch screens. |
| **Interaction** | Clicking experiment opens telemetry drawer or expands test notes. Keyboard navigable with Tab. |
| **Fallback** | High-contrast static table or cards with semantic text statuses (`VALIDATED`, `FAILED`). |

---

### 2.7 Journey (Topological Evolution Stream)

| Attribute | Specification |
|---|---|
| **Purpose** | Present a causal timeline of growth, education, hackathons, and experience without turning into a sterile resume. |
| **Content Source** | `content/journey/*.yaml` (B.Tech Rishihood University, Groto internship, Smart India Hackathon internal round). |
| **Layout** | Vertical causal timeline with a central hairline spine (`--surface-border-strong`). Milestone nodes branch left and right with date, organization, role, and key inflection points ("What Changed"). |
| **Visual Treatment** | Node markers styled as crisp diamond or circular geometric anchors. Monospace time anchors (`2023`, `2024`, `PRESENT`) with narrative descriptions in crisp body type. |
| **Motion** | Timeline spine draws downward on scroll via GSAP ScrollTrigger SVG path animation. Nodes illuminate as they enter the viewport threshold. |
| **Responsive Behavior** | **Desktop:** Alternating left/right timeline branches. <br>**Tablet/Mobile:** Single-sided vertical timeline (spine runs down the left edge at `left-4`, content offsets to `pl-10`). |
| **Interaction** | Hovering a milestone highlights connected skills and projects (e.g., SIH node highlights GeoIntel AI). |
| **Fallback** | Pure semantic ordered list (`<ol>`) with left border CSS styling. |

---

### 2.8 Now (Current Vector & Bandwidth)

| Attribute | Specification |
|---|---|
| **Purpose** | Show what Shubh is building, reading, and learning *right now*. Prevents the portfolio from feeling stale. |
| **Content Source** | `content/now/now.yaml` (`last_updated`, `current_build`, `current_learning`, `current_reading`, `bandwidth_allocation`). |
| **Layout** | 12-column framed status terminal. 4 columns for bandwidth allocation breakdown; 8 columns for narrative paragraphs detailing active technical vectors. |
| **Visual Treatment** | Elevated card surface with pulsing live telemetry dot (`--signal-lime`). Hairline internal dividers. Monospace bulleted headers (`BUILDING //`, `LEARNING //`, `QUESTION //`). |
| **Motion** | Gentle, organic pulsing ring around the live status dot (CSS `@keyframes pulse`, 2.5s period). Content fades in cleanly. |
| **Responsive Behavior** | **Desktop:** 4/8 column split. <br>**Tablet/Mobile:** Vertical stack: live indicator on top, bandwidth bars middle, narrative points below. |
| **Interaction** | Links within now items lead to active GitHub repos or referenced papers. |
| **Fallback** | Plain static card with textual "Last Updated" timestamp. |

---

### 2.9 Footer (Colophon & System Perimeter)

| Attribute | Specification |
|---|---|
| **Purpose** | Provide definitive closure, accessibility statement, technology colophon, and direct communication channels. |
| **Content Source** | `content/person/shubh.yaml` (social links, email, copyright, colophon data). |
| **Layout** | 12-column architectural footer. Left: Big editorial sign-off ("LET'S BUILD TOGETHER"). Center: Navigation links + Colophon ("BUILT WITH NEXT.JS, MOTION, GSAP & TAILWIND"). Right: Timezone indicator (`IST / NEW DELHI`), Direct channels (GitHub, LinkedIn, Email, X). |
| **Visual Treatment** | Dark ground (`--inverse-ground`), top hairline border (`--inverse-border`). High-contrast typography with muted secondary legal lines. |
| **Motion** | Static. No unnecessary scroll animations on the footer to keep interaction immediate. |
| **Responsive Behavior** | **Desktop:** 4-column balanced distribution. <br>**Tablet/Mobile:** Stacked vertical layout with direct tap targets (`min-h-[48px]`) for email and social links. |
| **Interaction** | Direct mailto and external links with `target="_blank"` and `rel="noopener noreferrer"`. |
| **Fallback** | Pure semantic `<footer>` HTML element. |

---

## 3. HERO CONTRACT

The Hero section is the highest-leverage visual component of V1. It must execute the 3-layer parallax system flawlessly while strictly honoring the truth-in-content rules.

```text
┌────────────────────────────────────────────────────────────────────────┐
│ HERO 3-LAYER ARCHITECTURE                                              │
│                                                                        │
│ LAYER 0: Canvas / WebGL Generative Substrate (Z-Index: 0)              │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ • Slow-breathing charcoal/navy gradient substrate                  │ │
│ │ • Atkinson dither / particle field with cursor dipole reaction     │ │
│ │ • Repulsion uniform clearing negative space behind text            │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│ LAYER 1: Infinite Identity Marquee Band (Z-Index: 1)                   │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ • Giant outline typography: "SHUBH MEHROTRA ✳ AI PRODUCT BUILDER"   │ │
│ │ • Continuous left-to-right GSAP marquee at 12% opacity             │ │
│ │ • Parallaxes subtly against foreground scroll                      │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│ LAYER 2: Foreground Operational UI & Manifesto (Z-Index: 2)           │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ [METADATA BAR: STATUS // TIMEZONE // CURRENT EXPLORATION]           │ │
│ │                                                                    │ │
│ │ PRIMARY MANIFESTO STATEMENT (Instrument Serif / Display Grotesk):  │ │
│ │ "I BUILD SYSTEMS FOR THINGS THAT DON'T EXIST YET."                 │ │
│ │                                                                    │ │
│ │ SUPPORTING DESCRIPTOR:                                              │ │
│ │ AI Product Builder & Software Engineer synthesizing hybrid RAG,    │ │
│ │ agent reliability harnesses, and high-velocity product execution.  │ │
│ │                                                                    │ │
│ │ ACTION CLUSTER:                                                    │ │
│ │ [EXPLORE SELECTED SYSTEMS ↓]   [READ OBSERVATIONS →]   [GITHUB ↗]   │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Content Binding from `CONTENT-MODEL.md`

| Hero Element | Data Source Binding | Permitted Content | Strictly Prohibited Content |
|---|---|---|---|
| **Identity Name** | `person.yaml: name` | `Shubh Mehrotra` | Nicknames or invented pseudonyms |
| **Primary Title** | `person.yaml: title` | `AI Product Builder & Software Engineer` | "10x Engineer", "AI Visionary" |
| **Manifesto Copy** | `person.yaml: manifesto` | `I BUILD SYSTEMS FOR THINGS THAT DON'T EXIST YET.` | Unvalidated marketing slogans |
| **Supporting Bio** | `person.yaml: bio_short` | Verified statement of current education (Rishihood University) + focus on hybrid RAG, reliable agent execution, and full-stack software systems. | Fabricated company claims or inflated client numbers |
| **Status Element** | `person.yaml: status` | `BUILDING & STUDYING // RISHIHOOD UNIVERSITY` | Fake server uptime, fake CPU ping |
| **Location / Time** | `person.yaml: location` & `timezone` | `NEW DELHI / NCR [UTC+5:30]` | Fake GPS satellite coordinates (e.g. `26.8467° N`) |
| **Current Vector** | `now.yaml: current_build` | `Multi-agent RAG routing & evaluation harnesses` | Fake random git hashes (e.g. `0x7f4a...`) |
| **Primary CTA** | Static UI Navigation | `Explore Selected Systems` (Scrolls to `#work`) | "Hire Me Now" or misleading links |
| **Secondary CTA** | Static UI Navigation | `Read Thinking` (Scrolls to `#thinking`) or `GitHub` | Inaccessible external destinations |

### 3.2 Strict Anti-Hallucination Telemetry Rule
The hero perimeter must **never** render:
- Fake server latency (e.g. `12ms`, `0.04ms`)
- Fake live network bandwidth or ping
- Random cryptographic or git hashes
- Invented latitude/longitude coordinates
- Fake memory allocations or CPU percentages
- Simulated live visitor counters

All displayed metadata must be directly tied to human-authored fields in `content/person/shubh.yaml` or `content/now/now.yaml`.

---

## 4. VISUAL IMPLEMENTATION CONTRACT

To guarantee that animation systems do not collide or degrade performance, every visual property is mapped to an exclusive implementation owner.

### 4.1 Implementation Ownership Matrix

| Visual Effect / System | Sole Implementation Owner | Mechanism / API | Strictly Forbidden |
|---|---|---|---|
| **Base Typography & Colors** | **CSS / Tailwind** | CSS custom properties, utility classes | Setting font sizes or colors in JS animation frames |
| **Page Layout & Grids** | **CSS Grid & Flexbox** | Standard Tailwind grid utilities | Layout calculation inside JavaScript |
| **Generative Atmospheric Field** | **Raw WebGL / Canvas API** | Custom fragment shader, WebGL 2.0 / Canvas 2D fallback | Three.js, React Three Fiber, animating DOM nodes |
| **Mouse Dipole Physics** | **Canvas Shader Uniforms** | `u_mouse` uniform updated in `requestAnimationFrame` | React `useState` updates on pointer move |
| **Text Repulsion Boundary** | **Canvas Shader Uniforms** | Bounding box rect uniform `u_text_bounds` | Canvas drawing over text without masking |
| **Infinite Name Marquee** | **GSAP** | GSAP timeline with `xPercent: -50`, continuous loop | Motion for React animating the marquee strip |
| **Section Divider Marquees** | **GSAP** | GSAP continuous linear loop | CSS keyframe marquee fighting GSAP |
| **Hero Parallax Scrubbing** | **GSAP + ScrollTrigger** | `gsap.to(layer, { scrollTrigger: { scrub: true } })` | Mixing Motion `useScroll` on the same elements |
| **Section Scroll Reveals** | **Motion for React** | `<motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} />` | GSAP ScrollTrigger animating the same card container |
| **Interactive Hover / Tap** | **Motion for React** | `whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}` | GSAP event listeners on buttons |
| **Story / System Representation Swaps** | **Motion for React** | `<AnimatePresence mode="wait">` + layout transitions | Direct DOM style manipulation |
| **Status Scanline Glitch (Lab)** | **CSS Keyframes** | Scoped CSS `@keyframes glitch` with `clip-path` | JavaScript-driven per-frame layout recalculation |
| **Timeline SVG Path Draw** | **GSAP + ScrollTrigger** | `drawSVG` or `strokeDashoffset` tween | CSS animation without scroll synchronization |
| **Semantic Content & Structure** | **Semantic HTML (RSC)** | `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` | Div-only structures, non-semantic tags |

### 4.2 The Golden Rule of Motion Coordination
> **No DOM element may have its transform, opacity, or position owned by more than one engine.**  
> - If GSAP controls an element's `x` or `y` coordinate (e.g. Hero Marquee or Parallax Layer), Motion for React must **never** wrap or attach motion props to that same element.  
> - If Motion for React manages enter/exit layout animations, GSAP must **never** target that selector.  
> - The WebGL canvas runs entirely in its own off-screen or background layer and never touches DOM layout properties.

---

## 5. CONTENT CONTRACT

V1 must be populated exclusively with verified, real-world information derived from the builder's actual record (GitHub: `shubhProcoder`, LinkedIn: `shubh-mehrotra-m2823`, and existing portfolio artifacts).

### 5.1 Seed Content Inventory

```text
PERSON (content/person/shubh.yaml)
├── Name: Shubh Mehrotra
├── Title: AI Product Builder & Software Engineer
├── Education: B.Tech in Computer Science & Data Science, Rishihood University (Ongoing)
├── Primary Focus: Hybrid RAG architectures, Agentic AI reliability, Product Engineering
└── Channels: GitHub (shubhProcoder), LinkedIn (shubh-mehrotra-m2823), Email

PROJECTS (content/projects/*.yaml)
├── 1. Enterprise Knowledge Assistant — Hybrid RAG System
│   ├── Status: COMPLETED
│   ├── Type: AI_SYSTEM
│   ├── Stack: LlamaIndex, ChromaDB, FastAPI, React, TypeScript, Python
│   ├── Core Features: BM25 + dense retrieval, Reciprocal Rank Fusion, BGE reranker, PyMuPDF OCR fallback, MD5 caching
│   └── Evidence: GitHub repo, LinkedIn architecture documentation
├── 2. Daily Sahayak
│   ├── Status: IN_PROGRESS
│   ├── Type: PRODUCT
│   ├── Stack: Next.js, TypeScript, Tailwind CSS
│   ├── Core Features: Priority scoring, urgency/importance weighting, schedule generator, calendar conflict resolution, adaptive planning
│   └── Evidence: GitHub repository (shubhProcoder/Daily-Sahayak)
├── 3. AgentForge
│   ├── Status: IN_PROGRESS
│   ├── Type: AI_RELIABILITY_EVALUATION
│   ├── Stack: Python, Pytest, FastAPI, Docker
│   ├── Core Features: Agent runtime, sandboxed tool execution, idempotency verification, structured evaluation traces
│   └── Evidence: System specification and testing harnesses
└── 4. GeoIntel AI
    ├── Status: COMPLETED
    ├── Type: HACKATHON_TEAM_PROJECT
    ├── Context: Smart India Hackathon (SIH) Internal Round (Top 65 / 111 teams)
    ├── Stack: Gemini API, Pinecone, OCR, Python, Streamlit
    ├── Core Features: Geological document intelligence, RAG vector retrieval, traceable mining report analysis
    └── Evidence: SIH competition submission records

THINKING (content/thinking/*.yaml)
├── 1. "Evaluating Retrieval in Real-World RAG: Beyond Toy Benchmarks"
│   ├── Topic: Failures of naive top-k semantic search, benefits of RRF, latency vs accuracy trade-offs
│   └── Status: PUBLISHED
└── 2. "The Mechanics of Daily Planning: Turning Intent into Execution"
    ├── Topic: Why algorithmic planning systems fail in real life; friction, task splitting, and adaptive replanning
    └── Status: PUBLISHED

LAB (content/lab/*.yaml)
├── 1. EXP-01: Reciprocal Rank Fusion vs Weighted Score Fusion
│   ├── Hypothesis: RRF provides more stable retrieval rank orders across diverse PDF schemas without score normalization drift.
│   ├── Status: VALIDATED
│   └── Learning: Normalizing dense cosine similarity and sparse BM25 scores introduces threshold instability; RRF rank-based blending eliminates score divergence.
└── 2. EXP-02: Local Embedding Latency under Memory Constraints
    ├── Hypothesis: Running a quantized small-embedding model locally reduces TTFB compared to external API calls for small chunks.
    ├── Status: REVISED / FAILED
    └── Learning: CPU inference spikes under burst requests caused memory contention; hybrid local cache + batched external API proved superior.

JOURNEY (content/journey/*.yaml)
├── 2023–Present: B.Tech Computer Science & Data Science @ Rishihood University
├── 2024: Software Engineering & AI Intern @ Groto
└── 2024: SIH Hackathon Internal Round Finalist (GeoIntel AI)

NOW (content/now/now.yaml)
├── Last Updated: 2026-09
├── Current Build: Agent reliability evaluation harnesses & Daily Sahayak adaptive engine
├── Current Learning: Multi-agent consensus protocols and failure recovery patterns
└── Current Question: Where does RAG end and fine-tuning or long-context reasoning become necessary?
```

### 5.2 Content Integrity Mandate
- **Zero Manufactured Metrics:** Do NOT invent "+45% throughput", "served 100k users", or "$10k ARR" unless backed by a verifiable deployment record.
- **Explicit Role Delineation:** GeoIntel AI must be explicitly labeled as a hackathon team project; personal contributions (OCR pipeline & RAG retrieval) must be explicitly stated.
- **Truthful Status Labels:** Projects in progress (`Daily Sahayak`, `AgentForge`) must wear `[IN_PROGRESS]`; never present unfinished work as deployed enterprise software.

---

## 6. RESPONSIVE CONTRACT

Mobile is not a collapsed desktop layout. It is an independent, ergonomically tuned touch layout.

### 6.1 Viewport Transformation Matrix

| Component | Desktop (1200px+) | Tablet (768px – 1199px) | Mobile (<768px) |
|---|---|---|---|
| **Layout Grid** | 12 columns, 24px gutter, 1440px max-width | 8 columns, 16px gutter, full width with 24px padding | 4 columns, 12px gutter, full width with 16px padding |
| **Navigation** | Sticky 56px bar with all horizontal links and status badge | Compact sticky bar, status badge hidden | Sticky 52px bar with monomark + `[MENU]` trigger; full-screen overlay on tap |
| **Hero Background** | WebGL 2.0 fragment shader with dynamic mouse dipole physics | WebGL throttled to 30fps or Canvas 2D fallback, dipole disabled | Static high-contrast dithered SVG or lightweight CSS gradient (zero CPU/battery drain) |
| **Hero Marquee** | Massive display outline text (120px height) moving at 45s loop | Scaled down display text (72px height), lower opacity (8%) | Scaled down (48px height), reduced speed, or static brand watermark band |
| **Hero Manifesto** | `clamp(3.5rem, 8vw, 7.5rem)`, 3 lines, tight negative kerning | `clamp(2.5rem, 6vw, 4.5rem)`, 3 lines | `clamp(2rem, 8vw, 3rem)`, 4 lines, adjusted line-height (1.05) |
| **Selected Work** | 7/5 column architectural split (interactive schematic left, spec right) | 12-column vertical stack (schematic top, spec bottom) | Single-column stack; schematic replaces interactive canvas with crisp SVG flowchart; stack tags wrap |
| **Thinking** | 4-column manifesto intro + 8-column 2-wide article card grid | 12-column stack, cards full width | Single-column cards with generous tap targets (`min-h-[64px]`), hairline dividers |
| **Lab Workbench** | 3-column modular workbench cards | 2-column grid | Single-column vertical stack; all glitch effects completely disabled |
| **Journey** | Alternating left/right timeline branching from center spine | Left-aligned timeline spine, all cards branch to the right | Left-aligned spine (`left-3`), content offset (`pl-8`), cards simplified to compact milestone blocks |
| **Now** | 4-column bandwidth chart + 8-column narrative | Vertical stack: bandwidth top, narrative below | Single-column status list with direct touchable links |
| **Touch Targets** | Standard mouse cursor targets | Minimum 40px touch targets | Minimum 44px $\times$ 44px tap targets for all interactive links/buttons |

---

## 7. ACCESSIBILITY CONTRACT

The portfolio must be accessible to all humans and machine agents without exception.

### 7.1 Accessibility Standards Matrix

| Requirement | Implementation Rule | Verification Method |
|---|---|---|
| **Semantic Structure** | Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`. Exactly one `<h1>` per page (Hero Manifesto). | Automated axe-core scan + Chrome Lighthouse Accessibility $\ge 98$. |
| **Color Contrast** | All text-to-background pairings must meet **WCAG 2.1 AA** ($\ge 4.5:1$ for body, $\ge 3:1$ for large text). `--ink-primary` on `--surface-ground` achieves **16.2:1** (AAA). | Color contrast analyzer test against design tokens. |
| **Reduced Motion** | Listen to `(prefers-reduced-motion: reduce)`. <br>• Canvas shader render loop stops immediately. <br>• GSAP marquees freeze into static text. <br>• Motion transitions set `duration: 0.001s`. | Verify page functionality with OS "Reduce Motion" enabled. |
| **Keyboard Navigation** | Full keyboard parity. Every link, button, and expander is reachable via `Tab` and triggerable via `Enter`/`Space`. | Manual Tab-through audit with no mouse interaction. |
| **Focus Rings** | Visible, non-intrusive focus rings: 2px solid `--signal-cobalt` with a 2px offset. Never suppress `outline: none` without a custom focus indicator. | Verify visual focus ring on every interactive component. |
| **Screen Readers** | Interactive state toggles must expose `aria-expanded` and `aria-controls`. Section dividers and decorative marquees must have `aria-hidden="true"`. | VoiceOver (macOS/iOS) testing of hero, navigation, and project cards. |
| **Text Scaling** | Layout must remain intact when user zooms text up to 200% in browser settings. Use `rem` units for all typography and padding. | Zoom test at 200% text size in Chrome/Firefox. |

---

## 8. PERFORMANCE CONTRACT

Performance is an aesthetic choice. A living system that stutters or drops frames fails its identity.

### 8.1 Performance Budgets & Boundaries

| Metric / Boundary | Target Threshold | Maximum Acceptable Ceiling | Enforcement Mechanism |
|---|---|---|---|
| **First Contentful Paint (FCP)** | `< 0.8s` | `1.2s` | Server Components (RSC) emit static HTML immediately. |
| **Largest Contentful Paint (LCP)** | `< 1.2s` | `1.8s` | Hero headline text rendered via SSR fonts; canvas does not block LCP. |
| **Cumulative Layout Shift (CLS)** | `0.00` | `0.05` | Explicit aspect ratios and heights on all containers and font display swap. |
| **Initial Client JS Payload** | `< 120KB` gzipped | `160KB` gzipped | Tree-shaking, no heavy UI libraries, no Three.js. |
| **Generative Field Frame Rate** | `60 FPS` | `30 FPS` | Automatically step down fidelity or throttle to 30fps if frame drops detected. |
| **Canvas Auto-Termination** | Automatic off-screen pause | Instant pause | `IntersectionObserver` disconnects render loop when canvas scrolls out of view. |
| **Pointer Event Decoupling** | Zero React re-renders | 0 re-renders on mousemove | Pointer coordinates stored in mutable refs and passed directly to shader uniforms. |
| **GSAP Animation Cleanup** | 100% memory reclamation | Zero orphaned timelines | All GSAP hooks wrapped in `useGSAP()` or explicit `ctx.revert()` on unmount. |

### 8.2 Dynamic Loading Rule
- The WebGL/Canvas Generative Field must be dynamically loaded with `next/dynamic` and `{ ssr: false }`.
- Under no circumstance should WebGL initialization block the initial server render or hydration of the HTML text content.

---

## 9. ROUTING CONTRACT

V1 focuses exclusively on the high-impact homepage shell. Premature routing complexity is strictly avoided.

### 9.1 V1 Route Registry

| Route | Status in V1 | Implementation Detail |
|---|---|---|
| `/` | **ACTIVE** | The complete homepage experience defined in this contract. |
| `/#work` | **ACTIVE** | In-page smooth scroll anchor to Selected Work section. |
| `/#thinking` | **ACTIVE** | In-page smooth scroll anchor to Thinking section. |
| `/#lab` | **ACTIVE** | In-page smooth scroll anchor to Lab Workbench section. |
| `/#journey` | **ACTIVE** | In-page smooth scroll anchor to Journey section. |
| `/#now` | **ACTIVE** | In-page smooth scroll anchor to Now section. |
| `/work` | **STUB / REDIRECT** | Redirects to `/#work` in V1 (full standalone index deferred to V2). |
| `/thinking` | **STUB / REDIRECT** | Redirects to `/#thinking` in V1. |
| `/lab` | **STUB / REDIRECT** | Redirects to `/#lab` in V1. |
| `/journey` | **STUB / REDIRECT** | Redirects to `/#journey` in V1. |
| `/now` | **STUB / REDIRECT** | Redirects to `/#now` in V1. |

### 9.2 Strictly Deferred Routes & Systems
Do NOT build in V1:
- Dynamic case study routes (`/work/[slug]`) — V1 uses rich in-page architectural preview cards.
- Article detail reader routes (`/thinking/[slug]`).
- The AI API backend route (`/api/ask`).
- Any authentication routes (`/admin`, `/login`).
- Any database connections or CMS integrations.

---

## 10. COMPONENT CONTRACT

Components must remain content-driven, lean, and reusable. Avoid over-abstracting with micro-components.

```text
components/
├── layout/
│   ├── RootLayout.tsx           # Global HTML shell, font imports, metadata
│   ├── Navigation.tsx           # Sticky technical header with desktop/mobile variants
│   ├── Footer.tsx               # Architectural colophon and direct links
│   └── SectionContainer.tsx     # 12-column responsive layout wrapper
├── visual/
│   ├── GenerativeSubstrate.tsx  # Dynamic WebGL/Canvas 2D particle/dither field
│   ├── BackgroundMarquee.tsx    # Layer 1 GSAP infinite name marquee
│   ├── SectionDividerMarquee.tsx# Pinned taxonomy continuous stream
│   └── StatusSignal.tsx         # Monospace live/error/validated status pill
├── hero/
│   ├── HeroSection.tsx          # 3-Layer parallax composite container
│   ├── HeroHeadline.tsx         # Instrument Serif / Grotesk manifesto statement
│   ├── HeroMetadata.tsx         # Verified status bar (Location, Timezone, Stage)
│   └── HeroActions.tsx          # Primary & Secondary CTA cluster
├── sections/
│   ├── SectionHeader.tsx        # Reusable index header (`01 // SELECTED WORK`)
│   ├── WorkSection.tsx          # Selected Work container
│   ├── ProjectCard.tsx          # 12-column architectural project spread
│   ├── ThinkingSection.tsx      # Thinking publication container
│   ├── ArticleCard.tsx          # Editorial publication preview card
│   ├── LabSection.tsx           # Computational workbench container
│   ├── ExperimentCard.tsx       # Lab modular experiment unit
│   ├── JourneySection.tsx       # Topological evolution timeline
│   ├── JourneyNode.tsx          # Timeline milestone marker & narrative
│   └── NowSection.tsx           # Active bandwidth and current vectors
└── ui/
    ├── Button.tsx               # Kinetic mechanical button with hover feedback
    ├── Badge.tsx                # Monospace tag for technology and status
    └── HairlineDivider.tsx      # Precision 0.5px hairline divider
```

---

## 11. DATA CONTRACT

Content must be completely decoupled from presentation components. Content files live in a dedicated `content/` hierarchy, parsed and validated by Zod schemas at build time.

### 11.1 File Structure
```text
content/
├── person/
│   └── shubh.yaml               # Identity, roles, manifesto, verified links
├── projects/
│   ├── enterprise-hybrid-rag.yaml
│   ├── daily-sahayak.yaml
│   ├── agentforge.yaml
│   └── geointel-ai.yaml
├── thinking/
│   ├── evaluating-retrieval.yaml
│   └── mechanics-of-daily-planning.yaml
├── lab/
│   ├── exp-01-rrf-vs-weighted-fusion.yaml
│   └── exp-02-local-embedding-latency.yaml
├── journey/
│   ├── 01-rishihood-university.yaml
│   ├── 02-groto-internship.yaml
│   └── 03-sih-geointel.yaml
├── now/
│   └── now.yaml                 # Active bandwidth, current builds, reading list
├── technologies/
│   └── taxonomy.yaml            # Controlled technical vocabulary for marquees
└── themes/
    └── narrative_themes.yaml    # Conceptual tags for connecting nodes
```

### 11.2 Zod Validation & Parsing Engine
- Location: `lib/schema/` (`person.schema.ts`, `project.schema.ts`, `thinking.schema.ts`, `lab.schema.ts`, `journey.schema.ts`, `now.schema.ts`).
- Location: `lib/content.ts` (Static loader utilities reading YAML files using `gray-matter` or `yaml`, validating via Zod, and exporting type-safe objects to Server Components).
- Rule: If a YAML file has missing required fields or invalid types, the build fails immediately.

---

## 12. IMPLEMENTATION ORDER

The implementation must proceed in 15 strictly sequential steps. No step may begin until the preceding step has been validated.

```text
 1. PROJECT FOUNDATION       Initialize Next.js App Router, TypeScript, Tailwind, ESLint.
        ↓
 2. CONTENT SCHEMA           Create Zod schemas matching CONTENT-MODEL.md in lib/schema/.
        ↓
 3. SEED CONTENT             Populate content/ directory with real verified YAML data.
        ↓
 4. TYPOGRAPHY & TOKENS      Configure fonts (Instrument Serif / Geist / JetBrains Mono) & CSS tokens.
        ↓
 5. GLOBAL LAYOUT SHELL      Build RootLayout, SectionContainer, and static Navigation/Footer.
        ↓
 6. HERO STRUCTURE           Build Layer 2 foreground operational UI, manifesto, and verified status.
        ↓
 7. HERO MARQUEE             Implement Layer 1 infinite name marquee with GSAP looping.
        ↓
 8. GENERATIVE FIELD         Implement Layer 0 WebGL/Canvas substrate with mouse dipole & repulsion.
        ↓
 9. HOMEPAGE SECTIONS        Assemble Work, Thinking, Lab, Journey, and Now content sections.
        ↓
10. SECTION MARQUEES         Place GSAP taxonomy divider marquees between major sections.
        ↓
11. MOTION INTERACTIONS      Attach Motion for React component-level hover, tap, and entry reveals.
        ↓
12. RESPONSIVE PASS          Implement mobile/tablet layout adaptations and touch targets.
        ↓
13. ACCESSIBILITY PASS       Verify keyboard navigation, ARIA attributes, and reduced-motion freeze.
        ↓
14. PERFORMANCE PASS         Enforce dynamic loading, IntersectionObserver pauses, and bundle budgets.
        ↓
15. FINAL VISUAL PASS        Pixel-level inspection against DESIGN.md (hairlines, contrast, spacing).
```

---

## 13. ACCEPTANCE TEST PROTOCOL

Before V1 can be declared complete, it must pass 10 concrete, repeatable tests:

### 1. The 10-Second Impression Test
- **Action:** Open the homepage in a fresh browser session at desktop resolution.
- **Criteria:** The 3-layer hero resolves immediately. Shubh Mehrotra's identity, role (AI Product Builder), and manifesto are legible within 5 seconds. The marquee drifts smoothly in the background without obscuring text.

### 2. The 30-Second Understanding Test
- **Action:** Scroll through the first three sections (Hero, Selected Work, Thinking).
- **Criteria:** The visitor can name Shubh's primary technical domains (Hybrid RAG, Agent Reliability, Daily Sahayak). The visual language feels cohesive, editorial, and computational.

### 3. The Desktop Experience Test (1440px)
- **Action:** Browse the entire page with mouse and scroll wheel.
- **Criteria:** 12-column architectural grids align perfectly. Generative field responds smoothly to mouse movements. Section-divider marquees scroll seamlessly without horizontal page overflow.

### 4. The Mobile Touch Test (390px iPhone viewport)
- **Action:** Emulate iPhone 14/15 in Chrome DevTools or test on a physical mobile device.
- **Criteria:** No horizontal scrollbar appears. Navigation collapses to a functional menu. Canvas gracefully degrades to static SVG or lightweight CSS. Touch targets are $\ge 44\text{px}$.

### 5. The Reduced-Motion Test
- **Action:** Enable `prefers-reduced-motion: reduce` in OS or browser dev tools.
- **Criteria:** The generative canvas immediately stops animating. The GSAP marquees freeze into static text strips. Page-entry transitions execute with zero delay.

### 6. The Keyboard Navigation Test
- **Action:** Navigate the entire page using only `Tab`, `Shift+Tab`, and `Enter`.
- **Criteria:** Every link and button receives a sharp, visible focus ring (`--signal-cobalt`). Focus order follows visual logical flow. No keyboard traps exist.

### 7. The No-WebGL / GPU Blacklist Test
- **Action:** Disable WebGL in browser settings (`chrome://flags/#disable-webgl`).
- **Criteria:** The page renders gracefully with a 2D Canvas or static SVG dither background. No uncaught JavaScript errors or blank screens occur.

### 8. The Slow Network Test (Fast 3G Emulation)
- **Action:** Throttle network to "Fast 3G" in DevTools and reload.
- **Criteria:** FCP occurs under 1.2s. Server-rendered text is readable before the generative canvas or GSAP scripts finish loading.

### 9. The JavaScript Disabled Test
- **Action:** Disable JavaScript in browser settings and reload.
- **Criteria:** All text content across Hero, Work, Thinking, Lab, Journey, and Now renders and remains fully readable. Standard anchor links work.

### 10. The Route Navigation Test
- **Action:** Click all header anchor links (`#work`, `#thinking`, `#lab`, etc.).
- **Criteria:** Smooth scroll navigates to the exact section header without layout clipping or jitter.

---

## 14. DEFINITION OF DONE

The V1 Homepage is complete only when all criteria across these five dimensions are satisfied:

### 14.1 Visual Criteria
- [ ] Curated color palette (`--surface-ground`, `--inverse-ground`, `--signal-cobalt`, `--signal-ember`, `--signal-lime`, `--signal-crimson`) strictly applied via CSS variables.
- [ ] Typography scale conforms to `DESIGN.md` (Instrument Serif / Grotesk displays, clean body sans, technical monospace metadata).
- [ ] Hairline borders are crisp (0.5px / 1px) with no blurry rendering.
- [ ] Hero 3-layer parallax functions with zero z-index conflicts.

### 14.2 Content Criteria
- [ ] 100% of rendered content is driven by YAML files in `content/` validated by Zod schemas.
- [ ] All 4 seed projects (`Enterprise Hybrid RAG`, `Daily Sahayak`, `AgentForge`, `GeoIntel AI`) populated with real stack, problems, and outcomes.
- [ ] Both seed thinking articles and lab experiments populated with authentic hypotheses and failure logs.
- [ ] Absolutely zero fake telemetry, random hashes, or synthetic metrics.

### 14.3 Interaction & Motion Criteria
- [ ] Motion for React strictly owns UI interaction and component reveals.
- [ ] GSAP strictly owns infinite marquees and hero parallax scrubbing.
- [ ] Canvas/WebGL strictly owns the atmospheric generative substrate.
- [ ] No two animation engines target the same CSS property on the same element.

### 14.4 Accessibility Criteria
- [ ] Lighthouse Accessibility score $\ge 98$.
- [ ] Complete keyboard navigation with visible focus rings.
- [ ] `prefers-reduced-motion` completely stops all ambient animation loops.
- [ ] All semantic HTML5 tags properly structured with a single `<h1>`.

### 14.5 Engineering Criteria
- [ ] Next.js App Router project builds cleanly with zero TypeScript errors (`tsc --noEmit`).
- [ ] Zero ESLint warnings or errors.
- [ ] Initial client JavaScript bundle $< 160\text{KB}$ gzipped.
- [ ] Generative canvas dynamically loaded with SSR disabled.
- [ ] GSAP ScrollTrigger instances cleanly destroyed on unmount.

---

## 15. WHAT COMES AFTER V1

V1 delivers the definitive homepage. The remaining vision from `ARCHITECTURE.md` is unlocked in subsequent, disciplined phases:

```text
PHASE V1: HOMEPAGE & SYSTEM SHELL (CURRENT CONTRACT)
   ↓
PHASE V2: DEEP PROJECT CASE STUDIES
   • Full dynamic case study pages (`/work/[slug]`)
   • Deep Story ↔ System contextual transformation toggle
   • Interactive pipeline traversal and architecture schematics
   ↓
PHASE V3: THINKING & EDITORIAL ENGINE
   • Full article reader (`/thinking/[slug]`) with margin annotations
   • Topic clustering and RSS feed generation
   ↓
PHASE V4: LAB & PROVENANCE TRACES
   • Interactive telemetry inspection for experiments
   • SVG Provenance Traces visually connecting Projects to Lab experiments
   ↓
PHASE V5: JOURNEY & ABOUT DEEP-DIVES
   • Interactive topological map expansion
   • Personal philosophy, influences, and reading colophon
   ↓
PHASE V6: ASK MY PORTFOLIO (RAG ENGINE)
   • Static vector index & local chunk retrieval
   • Vercel AI SDK text streaming with Latent Evidence Map
   • Provenance citations linking generated text directly to source YAML
   ↓
PHASE V7: FINAL POLISH & OBSERVABILITY
   • Sentry error monitoring & privacy-first analytics
   • Ground-truth RAG evaluation test suite
```

### Strictly Deferred Features
The following items are **explicitly forbidden** from being implemented during V1:
1. Dynamic case study routing (`/work/[slug]`)
2. Standalone RAG retrieval API (`/api/ask`)
3. Vector databases (Pinecone, ChromaDB, Weaviate, pgvector)
4. Graph databases (Neo4j)
5. Dedicated Python / FastAPI backend services
6. User authentication or administrative portals
7. External headless CMS integrations
8. Heavy 3D mesh rendering or Three.js dependencies

---

## FINAL REPORTING & SUMMARY

### 1. Final V1 Architecture Diagram

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          NEXT.JS APP ROUTER                            │
│                                                                        │
│   app/layout.tsx (Root Shell, Font Injection, Global Metadata)         │
│     │                                                                  │
│     └── app/page.tsx (React Server Component)                          │
│           ├── lib/content.ts (Reads & Validates YAML via Zod)          │
│           │     ├── content/person/shubh.yaml                          │
│           │     ├── content/projects/*.yaml                            │
│           │     ├── content/thinking/*.yaml                            │
│           │     ├── content/lab/*.yaml                                 │
│           │     ├── content/journey/*.yaml                             │
│           │     └── content/now/now.yaml                               │
│           │                                                            │
│           ├── <Navigation /> (Sticky technical bar + mobile menu)      │
│           ├── <HeroSection />                                          │
│           │     ├── Layer 0: <GenerativeSubstrate /> (Raw WebGL/Canvas)│
│           │     ├── Layer 1: <BackgroundMarquee /> (GSAP Timeline)     │
│           │     └── Layer 2: <HeroHeadline />, <HeroMeta />, <CTAs />  │
│           ├── <SectionDividerMarquee /> (GSAP Continuous Loop)         │
│           ├── <WorkSection /> → <ProjectCard /> (4 Architectural Cards)│
│           ├── <SectionDividerMarquee /> (GSAP Continuous Loop)         │
│           ├── <ThinkingSection /> → <ArticleCard /> (2 Editorial Cards)│
│           ├── <LabSection /> → <ExperimentCard /> (2 Workbench Units)  │
│           ├── <JourneySection /> → <JourneyNode /> (3 Timeline Events) │
│           ├── <NowSection /> (Live Allocation & Current Vectors)       │
│           └── <Footer /> (Colophon & Direct Communication Channels)    │
└────────────────────────────────────────────────────────────────────────┘
```

### 2. Exact Files and Directories to Create

```text
PORTOFOLIO/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── SectionContainer.tsx
│   ├── visual/
│   │   ├── GenerativeSubstrate.tsx
│   │   ├── BackgroundMarquee.tsx
│   │   ├── SectionDividerMarquee.tsx
│   │   └── StatusSignal.tsx
│   ├── hero/
│   │   ├── HeroSection.tsx
│   │   ├── HeroHeadline.tsx
│   │   ├── HeroMetadata.tsx
│   │   └── HeroActions.tsx
│   ├── sections/
│   │   ├── SectionHeader.tsx
│   │   ├── WorkSection.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ThinkingSection.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── LabSection.tsx
│   │   ├── ExperimentCard.tsx
│   │   ├── JourneySection.tsx
│   │   ├── JourneyNode.tsx
│   │   └── NowSection.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── HairlineDivider.tsx
├── content/
│   ├── person/
│   │   └── shubh.yaml
│   ├── projects/
│   │   ├── enterprise-hybrid-rag.yaml
│   │   ├── daily-sahayak.yaml
│   │   ├── agentforge.yaml
│   │   └── geointel-ai.yaml
│   ├── thinking/
│   │   ├── evaluating-retrieval.yaml
│   │   └── mechanics-of-daily-planning.yaml
│   ├── lab/
│   │   ├── exp-01-rrf-vs-weighted-fusion.yaml
│   │   └── exp-02-local-embedding-latency.yaml
│   ├── journey/
│   │   ├── 01-rishihood-university.yaml
│   │   ├── 02-groto-internship.yaml
│   │   └── 03-sih-geointel.yaml
│   ├── now/
│   │   └── now.yaml
│   ├── technologies/
│   │   └── taxonomy.yaml
│   └── themes/
│       └── narrative_themes.yaml
├── lib/
│   ├── content.ts
│   └── schema/
│       ├── person.schema.ts
│       ├── project.schema.ts
│       ├── thinking.schema.ts
│       ├── lab.schema.ts
│       ├── journey.schema.ts
│       └── now.schema.ts
├── public/
│   └── (static assets/fonts)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

### 3. Exact Implementation Order
1. **Foundation:** Initialize Next.js App Router, TypeScript, Tailwind CSS, and core dependencies (`motion`, `gsap`, `@gsap/react`, `zod`, `js-yaml`).
2. **Content Schemas:** Implement Zod schemas in `lib/schema/` to enforce structural data types.
3. **Data Files:** Create all seed YAML content files in `content/` with verified real data.
4. **Content Loader:** Implement `lib/content.ts` to statically parse and validate YAML files.
5. **Design Tokens & Fonts:** Configure Tailwind CSS and CSS variables for colors, typography, and hairlines in `app/globals.css`.
6. **Layout Shell:** Build `RootLayout`, `SectionContainer`, `Navigation`, and `Footer`.
7. **Hero Foreground UI:** Implement `HeroHeadline`, `HeroMetadata`, and `HeroActions` with real content.
8. **Hero Marquee:** Implement Layer 1 infinite outline text marquee using GSAP in `BackgroundMarquee.tsx`.
9. **Generative Substrate:** Implement Layer 0 WebGL/Canvas field in `GenerativeSubstrate.tsx` with mouse dipole and text repulsion.
10. **Hero Composite:** Assemble the 3 layers in `HeroSection.tsx` with scroll parallax.
11. **Content Sections:** Implement `WorkSection`, `ThinkingSection`, `LabSection`, `JourneySection`, and `NowSection`.
12. **Section Divider Marquees:** Integrate alternating taxonomy stream marquees between major sections.
13. **Motion Polish:** Wire up Motion for React component entry reveals and hover feedback.
14. **Responsive Pass:** Optimize mobile layouts, collapsible menu, and touch targets.
15. **Accessibility & Performance Pass:** Test keyboard navigation, reduced motion, dynamic WebGL imports, and build verification.

### 4. 10 Acceptance Criteria
1. The homepage renders without any runtime console errors or TypeScript compilation issues.
2. The Hero 3-layer parallax resolves cleanly: background canvas $\to$ GSAP outline name marquee $\to$ high-contrast manifesto text.
3. All content on the page is loaded dynamically from validated YAML files; zero hardcoded content facts exist in components.
4. All 4 seed projects, 2 thinking articles, 2 lab experiments, 3 journey events, and now items display accurately.
5. Zero fake telemetry, fake coordinates, fake latency, or invented statistics appear anywhere on the page.
6. Motion for React and GSAP strictly observe their non-overlapping boundaries with zero style conflicts.
7. Mobile viewport (<768px) displays an intentional, single-column touch layout with no horizontal scroll overflow.
8. Enabling `prefers-reduced-motion` instantly freezes the canvas and marquees and removes animation delays.
9. Full keyboard navigation (`Tab` / `Enter`) works across all interactive elements with sharp focus outlines.
10. The site builds as a static/server-rendered Next.js application with an initial JS bundle under 160KB gzipped.

### 5. 5 Things Antigravity Must NOT Do
1. **Do NOT write code or install packages in this phase** — this contract must be approved before execution begins.
2. **Do NOT invent fake metrics, statistics, coordinates, or company claims** — strictly ground all content in verified sources.
3. **Do NOT allow Motion for React and GSAP to animate the same CSS property on the same element** — maintain absolute boundary isolation.
4. **Do NOT install Three.js, a vector database, or spin up a Python backend** — keep V1 lean and statically optimized.
5. **Do NOT redesign or alter the visual language** — execute the locked design direction from `DESIGN.md` and `VISUAL-MOTION.md` with absolute fidelity.
