'use client';

/**
 * AuroraCanvas — Hybrid "Ink & Glow" Background Layer
 *
 * Context: Hero & Work Grid (dark-mode surface)
 *
 * Implementation: Pure CSS + SVG feGaussianBlur (Option 1 approach).
 * - No WebGL dependency. No external library. Zero JS animation loop.
 * - Three organic glow shapes driven by independent CSS @keyframes.
 * - Film-grain noise overlay masks digital banding artifacts.
 * - Fully non-blocking: pointer-events: none, z-index: -1.
 * - prefers-reduced-motion: all animations freeze instantly.
 *
 * Color System (from globals.css & DESIGN.md §3.1):
 *   --color-glow-1: #2B4AE8  (cobalt  — dominant anchor, 60% opacity)
 *   --color-glow-2: #7B3FE4  (violet  — tension/depth,   50% opacity)
 *   --color-glow-3: #C9B8F0  (lavender— ambient whisper,  38% opacity)
 *
 * Variant: "dark"  → glows on #0C0E14 ink base  (Hero / Work Grid)
 * Variant: "light" → ultra-low opacity edge glows on #FAF7F2 paper base (Case Studies)
 */

interface AuroraCanvasProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function AuroraCanvas({ variant = 'dark', className = '' }: AuroraCanvasProps) {
  const isDark = variant === 'dark';

  return (
    <>
      {/* ── Inline keyframes + reduced-motion override ─────────────────── */}
      <style>{`
        @keyframes aurora-drift-1 {
          0%   { transform: translate(0px, 0px)    scale(1.00) rotate(0deg);   }
          33%  { transform: translate(40px, -30px) scale(1.08) rotate(6deg);   }
          66%  { transform: translate(-20px, 20px) scale(0.96) rotate(-4deg);  }
          100% { transform: translate(0px, 0px)    scale(1.00) rotate(0deg);   }
        }
        @keyframes aurora-drift-2 {
          0%   { transform: translate(0px, 0px)     scale(1.00) rotate(0deg);  }
          40%  { transform: translate(-50px, 25px)  scale(1.06) rotate(-8deg); }
          75%  { transform: translate(30px, -15px)  scale(1.03) rotate(5deg);  }
          100% { transform: translate(0px, 0px)     scale(1.00) rotate(0deg);  }
        }
        @keyframes aurora-drift-3 {
          0%   { transform: translate(0px, 0px)    scale(1.00) rotate(0deg);   }
          50%  { transform: translate(25px, 35px)  scale(1.05) rotate(10deg);  }
          100% { transform: translate(0px, 0px)    scale(1.00) rotate(0deg);   }
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-glow-1,
          .aurora-glow-2,
          .aurora-glow-3 { animation: none !important; }
        }
      `}</style>

      {/* ── Inline SVG blur filter definition ──────────────────────────── */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <filter id="aurora-blur-heavy">
            <feGaussianBlur stdDeviation="80" />
          </filter>
          <filter id="aurora-blur-soft">
            <feGaussianBlur stdDeviation="55" />
          </filter>
        </defs>
      </svg>

      {/* ── Glow layer wrapper ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* ── Glow 1 — Cobalt: dominant anchor, bottom-left ────────────── */}
        <div
          className="aurora-glow-1"
          style={{
            position: 'absolute',
            bottom: isDark ? '-10%' : '-5%',
            left: isDark ? '-5%' : '-8%',
            width: '65%',
            height: '75%',
            borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
            background: `#2B4AE8`,
            opacity: isDark ? 0.62 : 0.10,
            filter: 'url(#aurora-blur-heavy)',
            willChange: 'transform',
            animation: 'aurora-drift-1 28s ease-in-out infinite',
          }}
        />

        {/* ── Glow 2 — Violet: tension layer, top-right ────────────────── */}
        <div
          className="aurora-glow-2"
          style={{
            position: 'absolute',
            top: isDark ? '-15%' : '-8%',
            right: isDark ? '-8%' : '-10%',
            width: '55%',
            height: '65%',
            borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%',
            background: `#7B3FE4`,
            opacity: isDark ? 0.50 : 0.09,
            filter: 'url(#aurora-blur-heavy)',
            willChange: 'transform',
            animation: 'aurora-drift-2 36s ease-in-out infinite',
          }}
        />

        {/* ── Glow 3 — Lavender: ambient whisper, center ───────────────── */}
        <div
          className="aurora-glow-3"
          style={{
            position: 'absolute',
            top: '30%',
            left: '25%',
            width: '45%',
            height: '50%',
            borderRadius: '70% 30% 50% 50% / 40% 60% 40% 60%',
            background: `#C9B8F0`,
            opacity: isDark ? 0.38 : 0.12,
            filter: 'url(#aurora-blur-soft)',
            willChange: 'transform',
            animation: 'aurora-drift-3 22s ease-in-out infinite',
          }}
        />

        {/* ── Film grain noise overlay (masks digital banding) ─────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isDark ? 0.055 : 0.035,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
            mixBlendMode: isDark ? 'soft-light' : 'multiply',
          }}
        />
      </div>
    </>
  );
}

