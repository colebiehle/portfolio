"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { tiles } from "@/lib/tiles";
import ProjectCard from "@/components/ProjectCard";
import ProjectRow from "@/components/ProjectRow";
import Detail from "@/components/Detail";
import { EASE, DUR } from "@/lib/motion";

export default function Bento() {
  const [selected, setSelected] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const featured = tiles.filter((t) => t.featured);
  const rest = tiles.filter((t) => !t.featured);

  const index = selected ? tiles.findIndex((t) => t.id === selected) : -1;
  const active = index >= 0 ? tiles[index] : null;

  const go = useCallback((dir: number) => {
    setSelected((cur) => {
      const i = tiles.findIndex((t) => t.id === cur);
      if (i < 0) return cur;
      return tiles[(i + dir + tiles.length) % tiles.length].id;
    });
  }, []);

  const close = useCallback(() => {
    const id = selected;
    setSelected(null);
    requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>(`[data-card-id="${id}"]`)
        ?.focus({ preventScroll: true });
    });
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowRight") {
        go(1);
      } else if (e.key === "ArrowLeft") {
        go(-1);
      } else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, summary, [tabindex]:not([tabindex="-1"])',
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close, go]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((t) => (
          <ProjectCard
            key={t.id}
            tile={t}
            reduce={!!reduce}
            onOpen={() => setSelected(t.id)}
          />
        ))}
      </div>

      <div className="mt-12 border-t border-white/[0.06] pt-4">
        <ul className="divide-y divide-white/[0.06]">
          {rest.map((t) => (
            <li key={t.id}>
              <ProjectRow tile={t} onOpen={() => setSelected(t.id)} />
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.base, ease: EASE }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={close}
            />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              initial={
                reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }
              }
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 4 }}
              transition={{ duration: DUR.base, ease: EASE }}
              style={{ willChange: "transform, opacity" }}
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchStartX.current;
                if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
                touchStartX.current = null;
              }}
              className="relative z-10 w-full max-w-4xl h-[86vh] overflow-y-auto rounded-2xl bg-surface border border-white/10 shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 md:px-8 py-3.5 bg-surface/95 backdrop-blur border-b border-white/[0.06]">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                  <button
                    onClick={() => go(-1)}
                    aria-label="Previous project"
                    className="px-4 py-2.5 rounded bg-white/5 hover:bg-white/10 transition-colors text-ink/80"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Next project"
                    className="px-4 py-2.5 rounded bg-white/5 hover:bg-white/10 transition-colors text-ink/80"
                  >
                    Next
                  </button>
                  <span className="text-muted ml-1">
                    {index + 1} / {tiles.length}
                  </span>
                </div>
                <button
                  ref={closeRef}
                  onClick={close}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2.5 rounded bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: DUR.fast, ease: EASE }}
                >
                  <Detail tile={active} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
