"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import ConceptMotif from "@/components/ConceptMotif";

// Literal product wireframes: each shows what the project's UI actually IS
// (panels, canvas, cards, controls) in the site's dark + accent line language,
// with one subtle animated element. Clear and honest (obviously a wireframe,
// not a faked screenshot). The accent is the project's status color.

type P = { accent: string; active?: boolean };

const WIRE = "#FFFFFF";

function Frame({
  accent,
  children,
}: {
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface2 to-bg">
      <svg
        viewBox="0 0 320 200"
        className="h-full w-full"
        style={{ filter: `drop-shadow(0 0 6px ${accent}22)` }}
      >
        {children}
      </svg>
    </div>
  );
}

// shared app window chrome (top bar + tool dots + a control)
function shell(so: number) {
  return (
    <>
      <rect x="22" y="18" width="276" height="164" rx="10" fill="none" stroke={WIRE} strokeOpacity={so} strokeWidth="1" />
      <line x1="22" y1="42" x2="298" y2="42" stroke={WIRE} strokeOpacity={so * 0.8} strokeWidth="1" />
      <rect x="34" y="27" width="7" height="7" rx="2" fill={WIRE} fillOpacity={so} />
      <rect x="46" y="27" width="7" height="7" rx="2" fill={WIRE} fillOpacity={so} />
      <rect x="58" y="27" width="7" height="7" rx="2" fill={WIRE} fillOpacity={so} />
      <rect x="266" y="27" width="22" height="8" rx="4" fill={WIRE} fillOpacity={so} />
    </>
  );
}

// Analogical Engines: a canvas that pulls idea-cards from two distant domains
// and synthesizes a new idea between them.
function Analogical({ accent, active }: P) {
  const reduce = useReducedMotion();
  const dot = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const a = [150, 71];
    const c = [160, 86];
    const b = [168, 100];
    const set = (p: number) => {
      const x = (1 - p) * (1 - p) * a[0] + 2 * (1 - p) * p * c[0] + p * p * b[0];
      const y = (1 - p) * (1 - p) * a[1] + 2 * (1 - p) * p * c[1] + p * p * b[1];
      dot.current?.setAttribute("cx", x.toFixed(1));
      dot.current?.setAttribute("cy", y.toFixed(1));
      dot.current?.setAttribute("opacity", (p < 0.08 || p > 0.94 ? 0 : 0.9).toFixed(2));
    };
    if (reduce) return set(0.5);
    let raf = 0;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (start === null) start = ts;
      set(((ts - start) / 1800) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const so = active ? 0.26 : 0.18;
  const card = (x: number, y: number) => (
    <g>
      <rect x={x} y={y} width="44" height="30" rx="4" fill="none" stroke={WIRE} strokeOpacity={so} strokeWidth="1" />
      <rect x={x + 7} y={y + 8} width="24" height="3" rx="1.5" fill={WIRE} fillOpacity={so} />
      <rect x={x + 7} y={y + 16} width="30" height="3" rx="1.5" fill={WIRE} fillOpacity={so * 0.7} />
    </g>
  );
  return (
    <Frame accent={accent}>
      {shell(so)}
      <line x1="92" y1="42" x2="92" y2="182" stroke={WIRE} strokeOpacity={so * 0.8} strokeWidth="1" />
      {[56, 70, 84, 98].map((y, i) => (
        <rect key={y} x="34" y={y} width="44" height="6" rx="2" fill={i === 1 ? accent : WIRE} fillOpacity={i === 1 ? 0.5 : so} />
      ))}
      {card(106, 56)}
      {card(106, 100)}
      {card(232, 62)}
      {card(232, 108)}
      <g stroke={accent} strokeOpacity={active ? 0.7 : 0.5} strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M150 71 Q160 86 168 100" />
        <path d="M150 115 Q160 112 168 112" />
        <path d="M232 77 Q224 92 216 102" />
        <path d="M232 123 Q224 118 216 114" />
      </g>
      <rect x="168" y="90" width="48" height="34" rx="5" fill={accent} fillOpacity="0.1" stroke={accent} strokeOpacity={active ? 0.9 : 0.7} strokeWidth="1.2" style={{ filter: `drop-shadow(0 0 6px ${accent}55)` }} />
      <circle cx="179" cy="100" r="3.2" fill={accent} fillOpacity={active ? 0.95 : 0.8} />
      <rect x="187" y="98.5" width="20" height="3" rx="1.5" fill={accent} fillOpacity="0.6" />
      <rect x="176" y="112" width="32" height="3" rx="1.5" fill={accent} fillOpacity="0.4" />
      <circle ref={dot} r="2.6" fill={accent} style={{ filter: `drop-shadow(0 0 5px ${accent})` }} />
    </Frame>
  );
}

// UI for AI: a spatial canvas of generated outputs — one selected with handles,
// steered by a control instead of a chat box. The output responds to the knob.
function UiForAi({ accent, active }: P) {
  const reduce = useReducedMotion();
  const knob = useRef<SVGCircleElement>(null);
  const sun = useRef<SVGCircleElement>(null);
  const sel = useRef<SVGRectElement>(null);
  useEffect(() => {
    const set = (e: number) => {
      const t = (Math.sin(e * Math.PI * 2) + 1) / 2;
      knob.current?.setAttribute("cx", (52 + t * 88).toFixed(1));
      sun.current?.setAttribute("cx", (130 + t * 60).toFixed(1));
      sel.current?.setAttribute("stroke-opacity", (0.55 + t * 0.4).toFixed(2));
    };
    if (reduce) return set(0.25);
    let raf = 0;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (start === null) start = ts;
      set((ts - start) / 2600);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const so = active ? 0.26 : 0.18;
  const handle = (x: number, y: number) => (
    <rect x={x - 2.5} y={y - 2.5} width="5" height="5" rx="1" fill={accent} fillOpacity={active ? 0.95 : 0.8} />
  );
  const variant = (x: number, y: number) => (
    <g>
      <rect x={x} y={y} width="50" height="40" rx="5" fill="none" stroke={WIRE} strokeOpacity={so} strokeWidth="1" />
      <rect x={x + 6} y={y + 6} width="38" height="20" rx="3" fill={WIRE} fillOpacity={so * 0.5} />
      <circle cx={x + 16} cy={y + 16} r="4" fill={WIRE} fillOpacity={so} />
      <rect x={x + 6} y={y + 30} width="24" height="3" rx="1.5" fill={WIRE} fillOpacity={so} />
    </g>
  );
  return (
    <Frame accent={accent}>
      {shell(so)}
      <rect ref={sel} x="46" y="54" width="118" height="74" rx="6" fill="none" stroke={accent} strokeOpacity="0.7" strokeWidth="1.3" style={{ filter: `drop-shadow(0 0 6px ${accent}44)` }} />
      <rect x="54" y="62" width="102" height="44" rx="4" fill={WIRE} fillOpacity={so * 0.5} />
      <line x1="54" y1="98" x2="156" y2="98" stroke={WIRE} strokeOpacity={so} strokeWidth="1" />
      <circle ref={sun} cy="86" r="6" fill={accent} fillOpacity={active ? 0.9 : 0.7} />
      <rect x="54" y="112" width="60" height="4" rx="2" fill={WIRE} fillOpacity={so} />
      {handle(46, 54)}
      {handle(164, 54)}
      {handle(46, 128)}
      {handle(164, 128)}
      <line x1="105" y1="54" x2="105" y2="46" stroke={accent} strokeOpacity="0.7" strokeWidth="1" />
      <circle cx="105" cy="44" r="2.4" fill={accent} />
      {variant(226, 56)}
      {variant(226, 104)}
      <rect x="40" y="146" width="130" height="26" rx="6" fill="none" stroke={WIRE} strokeOpacity={so} strokeWidth="1" />
      <line x1="52" y1="159" x2="140" y2="159" stroke={WIRE} strokeOpacity={so} strokeWidth="1" />
      <circle ref={knob} cy="159" r="4" fill={accent} style={{ filter: `drop-shadow(0 0 4px ${accent})` }} />
      <rect x="150" y="153" width="12" height="12" rx="3" fill={WIRE} fillOpacity={so} />
    </Frame>
  );
}

// Honda 99P Labs: an in-car HMI. A signal chevron travels up the road toward
// the car ahead; audio waveform + haptic ripple mark the multimodal cues.
function Honda({ accent, active }: P) {
  const reduce = useReducedMotion();
  const chev = useRef<SVGGElement>(null);
  const bars = useRef<(SVGRectElement | null)[]>([]);
  useEffect(() => {
    const set = (e: number) => {
      const p = e % 1;
      const y = 150 - p * 64;
      chev.current?.setAttribute("transform", `translate(160 ${y.toFixed(1)})`);
      chev.current?.setAttribute("opacity", (p < 0.1 || p > 0.9 ? 0 : 0.9).toFixed(2));
      bars.current.forEach((bar, i) => {
        if (!bar) return;
        const h = 4 + (Math.sin(e * Math.PI * 2 + i) * 0.5 + 0.5) * 12;
        bar.setAttribute("height", h.toFixed(1));
        bar.setAttribute("y", (162 - h).toFixed(1));
      });
    };
    if (reduce) return set(0.4);
    let raf = 0;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (start === null) start = ts;
      set((ts - start) / 2200);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const so = active ? 0.26 : 0.18;
  return (
    <Frame accent={accent}>
      <rect x="22" y="24" width="276" height="152" rx="14" fill="none" stroke={WIRE} strokeOpacity={so} strokeWidth="1" />
      <g stroke={WIRE} strokeOpacity={so} strokeWidth="1" fill="none">
        <path d="M96 172 L150 82" />
        <path d="M224 172 L170 82" />
        <line x1="120" y1="140" x2="200" y2="140" />
        <line x1="134" y1="112" x2="186" y2="112" />
      </g>
      <rect x="150" y="80" width="20" height="14" rx="3" fill="none" stroke={WIRE} strokeOpacity={active ? 0.4 : 0.3} strokeWidth="1" />
      <path d="M154 130 L160 124 L166 130" stroke={accent} strokeOpacity="0.25" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g ref={chev} stroke={accent} strokeOpacity="0.9" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px ${accent})` }}>
        <path d="M-6 5 L0 -1 L6 5" />
      </g>
      <g fill={accent} fillOpacity={active ? 0.8 : 0.6}>
        {[40, 48, 56, 64].map((x, i) => (
          <rect key={x} ref={(el) => { bars.current[i] = el; }} x={x} y="150" width="4" height="12" rx="1.5" />
        ))}
      </g>
      <g fill="none" stroke={accent}>
        <circle cx="252" cy="152" r="4" strokeOpacity="0.8" />
        <circle cx="252" cy="152" r="9" strokeOpacity="0.4" />
        <circle cx="252" cy="152" r="14" strokeOpacity="0.18" />
      </g>
    </Frame>
  );
}

// Zelig: a styling grid of AI-generated outfit cards (one selected), with a
// mobile companion view and a generating shimmer sweeping the grid.
function Zelig({ accent, active }: P) {
  const reduce = useReducedMotion();
  const scan = useRef<SVGRectElement>(null);
  useEffect(() => {
    const set = (e: number) => {
      const p = e % 1;
      scan.current?.setAttribute("x", (36 + p * 184).toFixed(1));
      scan.current?.setAttribute("opacity", (p < 0.05 || p > 0.95 ? 0 : 0.45).toFixed(2));
    };
    if (reduce) return set(0.3);
    let raf = 0;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (start === null) start = ts;
      set((ts - start) / 2800);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const so = active ? 0.26 : 0.18;
  const look = (x: number, hl?: boolean) => (
    <g>
      <rect x={x} y="54" width="56" height="84" rx="6" fill="none" stroke={hl ? accent : WIRE} strokeOpacity={hl ? 0.7 : so} strokeWidth={hl ? 1.3 : 1} style={hl ? { filter: `drop-shadow(0 0 5px ${accent}44)` } : undefined} />
      <rect x={x + 18} y="62" width="20" height="22" rx="4" fill={hl ? accent : WIRE} fillOpacity={hl ? 0.35 : so * 0.7} />
      <rect x={x + 20} y="86" width="16" height="22" rx="3" fill={hl ? accent : WIRE} fillOpacity={hl ? 0.3 : so * 0.6} />
      <rect x={x + 8} y="116" width="28" height="3" rx="1.5" fill={WIRE} fillOpacity={so} />
      <rect x={x + 8} y="124" width="18" height="3" rx="1.5" fill={accent} fillOpacity="0.5" />
    </g>
  );
  return (
    <Frame accent={accent}>
      {shell(so)}
      {look(36)}
      {look(100, true)}
      {look(164)}
      {!reduce && <rect ref={scan} x="36" y="54" width="2" height="84" fill={accent} fillOpacity="0.4" />}
      <rect x="232" y="92" width="54" height="82" rx="10" fill="#0C0C10" stroke={WIRE} strokeOpacity={so} strokeWidth="1" />
      <rect x="252" y="96" width="14" height="2.5" rx="1.25" fill={WIRE} fillOpacity={so} />
      <rect x="238" y="104" width="42" height="44" rx="5" fill={WIRE} fillOpacity={so * 0.4} />
      <rect x="252" y="110" width="14" height="16" rx="3" fill={accent} fillOpacity="0.3" />
      <rect x="253" y="128" width="12" height="12" rx="2" fill={accent} fillOpacity="0.25" />
      <rect x="240" y="154" width="28" height="3" rx="1.5" fill={WIRE} fillOpacity={so} />
      <rect x="240" y="161" width="18" height="3" rx="1.5" fill={accent} fillOpacity="0.4" />
    </Frame>
  );
}

// Conversational Cues: a chat panel whose cue (highlighted) branches into a
// widening idea tree on the right. A pulse travels out along a branch.
function IdeationCues({ accent, active }: P) {
  const reduce = useReducedMotion();
  const dot = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const pts: [number, number][] = [[140, 108], [186, 84], [240, 68]];
    const set = (e: number) => {
      const p = e % 1;
      const seg = p * (pts.length - 1);
      const i = Math.min(Math.floor(seg), pts.length - 2);
      const f = seg - i;
      const a = pts[i];
      const b = pts[i + 1];
      dot.current?.setAttribute("cx", (a[0] + (b[0] - a[0]) * f).toFixed(1));
      dot.current?.setAttribute("cy", (a[1] + (b[1] - a[1]) * f).toFixed(1));
      dot.current?.setAttribute("opacity", (p > 0.95 ? 0 : 0.9).toFixed(2));
    };
    if (reduce) return set(0.5);
    let raf = 0;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (start === null) start = ts;
      set((ts - start) / 2200);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const so = active ? 0.26 : 0.18;
  const bubble = (x: number, y: number, w: number, cue?: boolean) => (
    <g>
      <rect x={x} y={y} width={w} height="15" rx="5" fill={cue ? accent : WIRE} fillOpacity={cue ? 0.18 : so * 0.7} stroke={cue ? accent : "none"} strokeOpacity={cue ? 0.6 : 0} strokeWidth="1" />
      <rect x={x + 6} y={y + 6} width={w - 16} height="3" rx="1.5" fill={cue ? accent : WIRE} fillOpacity={cue ? 0.6 : so} />
    </g>
  );
  const node = (x: number, y: number, hl?: boolean) => (
    <circle cx={x} cy={y} r={hl ? 4 : 3} fill={hl ? accent : WIRE} fillOpacity={hl ? 0.9 : so * 1.6} />
  );
  return (
    <Frame accent={accent}>
      {shell(so)}
      <line x1="118" y1="42" x2="118" y2="182" stroke={WIRE} strokeOpacity={so * 0.8} strokeWidth="1" />
      {bubble(32, 54, 64)}
      {bubble(44, 76, 62)}
      {bubble(32, 98, 70)}
      {bubble(34, 120, 60, true)}
      <rect x="32" y="150" width="74" height="14" rx="5" fill="none" stroke={WIRE} strokeOpacity={so} strokeWidth="1" />
      <g stroke={accent} strokeOpacity={active ? 0.5 : 0.38} strokeWidth="1.1" fill="none" strokeLinecap="round">
        <path d="M140 108 Q165 96 186 84" />
        <path d="M140 108 Q165 120 186 132" />
        <path d="M186 84 Q214 74 240 68" />
        <path d="M186 84 Q214 88 240 102" />
        <path d="M186 132 Q214 118 240 128" />
        <path d="M186 132 Q214 142 240 156" />
      </g>
      {node(140, 108, true)}
      {node(186, 84)}
      {node(186, 132)}
      {node(240, 68)}
      {node(240, 102)}
      {node(240, 128)}
      {node(240, 156)}
      <circle ref={dot} r="2.6" fill={accent} style={{ filter: `drop-shadow(0 0 5px ${accent})` }} />
    </Frame>
  );
}

// Information Seeking: scattered sources (left) resolve through connections into
// one organized map of understanding (right). A pulse travels in from a source.
function InformationSeeking({ accent, active }: P) {
  const reduce = useReducedMotion();
  const dot = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const a = [70, 70];
    const c = [150, 120];
    const b = [214, 104];
    const set = (p: number) => {
      const x = (1 - p) * (1 - p) * a[0] + 2 * (1 - p) * p * c[0] + p * p * b[0];
      const y = (1 - p) * (1 - p) * a[1] + 2 * (1 - p) * p * c[1] + p * p * b[1];
      dot.current?.setAttribute("cx", x.toFixed(1));
      dot.current?.setAttribute("cy", y.toFixed(1));
      dot.current?.setAttribute("opacity", (p < 0.06 || p > 0.94 ? 0 : 0.9).toFixed(2));
    };
    if (reduce) return set(0.5);
    let raf = 0;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (start === null) start = ts;
      set(((ts - start) / 2200) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const so = active ? 0.26 : 0.18;
  return (
    <Frame accent={accent}>
      {shell(so)}
      <g stroke={accent} strokeOpacity={active ? 0.4 : 0.3} strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M70 70 Q150 120 214 104" />
        <path d="M58 120 Q140 120 214 104" />
        <path d="M92 150 Q160 130 214 104" />
        <path d="M110 58 Q170 80 214 104" />
      </g>
      <g stroke={WIRE} strokeOpacity={so} fill="none" strokeWidth="1">
        <rect x="58" y="56" width="24" height="18" rx="3" transform="rotate(-8 70 65)" />
        <circle cx="58" cy="120" r="9" />
        <rect x="80" y="142" width="22" height="16" rx="3" transform="rotate(6 91 150)" />
        <rect x="100" y="48" width="20" height="20" rx="3" transform="rotate(10 110 58)" />
      </g>
      <g fill={WIRE} fillOpacity={so * 0.8}>
        <rect x="62" y="62" width="14" height="2.5" rx="1" transform="rotate(-8 70 65)" />
        <rect x="62" y="67" width="10" height="2.5" rx="1" transform="rotate(-8 70 65)" />
      </g>
      <g stroke={accent} strokeOpacity={active ? 0.55 : 0.4} strokeWidth="1" fill="none">
        <line x1="214" y1="104" x2="250" y2="78" />
        <line x1="214" y1="104" x2="258" y2="108" />
        <line x1="214" y1="104" x2="244" y2="138" />
        <line x1="250" y1="78" x2="258" y2="108" />
      </g>
      <circle cx="250" cy="78" r="4" fill={accent} fillOpacity="0.5" />
      <circle cx="258" cy="108" r="4" fill={accent} fillOpacity="0.5" />
      <circle cx="244" cy="138" r="4" fill={accent} fillOpacity="0.5" />
      <rect x="202" y="92" width="24" height="24" rx="5" fill={accent} fillOpacity="0.12" stroke={accent} strokeOpacity={active ? 0.9 : 0.7} strokeWidth="1.3" style={{ filter: `drop-shadow(0 0 6px ${accent}55)` }} />
      <circle cx="214" cy="104" r="3" fill={accent} fillOpacity="0.9" />
      <circle ref={dot} r="2.4" fill={accent} style={{ filter: `drop-shadow(0 0 5px ${accent})` }} />
    </Frame>
  );
}

export default function Wireframe({
  id,
  accent = "#5B9DFF",
  active,
}: {
  id: string;
  accent?: string;
  active?: boolean;
}) {
  switch (id) {
    case "analogical-engines":
      return <Analogical accent={accent} active={active} />;
    case "ui-for-ai":
      return <UiForAi accent={accent} active={active} />;
    case "honda":
      return <Honda accent={accent} active={active} />;
    case "zelig":
      return <Zelig accent={accent} active={active} />;
    case "ideation-cues":
      return <IdeationCues accent={accent} active={active} />;
    case "information-seeking":
      return <InformationSeeking accent={accent} active={active} />;
    default:
      return <ConceptMotif id={id} accent={accent} active={active} />;
  }
}
