/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PortraitMotif from "@/components/PortraitMotif";

// Headshot frame. Shows /headshot.jpg when present, else the friendly blob.
// A few dots in the project-accent palette float at the corners for cohesion
// with the work cards, kept off-center so they never cover the face.
const DOTS = [
  { c: "#F4C430", x: "-2.5%", y: "10%" },
  { c: "#1DB954", x: "97%", y: "22%" },
  { c: "#8B7CF6", x: "100%", y: "68%" },
  { c: "#17B8A8", x: "6%", y: "94%" },
  { c: "#E85C8A", x: "84%", y: "99%" },
];

export default function Portrait() {
  const reduce = useReducedMotion();
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    <div className="relative aspect-[4/5] max-w-[320px] lg:max-w-none">
      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-surface overflow-hidden">
        {hasPhoto ? (
          <img
            src="/headshot.jpg"
            alt="Cole Biehle"
            onError={() => setHasPhoto(false)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <PortraitMotif />
        )}
      </div>

      {DOTS.map((d, i) =>
        reduce ? (
          <span
            key={i}
            className="absolute h-2 w-2 rounded-full"
            style={{ left: d.x, top: d.y, background: d.c, opacity: 0.85 }}
          />
        ) : (
          <motion.span
            key={i}
            aria-hidden
            className="absolute h-2 w-2 rounded-full"
            style={{
              left: d.x,
              top: d.y,
              background: d.c,
              boxShadow: `0 0 7px ${d.c}`,
            }}
            animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.18, 1] }}
            transition={{
              duration: 3 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ),
      )}
    </div>
  );
}
