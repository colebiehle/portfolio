"use client";

import { motion, useReducedMotion } from "framer-motion";
import Marquee from "@/components/Marquee";

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        };

  return (
    <header className="relative z-10 pt-24 md:pt-28 pb-6">
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <motion.p
          {...fade(0)}
          className="mb-6 font-display text-2xl md:text-3xl text-ink"
        >
          <span className="font-semibold">Cole Biehle</span>
          <span className="text-muted font-normal">, interaction designer</span>
        </motion.p>

        <motion.h1
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, ease: "easeOut" },
              })}
          className="font-display font-semibold tracking-tight text-balance text-ink text-[1.9rem] leading-[1.12] sm:text-[2.5rem] sm:leading-[1.05] md:text-[3.5rem] max-w-4xl"
        >
          Building{" "}
          <span
            className="text-accent"
            style={{ textShadow: "0 0 40px rgba(91,157,255,0.45)" }}
          >
            human-AI systems
          </span>{" "}
          so seamless people forget it&rsquo;s AI.
        </motion.h1>

        <motion.div {...fade(0.35)} className="mt-12 max-w-lg space-y-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-1.5">
              Currently
            </p>
            <p className="text-sm text-ink/80">
              HCI grad student @ Carnegie Mellon
              <span className="text-muted"> · School of Computer Science</span>
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
              Previously
            </p>
            <Marquee />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
