import { Sparkles } from "lucide-react";

/**
 * AINote — the "powered by IgniteAI" summary strip shown on dashboards.
 */
export default function AINote({ children, input = false }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        border: "1px solid var(--nav-border-color)",
        borderRadius: 12,
        color: input ? "var(--text-mutedcolor)" : "var(--heading-basecolor)",
        fontFamily: "var(--fontfamily-base)",
        fontSize: 13,
        lineHeight: 1.4,
        width: "100%",
      }}
    >
      <Sparkles size={16} strokeWidth={2} style={{ color: "#7f77dd", flexShrink: 0 }} />
      <span>{children}</span>
    </div>
  );
}
