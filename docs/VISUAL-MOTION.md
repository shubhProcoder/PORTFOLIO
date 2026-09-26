# VISUAL-MOTION.md — V2

## Computational Scrapbook: Motion & Kinetic System
### Portfolio of Shubh Mehrotra — AI Product Builder & Systems Engineer

**Document Status:** Source of Truth for Motion Design (V2 — Art Direction Pivot)  
**Version:** 2.0  
**Date:** 2026-09-27  
**Derived From:** `DESIGN.md` v3.0, `ARCHITECTURE.md`, Visual References  
**Governs:** All animation, motion, transitions, and interactive behavior.  
**Replaces:** VISUAL-MOTION.md v1.0 (mission-control motion — abandoned)

---

## 1. Motion Philosophy (V2)

Motion should feel **physical and editorial**, not computational or dashboardlike.

Think: pages being arranged, collage elements layered, a camera panning across a designer's worktable.

NOT: particles drifting, data streams flowing, nodes pulsing.

### Three Jobs of Motion

1. **Create spatial depth** — Parallax layers, z-movement, physical overlap
2. **Establish editorial rhythm** — Continuous marquees, sequential reveals, page-like transitions
3. **Reward interaction** — Hover physicality, tap responses, cursor-aware movement

If a motion effect doesn't do one of these three jobs, cut it.

---

## 2. Engine Ownership (Unchanged)

```
Canvas/WebGL  →  Generative visual atmosphere ONLY when it adds art
GSAP          →  Marquees, scroll choreography, large-scale parallax
Motion        →  Local UI interactions, component hover/tap/entry
```

No DOM element has its transform owned by more than one engine.  
No `requestAnimationFrame` loop without `IntersectionObserver` pause.  
Full `prefers-reduced-motion` fallback for every effect.

---

## 3. Hero Motion

### 3.1 Color Field

The background gradient is NOT animated with complex procedural noise.

It can have:
- A very slow, subtle hue shift (30–60s cycle) via CSS or Canvas
- Gentle noise/grain texture overlay
- NO cursor-chasing gradient movement

### 3.2 Background Typography

The massive background text ("BUILD" / "SYSTEMS") is static or very slowly drifting:
- Slow horizontal drift: ~120s full cycle, or static
- No parallax against scroll (it's a background texture, not a layer)

### 3.3 Hero Visual Artifact

The focal image/collage can have:
- **Subtle parallax** on scroll (moves at 0.85x scroll speed)
- **Gentle hover response** — shifts 2–4px in response to cursor, not chasing
- NO rapid cursor-tracking. The visual is editorial, not interactive.

### 3.4 Foreground Typography

The manifesto text enters with a controlled reveal:
- **Mask reveal** or **opacity + translate** entrance
- Duration: 600–800ms, staggered by line (100ms between lines)
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — fast start, gentle settle
- Runs ONCE on page load, not on every scroll intersection

### 3.5 Marquee Tickers

Continuous GSAP horizontal scroll:
- Duration: 30–45s per full loop
- `ease: "none"`, `repeat: -1`
- Reduced-motion: freeze as static text
- Content: editorial keywords from the content taxonomy

---

## 4. Scroll Motion

### 4.1 Section Reveals

Sections fade/translate in as they enter viewport:
- Offset: 20–32px vertical
- Duration: 400–500ms
- Easing: `--ease-mechanical` or `cubic-bezier(0.16, 1, 0.3, 1)`
- Stagger for multi-element groups: 60–80ms
- Owner: **Motion** (`whileInView`)

### 4.2 Image Reveals

Images scale or clip-reveal as they enter:
- Scale from 1.05 → 1.0 with overflow hidden (zoom-in reveal)
- Or mask/clip-path reveal from one edge
- Duration: 600–800ms
- Owner: **GSAP ScrollTrigger** for complex sequences, **Motion** for simple reveals

### 4.3 Parallax Layers

Collage elements move at different scroll speeds:
- Background images: 0.7–0.85x scroll speed
- Foreground elements: 1.0x (normal)
- Floating labels/annotations: 1.1–1.2x (slight overshoot)
- Owner: **GSAP ScrollTrigger**

---

## 5. Interactive Motion

### 5.1 Project Cards

Cards should feel like physical sheets:

```
normal state
    ↓
hover (200ms):
    - slight rotation (1–2°)
    - subtle shadow step increase
    - image inside the card shifts 4–8px (parallax)
    - metadata label appears
    
active/click:
    - immediate snap back to 0° rotation
    - scale 0.98 (press)
    - release → navigate
```

Owner: **Motion** (gesture model)

### 5.2 CTA Buttons

- Hover: border color transition + slight translate-y (-2px)
- Active: press down (+1px translate-y)
- Duration: 120–160ms
- Owner: **Motion**

### 5.3 Navigation Links

- Hover: color transition only (→ accent color)
- Duration: var(--time-fast, 140ms)
- No scale or translate
- Owner: **CSS transitions**

---

## 6. Marquee System

Marquees are a core visual element, not decoration.

### 6.1 Section Dividers

Between major sections, a thin marquee strip:

```
──── AI SYSTEMS ✳ RAG ✳ AGENTS ✳ PRODUCT BUILDING ✳ EXPERIMENTS ────
```

- Height: 40–56px
- Background: accent color (varies by section context)
- Typography: monospace, 12–14px, uppercase
- Speed: 25–35s per loop
- Owner: **GSAP**

### 6.2 Hero Marquee

Larger, more expressive:

```
SHUBH MEHROTRA ✳ AI PRODUCT BUILDER ✳ SYSTEMS THINKER ✳
```

- Massive type (3–6rem)
- Low opacity (15–25%) or outlined
- Speed: 40–50s per loop

---

## 7. Page Transitions

Between sections, transitions should feel like **turning pages of an archive**:

- Sections don't just fade in — they assemble
- Elements arrive from different edges
- Staggered timing creates a feeling of arrangement
- No single dramatic wipe or slide

---

## 8. Reduced Motion

Every effect has a reduced-motion fallback:

| Effect | Full Motion | Reduced Motion |
|--------|-------------|----------------|
| Marquees | Continuous scroll | Static, single instance |
| Hero text | Staggered reveal | Immediate display |
| Scroll reveals | Translate + opacity | Immediate display |
| Card hover | Rotation + parallax | Color change only |
| Parallax | Multi-speed layers | All layers at 1.0x |
| Background gradient | Slow hue shift | Static gradient |
| Image reveals | Scale/clip animation | Immediate display |

---

## 9. Performance Boundaries

| Metric | Budget |
|--------|--------|
| Hero LCP | < 2.5s |
| Animation frame budget | < 12ms per frame |
| Total JS bundle (animation) | < 80KB gzipped |
| Simultaneous GSAP tweens | < 6 |
| Canvas usage | Only if generative art adds meaning |

If any animation causes dropped frames on a mid-range Android device, it becomes a static fallback.

---

## 10. What Changed from V1

| V1 (Mission Control) | V2 (Computational Scrapbook) |
|---|---|
| Dark substrate with particle field | Saturated color field with editorial texture |
| Cursor dipole physics | Gentle hover parallax on focal visual |
| Node-and-line graph patterns | Collage/image-based visual artifacts |
| Technical telemetry bar | Verified metadata in monospace |
| Centered composition | Asymmetric editorial layout |
| Minimal color (bone + faint cobalt) | Expressive palette (cobalt, violet, lime, coral) |
| Motion = computational simulation | Motion = physical/editorial arrangement |
| Canvas as primary visual | Generated image as primary visual |

What did NOT change:
- Engine ownership rules
- Reduced-motion requirements
- Performance budgets
- Content integrity rules
- IntersectionObserver lifecycle
