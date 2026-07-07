import "./StatTile.css";

/**
 * StatTile — a labelled metric: value, label, and a hint line.
 */
export default function StatTile({ value, label, hint }) {
  return (
    <div className="stat-tile">
      <span className="stat-tile__value">{value}</span>
      <span className="stat-tile__label">{label}</span>
      {hint && <span className="stat-tile__hint">{hint}</span>}
    </div>
  );
}
