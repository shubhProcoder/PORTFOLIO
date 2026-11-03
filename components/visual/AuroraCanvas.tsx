'use client';

/**
 * AuroraCanvas — Atmospheric Ambient Mesh / Aurora Layer
 *
 * Inspired by HackerRank & Stripe's ultra-slow, organic liquid mesh gradients.
 *
 * Key Characteristics (HackerRank style):
 * - Ultra-slow cycle times (50s – 84s) for a calm, breathing atmospheric feel.
 * - Massive diffusion blur (stdDeviation 130px + 95px) so edges dissolve into clouds.
 * - Four organic drifting centroids with non-repeating cubic harmonic intervals.
 * - Grain noise overlay prevents 8-bit color banding artifacts.
 * - Zero JS overhead: 100% GPU-accelerated CSS transforms + SVG feGaussianBlur.
 * - prefers-reduced-motion: freezes instantaneously into an elegant static mesh.
 * - Strictly non-interactive: pointer-events: none, z-index: 0.
 *
 * Variants:
 *   - "hackerrank" (or "light"): Ethereal mint, soft cyan, pastel lime on clean light base.
 *   - "dark": Electric cobalt, saturated violet, lavender whisper on deep ink.
 */

interface AuroraCanvasProps {
  variant?: 'dark' | 'light' | 'hackerrank';
  className?: string;
  speed?: 'slow' | 'ultraslow';
}

export function AuroraCanvas({
  variant = 'dark',
  className = '',
  speed = 'ultraslow',
}: AuroraCanvasProps) {
  const isHackerRank = variant === 'hackerrank' || variant === 'light';

  // Ultra-slow cycle multipliers (HackerRank style uses 50-84s loops)
  const duration1 = speed === 'ultraslow' ? '65s' : '45s';
  const duration2 = speed === 'ultraslow' ? '78s' : '52s';
  const duration3 = speed === 'ultraslow' ? '56s' : '38s';
  const duration4 = speed === 'ultraslow' ? '84s' : '60s';

  // Palette selection based on variant
  const colors = isHackerRank
    ? {
        // HackerRank luminous fresh palette
        blob1: '#67E8F9', // Soft cyan / aqua
        blob2: '#6EE7B7', // HackerRank soft mint
        blob3: '#BEF264', // Pastel lime / spring glow
        blob4: '#A5F3FC', // Whispering sky tint
        baseBg: 'transparent',
        opacity1: 0.42,
        opacity2: 0.38,
        opacity3: 0.35,
        opacity4: 0.28,
        noiseOpacity: 0.03,
        noiseBlend: 'multiply' as const,
      }
    : {
        // Engineering dark ink palette (Cobalt + Violet + Lavender)
        blob1: '#2B4AE8', // Cobalt anchor
        blob2: '#7B3FE4', // Violet tension
        blob3: '#C9B8F0', // Lavender ambient
        blob4: '#38BDF8', // Subtle sky spark
        baseBg: 'transparent',
        opacity1: 0.58,
        opacity2: 0.46,
        opacity3: 0.34,
        opacity4: 0.25,
        noiseOpacity: 0.05,
        noiseBlend: 'soft-light' as const,
      };

  return (
    <>
      {/* ── Ultra-slow drifting harmonic keyframes ───────────────────────── */}
      <style>{`
        @keyframes hr-aurora-drift-1 {
          0%   { transform: translate3d(0, 0, 0) scale(1.0) rotate(0deg); }
          25%  { transform: translate3d(60px, -45px, 0) scale(1.12) rotate(8deg); }
          50%  { transform: translate3d(20px, 35px, 0) scale(0.94) rotate(-5deg); }
          75%  { transform: translate3d(-50px, -20px, 0) scale(1.06) rotate(6deg); }
          100% { transform: translate3d(0, 0, 0) scale(1.0) rotate(0deg); }
        }

        @keyframes hr-aurora-drift-2 {
          0%   { transform: translate3d(0, 0, 0) scale(1.0) rotate(0deg); }
          30%  { transform: translate3d(-70px, 50px, 0) scale(1.09) rotate(-10deg); }
          60%  { transform: translate3d(45px, -30px, 0) scale(0.92) rotate(7deg); }
          85%  { transform: translate3d(-25px, 20px, 0) scale(1.04) rotate(-4deg); }
          100% { transform: translate3d(0, 0, 0) scale(1.0) rotate(0deg); }
        }

        @keyframes hr-aurora-drift-3 {
          0%   { transform: translate3d(0, 0, 0) scale(1.0) rotate(0deg); }
          35%  { transform: translate3d(40px, 60px, 0) scale(1.15) rotate(12deg); }
          70%  { transform: translate3d(-35px, -40px, 0) scale(0.88) rotate(-8deg); }
          100% { transform: translate3d(0, 0, 0) scale(1.0) rotate(0deg); }
        }

        @keyframes hr-aurora-drift-4 {
          0%   { transform: translate3d(0, 0, 0) scale(1.0) rotate(0deg); }
          40%  { transform: translate3d(-45px, -55px, 0) scale(1.08) rotate(9deg); }
          75%  { transform: translate3d(55px, 25px, 0) scale(0.95) rotate(-6deg); }
          100% { transform: translate3d(0, 0, 0) scale(1.0) rotate(0deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hr-aurora-shape {
            animation: none !important;
          }
        }
      `}</style>

      {/* ── Heavy Gaussian Blur SVG filters for cloud-like dispersion ───── */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <filter id="hr-aurora-blur-ultra" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="130" />
          </filter>
          <filter id="hr-aurora-blur-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="95" />
          </filter>
        </defs>
      </svg>

      {/* ── Container ─────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none ${className}`}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 0,
          background: colors.baseBg,
        }}
      >
        {/* Shape 1: Top-left / West centroid (Cyan / Aqua on light; Cobalt on dark) */}
        <div
          className="hr-aurora-shape"
          style={{
            position: 'absolute',
            top: '-15%',
            left: '-10%',
            width: '68vw',
            height: '68vw',
            maxWidth: '900px',
            maxHeight: '900px',
            borderRadius: '62% 38% 70% 30% / 45% 55% 45% 55%',
            background: colors.blob1,
            opacity: colors.opacity1,
            filter: 'url(#hr-aurora-blur-ultra)',
            willChange: 'transform',
            animation: `hr-aurora-drift-1 ${duration1} ease-in-out infinite`,
          }}
        />

        {/* Shape 2: Top-right / East centroid (Mint on light; Violet on dark) */}
        <div
          className="hr-aurora-shape"
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-12%',
            width: '62vw',
            height: '62vw',
            maxWidth: '850px',
            maxHeight: '850px',
            borderRadius: '40% 60% 35% 65% / 60% 40% 60% 40%',
            background: colors.blob2,
            opacity: colors.opacity2,
            filter: 'url(#hr-aurora-blur-ultra)',
            willChange: 'transform',
            animation: `hr-aurora-drift-2 ${duration2} ease-in-out infinite`,
          }}
        />

        {/* Shape 3: Bottom-center / South-East (Pastel Lime on light; Lavender on dark) */}
        <div
          className="hr-aurora-shape"
          style={{
            position: 'absolute',
            bottom: '-18%',
            right: '15%',
            width: '55vw',
            height: '55vw',
            maxWidth: '750px',
            maxHeight: '750px',
            borderRadius: '52% 48% 62% 38% / 38% 62% 38% 62%',
            background: colors.blob3,
            opacity: colors.opacity3,
            filter: 'url(#hr-aurora-blur-soft)',
            willChange: 'transform',
            animation: `hr-aurora-drift-3 ${duration3} ease-in-out infinite`,
          }}
        />

        {/* Shape 4: Subtle central harmonic fill */}
        <div
          className="hr-aurora-shape"
          style={{
            position: 'absolute',
            top: '25%',
            left: '20%',
            width: '45vw',
            height: '45vw',
            maxWidth: '650px',
            maxHeight: '650px',
            borderRadius: '65% 35% 45% 55% / 50% 50% 50% 50%',
            background: colors.blob4,
            opacity: colors.opacity4,
            filter: 'url(#hr-aurora-blur-ultra)',
            willChange: 'transform',
            animation: `hr-aurora-drift-4 ${duration4} ease-in-out infinite`,
          }}
        />

        {/* ── Anti-banding film grain overlay ─────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: colors.noiseOpacity,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
            mixBlendMode: colors.noiseBlend,
          }}
        />
      </div>
    </>
  );
}
