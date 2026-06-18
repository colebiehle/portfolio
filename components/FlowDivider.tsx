"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// A section divider drawn as a living line — the same morphing/jitter language
// as the ambient field, applied to structure so the "alive" feel recurs.
const W = 1200;
const H = 24;
const MID = H / 2;
const N = 64;

function flat() {
  let d = `M 0 ${MID}`;
  for (let i = 1; i <= N; i++) d += ` L ${((i / N) * W).toFixed(1)} ${MID}`;
  return d;
}

export default function FlowDivider() {
  const reduce = useReducedMotion();
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reduce) {
      ref.current?.setAttribute("d", flat());
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (start === null) start = ts;
      const t = (ts - start) / 1000;
      let d = `M 0 ${MID}`;
      for (let i = 1; i <= N; i++) {
        const x = (i / N) * W;
        const y =
          MID +
          Math.sin(i * 0.45 - t * 1.1) * 2.6 +
          Math.sin(i * 0.21 + t * 0.55) * 1.3;
        d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      ref.current?.setAttribute("d", d);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <div
      aria-hidden
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="w-full h-6 opacity-[0.3]"
      >
        <path
          ref={ref}
          fill="none"
          stroke="#5B9DFF"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
