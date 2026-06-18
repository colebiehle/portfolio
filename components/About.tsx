"use client";

import { motion, useReducedMotion } from "framer-motion";
import ProjectMotif from "@/components/ProjectMotif";

// Inline links are how the achievements live in the prose. Replace placeholder
// hrefs (#) with real URLs (Scholar, Zelig, funding announcement, McGinnis, 99P).
function L({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
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
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.5"
          transform="rotate(-22 12 12)"
        />
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
      <motion.h2
        {...reveal}
        className="font-display font-semibold tracking-tight text-3xl md:text-4xl leading-[1.18] max-w-3xl text-ink"
      >
        I research, code, and iterate fast to design the{" "}
        <span className="text-accent">right solution</span>.
      </motion.h2>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,52rem)_minmax(300px,340px)] lg:items-start">
        {/* Narrative — fixed readable measure; photo sits right beside it */}
        <div className="space-y-5 text-base md:text-lg leading-relaxed text-ink/80">
          <motion.p {...reveal}>
            I studied design and computer science at UC San Diego, got into
            research along the way, and{" "}
            <L href="#">
              published on human-AI collaboration and collective intelligence
            </L>
            . I wanted range next, so I joined the research agency Mindswarms
            and ran studies for clients like Google, Amazon, and Nike.
          </motion.p>
          <motion.p {...reveal}>
            Then I wanted to shape products, not just study them. I built a
            couple of startups through incubator programs, and at{" "}
            <L href="#">Zelig</L> I worked as a UX researcher with a
            product-design lens, turning research into product strategy with the
            C-suite and pitching investors. The team{" "}
            <L href="#">secured a $15M Series A at a $100M valuation</L>.
          </motion.p>
          <motion.p {...reveal}>
            I came to CMU&apos;s HCI program to keep doing groundbreaking
            research and to sharpen my ability to not just design but build.
            Research from my lab showed real commercial potential, so we pitched
            it at CMU&apos;s most competitive startup competition and won{" "}
            <L href="#">first place and $150k</L>. It has since earned more
            awards, a spot in the VentureBridge incubator, and NSF backing.
          </motion.p>
          <motion.p {...reveal}>
            Now I lead my capstone with <L href="#">Honda&apos;s 99P Labs</L>{" "}
            and contribute to <L href="#work">UI for AI</L>, an initiative
            reimagining how people work with generative systems. I&apos;m
            writing several papers, including mapping the innovation landscape
            and augmenting designer workflows, and I&apos;ve taught grad
            students to augment their own design process.
          </motion.p>
          <motion.p
            {...reveal}
            className="text-ink border-t border-white/[0.06] pt-5 mt-1"
          >
            Next, I want a fast, blue-skies environment where I can build and
            test ideas quickly, then turn the ones that hold up into refined,
            beautiful work that resonates so specifically with the people it is
            for that they feel seen. The problems I keep returning to live where
            AI meets the tools people already use.
          </motion.p>
        </div>

        {/* Face + a little personality */}
        <aside className="space-y-7">
          <motion.div
            {...reveal}
            className="relative aspect-[4/5] max-w-[320px] lg:max-w-none rounded-2xl border border-white/10 bg-surface overflow-hidden"
          >
            {/* Placeholder motif until a real photo is dropped in */}
            <ProjectMotif id="cole-biehle" accent="#5B9DFF" active />
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
