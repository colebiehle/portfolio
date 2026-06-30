import Nav from "@/components/Nav";
import SystemField from "@/components/SystemField";
import Hero from "@/components/Hero";
import Bento from "@/components/Bento";
import About from "@/components/About";
import CopyEmail from "@/components/CopyEmail";
import QRShare from "@/components/QRShare";

export default function Page() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-3 focus:left-3 focus:rounded focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <SystemField />
      <div className="ambient-glow" aria-hidden />

      <main id="top" className="relative z-10 min-h-screen">
      <Nav />
      <Hero />

      <section
        id="work"
        className="scroll-mt-16 mx-auto max-w-[1600px] px-6 md:px-10 py-20 md:py-28"
      >
        <h2 className="sr-only">Selected work</h2>
        <Bento />
      </section>

      <About />

      <footer
        id="contact"
        className="relative z-10 scroll-mt-16 mx-auto max-w-[1600px] px-6 md:px-10 py-16 border-t border-white/[0.06]"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-4">
          Get in touch
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <CopyEmail email="tbiehle@cs.cmu.edu" />
          <a
            className="group inline-flex items-center gap-1.5 py-1.5 text-muted hover:text-ink transition-colors"
            href="https://linkedin.com/in/colebiehle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
              className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-opacity"
            >
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
            LinkedIn
          </a>
          <a
            className="group inline-flex items-center gap-1.5 py-1.5 text-muted hover:text-ink transition-colors"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
              className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-opacity"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
            Resume
          </a>
          <QRShare url="https://colebiehle.com" />
        </div>
        <a
          href="https://github.com/colebiehle"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block font-mono text-[11px] text-muted hover:text-accent transition-colors"
        >
          {"// built in next.js · tailwind · framer motion · github ↗"}
        </a>
        <p className="mt-1 font-mono text-[11px] text-muted">
          © 2026 Cole Biehle
        </p>
      </footer>
      </main>
    </>
  );
}
