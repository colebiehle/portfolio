"use client";

import { motion, useReducedMotion } from "framer-motion";
import PortraitMotif from "@/components/PortraitMotif";

// Inline links carry the proof. External ones open in a new tab. Replace the
// "#" placeholders (Scholar, Zelig, funding announcement, McGinnis) as URLs land.
function L({ href, children }: { href: string; children: React.ReactNode }) {
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
      <motion.h2
        {...reveal}
        className="font-display font-semibold tracking-tight text-3xl md:text-4xl leading-[1.18] max-w-3xl text-ink"
      >
        I research, code, and iterate fast to design the{" "}
        <span className="text-accent">right solution</span>.
      </motion.h2>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,52rem)_minmax(300px,340px)] lg:items-start">
        <div className="space-y-5 text-base md:text-lg leading-relaxed text-ink/80">
          <motion.p {...reveal}>
            I started in design and computer science at UC San Diego, where I
            also fell into research and began{" "}
            <L href="#">
              publishing on human-AI collaboration and collective intelligence
            </L>
            . I wanted to see how design held up across very different problems,
            so I joined the research agency Mindswarms and ran studies for
            clients including Google, Amazon, Microsoft, Nike, and American
            Express.
          </motion.p>
          <motion.p {...reveal}>
            That work made me want to own the product, not just study it. I
            built a couple of startups through incubator programs, and at{" "}
            <L href="#">Zelig</L> I worked as a UX researcher with a
            product-design lens, turning research into product strategy
            alongside the C-suite and pitching investors. The team went on to{" "}
            <L href="#">raise a $15M Series A at a $100M valuation</L>.
          </motion.p>
          <motion.p {...reveal}>
            To go deeper on research, and to sharpen my ability to not just
            design but build, I came to Carnegie Mellon for a Master&apos;s in
            HCI. The work from my lab turned out to have real commercial legs,
            so we pitched it at CMU&apos;s most competitive startup competition
            and won <L href="#">first place and $150k</L>. It has since picked
            up more awards, a place in the VentureBridge incubator, and NSF
            backing.
          </motion.p>
          <motion.p {...reveal}>
            These days I lead my capstone with{" "}
            <L href="https://www.99plabs.com">Honda&apos;s 99P Labs</L>,
            contribute to the <L href="https://uiforai.design">UI for AI</L>{" "}
            initiative, and write papers on things like mapping the innovation
            landscape and augmenting designer workflows. I&apos;ve also taught
            grad students to augment their own design process.
          </motion.p>
          <motion.p
            {...reveal}
            className="text-ink border-t border-white/[0.06] pt-5 mt-1"
          >
            What I&apos;m most excited to work on next is making AI a genuine
            teammate in the design process: something that lives inside the
            tools people already use, does the quiet heavy lifting, and reshapes
            what an interface even is once it sits underneath. That is the
            direction I care about most.
          </motion.p>
        </div>

        <aside className="space-y-7">
          <motion.div
            {...reveal}
            className="relative aspect-[4/5] max-w-[320px] lg:max-w-none rounded-2xl border border-white/10 bg-surface overflow-hidden"
          >
            {/* Placeholder motif until a real photo is dropped in */}
            <PortraitMotif />
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
