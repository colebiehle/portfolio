"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// A living line: one stroke that forms a shape, micro-jitters in real time
// (the "agent doing a thousand tiny adjustments" feel), and slowly morphs
// between shapes. Ambient + single-accent so it's experience, not decoration.
const N = 28;
const C = 100;
const BASE = 62;

const SHAPE_FNS: ((a: number) => number)[] = [
  () => 1,
  (a) => 1 + 0.26 * Math.cos(3 * a),
  (a) => 1 + 0.2 * Math.cos(5 * a + 0.6),
  (a) => 1 + 0.16 * Math.cos(2 * a) + 0.12 * Math.sin(4 * a),
];
const SHAPES = SHAPE_FNS.map((fn) =>
  Array.from({ length: N }, (_, i) => fn((i / N) * Math.PI * 2)),
);

function pathFrom(pts: [number, number][]): string {
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d + " Z";
}

function build(a0: number[], a1: number[], t: number, time: number): string {
  const pts: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    const ang = (i / N) * Math.PI * 2;
    const r = a0[i] + (a1[i] - a0[i]) * t;
    const jitter =
      1 +
      0.014 * Math.sin(time * 0.004 + i * 0.9) +
      0.009 * Math.sin(time * 0.0027 + i * 2.3);
    const rr = BASE * r * jitter;
    pts.push([C + rr * Math.cos(ang), C + rr * Math.sin(ang)]);
  }
  return pathFrom(pts);
}

export default function SystemField() {
  const reduce = useReducedMotion();
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reduce) {
      ref.current?.setAttribute("d", build(SHAPES[1], SHAPES[1], 0, 0));
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const PERIOD = 9000; // ms to morph between two shapes
    const loop = (ts: number) => {
      if (start === null) start = ts;
      const phase = (ts - start) / PERIOD;
      const idx = Math.floor(phase) % SHAPES.length;
      const next = (idx + 1) % SHAPES.length;
      const tr = phase - Math.floor(phase);
      const t = tr < 0.5 ? 2 * tr * tr : 1 - Math.pow(-2 * tr + 2, 2) / 2;
      ref.current?.setAttribute("d", build(SHAPES[idx], SHAPES[next], t, ts));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 200 200"
        className="absolute top-1/2 right-[-4%] h-[74vh] w-[74vh] -translate-y-1/2 opacity-[0.2]"
        style={{ filter: "drop-shadow(0 0 7px rgba(91,157,255,0.35))" }}
      >
        <path
          ref={ref}
          fill="none"
          stroke="#5B9DFF"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
