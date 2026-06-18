"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Profile-photo placeholder: a friendly morphing blob with a little face, set
// in a small constellation. The site's wavy-blue charm, made personable.
const N = 56;
const CX = 120;
const CY = 148;
const R = 72;
const STARS: [number, number][] = [
  [58, 52],
  [186, 58],
  [120, 30],
  [44, 252],
  [198, 246],
];

function pathFrom(pts: [number, number][]) {
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

function build(t: number) {
  const pts: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    const th = (i / N) * Math.PI * 2;
    const r =
      R *
      (1 + 0.1 * Math.cos(3 * th + t * 0.5) + 0.06 * Math.sin(5 * th - t * 0.4)) *
      (1 + 0.012 * Math.sin(t * 2 + i * 0.8));
    pts.push([CX + r * Math.cos(th), CY + r * Math.sin(th)]);
  }
  return pathFrom(pts);
}

export default function PortraitMotif() {
  const reduce = useReducedMotion();
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reduce) {
      ref.current?.setAttribute("d", build(0.6));
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (start === null) start = ts;
      ref.current?.setAttribute("d", build((ts - start) / 1000));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface2 to-bg">
      <svg
        viewBox="0 0 240 300"
        className="h-full w-full"
        style={{ filter: "drop-shadow(0 0 16px rgba(91,157,255,0.4))" }}
      >
        {STARS.map(([x, y], i) =>
          reduce ? (
            <circle key={i} cx={x} cy={y} r="1.8" fill="#5B9DFF" fillOpacity="0.5" />
          ) : (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="1.8"
              fill="#5B9DFF"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ),
        )}
        <path ref={ref} fill="#5B9DFF" />
        <g fill="#0B0B0D">
          <circle cx="104" cy="140" r="5.5" />
          <circle cx="138" cy="140" r="5.5" />
        </g>
        <circle cx="106" cy="138" r="1.6" fill="#ffffff" opacity="0.9" />
        <circle cx="140" cy="138" r="1.6" fill="#ffffff" opacity="0.9" />
        <path
          d="M104 160 Q121 173 138 160"
          fill="none"
          stroke="#0B0B0D"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
