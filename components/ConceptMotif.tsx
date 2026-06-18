"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import ProjectMotif from "@/components/ProjectMotif";

// Per-project concept animations. Each represents what the project is ABOUT,
// in the site's line/node language. Falls back to the generic motif.
const LEFT: [number, number][] = [
  [64, 70],
  [98, 92],
  [58, 120],
  [92, 136],
  [76, 104],
];
const RIGHT: [number, number][] = [
  [256, 72],
  [222, 94],
  [262, 118],
  [228, 138],
  [244, 104],
];

// Analogical Engines: an idea leaping between two distant domains.
function Analogical({ accent, active }: { accent: string; active?: boolean }) {
  const reduce = useReducedMotion();
  const beam = useRef<SVGPathElement>(null);
  const dot = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const frame = (p: number, j: number) => {
      const a = LEFT[j % LEFT.length];
      const b = RIGHT[(j * 2 + 1) % RIGHT.length];
      const cx = (a[0] + b[0]) / 2;
      const cy = Math.min(a[1], b[1]) - 48;
      beam.current?.setAttribute("d", `M ${a[0]} ${a[1]} Q ${cx} ${cy} ${b[0]} ${b[1]}`);
      beam.current?.setAttribute("stroke-dashoffset", String(1 - p));
      const mx = (1 - p) * (1 - p) * a[0] + 2 * (1 - p) * p * cx + p * p * b[0];
      const my = (1 - p) * (1 - p) * a[1] + 2 * (1 - p) * p * cy + p * p * b[1];
      dot.current?.setAttribute("cx", mx.toFixed(1));
      dot.current?.setAttribute("cy", my.toFixed(1));
    };
    if (reduce) {
      frame(1, 0);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (start === null) start = ts;
      const e = (ts - start) / 1700;
      const j = Math.floor(e);
      frame(e - j, j);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const links = (pts: [number, number][]) =>
    pts.map((n, i) => (
      <line key={i} x1={pts[0][0]} y1={pts[0][1]} x2={n[0]} y2={n[1]} />
    ));

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface2 to-bg">
      <svg
        viewBox="0 0 320 200"
        className="h-full w-full"
        style={{ filter: `drop-shadow(0 0 6px ${accent}30)` }}
      >
        <g
          stroke={accent}
          strokeOpacity={active ? 0.45 : 0.3}
          strokeWidth="0.7"
          fill="none"
        >
          {links(LEFT)}
          {links(RIGHT)}
        </g>
        <g fill={accent} fillOpacity={active ? 0.85 : 0.6}>
          {[...LEFT, ...RIGHT].map((n, i) => (
            <circle key={i} cx={n[0]} cy={n[1]} r="2.6" />
          ))}
        </g>
        <path
          ref={beam}
          fill="none"
          stroke={accent}
          strokeWidth="1.4"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
        />
        <circle
          ref={dot}
          r="3.2"
          fill={accent}
          style={{ filter: `drop-shadow(0 0 4px ${accent})` }}
        />
      </svg>
    </div>
  );
}

// UI for AI: an interface whose AI element keeps finding new places to live,
// exploring how AI could integrate into the screen.
function UiForAi({ accent, active }: { accent: string; active?: boolean }) {
  const reduce = useReducedMotion();
  const block = useRef<SVGRectElement>(null);
  const slots: [number, number, number][] = [
    [64, 56, 92],
    [64, 96, 150],
    [176, 76, 78],
    [64, 134, 120],
    [140, 56, 112],
  ];

  useEffect(() => {
    const frame = (e: number) => {
      const n = slots.length;
      const i = Math.floor(e) % n;
      const j = (i + 1) % n;
      const r = e - Math.floor(e);
      const t = r < 0.5 ? 2 * r * r : 1 - Math.pow(-2 * r + 2, 2) / 2;
      const a = slots[i];
      const b = slots[j];
      block.current?.setAttribute("x", (a[0] + (b[0] - a[0]) * t).toFixed(1));
      block.current?.setAttribute("y", (a[1] + (b[1] - a[1]) * t).toFixed(1));
      block.current?.setAttribute(
        "width",
        (a[2] + (b[2] - a[2]) * t).toFixed(1),
      );
    };
    if (reduce) {
      frame(0);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (start === null) start = ts;
      frame((ts - start) / 1500);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const rows = [56, 76, 96, 116, 136];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface2 to-bg">
      <svg
        viewBox="0 0 320 200"
        className="h-full w-full"
        style={{ filter: `drop-shadow(0 0 6px ${accent}30)` }}
      >
        <rect
          x="40"
          y="32"
          width="240"
          height="136"
          rx="10"
          fill="none"
          stroke={accent}
          strokeOpacity={active ? 0.5 : 0.35}
          strokeWidth="1"
        />
        <line
          x1="40"
          y1="50"
          x2="280"
          y2="50"
          stroke={accent}
          strokeOpacity={active ? 0.4 : 0.28}
          strokeWidth="1"
        />
        <g fill={accent} fillOpacity="0.1">
          {rows.map((y, i) => (
            <rect key={i} x="64" y={y} width={i % 2 ? 150 : 110} height="10" rx="3" />
          ))}
        </g>
        <rect
          ref={block}
          y="56"
          height="12"
          rx="3"
          fill={accent}
          fillOpacity={active ? 0.95 : 0.75}
          style={{ filter: `drop-shadow(0 0 5px ${accent})` }}
        />
      </svg>
    </div>
  );
}

export default function ConceptMotif({
  id,
  accent = "#5B9DFF",
  active,
}: {
  id: string;
  accent?: string;
  active?: boolean;
}) {
  if (id === "analogical-engines")
    return <Analogical accent={accent} active={active} />;
  if (id === "ui-for-ai") return <UiForAi accent={accent} active={active} />;
  return <ProjectMotif id={id} accent={accent} active={active} />;
}
