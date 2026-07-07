/**
 * Canvas by Instructure product mark, redrawn as a simple ring of dots.
 * Placeholder for the product logo slot at the bottom of the nav rail.
 */
export default function CanvasLogo({ size = 24, color = "var(--icon-sidenav-color)" }) {
  const dots = [];
  const r = size / 2;
  const orbit = r - 3;
  const count = 8;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const cx = r + orbit * Math.cos(angle);
    const cy = r + orbit * Math.sin(angle);
    dots.push(<circle key={i} cx={cx} cy={cy} r={1.6} fill={color} />);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="Canvas">
      {dots}
      <circle cx={r} cy={r} r={2.2} fill={color} />
    </svg>
  );
}
