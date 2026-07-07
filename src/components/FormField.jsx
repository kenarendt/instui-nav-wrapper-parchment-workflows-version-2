import "./FormField.css";

/**
 * FormField — stacked label + control, mirrors InstUI FormFieldLayout.
 * Renders a label (with optional required asterisk) above its control.
 */
export default function FormField({ id, label, required = false, children }) {
  return (
    <div className="field">
      {label && (
        <label className="field__label" htmlFor={id}>
          {label}
          {required && (
            <span className="field__asterisk" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      {children}
    </div>
  );
}
