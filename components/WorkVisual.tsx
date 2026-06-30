/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import ProjectArt from "@/components/ProjectArt";
import type { Tile } from "@/lib/tiles";

// The reveal "surface": real media if present, else the project's living
// motif (same one the card shows). Video autoplay respects reduced-motion.
export default function WorkVisual({
  tile,
  active,
  reduce,
  accent = "#5B9DFF",
}: {
  tile: Tile;
  active?: boolean;
  reduce?: boolean;
  accent?: string;
}) {
  const [stage, setStage] = useState<"video" | "image" | "motif">(
    tile.video ? "video" : tile.image ? "image" : "motif",
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface2 to-bg">
      {stage === "video" && tile.video && (
        <video
          src={tile.video}
          poster={tile.image}
          autoPlay={!reduce}
          loop
          muted
          playsInline
          preload="metadata"
          onError={() => setStage(tile.image ? "image" : "motif")}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {stage === "image" && tile.image && (
        <img
          src={tile.image}
          alt={tile.title}
          onError={() => setStage("motif")}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {stage === "motif" && (
        <ProjectArt id={tile.id} accent={accent} active={active} />
      )}
      {tile.comingSoon && (
        <span className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/70 px-2.5 py-1 rounded-full bg-bg/55 backdrop-blur border border-white/10">
          Case study coming soon
        </span>
      )}
    </div>
  );
}
