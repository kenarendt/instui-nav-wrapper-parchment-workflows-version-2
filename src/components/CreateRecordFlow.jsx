import { useState } from "react";
import {
  X,
  FileText,
  CalendarClock,
  Target,
  Check,
  Sparkles,
  BadgeCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Button from "./Button.jsx";
import { RECORD_TEMPLATES, PICKER_ITEMS, RECORD_DETAIL } from "../data/records.js";
import "./TextInput.css";
import "./CreateRecordFlow.css";

const TEMPLATE_ICON = { blank: FileText, timeline: CalendarClock, context: Target };
const STEPS = ["Start", "Setup", "Review"];

const SUMMARY_DRAFT = RECORD_DETAIL.aiSummary;
const SYNCED_SKILLS = RECORD_DETAIL.verifiedSkills.map((s) => s.name);

/**
 * CreateRecordFlow — the lightweight create wizard (spec §7).
 * Step 0 starting point → Step 1 setup → Step 2 review → onCreate lands the
 * learner in the record detail view.
 */
export default function CreateRecordFlow({ onClose, onCreate }) {
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState(null);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [picked, setPicked] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [visibility, setVisibility] = useState("private");

  const togglePick = (id) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const groups = PICKER_ITEMS.reduce((acc, it) => {
    (acc[it.source] = acc[it.source] || []).push(it);
    return acc;
  }, {});

  const canNext =
    (step === 0 && template) ||
    (step === 1 && name.trim() && picked.length > 0) ||
    step === 2;

  const next = () => {
    if (step === 1) setGenerated(true);
    setStep((s) => Math.min(s + 1, 2));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const save = () => {
    onCreate?.({
      id: `new-${Date.now()}`,
      title: name.trim() || "Untitled record",
      targetedFor: target.trim() || undefined,
      visibility,
      lastEdited: "just now",
      credentials: picked.length,
      skills: SYNCED_SKILLS.length,
      description: SUMMARY_DRAFT,
    });
  };

  return (
    <div className="cr-overlay" role="dialog" aria-modal="true" aria-label="Create new record">
      <div className="cr-box">
        <div className="cr-head">
          <div>
            <h2 className="cr-title">Create new record</h2>
            <div className="cr-steps">
              {STEPS.map((s, i) => (
                <span
                  key={s}
                  className={`cr-step${i === step ? " cr-step--active" : ""}${i < step ? " cr-step--done" : ""}`}
                >
                  <span className="cr-step__dot">{i < step ? <Check size={12} strokeWidth={3} /> : i + 1}</span>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <button className="panel__menu" aria-label="Close" onClick={onClose}>
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="cr-body">
          {/* Step 0 — starting point */}
          {step === 0 && (
            <>
              <p className="cr-lead">Choose a starting point. You can rename, reorder, add, or delete sections anytime.</p>
              <div className="cr-templates">
                {RECORD_TEMPLATES.map((t) => {
                  const Icon = TEMPLATE_ICON[t.id];
                  return (
                    <button
                      key={t.id}
                      className={`cr-template${template === t.id ? " cr-template--active" : ""}`}
                      onClick={() => setTemplate(t.id)}
                    >
                      <span className="cr-template__icon" aria-hidden="true"><Icon size={22} strokeWidth={1.75} /></span>
                      <span className="cr-template__name">{t.name}</span>
                      <span className="cr-template__desc">{t.desc}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Step 1 — setup */}
          {step === 1 && (
            <>
              <label className="cr-field">
                <span className="cr-field__label">Record name <span className="cr-req">*</span></span>
                <input className="text-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Healthcare Administration Application" />
              </label>
              <label className="cr-field">
                <span className="cr-field__label">Target role or goal</span>
                <input className="text-input" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="e.g. Healthcare Administration Manager" />
                <span className="cr-hint">AI uses this to tailor your summary.</span>
              </label>

              <div className="cr-picker">
                <p className="cr-field__label">Select items to include</p>
                {Object.entries(groups).map(([source, items]) => (
                  <div key={source} className="cr-picker__group">
                    <p className="cr-picker__source">{source}</p>
                    {items.map((it) => {
                      const on = picked.includes(it.id);
                      return (
                        <button key={it.id} className={`cr-item${on ? " cr-item--on" : ""}`} onClick={() => togglePick(it.id)}>
                          <span className={`cr-item__check${on ? " cr-item__check--on" : ""}`}>{on && <Check size={12} strokeWidth={3} />}</span>
                          <span className="cr-item__body">
                            <span className="cr-item__title">{it.title}</span>
                            <span className="cr-item__meta">{it.meta}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 2 — review */}
          {step === 2 && (
            <>
              <div className="cr-review-head">
                <span className="cr-ai-tag"><Sparkles size={13} strokeWidth={2} /> AI-generated</span>
              </div>
              <label className="cr-field">
                <span className="cr-field__label">Summary</span>
                <textarea className="text-input cr-textarea" defaultValue={SUMMARY_DRAFT} rows={5} />
              </label>

              <p className="cr-field__label">Skills · synced from your selected credentials</p>
              <div className="cr-skills">
                {SYNCED_SKILLS.map((s) => (
                  <span key={s} className="cr-skill"><BadgeCheck size={13} strokeWidth={2} /> {s}</span>
                ))}
              </div>

              <p className="cr-field__label cr-field__label--spaced">Visibility</p>
              <div className="cr-visibility">
                {["private", "public"].map((v) => (
                  <button key={v} className={`cr-vis${visibility === v ? " cr-vis--on" : ""}`} onClick={() => setVisibility(v)}>
                    <span className="cr-vis__radio">{visibility === v && <span className="cr-vis__dot" />}</span>
                    <span className="cr-vis__label">{v === "private" ? "Private" : "Public"}</span>
                    <span className="cr-vis__desc">{v === "private" ? "Only you can view it." : "Can be shared with others."}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="cr-actions">
          {step > 0 ? (
            <Button variant="secondary" icon={ArrowLeft} onClick={back}>Back</Button>
          ) : (
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
          )}
          {step < 2 ? (
            <span className={canNext ? "" : "cr-disabled"}>
              <Button variant="primary" icon={ArrowRight} onClick={canNext ? next : undefined}>
                {step === 1 ? "Generate summary" : "Continue"}
              </Button>
            </span>
          ) : (
            <Button variant="primary" onClick={save}>Save record</Button>
          )}
        </div>
      </div>
    </div>
  );
}
