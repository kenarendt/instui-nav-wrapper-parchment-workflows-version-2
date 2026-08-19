import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Pill from "../Pill.jsx";
import "./RecordCard.css";

const MENU_ITEMS = ["Preview public view", "Duplicate", "Delete"];

/**
 * RecordCard — a single learner "record" tile on the My records page.
 * Bundles credentials + skills into a story the learner can share.
 * The whole tile drills into the full Record view; the kebab menu holds
 * per-record actions and does not trigger the drill-down.
 */
export default function RecordCard({ record, onOpen, onAction }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handle = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [menuOpen]);

  const isPublic = record.visibility === "public";

  return (
    <div
      className="record-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen?.(record)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.(record);
        }
      }}
    >
      <div className="record-card__head">
        <div className="record-card__heading">
          <h3 className="record-card__title">{record.title}</h3>
          {record.targetedFor && (
            <p className="record-card__target">
              Targeted for: {record.targetedFor}
            </p>
          )}
        </div>

        <div className="record-card__menu-wrap" ref={menuRef}>
          <button
            className="record-card__kebab"
            aria-label="Record options"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((o) => !o);
            }}
          >
            <MoreVertical size={20} strokeWidth={2} />
          </button>
          {menuOpen && (
            <div className="record-card__menu" role="menu">
              {MENU_ITEMS.map((item) => (
                <button
                  key={item}
                  role="menuitem"
                  className="record-card__menu-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    onAction?.(item, record);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="record-card__meta">
        <span>Last edited: {record.lastEdited}</span>
        <span className="record-card__dot" aria-hidden="true" />
        <span>{record.credentials} credentials</span>
        <span className="record-card__dot" aria-hidden="true" />
        <span>{record.skills} skills</span>
      </p>

      <Pill color={isPublic ? "success" : "neutral"}>
        {isPublic ? "Public" : "Private"}
      </Pill>

      <p className="record-card__desc">{record.description}</p>
    </div>
  );
}
