/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import ConceptMotif from "@/components/ConceptMotif";
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
        <ConceptMotif id={tile.id} accent={accent} active={active} />
      )}
    </div>
  );
}
