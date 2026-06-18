"use client";

import { useReducedMotion } from "framer-motion";
import WorkVisual from "@/components/WorkVisual";
import ProjectIcon from "@/components/ProjectIcon";
import { statusColor } from "@/components/StatusDot";
import type { Tile } from "@/lib/tiles";

// The reveal: a product showcase, not a résumé entry. Big visual, the wow up
// top, a little personality, then depth for whoever wants it.
export default function Detail({ tile }: { tile: Tile }) {
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="relative h-64 md:h-[26rem] overflow-hidden border-b border-white/10">
        <WorkVisual
          tile={tile}
          active
          reduce={!!reduce}
          accent={statusColor(tile.status)}
        />
      </div>

      <div className="p-6 md:p-8">
        {tile.org && (
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-2">
            {tile.org}
          </p>
        )}

        <div className="flex items-center gap-3">
          <ProjectIcon
            id={tile.id}
            color={statusColor(tile.status)}
            className="h-9 w-9 shrink-0"
          />
          <h3 className="font-display font-semibold text-3xl md:text-4xl leading-tight tracking-tight text-ink">
            {tile.title}
          </h3>
        </div>

        {tile.impact && (
          <p className="mt-4 text-xl md:text-2xl font-display text-accent leading-snug max-w-3xl">
            {tile.impact}
          </p>
        )}

        <p className="text-ink/80 mt-4 text-lg leading-relaxed max-w-2xl">
          {tile.hook}
        </p>

        {tile.note && (
          <p className="mt-6 font-mono text-xs text-muted leading-relaxed max-w-xl">
            <span className="text-accent">{"// "}</span>
            {tile.note}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-1.5">
          {tile.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-ink/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted">
          {tile.confidential
            ? "The real screens for this work are under NDA. I can walk through them and the findings live, "
            : "This is the short version. For the full case study, more screens, and process, "}
          <a
            href="mailto:tbiehle@cs.cmu.edu"
            className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            get in touch
          </a>
          .
        </p>

        <details className="mt-10 pt-8 border-t border-white/[0.06] group">
          <summary className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted cursor-pointer hover:text-ink transition-colors list-none flex items-center gap-2">
            <span className="text-accent transition-transform group-open:rotate-90">
              ›
            </span>
            Behind the work
          </summary>
          <dl className="mt-6 grid md:grid-cols-2 gap-x-12 gap-y-6 text-base">
            {[
              ["What it solves", tile.detail.problem],
              ["A key decision", tile.detail.decision],
              ["Tools & stack", tile.detail.tools],
            ].map(([label, value]) => (
              <div key={label as string}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-1.5">
                  {label}
                </dt>
                <dd className="text-ink/80 leading-relaxed">{value}</dd>
              </div>
            ))}
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-1.5">
                What I did
              </dt>
              <dd>
                <ul className="space-y-1.5 text-ink/80">
                  {tile.detail.did.map((d, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-accent" aria-hidden>
                        ·
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </details>
      </div>
    </div>
  );
}
