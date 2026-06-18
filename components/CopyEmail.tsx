"use client";

import { useState } from "react";

// Lead with a mail icon; the address copies on click with quiet feedback.
// Falls back to mailto if the clipboard is blocked.
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      aria-label={`Copy email address ${email}`}
      className="group inline-flex items-center gap-1.5 text-muted hover:text-ink transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
        className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-opacity"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
      <span>
        {copied ? (
          <>
            copied <span aria-hidden>✓</span>
          </>
        ) : (
          email
        )}
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
