"use client";

import ProjectIcon from "@/components/ProjectIcon";
import { statusColor } from "@/components/StatusDot";
import type { Tile } from "@/lib/tiles";

// Supporting index row: title + a one-line why, plus how it's related (tags).
export default function ProjectRow({
  tile,
  onOpen,
}: {
  tile: Tile;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      data-card-id={tile.id}
      onClick={onOpen}
      aria-label={`${tile.title}. ${tile.hook}`}
      className="group w-full text-left py-4 flex items-center gap-4 transition-colors"
    >
      <ProjectIcon
        id={tile.id}
        color={statusColor(tile.status)}
        className="h-9 w-9 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-base text-ink group-hover:text-accent transition-colors">
          {tile.title}
        </h3>
        <p className="text-muted text-sm truncate">{tile.hook}</p>
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
        className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
      >
        →
      </span>
    </button>
  );
}
