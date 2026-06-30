"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Scroll progress drawn as a living line in the site's morphing-wave language:
// a faint full-width track, with the scrolled portion filled in accent. The
// accent follows --hover-accent, so it warms with the hovered project too.
const W = 1200;
const H = 6;
const MID = H / 2;
const N = 80;

function wave(t: number) {
  let d = `M 0 ${MID}`;
  for (let i = 1; i <= N; i++) {
    const x = (i / N) * W;
    const y =
      MID +
      Math.sin(i * 0.5 - t * 1.1) * 1.1 +
      Math.sin(i * 0.23 + t * 0.5) * 0.6;
    d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

export default function ProgressWave({ progress }: { progress: number }) {
  const reduce = useReducedMotion();
  const track = useRef<SVGPathElement>(null);
  const fill = useRef<SVGPathElement>(null);

  useEffect(() => {
    const set = (t: number) => {
      const d = wave(t);
      track.current?.setAttribute("d", d);
      fill.current?.setAttribute("d", d);
    };
    if (reduce) {
      set(0);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (start === null) start = ts;
      set((ts - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <div
      aria-hidden
      className="absolute bottom-0 inset-x-0 h-1.5 overflow-hidden pointer-events-none"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path
          ref={track}
          fill="none"
          stroke="var(--field-accent, #5B9DFF)"
          strokeOpacity="0.15"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ transition: "stroke 0.7s ease" }}
        />
      </svg>
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${progress * 100}%` }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="h-full"
          style={{ width: "100vw" }}
        >
          <path
            ref={fill}
            fill="none"
            stroke="var(--field-accent, #5B9DFF)"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
            style={{
              filter: "drop-shadow(0 0 3px var(--field-accent, #5B9DFF))",
              transition: "stroke 0.7s ease",
            }}
          />
        </svg>
      </div>
    </div>
  );
}
