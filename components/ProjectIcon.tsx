// A small, colorful per-project glyph paired with the project name. The color
// is the project's status color, so the icon doubles as a status hint.
function Glyph({ id }: { id: string }) {
  switch (id) {
    case "analogical-engines": // idea / R&D
      return (
        <>
          <path d="M9.5 18h5" />
          <path d="M10.5 21h3" />
          <path d="M12 3a6 6 0 0 0-3.4 10.9c.5.4.8 1 .9 1.6l.1.5h4.8l.1-.5c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3Z" />
        </>
      );
    case "ui-for-ai": // cursor
      return <path d="M5.5 3l5 16 2.2-6.6L19 10.4z" />;
    case "honda": // car
      return (
        <>
          <path d="M5 13.5l1.3-3.9A2 2 0 0 1 8.2 8.2h7.6a2 2 0 0 1 1.9 1.4L19 13.5v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V16H8v.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
          <path d="M5 13.5h14" />
        </>
      );
    case "zelig": // hanger
      return (
        <>
          <circle cx="12" cy="6" r="1.5" />
          <path d="M12 7.5 19.4 13a1 1 0 0 1-.6 1.8H5.2A1 1 0 0 1 4.6 13L12 7.5z" />
        </>
      );
    case "jobgrind": // target
      return (
        <>
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="3.2" />
        </>
      );
    case "protolab": // pen / writing
      return (
        <>
          <path d="M5 19l3.7-1L18 8.7 15.3 6 5.2 16z" />
          <path d="M14 7l3 3" />
        </>
      );
    default:
      return <circle cx="12" cy="12" r="3" />;
  }
}

export default function ProjectIcon({
  id,
  color = "#5B9DFF",
  className = "",
}: {
  id: string;
  color?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center rounded-lg ${className}`}
      style={{ backgroundColor: `${color}1f`, color }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[55%] w-[55%]"
      >
        <Glyph id={id} />
      </svg>
    </span>
  );
}
