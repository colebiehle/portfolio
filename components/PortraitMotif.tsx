"use client";

import { motion, useReducedMotion } from "framer-motion";

// Placeholder for the profile photo: a lone figure on a peak under a quiet
// cosmos. On-brand (dark, single accent), a little aspirational. Swap for a
// real photo when ready.
const STARS: [number, number, number][] = [
  [40, 44, 1.4],
  [82, 30, 1.1],
  [180, 52, 1.5],
  [120, 70, 1],
  [210, 84, 1.3],
  [55, 96, 1.2],
  [200, 132, 1.4],
  [34, 150, 1.1],
  [168, 162, 1.2],
  [96, 120, 1],
  [225, 40, 1.3],
  [70, 168, 1],
];

export default function PortraitMotif() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0d1530] via-surface to-bg">
      <svg viewBox="0 0 240 300" className="h-full w-full">
        {/* faint orbits */}
        <g stroke="#5B9DFF" strokeOpacity="0.12" fill="none">
          <circle cx="150" cy="92" r="60" />
          <circle cx="150" cy="92" r="40" />
        </g>

        {/* moon */}
        <circle
          cx="150"
          cy="92"
          r="13"
          fill="#5B9DFF"
          fillOpacity="0.85"
          style={{ filter: "drop-shadow(0 0 8px rgba(91,157,255,0.6))" }}
        />
        {!reduce && (
          <motion.circle
            cx="150"
            cy="92"
            r="13"
            fill="none"
            stroke="#5B9DFF"
            strokeWidth="1"
            initial={{ r: 13, opacity: 0.5 }}
            animate={{ r: [13, 24], opacity: [0.5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        {/* stars */}
        {STARS.map(([x, y, r], i) =>
          reduce ? (
            <circle key={i} cx={x} cy={y} r={r} fill="#5B9DFF" fillOpacity="0.55" />
          ) : (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill="#5B9DFF"
              animate={{ opacity: [0.25, 0.9, 0.25] }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ),
        )}

        {/* mountains */}
        <path
          d="M0 300 L0 258 L44 232 L92 252 L120 198 L150 248 L200 226 L240 256 L240 300 Z"
          fill="#15151b"
          stroke="#5B9DFF"
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        {/* the figure on the peak */}
        <g fill="#ECEAE3">
          <circle cx="120" cy="183" r="3.4" />
          <path d="M116 199 L118 188 Q120 186 122 188 L124 199 Z" />
        </g>
      </svg>
    </div>
  );
}
