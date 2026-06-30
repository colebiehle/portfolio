// The system's status vocabulary. Functional color only — reinforces the
// "well-orchestrated system" read (live / shipped / in progress / available).
export const STATUS: Record<string, { label: string; color: string; pulse?: boolean }> = {
  live: { label: "live", color: "#3FB950", pulse: true },
  shipped: { label: "shipped", color: "#5B9DFF" },
  research: { label: "research", color: "#D9A441" },
  building: { label: "in progress", color: "#D9A441" },
  concept: { label: "concept", color: "#A78BFA" },
  submitted: { label: "in submission", color: "#8A8A93" },
  open: { label: "open to roles · aug 2026", color: "#3FB950", pulse: true },
};

export function statusColor(status: string): string {
  return (STATUS[status] ?? STATUS.shipped).color;
}

export default function StatusDot({
  status,
  className = "",
}: {
  status: string;
  className?: string;
}) {
  const s = STATUS[status] ?? STATUS.shipped;
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {s.pulse && (
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping"
            style={{ background: s.color }}
          />
        )}
        <span
          className="relative inline-flex h-1.5 w-1.5 rounded-full"
          style={{ background: s.color }}
        />
      </span>
      {s.label}
    </span>
  );
}
