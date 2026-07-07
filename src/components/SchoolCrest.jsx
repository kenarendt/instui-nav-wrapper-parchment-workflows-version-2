/**
 * SchoolCrest — fictional school crest placeholders. Original artwork, not any
 * real institution. `variant` selects the school treatment.
 */
export default function SchoolCrest({ size = 40, variant = "bambusa" }) {
  if (variant === "panda") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M20 3 L34 8 V19 C34 28 28 34 20 37 C12 34 6 28 6 19 V8 Z"
          fill="#1f6b4f"
          stroke="#124832"
          strokeWidth="1"
        />
        {/* panda face */}
        <circle cx="20" cy="19" r="8.5" fill="#ffffff" />
        <ellipse cx="13.5" cy="12.5" rx="3" ry="3.4" fill="#173a2a" />
        <ellipse cx="26.5" cy="12.5" rx="3" ry="3.4" fill="#173a2a" />
        <ellipse cx="16.6" cy="18" rx="2" ry="2.6" fill="#173a2a" />
        <ellipse cx="23.4" cy="18" rx="2" ry="2.6" fill="#173a2a" />
        <circle cx="20" cy="22.4" r="1.5" fill="#173a2a" />
      </svg>
    );
  }
  // Bambusa University — navy shield with gold mortarboard and banner.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 3 L34 8 V19 C34 28 28 34 20 37 C12 34 6 28 6 19 V8 Z"
        fill="#1d354f"
        stroke="#12233a"
        strokeWidth="1"
      />
      <path d="M20 13 L29 16.5 L20 20 L11 16.5 Z" fill="#e7b73b" />
      <path d="M20 20 L20 24" stroke="#e7b73b" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="20" cy="24.4" r="1.2" fill="#e7b73b" />
      <path
        d="M24 18 V22 C24 23.4 22.2 24.4 20 24.4 C17.8 24.4 16 23.4 16 22 V18"
        fill="none"
        stroke="#e7b73b"
        strokeWidth="1.4"
      />
      <rect x="12" y="27.5" width="16" height="4.5" rx="1" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}
