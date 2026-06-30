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
  const accent = tile.accent ?? statusColor(tile.status);

  return (
    <div>
      <div className="relative h-64 md:h-[26rem] overflow-hidden border-b border-white/10">
        <WorkVisual tile={tile} active reduce={!!reduce} accent={accent} />
      </div>

      <div className="p-6 md:p-8">
        {tile.org && (
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-2">
            {tile.org}
          </p>
        )}

        <div className="flex items-center gap-3">
          <ProjectIcon id={tile.id} color={accent} className="h-9 w-9 shrink-0" />
          <h3 className="font-display font-semibold text-3xl md:text-4xl leading-tight tracking-tight text-ink">
            {tile.title}
          </h3>
        </div>

        <p className="text-ink/85 mt-4 text-lg md:text-xl leading-relaxed max-w-2xl">
          {tile.hook}
        </p>

        {tile.impact && (
          <div className="mt-5">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-1"
              style={{ color: accent }}
            >
              {tile.impactLabel ?? "Outcome"}
            </p>
            <p className="text-ink/80 leading-relaxed max-w-2xl">{tile.impact}</p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {tile.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-ink/70"
            >
              {tag}
            </span>
          ))}
        </div>

        {tile.detail ? (
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
        ) : (
          <a
            href="mailto:tbiehle@cs.cmu.edu"
            className="mt-8 pt-6 border-t border-white/[0.06] inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
          >
            Want a walkthrough?
            <span style={{ color: accent }}>Get in touch →</span>
          </a>
        )}
      </div>
    </div>
  );
}
