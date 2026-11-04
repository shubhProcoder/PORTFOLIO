'use client';

import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { WorkScene } from './WorkScene';
import { WorkOverlay } from './WorkOverlay';
import { projectsData } from './WorkFallback';

export function WorkExperience() {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll (Hamol / Awwwards Standard)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let targetProgress = 0;
    let currentProgress = 0;
    let animId: number;

    const onScroll = () => {
      if (!containerRef.current) return;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const rawProgress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
      targetProgress = rawProgress;

      // Determine active project station (0 to 3) based on scroll bands
      // Total 4 stations: 0.15, 0.40, 0.65, 0.90
      const stationStep = 1 / projectsData.length;
      const idx = Math.min(
        projectsData.length - 1,
        Math.max(0, Math.floor(rawProgress / stationStep))
      );
      setActiveIndex(idx);
    };

    // Smooth lerp loop for the 3D camera
    const updateLoop = (time: number) => {
      lenis.raf(time);

      // Smooth camera interpolation
      currentProgress += (targetProgress - currentProgress) * 0.1;
      setProgress(currentProgress);

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  const handleJumpToStation = (index: number) => {
    if (!lenisRef.current) return;
    const targetElement = document.getElementById(`station-${index}`);
    if (targetElement) {
      lenisRef.current.scrollTo(targetElement, { offset: -80, duration: 1.4 });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#080A0F] overflow-x-hidden">
      {/* ── Fixed 3D Spatial R3F WebGL Scene ───────────────────────────── */}
      <WorkScene progress={progress} activeIndex={activeIndex} />

      {/* ── Scrollable HTML Content Layer ─────────────────────────────── */}
      <WorkOverlay
        progress={progress}
        activeIndex={activeIndex}
        onJumpToStation={handleJumpToStation}
      />
    </div>
  );
}

