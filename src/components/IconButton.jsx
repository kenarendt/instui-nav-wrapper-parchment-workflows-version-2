import "./IconButton.css";

/**
 * IconButton — mirrors InstUI IconButton v2 API (subset).
 * variant: "primary" | "secondary" | "tertiary"
 */
export default function IconButton({
  icon: Icon,
  screenReaderLabel,
  variant = "secondary",
  onClick,
}) {
  return (
    <button
      type="button"
      className={`icon-btn icon-btn--${variant}`}
      aria-label={screenReaderLabel}
      onClick={onClick}
    >
      {Icon ? <Icon size={20} strokeWidth={2} /> : null}
    </button>
  );
}
