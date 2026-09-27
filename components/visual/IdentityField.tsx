'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * MovingIdentity — V5.1
 *
 * Two tracks of "SHUBH MEHROTRA" both moving right → left.
 * Different speeds and opacities create natural depth.
 * Light, minimal, no opposite directions.
 */
export function MovingIdentity() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Both move right → left, different speeds
    const t1 = gsap.to(track1Ref.current, {
      xPercent: -50, ease: 'none', duration: 50, repeat: -1,
    });
    const t2 = gsap.to(track2Ref.current, {
      xPercent: -50, ease: 'none', duration: 80, repeat: -1,
    });

    return () => { t1.kill(); t2.kill(); };
  }, []);

  const name = 'SHUBH MEHROTRA  ';

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* Track 1 — outlined, faster, upper */}
      <div className="absolute will-change-transform" style={{ top: '14%' }}>
        <div ref={track1Ref} className="flex whitespace-nowrap">
          {[0, 1].map(i => (
            <span
              key={i}
              className="type-identity-bg"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(79, 110, 247, 0.13)',
                paddingRight: '3rem',
              }}
            >
              {name.repeat(5)}
            </span>
          ))}
        </div>
      </div>

      {/* Track 2 — soft filled, slower, lower */}
      <div className="absolute will-change-transform" style={{ top: '55%' }}>
        <div ref={track2Ref} className="flex whitespace-nowrap">
          {[0, 1].map(i => (
            <span
              key={i}
              className="type-identity-bg"
              style={{
                color: 'rgba(124, 58, 237, 0.055)',
                fontStyle: 'italic',
                paddingRight: '3rem',
              }}
            >
              {name.repeat(5)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
