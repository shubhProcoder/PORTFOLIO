'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { WorkFallback } from './WorkFallback';

// Dynamically import the 3D Experience (SSR: false ensures WebGL / Canvas only runs on client)
const WorkExperience = dynamic(
  () => import('./WorkExperience').then((mod) => mod.WorkExperience),
  {
    ssr: false,
    loading: () => <WorkFallback />,
  }
);

export function WorkArchive() {
  const [use3D, setUse3D] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Check viewport size (Mobile < 768px uses lightweight tactile fallback)
    const isMobile = window.innerWidth < 768;

    // 2. Check accessibility prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // 3. Check WebGL availability
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      hasWebGL = false;
    }

    if (isMobile || prefersReducedMotion || !hasWebGL) {
      setUse3D(false);
    } else {
      setUse3D(true);
    }
  }, []);

  // During initial mount or if 3D is disabled, render standard editorial fallback
  if (use3D === false) {
    return <WorkFallback />;
  }

  if (use3D === null) {
    // Elegant immediate render matching the dark slate background
    return <WorkFallback />;
  }

  return <WorkExperience />;
}
