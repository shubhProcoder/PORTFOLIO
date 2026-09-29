'use client';

import { useEffect, useRef } from 'react';

interface ObservationCanvasProps {
  activeTheme: 'retrieval' | 'planning';
}

// Theme-specific conceptual graph nodes
const THEME_GRAPHS = {
  retrieval: {
    nodes: [
      { label: 'QUERY', x: 0.18, y: 0.22 },
      { label: 'BM25', x: 0.32, y: 0.38 },
      { label: 'DENSE', x: 0.22, y: 0.52 },
      { label: 'RRF', x: 0.44, y: 0.45 },
      { label: 'RERANKER', x: 0.60, y: 0.35 },
      { label: 'RESULT', x: 0.74, y: 0.22 },
    ],
    edges: [
      [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [4, 5],
    ] as [number, number][],
  },
  planning: {
    nodes: [
      { label: 'INTENT', x: 0.20, y: 0.18 },
      { label: 'PRIORITY', x: 0.20, y: 0.34 },
      { label: 'SCHEDULE', x: 0.20, y: 0.50 },
      { label: 'SLACK', x: 0.38, y: 0.42 },
      { label: 'EXECUTE', x: 0.20, y: 0.66 },
      { label: 'REPLAN', x: 0.40, y: 0.58 },
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [5, 4],
    ] as [number, number][],
  },
};

export function ObservationCanvas({ activeTheme }: ObservationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const themeRef = useRef(activeTheme);

  useEffect(() => {
    themeRef.current = activeTheme;
  }, [activeTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      if (reducedMotion) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // 1. Subtle warm paper grid — 48px cells
      const gridSize = 48;
      ctx.strokeStyle = 'rgba(49, 94, 168, 0.055)';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([]);
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // 2. Coordinate tick marks (sparse — every 4 grid cells)
      ctx.fillStyle = 'rgba(49, 94, 168, 0.10)';
      ctx.textAlign = 'left';
      for (let xi = 0; xi * gridSize * 4 <= w; xi++) {
        for (let yi = 0; yi * gridSize * 4 <= h; yi++) {
          const px = xi * gridSize * 4;
          const py = yi * gridSize * 4;
          ctx.strokeStyle = 'rgba(49, 94, 168, 0.12)';
          ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(px - 4, py); ctx.lineTo(px + 4, py); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(px, py - 4); ctx.lineTo(px, py + 4); ctx.stroke();
        }
      }

      // 3. Theme-reactive conceptual graph — printed-behind-paper feel
      const graph = THEME_GRAPHS[themeRef.current];
      const nodePositions = graph.nodes.map(n => ({ x: n.x * w, y: n.y * h, label: n.label }));

      ctx.strokeStyle = 'rgba(49, 94, 168, 0.07)';
      ctx.lineWidth = 0.75;
      ctx.setLineDash([3, 8]);
      for (const [a, b] of graph.edges) {
        const na = nodePositions[a];
        const nb = nodePositions[b];
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      for (const node of nodePositions) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(183, 131, 24, 0.15)';
        ctx.fill();
        ctx.fillStyle = 'rgba(49, 94, 168, 0.10)';
        ctx.font = `bold 7px "IBM Plex Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - 6);
      }

      // 4. Sparse data cluster dots (scatter, pseudo-random, static)
      const seed = themeRef.current === 'retrieval' ? 42 : 137;
      const pseudoRand = (i: number) => {
        const x = Math.sin(i * seed + 1.23) * 43758.5453;
        return x - Math.floor(x);
      };
      ctx.fillStyle = 'rgba(49, 94, 168, 0.05)';
      for (let i = 0; i < 55; i++) {
        const px = pseudoRand(i * 3) * w;
        const py = pseudoRand(i * 3 + 1) * h;
        const r = pseudoRand(i * 3 + 2) * 2 + 0.5;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Faint amber contour arcs — behind the hero, upper right
      ctx.strokeStyle = 'rgba(183, 131, 24, 0.04)';
      ctx.lineWidth = 0.75;
      ctx.setLineDash([2, 16]);
      const cx = w * 0.72;
      const cy = h * 0.2;
      for (const r of [w * 0.16, w * 0.26, w * 0.36]) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    };

    resize();
    window.addEventListener('resize', resize);

    // Static draw only — no animation loop needed for this quiet background
    draw();

    // Redraw on theme change is handled by parent re-rendering the component
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeTheme]); // re-run when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
