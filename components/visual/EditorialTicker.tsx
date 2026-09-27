'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function EditorialTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    let tween: gsap.core.Tween | null = null;
    tween = gsap.to(trackRef.current, {
      xPercent: -50, ease: 'none', duration: 35, repeat: -1,
    });
    return () => { tween?.kill(); };
  }, []);

  const content = 'RAG ✦ AGENTS ✦ EVALUATION ✦ PRODUCT ✦ SYSTEMS ✦ EXPERIMENTS ✦ LEARNING ✦ BUILDING ✦ ';

  return (
    <div
      className="absolute bottom-0 left-0 right-0 overflow-hidden"
      style={{
        zIndex: 50,
        height: '38px',
        background: 'rgba(79, 110, 247, 0.08)',
        borderTop: '1px solid rgba(79, 110, 247, 0.15)',
        backdropFilter: 'blur(8px)',
      }}
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex items-center h-full whitespace-nowrap will-change-transform">
        {[0, 1].map(i => (
          <span
            key={i}
            className="type-label"
            style={{ color: 'rgba(79, 110, 247, 0.7)', paddingRight: '2rem', letterSpacing: '0.18em' }}
          >
            {content.repeat(3)}
          </span>
        ))}
      </div>
    </div>
  );
}
