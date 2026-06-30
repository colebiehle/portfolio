"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WorkVisual from "@/components/WorkVisual";
import ProjectIcon from "@/components/ProjectIcon";
import { statusColor } from "@/components/StatusDot";
import { EASE, DUR } from "@/lib/motion";
import type { Tile } from "@/lib/tiles";

// Glance card: just enough to decide "is this worth opening" — the visual,
// the title, a blurb of why it matters, and how it's related (tags).
export default function ProjectCard({
  tile,
  onOpen,
  reduce,
}: {
  tile: Tile;
  onOpen: () => void;
  reduce: boolean;
}) {
  const [hover, setHover] = useState(false);
  const accent = tile.accent ?? statusColor(tile.status);

  // Clean up the page-wide accent tint if this card unmounts mid-hover.
  useEffect(
    () => () => document.documentElement.classList.remove("accent-active"),
    [],
  );

  return (
    <motion.button
      type="button"
      data-card-id={tile.id}
      onClick={onOpen}
      onHoverStart={() => {
        setHover(true);
        if (!reduce) {
          const r = document.documentElement;
          r.style.setProperty("--hover-accent", accent);
          r.style.setProperty("--field-accent", accent);
          r.classList.add("accent-active");
        }
      }}
      onHoverEnd={() => {
        setHover(false);
        if (!reduce) {
          const r = document.documentElement;
          r.classList.remove("accent-active"); // glow fades out in its own color
          r.style.setProperty("--field-accent", "#5B9DFF"); // line/wave ease to blue
        }
      }}
      onMouseMove={
        reduce
          ? undefined
          : (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
            }
      }
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: DUR.base, ease: EASE }}
      aria-label={`${tile.title}. ${tile.hook}`}
      style={{ borderColor: hover ? `${accent}66` : undefined }}
      className="group relative text-left rounded-2xl bg-surface border border-white/10 overflow-hidden transition-colors duration-300 flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <WorkVisual tile={tile} active={hover} reduce={reduce} accent={accent} />
        {!reduce && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(420px circle at var(--mx) var(--my), color-mix(in srgb, ${accent} 20%, transparent), transparent 70%)`,
            }}
          />
        )}
        <span
          aria-hidden
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-bg/55 backdrop-blur border border-white/10 text-sm opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          style={{ color: accent }}
        >
          ↗
        </span>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2.5">
          <ProjectIcon id={tile.id} color={accent} className="h-7 w-7 shrink-0" />
          <h3 className="font-display font-semibold text-2xl md:text-3xl leading-tight tracking-tight text-ink">
            {tile.title}
          </h3>
        </div>
        <p className="text-muted mt-2 text-sm leading-relaxed max-w-xl">
          {tile.tagline ?? tile.hook}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tile.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-ink/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
