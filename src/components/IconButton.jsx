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
  // Set for toggle buttons so assistive tech reports the on/off state.
  pressed,
}) {
  return (
    <button
      type="button"
      className={`icon-btn icon-btn--${variant}`}
      aria-label={screenReaderLabel}
      aria-pressed={pressed}
      onClick={onClick}
    >
      {Icon ? <Icon size={20} strokeWidth={2} /> : null}
    </button>
  );
}
