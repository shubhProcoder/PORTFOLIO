# FLOW.md

## The Experience Architecture & Visitor Journey
### Portfolio of Shubh Mehrotra — AI Product Builder, Systems Thinker & Engineer

**Document Status:** Source of Truth for Experience Design and User Flows
**Version:** 1.0
**Date:** 2026-09-26
**Derived From:** `ARCHITECTURE.md` v1.0, `DESIGN.md` v2.1
**Governs:** Visitor journeys, information discovery, interaction sequences, and content representation toggles.

---

## 1. Core Experience Principle

The portfolio must feel like entering a **living system** of interconnected nodes:
`PERSON → THINKING → PROJECTS → EXPERIMENTS → KNOWLEDGE → JOURNEY → CURRENT WORK`

It is not a brochure. It is an exploration of a cognitive architecture. The visitor should gradually discover who the builder is, what they build, how they reason, their technical execution capabilities, their evolutionary timeline, and the evidence behind their claims. The experience must reward exploration without obfuscating basic information.

## 2. Visitor Personas & Ideal Paths

### 2.1 The Recruiter
**Goal:** Rapidly determine identity, stage, technical direction, top projects, and contact info.
- **First 10s:** Hero statement establishes AI Systems focus. Subdued telemetry establishes technical competency. Scroll reveals "Selected Work".
- **First 30s:** Scans top 2 projects in `STORY` mode. Sees clean problem/outcome framing.
- **First 2m:** Checks "Journey" for education/internship timeline.
- **Ideal Exit:** Clicks "Resume" or "Email" from the persistent navigation or footer.

### 2.2 The Founder / Startup Operator
**Goal:** Assess product thinking, shipping ability, business relevance, and problem-identification.
- **Ideal Path:** Hero → Selected Work (STORY mode) → Project Case Study (Focuses on Problem, Outcome, Learnings) → Lab (To see how quickly they iterate) → Contact.

### 2.3 The Technical Reviewer / Engineering Leader
**Goal:** Evaluate architecture, implementation depth, AI/RAG systems, and engineering rigor.
- **Ideal Path:** Hero → Selected Work → Toggles to **`SYSTEM`** mode on a Project Case Study → Inspects Architecture Diagrams, Constraints, Failure Modes, and Evaluation Metrics → Thinking (Reads technical deep-dive) → GitHub / Ask My Portfolio.

### 2.4 The Design / Creative Technology Visitor
**Goal:** Discover visual experiments, generative systems, and creative technology execution.
- **Ideal Path:** Hero (Plays with cursor dipole physics) → Lab (Explores metastable glitches and visual artifacts) → Project Case Studies (Observes spatial transitions and typographic hierarchy) → Inspects the bespoke generative canvas.

### 2.5 The Curious Visitor
**Goal:** Free exploration.
- **Ideal Path:** Wanders through Discovery Loops. Article → Related Project → Journey Event → Lab Experiment. Rewards lateral movement through the knowledge graph.

## 3. Homepage Experience & Narrative Sequence

The homepage is a vertical narrative of increasing intimacy and depth.

1. **Hero (Identity):** High-impact typographic statement + generative substrate. Establishes the scale of ambition.
2. **Selected Work (Proof of Building):** 3-4 major projects. Establishes credibility immediately. Default `STORY` mode.
3. **Thinking (Proof of Reasoning):** 2-3 recent articles. Shows how the builder dissects problems.
4. **Lab (Proof of Experimentation):** 2-3 active/failed experiments. Shows velocity and curiosity.
5. **Journey (Proof of Evolution):** Key topological nodes (graduation, major shifts).
6. **Now (Current Vector):** Live allocation of bandwidth.
7. **Ask (Knowledge Access):** Terminal entry point to query the portfolio's RAG system.

## 4. Hero Flow

- **Initial State:** Canvas loads instantly. Typography fades in cleanly. `I BUILD SYSTEMS FOR THINGS THAT DON'T EXIST YET.`
- **Telemetry:** Shows dynamic, non-intrusive placeholders (e.g., `CURRENT STATE: R&D`, `FOCUS: AI SYSTEMS`, `LAST UPDATED: [Date]`). No fake geolocation.
- **First Interaction:** Moving the mouse perturbs the underlying halftone/particle field (dipole effect).
- **Scroll Behavior:** Scrolling down seamlessly fades the generative intensity, solidifying the grid as the visitor enters the "Selected Work" section.
- **Fallback:** If WebGL fails, the hero relies entirely on the strength of the typography (Instrument Serif + JetBrains Mono) against a static bone-paper background.

## 5. Story / System Flow (Contextual Representation)

The Story/System toggle is a **contextual representation layer**, not a global theme switch. It represents two views of the *same* underlying knowledge.

### 5.1 Primary Use Areas
- **Project Case Studies (The Core Use Case):**
  - **STORY View:** Focuses on Context, Problem, Approach, Outcome, Learnings. Typography is editorial.
  - **SYSTEM View:** Reveals Architecture diagrams, Data Flows, Constraints, Evaluation (metrics), Failure Modes. Typography shifts to monospace/grotesk.
- **Work Index:** Toggles project summaries between business impact and stack/architecture tags.
- **Lab:** `STORY` (Hypothesis/Observation) vs `SYSTEM` (Raw telemetry, benchmark data, JSON traces).
- **Journey:** `STORY` (Personal narrative) vs `SYSTEM` (Causal timeline with node metadata).

### 5.2 Limited / Static Areas
- **Thinking / Now:** Limited System features (reveals marginalia or technical footnotes).
- **About:** Strictly `STORY` (Editorial).
- **Ask My Portfolio:** Strictly `SYSTEM` (Knowledge Graph / RAG terminal).
- **Navigation:** Remains constant.

## 6. Project Discovery Flow

Projects are not isolated islands; they are nodes in a graph, discoverable via:
1. **Direct:** `Navigation → Work → Project`
2. **Narrative:** `Home → Selected Work → Project`
3. **Knowledge / Contextual:** `Article (Thinking) → "Related Project" link`
4. **Experimental:** `Lab Experiment → "Led to Project [X]"`
5. **Temporal:** `Journey Node → Project built during this era`

## 7. Project Case Study Flow

A project case study is a deep, dual-layered artifact. The sequence is flexible but conceptually structured:

1. **Context & Problem:** Why does this exist?
2. **Hypothesis / Approach:** How did I attack it?
3. **The Build (System):** What is the architecture? *(Heavily expanded in SYSTEM mode)*
4. **Evaluation / Outcome:** Did it work? Metrics vs User Impact.
5. **Limitations & Failures:** What broke? What scales poorly? *(Crucial for credibility)*
6. **Learnings:** The meta-takeaway.
7. **Related Entities:** Traces to Lab, Thinking, or Journey.

*Crucial Distinction:* The text must clearly delineate: What was the problem? What was *my* specific contribution? What is validated vs what is a claim?

## 8. Thinking Flow

The reading experience is a personal publication.
- **Discovery:** Through the homepage, the Work section (as context), or the main Thinking index.
- **Reading:** Oversized editorial columns (`STORY`), with technical annotations and footnotes living in the margins (`SYSTEM`).
- **Next Actions:** At the end of an article, the user is offered a "Next Thought" or connected "Related Project".

## 9. Lab Flow

Lab is the raw workbench.
- **Structure:** `Hypothesis → Experiment → Observation → Result → Next Question`.
- **States:** Clearly labeled as `[ACTIVE]`, `[PAUSED]`, `[VALIDATED]`, `[FAILED]`, or `[ABANDONED]`.
- **Transparency:** Failures are celebrated as data points. The goal is to show the *velocity of learning*.

## 10. Journey Flow

Not a resume timeline. A topological map of evolution.
- **Structure:** `Event → Context → What Changed → What was Learned → Connected Nodes`.
- **Connections:** A journey node (e.g., "SIH 2024 Hackathon") connects directly to the Project built, the Lab experiments tried during it, and the Article written after it.

## 11. Now Flow

Intentionally ephemeral and highly focused.
- **Content:** Current Build, Current Learning, Current Question.
- **Format:** Text-heavy, fast to read, fast to update. Represents the absolute leading edge of the builder's attention.

## 12. Ask My Portfolio Flow

The future RAG experience is a native system terminal, not a chatbot.
- **Flow:** `Query → Retrieval → Evidence Rendering → Answer Generation → Related Entities`.
- **UI:** Split pane. Left side streams the synthesized answer. Right side renders the **Latent Evidence Map** (the specific chunks of projects, articles, or lab notes retrieved to ground the answer). The user sees the exact source trail.

## 13. Knowledge Graph Experience

Relationships become visible where they improve discovery, avoiding "graph maze" overload.
- **Implementation:** Hovering over a related entity (e.g., a technology tag or a referenced project) triggers the **Node Inspector HUD** (Layer 5), revealing its status and connections before requiring a click.

## 14. Navigation

- **Primary:** Clean, persistent horizontal (or collapsed) header.
- **Contextual:** Within projects, a sticky table of contents or progress indicator.
- **Toggle:** The `[STORY] / [SYSTEM]` switch acts as local dimensional navigation.

## 15. Motion Flow

Motion must be mechanical and purposeful.
- **Scroll:** Fades generative intensity; snaps sections into view.
- **Hover:** Expands metadata; triggers Node Inspector HUD; 0ms delay, mechanical easing (`cubic-bezier(0.05, 0.7, 0.1, 1.0)`).
- **Mode Switch:** Cross-fades typography and expands/collapses structural DOM elements (240ms).
- **Rule:** No decorative bouncing. Motion signifies state change or data flow.

## 16. Information Density

Rhythm is created by varying density:
- **Low Density:** Hero, Major Section Headers (Breathing room).
- **Medium Density:** Work Index, Journey, Now (Scannable).
- **High Density:** System Views, Project Architecture Diagrams, Ask My Portfolio Evidence Pane, Lab Metadata (High cognitive engagement).

## 17. Mobile Experience

Mobile is an intimate field terminal, not a squished desktop.
- **Hero:** Generative field becomes a static, high-quality dithered SVG to save battery/GPU.
- **Story/System:** Toggles stack vertically. Architecture diagrams become horizontal scroll areas or simplified SVG flows.
- **Navigation:** Collapses to a highly tactile bottom-dock or full-screen modal.

## 18. Accessibility Experience

- **Keyboard:** Full tab-indexing. Focus states use sharp `--signal-amber` outlines.
- **Reduced Motion:** Respects `prefers-reduced-motion`. Canvas freezes; transitions become instant cuts.
- **Screen Readers:** Story/System toggle updates `aria-live` regions to announce context changes.

## 19. Failure States

The system must gracefully degrade:
- **WebGL Fails:** Canvas hidden; CSS background fallback takes over.
- **JS Fails:** Site remains navigable as static HTML documents (SSR/SSG).
- **RAG Unavailable:** "Ask" section gracefully falls back to a standard search index or contact form.

## 20. Discovery Loops

Explicit paths to keep the visitor engaged laterally:
- `Project → Built with [Technology Node] → Other projects using [Technology Node]`
- `Article → "This led to the experiment in [Lab Node]" → Resulting [Project Node]`

## 21. Exit Conditions

Visitors must always know how to leave productively:
- **Recruiters:** Clear `[RESUME]` and `[EMAIL]` links in primary nav and footer.
- **Technical Reviewers:** Distinct `[GITHUB]` links embedded directly inside Project System views.

## 22. Experience Anti-Patterns

What must **NOT** happen:
- The recruiter cannot find the work index within 5 seconds.
- The `SYSTEM` mode hides the human narrative completely.
- Graph visualizations become unnavigable spaghetti.
- Visual canvas drops frames and makes scrolling jittery.
- The Ask/RAG system hallucinates fake projects.
- Mobile layout forces horizontal scrolling on text.

## 23. Final Experience Test

- **10-Second Test:** Knows name, role, and sees immediate evidence of aesthetic rigor.
- **30-Second Test:** Understands the primary 2 projects and the Story/System duality.
- **2-Minute Test:** Can articulate the builder's specific strengths (e.g., Backend RAG evaluation) vs general claims.
- **5-Minute Test:** Has read an article, inspected an architecture diagram, and explored a failed lab experiment.

---
*End of FLOW.md — Version 1.0*
