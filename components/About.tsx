"use client";

import { motion, useReducedMotion } from "framer-motion";
import Portrait from "@/components/Portrait";

// Inline proof links, opening in a new tab.
function L({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline decoration-accent/30 underline-offset-[3px] decoration-1 hover:decoration-accent transition-colors"
    >
      {children}
    </a>
  );
}

const OFFCLOCK: { v: string; icon: React.ReactNode }[] = [
  {
    v: "Dream pop",
    icon: (
      <>
        <path d="M9 18V5l10-2v13" />
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="16" cy="16" r="2.5" />
      </>
    ),
  },
  {
    v: "Swimming",
    icon: (
      <>
        <path d="M2 16c2-1.5 3.5-1.5 5.5 0s3.5 1.5 5.5 0 3.5-1.5 5.5 0" />
        <path d="M2 20c2-1.5 3.5-1.5 5.5 0s3.5 1.5 5.5 0 3.5-1.5 5.5 0" />
        <circle cx="15.5" cy="7" r="2" />
        <path d="M7 13l4-2.5 3 2" />
      </>
    ),
  },
  {
    v: "Hiking",
    icon: (
      <>
        <path d="M2 20h20" />
        <path d="m4 20 6-11 4 7 2-3 4 7" />
      </>
    ),
  },
  {
    v: "Watching movies",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m10 9 5 3-5 3z" />
      </>
    ),
  },
  {
    v: "Sci-fi",
    icon: (
      <>
        <circle cx="12" cy="12" r="4.5" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-22 12 12)" />
      </>
    ),
  },
  {
    v: "Vegetarian cooking",
    icon: (
      <>
        <rect x="4" y="10" width="16" height="9" rx="2" />
        <path d="M2 10h20" />
        <path d="M8 10V7M16 10V7" />
      </>
    ),
  },
];

export default function About() {
  const reduce = useReducedMotion();
  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-16 mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-28"
    >
      <div className="grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,52rem)_minmax(300px,340px)] lg:items-start">
        <div>
          <motion.h2
            {...reveal}
            className="font-display font-semibold tracking-tight text-3xl md:text-4xl leading-[1.18] text-ink"
          >
            I research, design, and build AI products people{" "}
            <span className="text-accent">can&rsquo;t imagine working without</span>.
          </motion.h2>

          <div className="mt-10 space-y-5 text-base md:text-lg leading-relaxed text-ink/80">
            <motion.p {...reveal}>
              I&apos;m an interaction designer who designs and builds AI products in
              code, taking them from research all the way to a working, tested
              interface.
            </motion.p>
            <motion.p {...reveal}>
              I&apos;ve published research on human-AI collaboration in a UCSD{" "}
              <L href="https://designlab.ucsd.edu">research lab</L>, run studies for
              Google, Amazon, and Microsoft through the agency Mindswarms, and
              shaped product and
              strategy at <L href="https://www.zelig.com">Zelig</L> through a{" "}
              <L href="https://techcrunch.com/2023/11/06/luxury-clothing-virtual-try-on-100m-valuation-e-commerce/">
                $15M Series A
              </L>
              .
            </motion.p>
            <motion.p {...reveal}>
              Now I design and build{" "}
              <L href="https://www.analogicalengines.com">Analogical Engines</L>, an
              AI tool for R&amp;D teams that won{" "}
              <L href="https://technical.ly/entrepreneurship/analogical-wins-cmu-mcginnis-startup-competition/">
                CMU&apos;s McGinnis Venture Competition
              </L>
              , lead a capstone with{" "}
              <L href="https://www.99plabs.com">Honda&apos;s 99P Labs</L>, and design
              AI-native interfaces beyond the chat box for{" "}
              <L href="https://uiforai.design">UI for AI</L>.
            </motion.p>
            <motion.p
              {...reveal}
              className="text-ink border-t border-white/[0.06] pt-5 mt-1 font-semibold"
            >
              Looking forward, I&apos;m excited for my work to shape the next
              paradigm of human-AI interaction: turning frontier models into
              interfaces people direct with confidence and never want to give back.
            </motion.p>
          </div>
        </div>

        <aside className="space-y-7 lg:pt-2">
          <motion.div {...reveal}>
            <Portrait />
          </motion.div>
          <motion.div {...reveal} className="max-w-[320px] lg:max-w-none">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
              Off the clock
            </p>
            <div className="flex flex-wrap gap-1.5">
              {OFFCLOCK.map((item) => (
                <span
                  key={item.v}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] text-sm text-ink/75"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="h-3.5 w-3.5 text-accent/70 shrink-0"
                  >
                    {item.icon}
                  </svg>
                  {item.v}
                </span>
              ))}
            </div>
          </motion.div>
        </aside>
      </div>
    </section>
  );
}
