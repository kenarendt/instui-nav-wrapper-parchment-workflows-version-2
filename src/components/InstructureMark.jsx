/**
 * Instructure/InstUI logo mark — a bar plus stacked dots, redrawn to match
 * the wordmark lockup on the sign-in screen. Placeholder for the brand SVG.
 */
export default function InstructureMark({ height = 48, color = "#ffffff" }) {
  const w = height * 0.75;
  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 36 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="14" height="48" rx="2" fill={color} />
      <circle cx="28" cy="8" r="5" fill={color} />
      <circle cx="28" cy="24" r="5" fill={color} />
      <circle cx="28" cy="40" r="5" fill={color} />
    </svg>
  );
}
