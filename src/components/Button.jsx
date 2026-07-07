import "./Button.css";

/**
 * Button — mirrors InstUI Button v2 API (subset).
 * variant: "primary" | "secondary"
 */
export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
