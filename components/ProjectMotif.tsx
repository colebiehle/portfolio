"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// A looping, generative "system" motif — one parametrized component, seeded
// per project so each is distinct but speaks the same morphing-line + node
// language as the rest of the site. The card teaser; real screens go in the
// reveal. Static under reduced-motion.
const C = 100;

function seedOf(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function smoothClosed(pts: [number, number][]) {
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

export default function ProjectMotif({
  id,
  accent = "#5B9DFF",
  active = false,
}: {
  id: string;
  accent?: string;
  active?: boolean;
}) {
  const reduce = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);

  const s = seedOf(id);
  const lobes = 3 + (s % 4); // 3..6
  const dir = s & 1 ? 1 : -1;
  const amp = 0.18 + ((s >> 3) % 10) / 100; // 0.18..0.27
  const nodeCount = 3 + (s % 3); // 3..5

  useEffect(() => {
    const base = 56;
    const N = 48;
    const draw = (t: number) => {
      const pts: [number, number][] = [];
      for (let i = 0; i < N; i++) {
        const th = (i / N) * Math.PI * 2;
        const r =
          base *
          (1 +
            amp * Math.cos(lobes * th + t * 0.5 * dir) +
            0.05 * Math.sin(th * 2 - t * 0.8)) *
          (1 + 0.012 * Math.sin(t * 3 + i));
        pts.push([C + r * Math.cos(th), C + r * Math.sin(th)]);
      }
      pathRef.current?.setAttribute("d", smoothClosed(pts));
      for (let i = 0; i < nodeCount; i++) {
        const a =
          (i / nodeCount) * Math.PI * 2 + (s % 7) + t * (0.25 + i * 0.05) * dir;
        const rr = base * (1 + amp) + 12 + i * 5;
        const el = nodeRefs.current[i];
        if (el) {
          el.setAttribute("cx", (C + rr * Math.cos(a)).toFixed(2));
          el.setAttribute("cy", (C + rr * Math.sin(a)).toFixed(2));
        }
      }
    };

    if (reduce) {
      draw(0.8);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (start === null) start = ts;
      draw((ts - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce, lobes, dir, amp, nodeCount, s]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface2 to-bg">
      <svg
        viewBox="0 0 200 200"
        className="h-[115%] w-[115%]"
        style={{ filter: `drop-shadow(0 0 9px ${accent}40)` }}
      >
        <path
          ref={pathRef}
          fill="none"
          stroke={accent}
          strokeWidth="0.8"
          strokeOpacity={active ? 0.9 : 0.6}
          strokeLinejoin="round"
        />
        {Array.from({ length: nodeCount }).map((_, i) => (
          <circle
            key={i}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            r={i === 0 ? 2.6 : 1.7}
            fill={accent}
            fillOpacity={active ? 0.95 : 0.65}
          />
        ))}
      </svg>
    </div>
  );
}
