'use client';

import { useEffect, useRef } from 'react';

interface ObservationMatrixProps {
  activeTheme?: 'default' | 'amber' | 'blue' | 'retrieval' | 'planning';
  className?: string;
}

export function ObservationMatrix({ activeTheme = 'default', className = '' }: ObservationMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: -9999,
    y: -9999,
    active: false,
    radius: 180,
  });

  // Track activeTheme in a ref so RAF loop can read it without re-instantiating
  const themeRef = useRef(activeTheme);
  useEffect(() => {
    themeRef.current = activeTheme;
  }, [activeTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cellSize = 16;
    let time = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle canvas sizing with devicePixelRatio
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Adaptive cell size: slightly larger on mobile for performance
      cellSize = width < 640 ? 18 : 14;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);

      if (reducedMotion) {
        drawFrame(1.5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // IntersectionObserver to pause loop offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting && !reducedMotion && !animFrameRef.current) {
            animFrameRef.current = requestAnimationFrame(renderLoop);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Main Draw Function
    const drawFrame = (t: number) => {
      ctx.fillStyle = '#08090B'; // Deep carbon ground
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);

      // Theme-based wave centers
      let center1X = width * 0.3;
      let center1Y = height * 0.4;
      let center2X = width * 0.75;
      let center2Y = height * 0.6;
      let freq1 = 0.032;
      let freq2 = 0.024;
      let speedMultiplier = 1.0;

      if (themeRef.current === 'retrieval') {
        center1X = width * 0.2;
        center1Y = height * 0.3;
        freq1 = 0.045;
        speedMultiplier = 1.25;
      } else if (themeRef.current === 'planning') {
        center2X = width * 0.85;
        center2Y = height * 0.25;
        freq2 = 0.038;
        speedMultiplier = 0.85;
      }

      const mouse = mouseRef.current;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellSize + cellSize / 2;
          const y = r * cellSize + cellSize / 2;

          // Interference wave formula
          const d1 = Math.sqrt((x - center1X) ** 2 + (y - center1Y) ** 2);
          const d2 = Math.sqrt((x - center2X) ** 2 + (y - center2Y) ** 2);

          let wave =
            Math.sin(d1 * freq1 - t * 1.8 * speedMultiplier) * 0.5 +
            Math.cos(d2 * freq2 + t * 1.2 * speedMultiplier) * 0.5;

          // Cursor displacement distortion
          if (mouse.active) {
            const mDist = Math.sqrt((x - mouse.x) ** 2 + (y - mouse.y) ** 2);
            if (mDist < mouse.radius) {
              const mInfluence = (1 - mDist / mouse.radius) ** 2;
              wave += Math.sin(mDist * 0.08 - t * 4) * mInfluence * 0.8;
            }
          }

          // Normalized intensity (0 to 1)
          const norm = Math.max(0, Math.min(1, (wave + 1) * 0.5));

          // Halftone cell sizing
          const dotSize = Math.max(1.5, cellSize * 0.68 * norm);

          // Color palette mapping:
          // Low: Dark Charcoal/Slate (#161A22)
          // Mid: Slate Blue / Electric Cobalt (#3B82F6 / #64748B)
          // High: Amber Gold (#F59E0B / #FBBF24)
          let fillColor: string;
          if (norm < 0.35) {
            fillColor = 'rgba(30, 36, 48, 0.45)'; // Subtle grid skeleton
          } else if (norm < 0.65) {
            fillColor = 'rgba(70, 110, 175, 0.6)'; // Blue-slate field
          } else if (norm < 0.85) {
            fillColor = 'rgba(96, 165, 250, 0.85)'; // Electric blue shimmer
          } else {
            fillColor = 'rgba(245, 158, 11, 0.95)'; // Amber-gold interference crest
          }

          ctx.fillStyle = fillColor;

          // Render square matrix cell (halftone dither aesthetic)
          const halfDot = dotSize / 2;
          ctx.fillRect(x - halfDot, y - halfDot, dotSize, dotSize);
        }
      }
    };

    // Render loop
    const renderLoop = (timestamp: number) => {
      if (!isVisibleRef.current) {
        animFrameRef.current = null;
        return;
      }

      time = timestamp * 0.001;
      drawFrame(time);
      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    if (!reducedMotion) {
      animFrameRef.current = requestAnimationFrame(renderLoop);
    } else {
      drawFrame(1.0);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
