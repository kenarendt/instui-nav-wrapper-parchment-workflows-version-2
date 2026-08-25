import "./Pill.css";

/**
 * Pill — mirrors InstUI Pill v2. Communicates the state of an item with a
 * colored label. Variants: neutral (default), success.
 */
export default function Pill({ children, color = "neutral" }) {
  return <span className={`pill pill--${color}`}>{children}</span>;
}
