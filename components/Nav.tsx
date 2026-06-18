"use client";

import Logo from "@/components/Logo";

export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-bg/70 border-b border-white/[0.06]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-14 flex items-center justify-between">
        <a
          href="#top"
          aria-label="Cole Biehle, home"
          className="text-ink hover:opacity-90 transition-opacity"
        >
          <Logo className="text-2xl md:text-[1.7rem]" />
        </a>
        <div className="flex items-center gap-3.5 sm:gap-5 md:gap-6 font-mono text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.18em] text-muted">
          <a href="#work" className="py-2 -my-2 hover:text-ink transition-colors">
            Work
          </a>
          <a href="#about" className="py-2 -my-2 hover:text-ink transition-colors">
            About
          </a>
          <a href="#contact" className="py-2 -my-2 hover:text-ink transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
