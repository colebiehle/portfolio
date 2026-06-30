"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import ConceptMotif from "@/components/ConceptMotif";

// Concept-in-UI illustrations: each project's core idea drawn inside a device
// frame (phone for the apps, browser for the tools), in the site's line/node
// language and tinted to the project's accent. Falls back to ConceptMotif.

type P = { accent: string; active?: boolean };
const WIRE = "#FFFFFF";

function Frame({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface2 to-bg">
      <svg viewBox="0 0 320 200" className="h-full w-full">
        {children}
      </svg>
    </div>
  );
}

function PhoneShell({ accent, so, children }: { accent: string; so: number; children: React.ReactNode }) {
  return (
    <>
      <rect x="112" y="10" width="96" height="180" rx="15" fill="#0C0C10" stroke={WIRE} strokeOpacity={so} strokeWidth="1" style={{ filter: `drop-shadow(0 0 9px ${accent}33)` }} />
      <rect x="150" y="18" width="20" height="2.5" rx="1.25" fill={WIRE} fillOpacity={so} />
      {children}
      <rect x="150" y="181" width="20" height="2" rx="1" fill={WIRE} fillOpacity={so * 0.8} />
    </>
  );
}

function BrowserShell({ accent, so, children }: { accent: string; so: number; children: React.ReactNode }) {
  return (
    <>
      <rect x="30" y="22" width="260" height="156" rx="10" fill="#0C0C10" stroke={WIRE} strokeOpacity={so} strokeWidth="1" style={{ filter: `drop-shadow(0 0 9px ${accent}33)` }} />
      <line x1="30" y1="40" x2="290" y2="40" stroke={WIRE} strokeOpacity={so * 0.8} strokeWidth="1" />
      <circle cx="42" cy="31" r="2.4" fill={WIRE} fillOpacity={so} />
      <circle cx="52" cy="31" r="2.4" fill={WIRE} fillOpacity={so} />
      <circle cx="62" cy="31" r="2.4" fill={WIRE} fillOpacity={so} />
      <rect x="84" y="27" width="130" height="8" rx="4" fill={WIRE} fillOpacity={so * 0.5} />
      {children}
    </>
  );
}

// Bumble: a profile with a highlighted "mutual friends" row that pulses.
function Bumble({ accent, active }: P) {
  const reduce = useReducedMotion();
  const ring = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const set = (e: number) => {
      const rp = e % 1;
      ring.current?.setAttribute("r", (7 + rp * 9).toFixed(1));
      ring.current?.setAttribute("opacity", ((1 - rp) * 0.6).toFixed(2));
    };
    if (reduce) { set(0.3); return; }
    let raf = 0; let start: number | null = null;
    const loop = (ts: number) => { if (start === null) start = ts; set((ts - start) / 1800); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);
  const so = active ? 0.4 : 0.28;
  return (
    <Frame accent={accent}><PhoneShell accent={accent} so={so}>
      <circle cx="160" cy="58" r="17" fill={accent} fillOpacity="0.18" stroke={accent} strokeOpacity={active ? 0.9 : 0.7} strokeWidth="1.3" />
      <circle cx="160" cy="53" r="6" fill={accent} fillOpacity="0.5" />
      <path d="M150 66 Q160 60 170 66" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
      <rect x="142" y="84" width="36" height="4" rx="2" fill={WIRE} fillOpacity={so} />
      <rect x="148" y="92" width="24" height="3" rx="1.5" fill={WIRE} fillOpacity={so * 0.7} />
      <line x1="126" y1="106" x2="194" y2="106" stroke={WIRE} strokeOpacity={so * 0.5} strokeWidth="0.8" />
      <rect x="126" y="113" width="30" height="3" rx="1.5" fill={WIRE} fillOpacity={so} />
      <circle cx="138" cy="131" r="7" fill="#0C0C10" stroke={WIRE} strokeOpacity={so + 0.1} strokeWidth="1" />
      <circle cx="152" cy="131" r="7" fill="#0C0C10" stroke={WIRE} strokeOpacity={so + 0.1} strokeWidth="1" />
      <circle ref={ring} cx="166" cy="131" fill="none" stroke={accent} strokeWidth="1.2" />
      <circle cx="166" cy="131" r="7" fill={accent} fillOpacity="0.2" stroke={accent} strokeOpacity={active ? 0.95 : 0.8} strokeWidth="1.3" style={{ filter: `drop-shadow(0 0 5px ${accent}66)` }} />
      <rect x="128" y="150" width="64" height="14" rx="7" fill={accent} fillOpacity={active ? 0.9 : 0.7} />
    </PhoneShell></Frame>
  );
}

// Spotify: a now-playing screen with a dial you turn and an equalizer.
function Spotify({ accent, active }: P) {
  const reduce = useReducedMotion();
  const ptr = useRef<SVGLineElement>(null);
  const knob = useRef<SVGCircleElement>(null);
  const bars = useRef<(SVGRectElement | null)[]>([]);
  useEffect(() => {
    const cx = 160, cy = 138, r = 16;
    const set = (e: number) => {
      const a = Math.sin(e * 0.8) * 1.1 - Math.PI / 2;
      const ex = cx + Math.cos(a) * r, ey = cy + Math.sin(a) * r;
      ptr.current?.setAttribute("x2", ex.toFixed(1)); ptr.current?.setAttribute("y2", ey.toFixed(1));
      knob.current?.setAttribute("cx", ex.toFixed(1)); knob.current?.setAttribute("cy", ey.toFixed(1));
      bars.current.forEach((b, i) => { if (!b) return; const h = 4 + (Math.sin(e * 1.6 + i) * 0.5 + 0.5) * 9; b.setAttribute("height", h.toFixed(1)); b.setAttribute("y", (172 - h).toFixed(1)); });
    };
    if (reduce) { set(0.4); return; }
    let raf = 0; let start: number | null = null;
    const loop = (ts: number) => { if (start === null) start = ts; set((ts - start) / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);
  const so = active ? 0.4 : 0.28;
  return (
    <Frame accent={accent}><PhoneShell accent={accent} so={so}>
      <rect x="132" y="38" width="56" height="56" rx="6" fill={accent} fillOpacity="0.2" stroke={accent} strokeOpacity={active ? 0.7 : 0.5} strokeWidth="1" />
      <circle cx="160" cy="66" r="8" fill={accent} fillOpacity="0.4" /><circle cx="160" cy="66" r="2.5" fill="#0C0C10" />
      <rect x="132" y="102" width="44" height="4" rx="2" fill={WIRE} fillOpacity={so} />
      <rect x="132" y="110" width="30" height="3" rx="1.5" fill={WIRE} fillOpacity={so * 0.7} />
      <circle cx="160" cy="138" r="22" fill="none" stroke={WIRE} strokeOpacity={so * 0.6} strokeWidth="1" />
      <circle cx="160" cy="138" r="16" fill="none" stroke={accent} strokeOpacity={active ? 0.7 : 0.5} strokeWidth="1.3" />
      <line ref={ptr} x1="160" y1="138" x2="160" y2="122" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
      <circle ref={knob} cx="160" cy="122" r="3" fill={accent} style={{ filter: `drop-shadow(0 0 5px ${accent})` }} />
      <circle cx="160" cy="138" r="2.5" fill={WIRE} fillOpacity={so + 0.2} />
      <g fill={accent} fillOpacity={active ? 0.8 : 0.6}>
        {[140, 150, 160, 170, 180].map((x, i) => (<rect key={x} ref={(el) => { bars.current[i] = el; }} x={x} y="162" width="4" height="10" rx="1.5" />))}
      </g>
    </PhoneShell></Frame>
  );
}

// Zelig: a figure trying on looks, the outfit cycling from a swatch row.
function Zelig({ accent, active }: P) {
  const reduce = useReducedMotion();
  const body = useRef<SVGPathElement>(null);
  const sw = useRef<(SVGRectElement | null)[]>([]);
  useEffect(() => {
    const shades = [accent, "#C77BFF", "#FF9E6B"];
    const set = (e: number) => {
      const i = Math.floor(e) % 3;
      body.current?.setAttribute("fill", shades[i]);
      sw.current.forEach((r, k) => { if (r) r.setAttribute("opacity", k === i ? "1" : "0.4"); });
    };
    if (reduce) { set(0); return; }
    let raf = 0; let start: number | null = null;
    const loop = (ts: number) => { if (start === null) start = ts; set((ts - start) / 1400); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce, accent]);
  const so = active ? 0.4 : 0.28;
  return (
    <Frame accent={accent}><PhoneShell accent={accent} so={so}>
      <circle cx="160" cy="56" r="11" fill="none" stroke={WIRE} strokeOpacity={so + 0.15} strokeWidth="1.3" />
      <path ref={body} d="M146 72 Q160 66 174 72 L178 132 Q160 140 142 132 Z" fill={accent} fillOpacity="0.85" style={{ filter: `drop-shadow(0 0 6px ${accent}44)` }} />
      {[136, 156, 176].map((x, i) => (<rect key={x} ref={(el) => { sw.current[i] = el; }} x={x} y="150" width="14" height="14" rx="3" fill="none" stroke={accent} strokeOpacity={active ? 0.8 : 0.6} strokeWidth="1.3" opacity={i === 0 ? 1 : 0.4} />))}
    </PhoneShell></Frame>
  );
}

// Analogical: a canvas where an idea leaps between two distant domain clusters.
function Analogical({ accent, active }: P) {
  const reduce = useReducedMotion();
  const beam = useRef<SVGPathElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const burst = useRef<SVGCircleElement>(null);
  const Lc: [number, number][] = [[78, 90], [100, 106], [72, 120], [96, 130]];
  const Rc: [number, number][] = [[244, 92], [222, 108], [250, 122], [226, 132]];
  useEffect(() => {
    const a = [88, 102], b = [232, 102], cx = 160, cy = 66;
    const set = (e: number) => {
      const p = e % 1;
      beam.current?.setAttribute("d", `M ${a[0]} ${a[1]} Q ${cx} ${cy} ${b[0]} ${b[1]}`);
      beam.current?.setAttribute("stroke-dashoffset", String(1 - p));
      const mx = (1 - p) * (1 - p) * a[0] + 2 * (1 - p) * p * cx + p * p * b[0];
      const my = (1 - p) * (1 - p) * a[1] + 2 * (1 - p) * p * cy + p * p * b[1];
      dot.current?.setAttribute("cx", mx.toFixed(1)); dot.current?.setAttribute("cy", my.toFixed(1));
      dot.current?.setAttribute("opacity", (p < 0.05 || p > 0.96 ? 0 : 0.95).toFixed(2));
      const tp = p > 0.78 ? (p - 0.78) / 0.22 : 0;
      burst.current?.setAttribute("r", (3 + tp * 12).toFixed(1));
      burst.current?.setAttribute("opacity", (tp > 0 ? (1 - tp) * 0.7 : 0).toFixed(2));
    };
    if (reduce) { set(0.5); return; }
    let raf = 0; let start: number | null = null;
    const loop = (ts: number) => { if (start === null) start = ts; set((ts - start) / 2000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);
  const so = active ? 0.42 : 0.3;
  const links = (pts: [number, number][]) => pts.map((n, i) => (<line key={i} x1={pts[0][0]} y1={pts[0][1]} x2={n[0]} y2={n[1]} stroke={accent} strokeOpacity={so * 0.7} strokeWidth="0.7" />));
  return (
    <Frame accent={accent}><BrowserShell accent={accent} so={so}>
      <g fill="none">{links(Lc)}{links(Rc)}</g>
      <g fill={accent} fillOpacity={active ? 0.85 : 0.65}>{[...Lc, ...Rc].map((n, i) => (<circle key={i} cx={n[0]} cy={n[1]} r="2.6" />))}</g>
      <circle ref={burst} cx="232" cy="102" fill="none" stroke={accent} strokeWidth="1.2" opacity="0" />
      <path ref={beam} fill="none" stroke={accent} strokeWidth="1.4" strokeLinecap="round" pathLength={1} strokeDasharray="1" />
      <circle ref={dot} r="3.2" fill={accent} style={{ filter: `drop-shadow(0 0 5px ${accent})` }} />
    </BrowserShell></Frame>
  );
}

// Cozu: scattered knowledge flowing into a vault that retains it.
function Cozu({ accent, active }: P) {
  const reduce = useReducedMotion();
  const dot = useRef<SVGCircleElement>(null);
  const sources: [number, number][] = [[64, 68], [54, 104], [80, 138], [102, 56], [96, 152]];
  const target = [212, 104];
  useEffect(() => {
    const set = (e: number) => {
      const p = e % 1;
      const s = sources[Math.floor(e) % sources.length];
      const cx = s[0] + (target[0] - s[0]) * p, cy = s[1] + (target[1] - s[1]) * p;
      dot.current?.setAttribute("cx", cx.toFixed(1)); dot.current?.setAttribute("cy", cy.toFixed(1));
      dot.current?.setAttribute("opacity", (p > 0.92 ? 0 : 0.95).toFixed(2));
    };
    if (reduce) { set(0.5); return; }
    let raf = 0; let start: number | null = null;
    const loop = (ts: number) => { if (start === null) start = ts; set((ts - start) / 1300); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);
  const so = active ? 0.42 : 0.3;
  return (
    <Frame accent={accent}><BrowserShell accent={accent} so={so}>
      <g stroke={WIRE} strokeOpacity={so * 0.4} strokeWidth="0.7" fill="none">{sources.map(([x, y], i) => (<line key={i} x1={x} y1={y} x2="202" y2="104" />))}</g>
      {sources.map(([x, y], i) => (<circle key={i} cx={x} cy={y} r="3" fill={WIRE} fillOpacity={so} />))}
      <rect x="202" y="74" width="58" height="60" rx="8" fill={accent} fillOpacity="0.12" stroke={accent} strokeOpacity={active ? 0.9 : 0.7} strokeWidth="1.4" style={{ filter: `drop-shadow(0 0 6px ${accent}55)` }} />
      <g fill={accent} fillOpacity="0.55">
        <rect x="212" y="86" width="38" height="3.5" rx="1.75" />
        <rect x="212" y="95" width="30" height="3.5" rx="1.75" />
        <rect x="212" y="104" width="38" height="3.5" rx="1.75" />
        <rect x="212" y="113" width="26" height="3.5" rx="1.75" />
      </g>
      <circle ref={dot} r="2.6" fill={accent} style={{ filter: `drop-shadow(0 0 5px ${accent})` }} />
    </BrowserShell></Frame>
  );
}

export default function ProjectArt({ id, accent = "#5B9DFF", active }: { id: string; accent?: string; active?: boolean }) {
  switch (id) {
    case "bumble": return <Bumble accent={accent} active={active} />;
    case "spotify": return <Spotify accent={accent} active={active} />;
    case "zelig": return <Zelig accent={accent} active={active} />;
    case "analogical-engines": return <Analogical accent={accent} active={active} />;
    case "cozu": return <Cozu accent={accent} active={active} />;
    default: return <ConceptMotif id={id} accent={accent} active={active} />;
  }
}
