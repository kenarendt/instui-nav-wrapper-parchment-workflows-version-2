import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  FileStack,
  Receipt,
  Settings,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  X,
  Share2,
  Eye,
  Pencil,
  MoreVertical,
  Sparkles,
  RefreshCw,
  BadgeCheck,
  CalendarDays,
  FileText,
  ShieldCheck,
  Award,
  GraduationCap,
  Link2,
  Briefcase,
  HeartHandshake,
  Plus,
} from "lucide-react";
import Wrapper from "../components/Wrapper.jsx";
import Panel from "../components/blocks/Panel.jsx";
import Button from "../components/Button.jsx";
import IconButton from "../components/IconButton.jsx";
import Toggle from "../components/Toggle.jsx";
import Pill from "../components/Pill.jsx";
import DonutChart from "../components/blocks/DonutChart.jsx";
import CredentialMark from "../components/CredentialMark.jsx";
import { account } from "../data/experiences.js";
import { RECORD_DETAIL } from "../data/records.js";
import "./RecordDetail.css";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { key: "records", label: "My Records", Icon: FileStack, active: true },
  { key: "orders", label: "Orders", Icon: Receipt },
  { key: "settings", label: "Settings", Icon: Settings },
];

const THUMB_ICON = {
  diploma: FileText,
  verification: ShieldCheck,
  certificate: Award,
  badge: BadgeCheck,
  course: GraduationCap,
  evidence: FileText,
};

const editAction = (
  <IconButton icon={Pencil} variant="secondary" screenReaderLabel="Edit section" />
);

function ItemCard({ item }) {
  const Icon = THUMB_ICON[item.thumb] || FileText;
  return (
    <div className="rd-cred">
      <div className="rd-cred__thumb" aria-hidden="true">
        <Icon size={40} strokeWidth={1.25} />
      </div>
      <div className="rd-cred__body">
        <p className="rd-cred__type">{item.kind}</p>
        <p className="rd-cred__title">{item.title}</p>
        <p className="rd-cred__issuer">{item.issuer}</p>
        {item.desc && <p className="rd-cred__desc">{item.desc}</p>}
        <div className="rd-cred__foot">
          <span className="rd-cred__date">
            <CalendarDays size={14} strokeWidth={2} /> Acquired: {item.date}
          </span>
          {item.verified ? (
            <span className="rd-verify rd-verify--on">
              <BadgeCheck size={14} strokeWidth={2} /> Verified
            </span>
          ) : (
            <span className="rd-verify">Institution-sourced</span>
          )}
        </div>
      </div>
    </div>
  );
}

function VerifiedSkill({ skill }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rd-vskill${open ? " rd-vskill--open" : ""}`}>
      <button className="rd-vskill__pill" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <BadgeCheck size={14} strokeWidth={2} /> {skill.name}
        <ChevronDown size={14} strokeWidth={2} className="rd-vskill__chev" />
      </button>
      {open && (
        <div className="rd-vskill__detail">
          <p><strong>Backed by:</strong> {skill.backedBy}</p>
          <p className="rd-muted-sm">{skill.demand}</p>
        </div>
      )}
    </div>
  );
}

export default function RecordDetail({ record, onBack, onShare }) {
  const [tab, setTab] = useState("record");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const d = RECORD_DETAIL;
  const title = record?.title || "Record";
  const target = record?.targetedFor;
  const [isPublic, setIsPublic] = useState((record?.visibility ?? "public") === "public");

  useEffect(() => {
    if (!menuOpen) return;
    const handle = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [menuOpen]);

  const skillCount = d.glance.verifiedSkills + d.glance.selfReportedSkills;

  return (
    <Wrapper
      navProps={{
        logo: <CredentialMark size={40} />,
        institutionName: "Parchment",
        username: account.name,
        userRole: account.learnerRole,
        items: NAV_ITEMS,
        productLogo: "parchment",
      }}
      experienceType="learner"
      breadcrumb={
        <>
          <button className="rd-crumb-link" onClick={onBack}>My records</button>
          <ChevronRight size={14} strokeWidth={2} />
          <span className="rd-crumb-current">{title}</span>
        </>
      }
      topRight={
        <IconButton icon={X} variant="secondary" screenReaderLabel="Close record" onClick={onBack} />
      }
      title={title}
      actions={
        <>
          <Button variant="primary" icon={Eye}>Preview public view</Button>
          <Button
            variant={isPublic ? "secondary" : "secondary"}
            icon={Share2}
            onClick={() => isPublic && onShare?.(isPublic, setIsPublic)}
          >
            Share
          </Button>
          <div className="rd-menu-wrap" ref={menuRef}>
            <IconButton
              icon={MoreVertical}
              variant="secondary"
              screenReaderLabel="More options"
              onClick={() => setMenuOpen((o) => !o)}
            />
            {menuOpen && (
              <div className="rd-menu" role="menu">
                <button role="menuitem" className="rd-menu__item">Duplicate</button>
                <button role="menuitem" className="rd-menu__item">Delete</button>
              </div>
            )}
          </div>
        </>
      }
    >
      {/* Sub-header: target + status + visibility toggle */}
      <div className="rd-subhead">
        <div className="rd-subhead__row">
          {target && (
            <>
              <span className="rd-subhead__label">Targeted for:</span>
              <span className="rd-tag">{target}</span>
              <span className="rd-subhead__dot" aria-hidden="true" />
            </>
          )}
          <span className="rd-subhead__meta">Last edited: 3 days ago</span>
          {isPublic && (
            <>
              <span className="rd-subhead__dot" aria-hidden="true" />
              <span className="rd-subhead__meta">{d.views} views</span>
            </>
          )}
        </div>
        <div className="rd-visibility">
          <Toggle label="Public" defaultOn={isPublic} onChange={setIsPublic} />
          <span className="rd-visibility__label">{isPublic ? "Public" : "Private"}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="rd-tabbar" role="tablist">
        {[
          { id: "record", label: "Record" },
          { id: "access", label: "Access control" },
        ].map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`rd-tab${tab === t.id ? " rd-tab--active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "access" ? (
        <Panel title="Access control">
          <p className="rd-muted">
            Your full sharing history for this record appears here — every email, link, and social
            share, with the option to revoke each one. (Placeholder for the prototype.)
          </p>
        </Panel>
      ) : (
        <>
          {/* Record at a glance */}
          <Panel>
            <div className="rd-overview">
              <div className="rd-stats">
                <div className="rd-stat">
                  <span className="rd-stat__value">{d.glance.items}</span>
                  <span className="rd-stat__label">Items</span>
                  <span className="rd-stat__divider" aria-hidden="true" />
                </div>
                <div className="rd-stat">
                  <span className="rd-stat__value">{skillCount}</span>
                  <span className="rd-stat__label">Skills (verified + self-reported)</span>
                  <span className="rd-stat__divider" aria-hidden="true" />
                </div>
                <div className="rd-stat">
                  <span className="rd-stat__value">{d.glance.verifiedSkills}</span>
                  <span className="rd-stat__label">Verified skills</span>
                </div>
              </div>
              <DonutChart segments={d.glance.donut.segments} centerLabel={d.glance.donut.total} size={120} />
            </div>
          </Panel>

          {/* AI summary */}
          <Panel
            title="AI summary"
            headerRight={
              <Button variant="secondary" icon={RefreshCw}>Regenerate</Button>
            }
            showMenu
          >
            <div className="rd-ai">
              <span className="rd-ai__tag"><Sparkles size={13} strokeWidth={2} /> AI-generated</span>
              <p className="rd-ai__text">{d.aiSummary}</p>
            </div>
          </Panel>

          {/* Credentials & achievements — one flexible container */}
          <Panel title="Credentials & achievements" headerRight={editAction} showMenu>
            <p className="rd-block-name">{d.credentialBlock.name}</p>
            <p className="rd-block-desc">{d.credentialBlock.description}</p>
            <div className="rd-grid-2">
              {d.credentialBlock.items.map((it, i) => (
                <ItemCard key={i} item={it} />
              ))}
            </div>
          </Panel>

          {/* Skills */}
          <Panel title="Skills" headerRight={editAction} showMenu>
            <p className="rd-sub-label">Verified skills · synced from your credentials</p>
            <div className="rd-skills">
              {d.verifiedSkills.map((s) => (
                <VerifiedSkill key={s.name} skill={s} />
              ))}
            </div>
            <p className="rd-sub-label rd-sub-label--spaced">Self-reported skills</p>
            <div className="rd-skills">
              {d.selfReportedSkills.map((s) => (
                <span key={s} className="rd-skill rd-skill--self">{s}</span>
              ))}
            </div>
          </Panel>

          {/* Work history */}
          <Panel title="Work history" headerRight={editAction} showMenu>
            <p className="rd-sub-label">Employment · self-reported, not verified</p>
            <Timeline entries={d.workHistory.employment} Icon={Briefcase} />
            <p className="rd-sub-label rd-sub-label--spaced">Volunteering &amp; community · self-reported, not verified</p>
            <Timeline entries={d.workHistory.volunteering} Icon={HeartHandshake} />
          </Panel>

          {/* Portfolio links */}
          <Panel title="Portfolio links" headerRight={editAction} showMenu>
            <div className="rd-grid-3">
              {d.portfolioLinks.map((l) => (
                <a key={l.title} className="rd-link-card" href="#" onClick={(e) => e.preventDefault()}>
                  <span className="rd-link-card__icon" aria-hidden="true">
                    <Link2 size={18} strokeWidth={2} />
                  </span>
                  <span className="rd-link-card__body">
                    <span className="rd-link-card__title">{l.title}</span>
                    <span className="rd-link-card__tag">{l.type}</span>
                    <span className="rd-link-card__url">{l.url}</span>
                  </span>
                </a>
              ))}
            </div>
          </Panel>

          {/* Applied with this record */}
          <Panel title="Applied with this record" showMenu>
            <ul className="rd-oppo">
              {d.applied.map((o) => (
                <li key={o.role} className="rd-oppo__item">
                  <div>
                    <p className="rd-oppo__title">{o.role}</p>
                    <p className="rd-oppo__org">{o.org} · {o.date}</p>
                  </div>
                  <button className="rd-textlink">View <ArrowRight size={14} strokeWidth={2} /></button>
                </li>
              ))}
            </ul>
          </Panel>

          {/* Opportunities */}
          <Panel title="Opportunities" showMenu>
            <ul className="rd-oppo">
              {d.opportunities.map((o) => (
                <li key={o.title} className="rd-oppo__item">
                  <div>
                    <p className="rd-oppo__title">{o.title}</p>
                    <p className="rd-oppo__org">{o.org}</p>
                  </div>
                  <Pill color="success">{o.match}</Pill>
                </li>
              ))}
            </ul>
            <button className="rd-textlink rd-textlink--foot">
              See all opportunities in HUB <ArrowRight size={14} strokeWidth={2} />
            </button>
          </Panel>

          {/* Add new content block */}
          <div className="rd-addblock">
            <p className="rd-addblock__title">Add block</p>
            <p className="rd-addblock__hint">Bring your record to life with the following block types.</p>
            <div className="rd-addblock__actions">
              {d.blockTypes.map((b) => (
                <button key={b} className="rd-addblock__btn">
                  <Plus size={16} strokeWidth={2} /> {b}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
}

function Timeline({ entries, Icon }) {
  return (
    <ol className="rd-timeline">
      {entries.map((job, i) => (
        <li key={i} className="rd-timeline__item">
          <span className="rd-timeline__marker" aria-hidden="true">
            <Icon size={16} strokeWidth={2} />
          </span>
          <div className="rd-timeline__body">
            <p className="rd-timeline__role">{job.role}</p>
            <p className="rd-timeline__org">
              {job.org} <span className="rd-timeline__dates">· {job.dates}</span>
            </p>
            <p className="rd-timeline__desc">{job.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
