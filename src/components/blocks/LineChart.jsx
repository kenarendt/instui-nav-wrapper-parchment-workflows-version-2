/**
 * LineChart — lightweight multi-series SVG line chart (no dependencies).
 * series: [{ label, color, points: number[] }] — points are equal-spaced.
 */
export default function LineChart({ series = [], height = 220 }) {
  const width = 640;
  const pad = { top: 12, right: 12, bottom: 28, left: 12 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const allValues = series.flatMap((s) => s.points);
  const max = Math.max(1, ...allValues);
  const count = Math.max(...series.map((s) => s.points.length), 1);

  const toPath = (points) =>
    points
      .map((v, i) => {
        const x = pad.left + (count === 1 ? 0 : (i / (count - 1)) * innerW);
        const y = pad.top + innerH - (v / max) * innerH;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label="Line chart"
        style={{ display: "block" }}
      >
        <line
          x1={pad.left}
          y1={pad.top + innerH}
          x2={width - pad.right}
          y2={pad.top + innerH}
          stroke="#d9dee3"
          strokeWidth="1"
        />
        {series.map((s) => (
          <path
            key={s.label}
            d={toPath(s.points)}
            fill="none"
            stroke={s.color}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          marginTop: 8,
          fontFamily: "var(--fontfamily-base)",
          fontSize: 12,
          color: "var(--text-mutedcolor)",
        }}
      >
        {series.map((s) => (
          <span key={s.label} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: s.color,
                display: "inline-block",
              }}
            />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
