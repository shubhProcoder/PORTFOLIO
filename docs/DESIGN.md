# DESIGN.md — V2

## Computational Scrapbook: Visual Design System
### Portfolio of Shubh Mehrotra — AI Product Builder & Systems Engineer

**Document Status:** Source of Truth for Visual Design (V2 — Art Direction Pivot)  
**Version:** 3.0  
**Date:** 2026-09-27  
**Derived From:** `ARCHITECTURE.md` v1.0 (unchanged), Visual References  
**Governs:** All visual, typographic, chromatic, spatial, and material decisions.  
**Replaces:** DESIGN.md v2.1 (dark mission-control aesthetic — abandoned)

---

## 1. Creative Thesis

> **An experimental digital scrapbook documenting how an AI product builder thinks, builds, experiments, learns, and evolves.**

This is not a developer portfolio.  
Not a SaaS landing page.  
Not a cyberpunk AI dashboard.  
Not a minimalist dark template.

It is a **living visual notebook** — part design archive, part engineering lab, part personal magazine. The visual itself is the experience.

### 1.1 Visual Keywords

```
EDITORIAL       SCRAPBOOK       COLLAGE
COMPUTATIONAL   PLAYFUL         TACTILE
MAXIMAL         PRECISE         TYPOGRAPHIC
IMAGE-LED       EXPERIMENTAL    PERSONAL
```

### 1.2 Anti-Keywords (Hard Rejections)

```
GENERIC AI              MISSION CONTROL
CYBERPUNK               STARFIELD
SAAS LANDING PAGE       DASHBOARD
GLASSMORPHISM           MINIMAL DARK PORTFOLIO
PURPLE NEON GRADIENT    FLOATING GLASS CARDS
BENTO GRID              PARTICLE SWARM
```

---

## 2. Material Language

The portfolio uses visual materials borrowed from physical making:

| Material | Usage | Feel |
|----------|-------|------|
| **Warm paper / ivory** | Base surface, card backgrounds | Uncoated archival stock |
| **Ink** | Typography, borders | Carbon print |
| **Subtle grain** | Background texture | Printed paper imperfection |
| **Image crops** | Project visuals, hero artifact | Editorial cropping |
| **Document fragments** | Architecture diagrams, code snippets | Scattered lab sheets |
| **Collage layering** | Hero composition, project spreads | Physical overlap / z-depth |
| **Labels / stamps** | Status indicators, section markers | Industrial labeling |
| **Screenshots & diagrams** | Real project material as visual content | Authentic evidence |

Materials should feel **found and arranged**, not synthetically generated.

---

## 3. Color System — Expressive Computational Palette

The palette is dramatically more saturated than V1. Color is used **compositionally** — each section has a dominant color field, not generic gradients everywhere.

### 3.1 Core Palette

```css
:root {
  /* Paper & Ground */
  --paper:              #F5F0E8;   /* Warm ivory, uncoated stock */
  --paper-warm:         #EDE6D8;   /* Aged paper, recessed areas */
  --paper-bright:       #FDFAF5;   /* Lifted/elevated surfaces */

  /* Ink */
  --ink:                #1A1816;   /* Near-black carbon */
  --ink-secondary:      #4A453E;   /* Metadata, secondary text */
  --ink-ghost:          #9C968E;   /* Timestamps, ghost labels */

  /* Signals — Saturated, Expressive */
  --cobalt:             #2B4AE8;   /* Electric blue — primary accent */
  --cobalt-light:       #6B8AFF;   /* Light cobalt for hover/glow */
  --violet:             #7B3FE4;   /* Saturated violet — hero environment */
  --violet-light:       #B794F6;   /* Lavender — soft accent */
  --lavender:           #C9B8F0;   /* Soft lavender field */
  --lime:               #84CC16;   /* Acid green — lab/experiment */
  --coral:              #F0563A;   /* Warm coral — energy/thinking */
  --sky:                #38BDF8;   /* Bright sky blue — journey */
  --amber:              #F59E0B;   /* Warm amber — annotations */
}
```

### 3.2 Section Color Fields

Color is not background decoration. Each section occupies a distinct color territory:

| Section | Dominant | Accent | Ground |
|---------|----------|--------|--------|
| **Hero** | cobalt + violet | ivory text | Deep gradient field |
| **Work** | paper + ink | cobalt | Warm ivory |
| **Thinking** | paper + coral | ink | Warm ivory with coral accents |
| **Lab** | ink + lime | paper | Dark with acid green signals |
| **Journey** | sky + lavender | ink | Light blue atmospheric |
| **Now** | paper + amber | ink | Warm ivory with amber signals |

---

## 4. Typography — Three Voices + Display Expression

Typography is the primary visual tool. It is NOT confined to text containers.

### 4.1 The Voices

| Voice | Font | Usage | Character |
|-------|------|-------|-----------|
| **DISPLAY** | Instrument Serif | Hero manifesto, section titles, oversized statements | Huge, expressive, compositional — words become layout elements |
| **EDITORIAL** | Instrument Serif (italic) | Commentary, observations, personal notes | Readable, literary, warm |
| **SYSTEM** | System sans-serif (Cabinet Grotesk when available) | Navigation, descriptions, body text, UI | Clear, structural, confident |
| **MACHINE** | JetBrains Mono | Technical labels, project codes, status, timestamps | Precise, indexed, computational |

### 4.2 Display Typography Rules

Display typography is the most distinctive element. It can:

- **Overlap imagery** — text sits on top of visual artifacts
- **Extend beyond containers** — words bleed off viewport edges
- **Act as background texture** — at reduced opacity, massive scale
- **Become cropped** — partially visible letters at viewport boundaries
- **Rotate slightly** — 1–3° for editorial energy
- **Mix with imagery** — z-layered with collage elements

### 4.3 Type Scale

```
--type-display-hero:     clamp(4rem, 12vw, 10rem)     /* Massive, compositional */
--type-display-section:  clamp(2.5rem, 7vw, 6rem)     /* Section headlines */
--type-heading-1:        clamp(1.75rem, 3.5vw, 3rem)   /* Sub-section */
--type-body:             1.0625rem (17px)              /* Reading text */
--type-label:            0.75rem (12px)                /* Monospace labels */
--type-micro:            0.6875rem (11px)              /* Timestamps, codes */
```

Line heights are tight for display (0.9–1.0) and generous for reading (1.6–1.7).

---

## 5. Hero Architecture — V2

### 5.1 Concept

The hero is an **art-directed asymmetric composition** — not a centered manifesto over particles.

It should feel like opening the cover of a digital magazine created by an AI product builder.

### 5.2 Structure

```
┌─────────────────────────────────────────────────────────────┐
│ SHUBH MEHROTRA                    [NAV LINKS]     ● ACTIVE  │
│                                                             │
│           ┌────────────────────────┐                        │
│   I BUILD │  HERO VISUAL ARTIFACT  │                        │
│   SYSTEMS │  collage / screens /   │        THINKING        │
│   FOR     │  architecture / docs / │        BUILDING        │
│   THINGS  │  terminals / RAG       │        EXPERIMENTING   │
│   THAT    │  diagrams              │                        │
│   DON'T   └────────────────────────┘                        │
│   EXIST                                                     │
│   YET.           AI PRODUCT BUILDER                         │
│                  & SYSTEMS ENGINEER                         │
│                                                             │
│ ──── AI SYSTEMS ✳ RAG ✳ AGENTS ✳ PRODUCT BUILDING ──── │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Visual Layers (back to front)

1. **Color field** — Deep cobalt-to-violet gradient. NOT flat black. Saturated, atmospheric, with subtle noise texture.
2. **Background typography** — Massive "BUILD" or "SYSTEMS" at 30–40% opacity, cropped at viewport edges. Massive scale (>15vw).
3. **Hero visual artifact** — The centerpiece: a generated editorial image showing an AI workbench / computation collage. Layered documents, terminal windows, architecture diagrams, code snippets. This is the focal point.
4. **Foreground typography** — The manifesto ("I BUILD SYSTEMS FOR THINGS THAT DON'T EXIST YET.") in massive Instrument Serif, positioned asymmetrically, potentially overlapping the visual artifact.
5. **Marquee ticker** — Continuous horizontal scroll of category keywords at the bottom of the hero.

### 5.4 The Visual Artifact

The hero needs a focal visual object — not a background effect.

Content for the visual: stylized editorial collage representing AI building. Elements might include:
- Terminal/code windows
- RAG pipeline fragments
- Document chunks with vector arrows
- Architecture diagram sketches
- Project labels (Enterprise RAG, AgentForge, etc.)
- Evaluation outputs

This can be a **generated image** placed as an editorial element, not a live interactive canvas.

---

## 6. Page Philosophy

Instead of conventional website sections:

```
COVER / HERO
    ↓
INDEX
    ↓
WORK ARCHIVE
    ↓
FIELD NOTES (Thinking)
    ↓
LAB / EXPERIMENTS
    ↓
JOURNEY
    ↓
CURRENTLY BUILDING (Now)
    ↓
ASK THE ARCHIVE
```

Each section feels like a page in a publication — distinct visual territory, not repeated card grids.

---

## 7. Project Presentation

### Anti-Pattern Ban

No identical white cards in rows. No "Read More" pills.

### System Solution

Projects are **visual editorial spreads**. Content concepts become visual elements:

```
HYBRID RAG                    [architecture image]
──────────────

1,800+ CHUNKS                 BM25
6 RETRIEVAL APPROACHES         +
PAGE ATTRIBUTION              DENSE
                               +
                              RRF
                               +
                              RERANK

                FAILED:
                20–150s latency
                before optimization
```

Technical content IS the visual design. Numbers, pipeline stages, failure modes — these are layout elements, not hidden metadata.

---

## 8. Spatial System

### 8.1 Grid

Flexible asymmetric grid, not rigid 12-column:

- Desktop: 16px–120px margins, fluid columns
- Content areas respect readability (max ~680px for body text)
- Visual elements can break the grid intentionally
- Full-bleed imagery and typography allowed

### 8.2 Spacing

Strict 4px module preserved:

```
--space-1: 4px      --space-8: 32px
--space-2: 8px      --space-12: 48px
--space-4: 16px     --space-16: 64px
--space-6: 24px     --space-24: 96px
```

---

## 9. Geometry

```
--radius-none:   0px
--radius-subtle: 2px    /* Maximum for buttons/tags */
--radius-card:   4px    /* Maximum for cards/images */
```

No large border-radius. No pills. Geometry is sharp and editorial.

---

## 10. Responsive Behavior

| Element | Desktop (≥1280px) | Tablet (768–1279px) | Mobile (<768px) |
|---------|-------------------|---------------------|-----------------|
| **Hero typography** | Massive, multi-line composition | Large, stacked | Full-width, impactful |
| **Hero visual** | Large, positioned asymmetrically | Centered, scaled | Full-width, stacked |
| **Navigation** | Horizontal | Collapsed | Minimal top bar |
| **Project spreads** | Asymmetric editorial | Stacked with full-width images | Vertical scroll |
| **Marquees** | Full-speed, full-width | Maintained | Maintained, smaller type |

On mobile, the composition simplifies but does NOT become a generic mobile template. The editorial character must survive.

---

## 11. Anti-Template Manifesto (V2)

```
❌ NO flat black background (#000000)
❌ NO sparse particle backgrounds
❌ NO centered-everything layouts
❌ NO glassmorphism
❌ NO 3D floating blobs or torus shapes
❌ NO generic bento grids
❌ NO skill percentage bars
❌ NO generic stock photography
❌ NO identical card rows
❌ NO SaaS landing page patterns
❌ NO cyberpunk neon gradients
❌ NO meaningless animations
❌ NO invented metrics or vanity stats
❌ NO copying the reference portfolios literally
```

---

## 12. What This Document Preserves

From the original architecture:

- ✅ `ARCHITECTURE.md` — information architecture unchanged
- ✅ `CONTENT-MODEL.md` — data model unchanged
- ✅ `FLOW.md` — user flows unchanged
- ✅ All content entities, relationships, and editorial rules
- ✅ Story/System duality concept (visual treatment changes)
- ✅ Content validation and evidence requirements

What changed: **visual presentation**, not information structure.

---

## 13. The Recognition Test (V2)

> If all text were removed and someone viewed this from five feet away, would it be recognized as a distinctive visual system?

**YES** — because of:
- The saturated cobalt/violet color field (no other portfolio uses this exact palette)
- The massive cropped editorial typography
- The collage-layered visual artifact
- The continuous marquee tickers
- The scrapbook material language
- The sharp geometric borders in a maximal color environment

It cannot be mistaken for a dark developer portfolio, a Webflow agency template, or a minimalist GitHub Pages site.
