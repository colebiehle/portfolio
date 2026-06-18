"use client";

import { motion, useReducedMotion } from "framer-motion";

// Profile-photo placeholder: a head-and-shoulders avatar rendered in the
// site's line / node / glow language. Reads as "a person" but stays on-brand.
// Swap for a real photo when ready.
const NODES: [number, number][] = [
  [58, 72],
  [182, 80],
  [120, 46],
  [40, 138],
  [202, 148],
  [150, 36],
];

export default function PortraitMotif() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-surface2 to-bg">
      <svg viewBox="0 0 240 300" className="h-full w-full">
        <g stroke="#5B9DFF" strokeOpacity="0.15" fill="none" strokeWidth="0.8">
          <line x1="58" y1="72" x2="120" y2="46" />
          <line x1="120" y1="46" x2="182" y2="80" />
          <line x1="40" y1="138" x2="58" y2="72" />
        </g>
        {NODES.map(([x, y], i) =>
          reduce ? (
            <circle key={i} cx={x} cy={y} r="1.8" fill="#5B9DFF" fillOpacity="0.55" />
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
                delay: i * 0.4,
              }}
            />
          ),
        )}
        <path
          d="M44 300 C44 244 76 216 104 210 L104 196 C90 190 82 174 82 154 C82 122 98 100 120 100 C142 100 158 122 158 154 C158 174 150 190 136 196 L136 210 C164 216 196 244 196 300 Z"
          fill="#5B9DFF"
          fillOpacity="0.1"
          stroke="#5B9DFF"
          strokeOpacity="0.55"
          strokeWidth="1.4"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 8px rgba(91,157,255,0.35))" }}
        />
      </svg>
    </div>
  );
}
