// Personal mark: a soft blob-star (the ambient shape's organic language pushed
// to 5 gentle points), filled blue with "cb" knocked out in white.
const N = 72;
const R = 9;

function blobStarPath() {
  const pts: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    const th = (i / N) * Math.PI * 2 - Math.PI / 2;
    const r = R * (1 + 0.15 * Math.cos(5 * th) + 0.03 * Math.sin(8 * th + 1));
    pts.push([12 + r * Math.cos(th), 12 + r * Math.sin(th)]);
  }
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d + " Z";
}

const BLOB_STAR = blobStarPath();

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative inline-flex items-center justify-center font-display font-semibold lowercase leading-none ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[1.7em] w-[1.7em]"
        style={{ filter: "drop-shadow(0 0 5px rgba(91,157,255,0.45))" }}
      >
        <path d={BLOB_STAR} fill="#5B9DFF" />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-white"
        style={{ fontSize: "0.56em" }}
      >
        cb
      </span>
    </span>
  );
}
