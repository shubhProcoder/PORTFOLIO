'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { projectsData, ProjectRecord } from './WorkFallback';

interface WorkSceneProps {
  progress: number; // 0 to 1
  activeIndex: number;
}

// ─── 3D Stations along S-curve Workbench Track ─────────────────────────────
const STATIONS = [
  {
    pos: [0, 0, 0] as [number, number, number],
    rot: [-0.08, 0.12, 0.02] as [number, number, number],
    camOffset: [0.2, 0.3, 3.4] as [number, number, number],
  },
  {
    pos: [4.2, 0.4, -6.5] as [number, number, number],
    rot: [-0.06, -0.16, -0.03] as [number, number, number],
    camOffset: [3.8, 0.6, -3.2] as [number, number, number],
  },
  {
    pos: [-3.8, -0.2, -13.5] as [number, number, number],
    rot: [-0.05, 0.22, 0.04] as [number, number, number],
    camOffset: [-3.2, 0.1, -10.2] as [number, number, number],
  },
  {
    pos: [2.6, 0.2, -20.5] as [number, number, number],
    rot: [-0.07, -0.14, -0.02] as [number, number, number],
    camOffset: [2.2, 0.4, -17.2] as [number, number, number],
  },
];

// Helper to draw high-DPI procedural docket textures on physical 3D sheets
function createProjectCardTexture(project: ProjectRecord, accentColor: string): THREE.Texture {
  if (typeof document === 'undefined') {
    return new THREE.Texture();
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 700;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background — dark technical substrate with subtle border gradient
  ctx.fillStyle = '#0D1118';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Fine inner coordinate grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Top docket header strip
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.fillRect(30, 30, canvas.width - 60, 60);

  // Border outline
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // Docket label
  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 22px monospace';
  ctx.fillText(`DOCKET // ${project.number}`, 50, 68);

  // Status Badge
  const statusX = canvas.width - 240;
  ctx.fillStyle = project.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)';
  ctx.fillRect(statusX, 42, 170, 36);
  ctx.strokeStyle = project.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)';
  ctx.strokeRect(statusX, 42, 170, 36);

  ctx.fillStyle = project.status === 'COMPLETED' ? '#34D399' : '#FBBF24';
  ctx.font = 'bold 16px monospace';
  ctx.fillText(`●  ${project.status}`, statusX + 22, 66);

  // Project Type
  ctx.fillStyle = '#94A3B8';
  ctx.font = '16px monospace';
  ctx.fillText(project.type.replace(/_/g, ' '), 280, 68);

  // Main Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 38px sans-serif';
  const titleLines = wrapText(ctx, project.title, 50, 160, canvas.width - 120, 48);

  // Context sub-header
  const contextY = 160 + titleLines * 48 + 10;
  if (project.context) {
    ctx.fillStyle = '#38BDF8';
    ctx.font = '17px monospace';
    ctx.fillText(`CONTEXT // ${project.context.substring(0, 75)}...`, 50, contextY);
  }

  // Divider
  const divY = contextY + 35;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.moveTo(50, divY);
  ctx.lineTo(canvas.width - 50, divY);
  ctx.stroke();

  // Primitives Header
  ctx.fillStyle = '#64748B';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('ARCHITECTURAL PRIMITIVES', 50, divY + 40);

  // Feature Bullets
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '20px sans-serif';
  project.core_features.slice(0, 3).forEach((feat, idx) => {
    ctx.fillStyle = '#38BDF8';
    ctx.fillText('›', 50, divY + 80 + idx * 36);
    ctx.fillStyle = '#CBD5E1';
    ctx.fillText(feat, 75, divY + 80 + idx * 36);
  });

  // Stack pills bottom
  const stackY = canvas.height - 80;
  let curX = 50;
  project.stack.slice(0, 5).forEach((t) => {
    ctx.font = '15px monospace';
    const textWidth = ctx.measureText(t).width;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(curX, stackY - 24, textWidth + 24, 32);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.strokeRect(curX, stackY - 24, textWidth + 24, 32);

    ctx.fillStyle = '#F1F5F9';
    ctx.fillText(t, curX + 12, stackY - 2);
    curX += textWidth + 36;
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// Procedural schematic diagram sheet texture
function createSchematicTexture(project: ProjectRecord): THREE.Texture {
  if (typeof document === 'undefined') {
    return new THREE.Texture();
  }

  const canvas = document.createElement('canvas');
  canvas.width = 650;
  canvas.height = 700;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#07090D';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
  ctx.lineWidth = 2;
  ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);

  // Header
  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('PIPELINE SCHEMATIC', 45, 65);

  ctx.fillStyle = '#64748B';
  ctx.font = '16px monospace';
  ctx.fillText(`FIG. ${project.number}.1`, canvas.width - 140, 65);

  // Flow boxes
  const stages =
    project.schematicType === 'rag'
      ? ['MULTI-PAGE INGESTION', 'BM25 SPARSE + DENSE VECTOR', 'RECIPROCAL RANK FUSION', 'BGE CROSS-ENCODER RERANK']
      : project.schematicType === 'agent'
      ? ['AGENT PLANNER GRAPH', 'CHAOS INJECTION LAYER (429/ERR)', 'SANDBOXED CONTAINER RUNTIME', 'IDEMPOTENCY ASSERTION SUITE']
      : project.schematicType === 'geointel'
      ? ['HISTORICAL GEOLOGICAL SCANS', 'OCR & COORDINATE PRE-PROCESS', 'PINECONE DENSE INDEX', 'GEMINI ATTRIBUTED SYNTHESIS']
      : ['UNSTRUCTURED TASK QUEUE', 'URGENCY × FRICTION SCORING', 'FLUID CONSTRAINT RESOLVER', 'OVERFLOW RECOVERY STATE LOOP'];

  let topY = 120;
  stages.forEach((stage, idx) => {
    // Stage box
    ctx.fillStyle = idx === 2 ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(45, topY, canvas.width - 90, 75);
    ctx.strokeStyle = idx === 2 ? '#38BDF8' : 'rgba(255, 255, 255, 0.12)';
    ctx.strokeRect(45, topY, canvas.width - 90, 75);

    ctx.fillStyle = '#64748B';
    ctx.font = '13px monospace';
    ctx.fillText(`STAGE 0${idx + 1} //`, 65, topY + 28);

    ctx.fillStyle = idx === 2 ? '#38BDF8' : '#F8FAFC';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(stage, 65, topY + 54);

    // Connector down arrow
    if (idx < stages.length - 1) {
      ctx.fillStyle = '#38BDF8';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('↓', canvas.width / 2 - 5, topY + 105);
      topY += 125;
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let lineCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y + lineCount * lineHeight);
      line = words[n] + ' ';
      lineCount++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y + lineCount * lineHeight);
  return lineCount + 1;
}

// ─── Individual 3D Document Station Cluster ────────────────────────────────
function ProjectStationCluster({
  project,
  index,
  pos,
  rot,
  isActive,
}: {
  project: ProjectRecord;
  index: number;
  pos: [number, number, number];
  rot: [number, number, number];
  isActive: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const cardTex = useMemo(() => createProjectCardTexture(project, '#38BDF8'), [project]);
  const schematicTex = useMemo(() => createSchematicTexture(project), [project]);

  // Subtle floating breathing animation
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() + index * 1.5;
    groupRef.current.position.y = pos[1] + Math.sin(t * 0.8) * 0.05;
    groupRef.current.rotation.z = rot[2] + Math.sin(t * 0.6) * 0.015;
  });

  return (
    <group ref={groupRef} position={pos} rotation={rot}>
      {/* Primary Docket Sheet */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 2.8, 0.04]} />
        <meshStandardMaterial
          map={cardTex}
          roughness={0.4}
          metalness={0.1}
          emissive="#38BDF8"
          emissiveIntensity={isActive ? 0.08 : 0.01}
        />
      </mesh>

      {/* Companion Schematic Sheet (Layered to the right with counter tilt) */}
      <mesh
        castShadow
        receiveShadow
        position={[2.6, -0.15, -0.45]}
        rotation={[0.04, -0.25, -0.04]}
      >
        <boxGeometry args={[2.5, 2.7, 0.03]} />
        <meshStandardMaterial
          map={schematicTex}
          roughness={0.5}
          metalness={0.15}
          emissive="#2563EB"
          emissiveIntensity={isActive ? 0.09 : 0.01}
        />
      </mesh>

      {/* Local Spotlight when Station is Active */}
      <spotLight
        position={[0, 3, 2.5]}
        target-position={pos}
        intensity={isActive ? 8 : 1.5}
        color={isActive ? '#38BDF8' : '#60A5FA'}
        angle={0.7}
        penumbra={0.8}
        distance={8}
      />
    </group>
  );
}

// ─── Camera Controller driven by Scroll Progress ───────────────────────────
function CameraRig({ progress }: { progress: number }) {
  const currentPos = useRef(new THREE.Vector3(0, 1.2, 5.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Clamped normalized progress [0, 1]
    const p = Math.max(0, Math.min(1, progress));

    // Calculate station indices and local fraction
    const totalSegments = STATIONS.length - 1;
    const scaled = p * totalSegments;
    const fromIdx = Math.floor(scaled);
    const toIdx = Math.min(fromIdx + 1, totalSegments);
    const alpha = scaled - fromIdx;

    // Smooth cubic easing between waypoints
    const easeAlpha = alpha * alpha * (3 - 2 * alpha);

    const fromStation = STATIONS[fromIdx];
    const toStation = STATIONS[toIdx];

    // Target Camera Position
    const targetX = THREE.MathUtils.lerp(fromStation.camOffset[0], toStation.camOffset[0], easeAlpha);
    const targetY = THREE.MathUtils.lerp(fromStation.camOffset[1], toStation.camOffset[1], easeAlpha);
    const targetZ = THREE.MathUtils.lerp(fromStation.camOffset[2], toStation.camOffset[2], easeAlpha);

    // Target Look-At Point
    const lookX = THREE.MathUtils.lerp(fromStation.pos[0], toStation.pos[0], easeAlpha);
    const lookY = THREE.MathUtils.lerp(fromStation.pos[1], toStation.pos[1], easeAlpha);
    const lookZ = THREE.MathUtils.lerp(fromStation.pos[2], toStation.pos[2], easeAlpha);

    // Smooth lerp for silky smooth 60fps tracking
    currentPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.08);
    currentLookAt.current.lerp(new THREE.Vector3(lookX, lookY, lookZ), 0.08);
  });

  return <CameraController pos={currentPos.current} lookAt={currentLookAt.current} />;
}

function CameraController({ pos, lookAt }: { pos: THREE.Vector3; lookAt: THREE.Vector3 }) {
  useFrame(({ camera }) => {
    camera.position.copy(pos);
    camera.lookAt(lookAt);
  });
  return null;
}

// ─── Main WorkScene R3F Canvas ─────────────────────────────────────────────
export function WorkScene({ progress, activeIndex }: WorkSceneProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        {/* Deep Atmospheric Fog */}
        <color attach="background" args={['#080A0F']} />
        <fog attach="fog" args={['#080A0F', 5, 26]} />

        {/* Studio Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FFFFFF" />
        <directionalLight position={[-5, 4, -5]} intensity={0.4} color="#38BDF8" />

        {/* 3D Coordinate Workbench Ground Grid */}
        <gridHelper
          args={[60, 60, '#1E293B', '#0F172A']}
          position={[0, -2.2, -10]}
        />

        {/* 4 Project Document Stations */}
        {projectsData.map((project, idx) => (
          <ProjectStationCluster
            key={project.id}
            project={project}
            index={idx}
            pos={STATIONS[idx].pos}
            rot={STATIONS[idx].rot}
            isActive={activeIndex === idx}
          />
        ))}

        {/* Camera Rig driven by Scroll */}
        <CameraRig progress={progress} />
      </Canvas>
    </div>
  );
}
