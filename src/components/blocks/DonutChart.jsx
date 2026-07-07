/**
 * DonutChart — SVG donut with a center label and legend (no dependencies).
 * segments: [{ label, value, color }]
 */
export default function DonutChart({ segments = [], centerLabel, size = 180 }) {
  const stroke = 28;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  let offset = 0;
  const arcs = segments.map((s) => {
    const frac = s.value / total;
    const dash = frac * circumference;
    const arc = {
      color: s.color,
      dasharray: `${dash} ${circumference - dash}`,
      dashoffset: -offset,
    };
    offset += dash;
    return arc;
  });

  return (
    <div>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label="Donut chart"
        style={{ display: "block", margin: "0 auto" }}
      >
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eef1f4" strokeWidth={stroke} />
        {arcs.map((a, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={a.color}
            strokeWidth={stroke}
            strokeDasharray={a.dasharray}
            strokeDashoffset={a.dashoffset}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        ))}
        {centerLabel && (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="var(--fontfamily-heading)"
            fontWeight="700"
            fontSize="24"
            fill="var(--heading-basecolor)"
          >
            {centerLabel}
          </text>
        )}
      </svg>
      <div
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 12,
          fontFamily: "var(--fontfamily-base)",
          fontSize: 12,
          color: "var(--text-mutedcolor)",
        }}
      >
        {segments.map((s) => (
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
