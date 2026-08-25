import { X, Check } from "lucide-react";
import SchoolCrest from "./SchoolCrest.jsx";
import { ADMIN_SCHOOLS } from "../data/experiences.js";
import "./SchoolPickerModal.css";

/**
 * SchoolPickerModal — asks which school the admin is acting for inside a
 * service.
 *
 * Shown over Admin Connect when the admin opens a service, since the service
 * page has nothing to show until a school is chosen. Also reopened from
 * "Change schools" in the account menu while inside a service.
 *
 * `dismissible` decides whether there is a way out without choosing. Defaults
 * to true once a school is already selected.
 */
export default function SchoolPickerModal({
  serviceName,
  selectedId,
  dismissible: dismissibleProp,
  onSelect,
  onClose,
}) {
  const dismissible =
    (dismissibleProp ?? Boolean(selectedId)) && Boolean(onClose);

  return (
    <div
      className="spm-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Choose a school for ${serviceName}`}
    >
      <div className="spm-box">
        <div className="spm-head">
          <div>
            <h2 className="spm-title">Choose a school</h2>
            <p className="spm-sub">
              Which school are you administering {serviceName} on behalf of?
            </p>
          </div>
          {dismissible && (
            <button className="spm-close" aria-label="Close" onClick={onClose}>
              <X size={20} strokeWidth={2} />
            </button>
          )}
        </div>

        <ul className="spm-list">
          {ADMIN_SCHOOLS.map((school) => {
            const isCurrent = school.id === selectedId;
            return (
              <li key={school.id}>
                <button
                  className={`spm-item${isCurrent ? " spm-item--current" : ""}`}
                  aria-current={isCurrent ? "true" : undefined}
                  onClick={() => onSelect(school)}
                >
                  <span className="spm-crest" aria-hidden="true">
                    <SchoolCrest size={40} variant={school.crest} />
                  </span>
                  <span className="spm-text">
                    <span className="spm-name">{school.name}</span>
                    <span className="spm-meta">
                      {school.location} · {school.detail}
                    </span>
                  </span>
                  {isCurrent && (
                    <span className="spm-current-mark">
                      <Check size={16} strokeWidth={2.5} />
                      Current
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="spm-foot">
          You can change schools later from the account menu.
        </p>
      </div>
    </div>
  );
}
