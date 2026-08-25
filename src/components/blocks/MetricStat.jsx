import "./MetricStat.css";

/**
 * MetricStat — a label-first metric: label on top, large value, optional hint.
 * Used in the admin dashboard "Metrics" panels.
 */
export default function MetricStat({ label, value, hint }) {
  return (
    <div className="metric-stat">
      <span className="metric-stat__label">{label}</span>
      <span className="metric-stat__value">{value}</span>
      {hint && <span className="metric-stat__hint">{hint}</span>}
    </div>
  );
}
