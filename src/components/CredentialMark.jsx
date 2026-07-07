import { Award } from "lucide-react";

/**
 * CredentialMark — neutral logo for cross-school views (All Credentials, Other
 * Badges), where no single institution is in focus. A navy tile with an award
 * glyph signals the learner's whole Parchment collection.
 */
export default function CredentialMark({ size = 40 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "var(--avatar-rectangle-radius)",
        background: "#1d354f",
        color: "#fff",
      }}
    >
      <Award size={size * 0.6} strokeWidth={2} />
    </span>
  );
}
