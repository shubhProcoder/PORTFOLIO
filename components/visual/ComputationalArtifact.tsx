'use client';

/**
 * ComputationalArtifact — V4
 *
 * The centrepiece of the hero. A layered DOM composition representing
 * Shubh's actual working world: Hybrid RAG, AgentForge, evaluation traces.
 *
 * No stock photography. No generic laptop. No AI brain.
 * These are technical artifacts built from real project vocabulary.
 *
 * Pure CSS/SVG — no canvas, no WebGL. Sharp on retina.
 * CSS animations provide drift. GSAP cursor parallax added by parent.
 */
export function ComputationalArtifact() {
  return (
    <div
      className="relative"
      style={{
        width: 'min(520px, 90vw)',
        height: 'min(480px, 80vw)',
      }}
      data-artifact="computational-workbench"
    >

      {/* ── Layer 0: Glow halo behind everything ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '70%', height: '60%',
          top: '20%', left: '15%',
          background: 'radial-gradient(ellipse, rgba(29,78,216,0.25) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 1: Architecture diagram — cream panel, back-left ── */}
      <div
        className="absolute doc-panel grain-panel animate-drift-down"
        style={{
          width: '72%', height: '58%',
          top: '5%', left: '0%',
          transform: 'rotate(-3deg)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.12)',
          zIndex: 10,
          padding: '20px',
        }}
      >
        <div className="flex items-center justify-between mb-4 pb-2" style={{ borderBottom: '1px solid rgba(8,7,6,0.12)' }}>
          <span className="type-micro" style={{ color: 'rgba(8,7,6,0.4)' }}>HYBRID_RAG.arch — v3</span>
          <span className="type-micro" style={{ color: '#DC2626' }}>● ACTIVE</span>
        </div>

        {/* RAG Architecture SVG */}
        <svg viewBox="0 0 280 160" className="w-full" style={{ height: 'auto' }} aria-label="Hybrid RAG architecture diagram">
          <defs>
            <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#0E2284" />
            </marker>
          </defs>

          {/* QUERY */}
          <rect x="2" y="65" width="54" height="28" rx="2" fill="none" stroke="#0E2284" strokeWidth="1.5" />
          <text x="29" y="83" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#080706" fontWeight="500">QUERY</text>

          {/* Splitter arrows */}
          <line x1="56" y1="79" x2="82" y2="50" stroke="#0E2284" strokeWidth="1" markerEnd="url(#arr)" />
          <line x1="56" y1="79" x2="82" y2="109" stroke="#0E2284" strokeWidth="1" markerEnd="url(#arr)" />

          {/* DENSE */}
          <rect x="84" y="36" width="54" height="28" rx="2" fill="#EBF2FF" stroke="#1D4ED8" strokeWidth="1.5" />
          <text x="111" y="54" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#1D4ED8" fontWeight="600">DENSE</text>

          {/* BM25 */}
          <rect x="84" y="96" width="54" height="28" rx="2" fill="#EBF2FF" stroke="#1D4ED8" strokeWidth="1.5" />
          <text x="111" y="114" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#1D4ED8" fontWeight="600">BM25</text>

          {/* Merge arrows */}
          <line x1="138" y1="50" x2="162" y2="72" stroke="#0E2284" strokeWidth="1" markerEnd="url(#arr)" />
          <line x1="138" y1="110" x2="162" y2="88" stroke="#0E2284" strokeWidth="1" markerEnd="url(#arr)" />

          {/* RRF */}
          <rect x="164" y="62" width="44" height="28" rx="14" fill="#0E2284" />
          <text x="186" y="80" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="white" fontWeight="600">RRF</text>

          {/* RERANK arrow */}
          <line x1="208" y1="76" x2="230" y2="76" stroke="#0E2284" strokeWidth="1" markerEnd="url(#arr)" />

          {/* RERANK */}
          <rect x="232" y="62" width="46" height="28" rx="2" fill="#F0ECE2" stroke="#0E2284" strokeWidth="1.5" />
          <text x="255" y="80" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#080706" fontWeight="500">RERANK</text>

          {/* Annotation */}
          <text x="140" y="148" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="rgba(8,7,6,0.35)">1,800+ CHUNKS · PAGE ATTRIBUTION · HYBRID SCORING</text>
        </svg>
      </div>

      {/* ── Layer 2: Terminal/trace — dark screen, front-right ── */}
      <div
        className="absolute doc-panel-dark animate-drift-up"
        style={{
          width: '58%', height: '52%',
          top: '28%', right: '0%',
          transform: 'rotate(2.5deg)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(74,222,128,0.15)',
          zIndex: 20,
          padding: '14px 16px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '9px',
          lineHeight: '1.7',
        }}
      >
        <div className="flex items-center gap-2 mb-3" style={{ borderBottom: '1px solid rgba(74,222,128,0.15)', paddingBottom: '8px' }}>
          <span style={{ color: '#DC2626', fontSize: '8px' }}>●</span>
          <span style={{ color: 'rgba(74,222,128,0.5)', fontSize: '7px', letterSpacing: '0.1em' }}>AGENTFORGE — trace_0x9f2a</span>
        </div>
        <div style={{ color: 'rgba(74,222,128,0.6)' }}>
          <div><span style={{ color: 'rgba(74,222,128,0.35)' }}>$</span> run eval --suite rag_v3</div>
          <div style={{ color: 'rgba(74,222,128,0.35)', marginTop: '2px' }}>&gt; loading harness...</div>
          <div style={{ color: 'rgba(74,222,128,0.5)', marginTop: '2px' }}>&gt; 161 tests queued</div>
          <div style={{ marginTop: '6px' }}>
            <span style={{ color: '#4ADE80' }}>PASS</span>
            <span style={{ color: 'rgba(74,222,128,0.35)' }}> retrieval_hybrid</span>
          </div>
          <div>
            <span style={{ color: '#4ADE80' }}>PASS</span>
            <span style={{ color: 'rgba(74,222,128,0.35)' }}> rerank_cross_enc</span>
          </div>
          <div>
            <span style={{ color: '#F59E0B' }}>WARN</span>
            <span style={{ color: 'rgba(74,222,128,0.35)' }}> latency: 142ms</span>
          </div>
          <div>
            <span style={{ color: '#4ADE80' }}>PASS</span>
            <span style={{ color: 'rgba(74,222,128,0.35)' }}> page_attribution</span>
          </div>
          <div style={{ marginTop: '6px', color: 'rgba(74,222,128,0.35)' }}>─────────────────</div>
          <div style={{ marginTop: '2px' }}>
            <span style={{ color: '#4ADE80', fontWeight: 600 }}>161 passed</span>
            <span style={{ color: 'rgba(74,222,128,0.35)' }}> / 1 skipped</span>
          </div>
        </div>
      </div>

      {/* ── Layer 3: Floating signal label — EVALUATION: PASS ── */}
      <div
        className="absolute type-label animate-drift-up"
        style={{
          top: '8%', right: '12%',
          transform: 'rotate(-6deg)',
          backgroundColor: '#DC2626',
          color: 'white',
          padding: '6px 14px',
          border: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 24px rgba(220,38,38,0.4)',
          zIndex: 30,
          letterSpacing: '0.15em',
          animationDelay: '-2s',
        }}
        aria-hidden="true"
      >
        EVAL: PASS
      </div>

      {/* ── Layer 4: Index stamp — bottom-left ── */}
      <div
        className="absolute type-micro"
        style={{
          bottom: '6%', left: '4%',
          color: 'rgba(167,139,250,0.7)',
          zIndex: 25,
          lineHeight: '1.6',
        }}
        aria-hidden="true"
      >
        <div>01 / HYBRID RAG</div>
        <div>02 / AGENTFORGE</div>
        <div>03 / GEOINTEL AI</div>
        <div style={{ color: 'rgba(167,139,250,0.35)', marginTop: '4px' }}>── COMPUTATIONAL WORKBENCH</div>
      </div>

      {/* ── Layer 5: Cobalt line accent — architectural ── */}
      <svg
        className="absolute pointer-events-none"
        style={{ inset: 0, width: '100%', height: '100%', zIndex: 5 }}
        aria-hidden="true"
      >
        <line x1="5%" y1="92%" x2="35%" y2="92%" stroke="rgba(29,78,216,0.3)" strokeWidth="1" />
        <line x1="35%" y1="92%" x2="35%" y2="75%" stroke="rgba(29,78,216,0.3)" strokeWidth="1" />
        <circle cx="35%" cy="75%" r="2" fill="rgba(29,78,216,0.5)" />
      </svg>

    </div>
  );
}
