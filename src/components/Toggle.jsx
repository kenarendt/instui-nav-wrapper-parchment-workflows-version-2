import { useState } from "react";
import { X } from "lucide-react";
import "./Toggle.css";

/**
 * Toggle — pill switch. Off shows a knob on the left with an X; on shifts the
 * knob right and fills the track. Visual only unless `onChange` is provided.
 */
export default function Toggle({ label, defaultOn = false, onChange, id }) {
  const [on, setOn] = useState(defaultOn);
  const toggle = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
  };
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`toggle${on ? " toggle--on" : ""}`}
      onClick={toggle}
    >
      <span className="toggle__knob">{!on && <X size={12} strokeWidth={3} />}</span>
    </button>
  );
}
