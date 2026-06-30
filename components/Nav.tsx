"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import ProgressWave from "@/components/ProgressWave";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);

      // At the very bottom, the short contact footer wins.
      if (max > 0 && max - h.scrollTop < 4) {
        setActive("contact");
        return;
      }
      // The active section is the last one whose top has scrolled up to just
      // under the nav. This matches click-to-scroll exactly and tracks cleanly
      // in both directions (each section "owns" the view from its top onward).
      const line = 96; // just below the 56px nav
      let current = "";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= line) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-bg/70 border-b border-white/[0.06]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-14 flex items-center justify-between">
        <a
          href="#top"
          aria-label="Cole Biehle, home"
          className="group text-ink hover:opacity-90 transition-opacity"
        >
          <Logo className="text-2xl md:text-[1.7rem]" />
        </a>
        <div className="flex items-center gap-3.5 sm:gap-5 md:gap-6 font-mono text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.18em]">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
              className={`relative py-2 -my-2 transition-colors ${
                active === l.id ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              <span className="relative inline-block">
                {l.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                    active === l.id ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </span>
            </a>
          ))}
        </div>
      </div>
      <ProgressWave progress={progress} />
    </nav>
  );
}
