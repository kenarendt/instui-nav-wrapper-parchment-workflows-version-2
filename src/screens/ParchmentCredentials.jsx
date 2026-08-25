import { useState } from "react";
import {
  LayoutDashboard,
  FileStack,
  Receipt,
  Settings,
  Plus,
  ChevronRight,
  ArrowRight,
  CalendarDays,
  FileText,
  ShieldCheck,
  Award,
  BadgeCheck,
  X,
} from "lucide-react";
import Wrapper from "../components/Wrapper.jsx";
import Panel from "../components/blocks/Panel.jsx";
import Button from "../components/Button.jsx";
import Select from "../components/Select.jsx";
import DonutChart from "../components/blocks/DonutChart.jsx";
import AINote from "../components/blocks/AINote.jsx";
import RecordCard from "../components/blocks/RecordCard.jsx";
import RecordDetail from "./RecordDetail.jsx";
import ShareModal from "../components/ShareModal.jsx";
import CreateRecordFlow from "../components/CreateRecordFlow.jsx";
import SchoolCrest from "../components/SchoolCrest.jsx";
import CredentialMark from "../components/CredentialMark.jsx";
import { account } from "../data/experiences.js";
import { RECORDS } from "../data/records.js";
import {
  SCHOOLS,
  OTHER_BADGES,
  allCredentials,
  ALL_DONUT,
  schoolById,
} from "../data/credentials.js";
import "./ParchmentCredentials.css";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { key: "records", label: "My Records", Icon: FileStack },
  { key: "orders", label: "Orders", Icon: Receipt },
  { key: "settings", label: "Settings", Icon: Settings },
];

const THUMB_ICON = {
  diploma: FileText,
  verification: ShieldCheck,
  certificate: Award,
};

function CredentialRow({ cred, showSchool }) {
  const Icon = THUMB_ICON[cred.thumb] || FileText;
  return (
    <div className="cred-row">
      <div className="cred-row__thumb" aria-hidden="true">
        <Icon size={26} strokeWidth={1.5} />
      </div>
      <div className="cred-row__body">
        <p className="cred-row__type">{cred.type}</p>
        <p className="cred-row__title">{cred.title}</p>
        <p className="cred-row__issuer">{showSchool ? cred.school : cred.issuer}</p>
        <p className="cred-row__date">
          <CalendarDays size={14} strokeWidth={2} /> Acquired: {cred.date}
        </p>
      </div>
      <ChevronRight size={20} strokeWidth={2} className="cred-row__chevron" />
    </div>
  );
}

function BadgeRow({ badge }) {
  return (
    <div className="cred-row">
      <div className="cred-row__thumb cred-row__thumb--badge" aria-hidden="true">
        <BadgeCheck size={26} strokeWidth={1.5} />
      </div>
      <div className="cred-row__body">
        <p className="cred-row__title">{badge.title}</p>
        <p className="cred-row__issuer">
          <Award size={14} strokeWidth={2} /> {badge.issuer}
        </p>
        <p className="cred-row__date">
          <CalendarDays size={14} strokeWidth={2} /> Acquired: {badge.date}
        </p>
      </div>
      <ChevronRight size={20} strokeWidth={2} className="cred-row__chevron" />
    </div>
  );
}

function SchoolView({ school }) {
  return (
    <>
      <Panel padded={false}>
        <div className="pc-card-pad">
          <div className="school-head">
            <span className="school-head__crest" aria-hidden="true">
              <SchoolCrest size={48} variant={school.crest} />
            </span>
            <div className="school-head__text">
              <h2 className="school-head__name">{school.name}</h2>
              <p className="school-head__meta">{school.location}</p>
              <p className="school-head__meta">{school.country}</p>
            </div>
            <button className="panel__menu" aria-label="More options">
              <span className="pc-dots">⋮</span>
            </button>
          </div>
          <div className="school-head__rule" />

          <div className="cred-list">
            {school.credentials.map((c, i) => (
              <CredentialRow key={i} cred={c} />
            ))}
          </div>

          <h3 className="pc-subhead">Digital Badges</h3>
          <div className="cred-list">
            {school.badges.map((b, i) => (
              <BadgeRow key={i} badge={b} />
            ))}
          </div>

          <div className="pc-footer-row">
            <span className="pc-footer-text">
              View and manage all of your digital badges.
            </span>
            <button className="pc-link">
              View all <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      </Panel>

      <Panel
        title={`${school.name} credential insights`}
        subtitle="This year"
        showMenu
      >
        <div className="pc-insights">
          {school.insights.map((s, i) => (
            <div key={i} className="pc-insight">
              <span className="pc-insight__label">{s.label}</span>
              <span className="pc-insight__value">{s.value}</span>
              <span className="pc-insight__hint">{s.hint}</span>
            </div>
          ))}
        </div>
        <AINote input>
          Ask me things like, &ldquo;Who is looking at my credentials online?&rdquo;
        </AINote>
        <div className="pc-view-details">
          <button className="pc-link">
            View details <ArrowRight size={14} strokeWidth={2} />
          </button>
        </div>
      </Panel>
    </>
  );
}

export default function ParchmentCredentials() {
  const [page, setPage] = useState("dashboard");
  const [openedRecord, setOpenedRecord] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [records, setRecords] = useState(RECORDS);
  const [active, setActive] = useState("bambusa");
  const [addOpen, setAddOpen] = useState(false);

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    active: item.key === (openedRecord ? "records" : page),
    onClick: () => {
      setOpenedRecord(null);
      setPage(item.key);
    },
  }));

  // ── Record detail (drill-down) ───────────────────────────────────
  if (openedRecord) {
    return (
      <>
        <RecordDetail
          record={openedRecord}
          onBack={() => setOpenedRecord(null)}
          onShare={() => setShareOpen(true)}
        />
        {shareOpen && (
          <ShareModal recordTitle={openedRecord.title} onClose={() => setShareOpen(false)} />
        )}
      </>
    );
  }

  // ── My Records page ──────────────────────────────────────────────
  if (page === "records") {
    return (
      <Wrapper
        navProps={{
          logo: <CredentialMark size={40} />,
          institutionName: "Parchment",
          username: account.name,
          userRole: account.learnerRole,
          items: navItems,
          productLogo: "parchment",
        }}
        experienceType="learner"
        title="My records"
        description="Package your credentials and skills into records that tell a specific story and open new opportunities."
        actions={
          <Button variant="primary" icon={Plus} onClick={() => setCreateOpen(true)}>
            Create new record
          </Button>
        }
      >
        <div className="records-grid">
          {records.map((r) => (
            <RecordCard
              key={r.id}
              record={r}
              onOpen={() => setOpenedRecord(r)}
              onAction={(item) => {
                if (item === "Preview public view") setOpenedRecord(r);
              }}
            />
          ))}
        </div>

        {createOpen && (
          <CreateRecordFlow
            onClose={() => setCreateOpen(false)}
            onCreate={(rec) => {
              setRecords((list) => [rec, ...list]);
              setCreateOpen(false);
              setOpenedRecord(rec);
            }}
          />
        )}
      </Wrapper>
    );
  }

  // ── Orders / Settings placeholders ───────────────────────────────
  if (page === "orders" || page === "settings") {
    const label = page === "orders" ? "Orders" : "Settings";
    return (
      <Wrapper
        navProps={{
          logo: <CredentialMark size={40} />,
          institutionName: "Parchment",
          username: account.name,
          userRole: account.learnerRole,
          items: navItems,
          productLogo: "parchment",
        }}
        experienceType="learner"
        title={label}
        description="This section is coming soon."
      >
        <Panel title={label}>
          <p className="pc-muted">Content for {label} is not part of this prototype yet.</p>
        </Panel>
      </Wrapper>
    );
  }

  const TABS = [
    ...SCHOOLS.map((s) => ({ id: s.id, label: s.name })),
    { id: "otherBadges", label: "Other Badges" },
    { id: "allCredentials", label: "All Credentials" },
  ];

  const activeSchool = schoolById(active);
  const isAggregate = active === "otherBadges" || active === "allCredentials";

  // Nav logo + name reflect the active view.
  let navLogo;
  let navName;
  if (activeSchool) {
    navLogo = <SchoolCrest size={40} variant={activeSchool.crest} />;
    navName = activeSchool.name;
  } else {
    navLogo = <CredentialMark size={40} />;
    navName = active === "otherBadges" ? "Other Badges" : "All Credentials";
  }

  let main;
  if (activeSchool) {
    main = <SchoolView school={activeSchool} />;
  } else if (active === "otherBadges") {
    main = (
      <Panel title="Other Badges" subtitle="Badges you've earned outside your schools." showMenu>
        <div className="cred-list">
          {OTHER_BADGES.map((b, i) => (
            <BadgeRow key={i} badge={b} />
          ))}
        </div>
      </Panel>
    );
  } else {
    main = (
      <Panel title="All Credentials" subtitle="Everything you've earned across your schools." showMenu>
        <div className="cred-list">
          {allCredentials().map((c, i) => (
            <CredentialRow key={i} cred={c} showSchool />
          ))}
        </div>
      </Panel>
    );
  }

  const trailing = (
    <>
      {activeSchool && (
        <Panel title="Order Credentials" showMenu>
          <p className="pc-muted">
            Send or collect academic credentials from {activeSchool.name}
          </p>
          <div className="pc-order-primary">
            <Button variant="primary">Order your transcript</Button>
          </div>
          <p className="pc-muted pc-center">
            {activeSchool.name} also offers other credentials, such as:
          </p>
          <div className="pc-pills">
            {activeSchool.orderPills.map((p) => (
              <span key={p} className="pc-pill">{p}</span>
            ))}
            <span className="pc-pill pc-pill--more">… and more!</span>
          </div>
          <div className="pc-order-secondary">
            <Button variant="secondary">Order now</Button>
          </div>
        </Panel>
      )}

      <Panel title="Credentials" subtitle="The types of credentials you've earned" showMenu>
        <DonutChart
          segments={activeSchool ? activeSchool.donut.segments : ALL_DONUT.segments}
          centerLabel={activeSchool ? activeSchool.donut.total : ALL_DONUT.total}
        />
        <div className="pc-center pc-collection">
          <Button variant="secondary">Create a collection</Button>
        </div>
      </Panel>

      {activeSchool && (
        <Panel title="Directory" showMenu>
          <Select
            id="dir-category"
            label="Category"
            value="advisors"
            onChange={() => {}}
            options={[{ value: "advisors", label: "Administrators and advisors" }]}
          />
          <p className="pc-dir-school">{activeSchool.name}</p>
          <ul className="pc-people">
            {activeSchool.directory.map((p) => (
              <li key={p.name} className="pc-person">
                <span className="pc-person__avatar">{p.initials}</span>
                <span className="pc-person__body">
                  <span className="pc-person__name">{p.name}</span>
                  <span className="pc-person__role">{p.role}</span>
                </span>
                <ChevronRight size={18} strokeWidth={2} className="cred-row__chevron" />
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </>
  );

  return (
    <Wrapper
      navProps={{
        logo: navLogo,
        institutionName: navName,
        username: account.name,
        userRole: account.learnerRole,
        items: navItems,
        productLogo: "parchment",
      }}
      experienceType="learner"
      title="Parchment Credentials"
      actions={
        <>
          <Button variant="secondary">Customize Dashboard</Button>
        </>
      }
      tabs={
        <div className="pc-tabbar">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`pc-tab${t.id === active ? " pc-tab--active" : ""}`}
              aria-current={t.id === active ? "page" : undefined}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
          <button className="pc-addschool" onClick={() => setAddOpen(true)}>
            <Plus size={16} strokeWidth={2} /> Add Another School
          </button>
        </div>
      }
      trailing={trailing}
    >
      {main}

      {addOpen && (
        <div className="pc-modal" role="dialog" aria-modal="true" aria-label="Add another school">
          <div className="pc-modal__box">
            <div className="pc-modal__head">
              <h2 className="pc-modal__title">Add another school</h2>
              <button className="panel__menu" aria-label="Close" onClick={() => setAddOpen(false)}>
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            <p className="pc-muted">
              Search for a school or institution to connect and collect the
              credentials you&rsquo;ve earned there.
            </p>
            <div className="pc-modal__field">
              <input className="text-input" placeholder="Search schools and institutions" />
            </div>
            <div className="pc-modal__actions">
              <Button variant="secondary" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setAddOpen(false)}>Add school</Button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
}
