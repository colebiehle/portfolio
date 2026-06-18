"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { EASE, DUR } from "@/lib/motion";

// A "Share" button that pops a scannable QR to the site, styled like the rest
// (mono label, surface card, subtle close).
export default function QRShare({ url }: { url: string }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      btnRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-1.5 py-1.5 text-muted hover:text-ink transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-opacity"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h3v3M20 14v3M14 20h3M20 20v.01" />
        </svg>
        Share
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.base, ease: EASE }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Share this site"
              initial={{ scale: 0.96, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98 }}
              transition={{ duration: DUR.base, ease: EASE }}
              className="relative z-10 rounded-2xl bg-surface border border-white/10 p-6 text-center shadow-2xl"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-4">
                Scan to open on your phone
              </p>
              <div className="inline-block rounded-xl bg-white p-3.5">
                <QRCodeSVG
                  value={url}
                  size={164}
                  bgColor="#ffffff"
                  fgColor="#0B0B0D"
                  level="M"
                />
              </div>
              <p className="mt-4 text-sm text-ink/80">
                {url.replace(/^https?:\/\//, "")}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
