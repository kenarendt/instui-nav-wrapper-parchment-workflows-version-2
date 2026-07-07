import FormField from "./FormField.jsx";
import "./TextInput.css";

/**
 * TextInput — mirrors InstUI TextInput v2 (stacked layout).
 */
export default function TextInput({
  id,
  label,
  required = false,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  return (
    <FormField id={id} label={label} required={required}>
      <input
        id={id}
        className="text-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
      />
    </FormField>
  );
}
