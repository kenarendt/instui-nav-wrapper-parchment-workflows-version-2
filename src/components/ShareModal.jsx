import { useState } from "react";
import { X, Mail, Globe, Lock, Share2, Copy, CheckCircle2 } from "lucide-react";
import Button from "./Button.jsx";
import "./TextInput.css";
import "./ShareModal.css";

const METHODS = [
  { id: "email", label: "Email", Icon: Mail },
  { id: "public", label: "Public link", Icon: Globe },
  { id: "secure", label: "Secured link", Icon: Lock },
  { id: "social", label: "Social", Icon: Share2 },
];

function Field({ label, required, placeholder, type = "text" }) {
  return (
    <label className="sm-field">
      <span className="sm-field__label">
        {label}
        {required && <span className="sm-req"> *</span>}
      </span>
      <input className="text-input" type={type} placeholder={placeholder} />
    </label>
  );
}

/**
 * ShareModal — the record share flow (spec §5). Four methods; each shows its
 * fields and a confirmation state on submit. Representative for the prototype.
 */
export default function ShareModal({ recordTitle, onClose }) {
  const [method, setMethod] = useState("email");
  const [done, setDone] = useState(null);

  const submit = () => {
    if (method === "email") setDone("Email sent to j.smith@company.com.");
    else if (method === "public") setDone("Public link copied to your clipboard.");
    else if (method === "secure") setDone("Secured link and PIN generated — copy and send both.");
    setMethod((m) => m);
  };

  const reset = () => setDone(null);

  return (
    <div className="sm-overlay" role="dialog" aria-modal="true" aria-label="Share record">
      <div className="sm-box">
        <div className="sm-head">
          <div>
            <h2 className="sm-title">Share record</h2>
            <p className="sm-sub">{recordTitle}</p>
          </div>
          <button className="panel__menu" aria-label="Close" onClick={onClose}>
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="sm-visibility">
          <CheckCircle2 size={16} strokeWidth={2} />
          This record is <strong>Public</strong> and can be shared using any method below.
        </div>

        {/* Method selector */}
        <div className="sm-methods" role="tablist">
          {METHODS.map((m) => {
            const Icon = m.Icon;
            return (
              <button
                key={m.id}
                role="tab"
                aria-selected={method === m.id}
                className={`sm-method${method === m.id ? " sm-method--active" : ""}`}
                onClick={() => { setMethod(m.id); reset(); }}
              >
                <Icon size={18} strokeWidth={2} />
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Method body */}
        {done ? (
          <div className="sm-done">
            <CheckCircle2 size={40} strokeWidth={1.5} />
            <p className="sm-done__text">{done}</p>
            <p className="sm-done__note">This share now appears in your Access control log.</p>
          </div>
        ) : (
          <div className="sm-body">
            {method === "email" && (
              <>
                <p className="sm-desc">We'll email the record to your recipient on your behalf.</p>
                <Field label="Share name" placeholder="e.g. Anthropic application" />
                <Field label="Purpose" placeholder="e.g. Job application" />
                <Field label="Recipient email" required placeholder="name@company.com" type="email" />
                <Field label="Message" placeholder="Add a short note (optional)" />
                <div className="sm-two">
                  <Field label="Access PIN" placeholder="Optional" />
                  <Field label="Expiration date" placeholder="mm/dd/yyyy" type="date" />
                </div>
              </>
            )}
            {method === "public" && (
              <>
                <p className="sm-desc">Anyone with the link can view this record — no sign-in needed.</p>
                <Field label="Expiration date" placeholder="mm/dd/yyyy" type="date" />
              </>
            )}
            {method === "secure" && (
              <>
                <p className="sm-desc">Viewers need the link and a PIN you set. Copy and send both.</p>
                <Field label="Share name" placeholder="e.g. Portfolio review" />
                <Field label="Purpose" placeholder="e.g. Grad school" />
                <div className="sm-two">
                  <Field label="Access PIN" required placeholder="Set a PIN" />
                  <Field label="Expiration date" placeholder="mm/dd/yyyy" type="date" />
                </div>
              </>
            )}
            {method === "social" && (
              <>
                <p className="sm-desc">Share to your professional network on LinkedIn.</p>
                <div className="sm-social">
                  <button className="sm-social__card">
                    <Share2 size={20} strokeWidth={2} />
                    <span>
                      <span className="sm-social__title">Share to LinkedIn feed</span>
                      <span className="sm-social__desc">Post a link to your public record with a custom caption.</span>
                    </span>
                  </button>
                  <button className="sm-social__card">
                    <Share2 size={20} strokeWidth={2} />
                    <span>
                      <span className="sm-social__title">Add to LinkedIn profile</span>
                      <span className="sm-social__desc">Add this record to your Licenses &amp; Certifications section.</span>
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer actions */}
        <div className="sm-actions">
          {done ? (
            <Button variant="primary" onClick={onClose}>Done</Button>
          ) : method === "social" ? (
            <Button variant="secondary" onClick={onClose}>Close</Button>
          ) : (
            <>
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button variant="primary" icon={method === "public" ? Copy : undefined} onClick={submit}>
                {method === "email" ? "Send email" : method === "public" ? "Copy link" : "Generate link"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
