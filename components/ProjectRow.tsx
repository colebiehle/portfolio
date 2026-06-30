"use client";

import ProjectIcon from "@/components/ProjectIcon";
import { statusColor } from "@/components/StatusDot";
import type { Tile } from "@/lib/tiles";

// Supporting index row: title + a one-line why, plus how it's related (tags).
export default function ProjectRow({
  tile,
  onOpen,
  reduce,
}: {
  tile: Tile;
  onOpen: () => void;
  reduce?: boolean;
}) {
  const accent = tile.accent ?? statusColor(tile.status);
  const warm = () => {
    if (reduce) return;
    const r = document.documentElement;
    r.style.setProperty("--hover-accent", accent);
    r.style.setProperty("--field-accent", accent);
    r.classList.add("accent-active");
  };
  const cool = () => {
    if (reduce) return;
    const r = document.documentElement;
    r.classList.remove("accent-active");
    r.style.setProperty("--field-accent", "#5B9DFF");
  };
  return (
    <button
      type="button"
      data-card-id={tile.id}
      onClick={onOpen}
      onMouseEnter={warm}
      onMouseLeave={cool}
      aria-label={`${tile.title}. ${tile.hook}`}
      style={{ ["--tile-accent" as string]: accent }}
      className="group w-full text-left py-4 flex items-center gap-4 transition-colors"
    >
      <ProjectIcon id={tile.id} color={accent} className="h-9 w-9 shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-base text-ink transition-colors group-hover:text-[var(--tile-accent)]">
          {tile.title}
        </h3>
        <p className="text-muted text-sm truncate">{tile.tagline ?? tile.hook}</p>
      </div>
      <div className="hidden md:flex gap-1.5 shrink-0">
        {tile.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/12 text-ink/60"
          >
            {tag}
          </span>
        ))}
      </div>
      <span
        aria-hidden
        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-[var(--tile-accent)]"
      >
        →
      </span>
    </button>
  );
}
