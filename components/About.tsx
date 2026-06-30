"use client";

import { motion, useReducedMotion } from "framer-motion";
import Portrait from "@/components/Portrait";

// Inline links carry the proof and open in a new tab. Any remaining "#" (e.g.
// "more awards", with no standalone announcement) renders as accent text only.
function L({ href, children }: { href: string; children: React.ReactNode }) {
  if (href === "#") {
    return <span className="text-accent">{children}</span>;
  }
  const external = /^https?:/i.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
            I research, code, and iterate fast to design products people{" "}
            <span className="text-accent">can&rsquo;t live without</span>.
          </motion.h2>

          <div className="mt-10 space-y-5 text-base md:text-lg leading-relaxed text-ink/80">
            <motion.p {...reveal}>
              I&apos;m an interaction designer who builds what I design in code,
              taking products end to end from research to working, tested
              interfaces. I prototype quickly with AI, which lets me validate ideas
              early and iterate on real interactions.
            </motion.p>
            <motion.p {...reveal}>
              I&apos;ve run research for Google, Amazon, and Microsoft through the
              agency Mindswarms, shaped product and strategy at{" "}
              <L href="https://www.zelig.com">Zelig</L> through a{" "}
              <L href="https://techcrunch.com/2023/11/06/luxury-clothing-virtual-try-on-100m-valuation-e-commerce/">
                $15M Series A
              </L>
              , and now design and build Analogical Engines, an AI tool that breaks
              R&amp;D teams out of fixation. I work across research, engineering,
              and product, and I&apos;m at my best coordinating the moving parts of
              a complex problem and keeping a team aligned on what matters most.
            </motion.p>
            <motion.p
              {...reveal}
              className="text-ink/80 border-t border-white/[0.06] pt-5 mt-1"
            >
              I think the hard part of AI has shifted from the model to the
              interface: how people direct it, trust it, and stay in control as it
              takes on more.{" "}
              <span className="text-ink font-semibold">
                What I want to build next is the interaction layer that turns
                frontier models into products people actually understand and rely
                on.
              </span>
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
