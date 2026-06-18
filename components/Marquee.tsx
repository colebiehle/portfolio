"use client";

import { useReducedMotion } from "framer-motion";

// Contained "previously" strip — real monochrome marks, seamless loop (two
// identical halves => -50% lands on a boundary), no hover pause, edges faded.
const LOGOS = [
  { src: "/logos/google.svg", alt: "Google" },
  { src: "/logos/amazon.svg", alt: "Amazon" },
  { src: "/logos/microsoft.svg", alt: "Microsoft" },
  { src: "/logos/nike.svg", alt: "Nike" },
  { src: "/logos/americanexpress.svg", alt: "American Express" },
  { src: "/logos/honda.svg", alt: "Honda" },
];

const FADE =
  "linear-gradient(to right, transparent, black 6%, black 90%, transparent)";

export default function Marquee() {
  const reduce = useReducedMotion();
  const sets = reduce ? 1 : 8;
  const items = Array.from({ length: sets }, () => LOGOS).flat();

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ maskImage: FADE, WebkitMaskImage: FADE }}
    >
      <div
        className={
          reduce
            ? "flex flex-wrap items-center gap-x-8 gap-y-3"
            : "marquee-track flex w-max items-center gap-10"
        }
        aria-label="Brands Cole has done work for"
      >
        {items.map((logo, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${logo.alt}-${idx}`}
            src={logo.src}
            alt={idx < LOGOS.length ? logo.alt : ""}
            aria-hidden={idx >= LOGOS.length}
            className="h-[18px] md:h-5 w-auto opacity-55 hover:opacity-90 transition-opacity"
          />
        ))}
      </div>
    </div>
  );
}
