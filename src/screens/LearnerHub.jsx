import { useState } from "react";
import {
  LayoutDashboard,
  Sparkles,
  Inbox,
  CircleHelp,
  Maximize,
  FileText,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import Wrapper from "../components/Wrapper.jsx";
import Panel from "../components/blocks/Panel.jsx";
import Button from "../components/Button.jsx";
import IconButton from "../components/IconButton.jsx";
import Tabs from "../components/Tabs.jsx";
import { useBrowser } from "../browser/BrowserContext.jsx";
import { account } from "../data/experiences.js";
import "./LearnerHub.css";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard, active: true },
  { key: "assist", label: "Assistant", Icon: Sparkles },
  { key: "inbox", label: "Inbox", Icon: Inbox, badge: 9 },
  { key: "help", label: "Help", Icon: CircleHelp },
];

const SCHOOLS = [
  {
    name: "Ponda High School",
    stats: [
      { value: 1, label: "Assignment overdue", tone: "danger" },
      { value: 3, label: "Assignments due this week", tone: "info" },
      { value: 2, label: "Grades this week", tone: "success" },
    ],
  },
  {
    name: "Bamboo University",
    stats: [
      { value: 0, label: "Assignment overdue", tone: "muted" },
      { value: 2, label: "Assignments due this week", tone: "info" },
      { value: 1, label: "Grades this week", tone: "muted" },
    ],
  },
];

const COURSEWORK = [
  { icon: AlertCircle, title: "Analysis of White Noise", course: "Contemporary American Fiction", status: "Overdue", tone: "danger" },
  { icon: FileText, title: "Neural Network Fundamentals", course: "Intro to Cognitive Science", status: "Turn in 11:59 pm", tone: "info" },
  { icon: FileText, title: "Rousseau and the Social Contract", course: "Foundations of Modern Political Thought", status: "Tomorrow 1:00 pm", tone: "info" },
  { icon: FileText, title: "Problem Set 3: Kinematics", course: "Intro to Cognitive Science", status: "Tomorrow 5:00 pm", tone: "info" },
];

const CREDENTIALS = [
  { title: "Bachelor of Engineering", kind: "Diploma", school: "Mount Elbert University School of Engineering", date: "Aug 29, 2026" },
  { title: "Bachelor of Engineering", kind: "Diploma Verification", school: "Mount Elbert University School of Engineering", date: "Sep 1, 2026" },
  { title: "Academic Excellence", kind: "Certificate", school: "Mount Elbert University", date: "May 22, 2023" },
];

const TODOS = [
  "Pay parking ticket",
  "Schedule academic advising appointment",
  "Schedule academic advising appointment",
];

const PEOPLE = [
  { name: "Dr. Lina Patel", detail: "COGS101" },
  { name: "Prof. Marcus Lin", detail: "COGS101" },
  { name: "Dr. Jasmine Ortiz", detail: "1 enrollment" },
  { name: "Prof. Sarah Nwoko", detail: "COGS101" },
];

export default function LearnerHub() {
  const { openTab } = useBrowser();
  const [tab, setTab] = useState("professional");

  const openDashboard = (label) =>
    openTab({
      kind: "learnerDashboard",
      title: label,
      params: { title: label },
      dedupeKey: `learnerDashboard:${label}`,
    });

  const openParchment = () =>
    openTab({
      kind: "parchmentCredentials",
      title: "Parchment",
      dedupeKey: "parchmentCredentials",
    });

  const toneColor = {
    danger: "#a32d2d",
    info: "#185fa5",
    success: "#3b6d11",
    muted: "#576773",
  };

  const main = (
    <>
      <Panel title="Account rollup" showMenu>
        {SCHOOLS.map((school) => (
          <div key={school.name} className="lh-school">
            <div className="lh-school__head">
              <h3 className="lh-school__name">{school.name}</h3>
            </div>
            <div className="lh-school__stats">
              {school.stats.map((s, i) => (
                <div key={i} className={`lh-stat lh-stat--${s.tone}`}>
                  <span className="lh-stat__value">{s.value}</span>
                  <span className="lh-stat__label">{s.label}</span>
                </div>
              ))}
            </div>
            <button className="lh-link" onClick={() => openDashboard(`${school.name} dashboard`)}>
              View {school.name} dashboard
            </button>
          </div>
        ))}
      </Panel>

      <Panel title="Course work" showMenu>
        <ul className="lh-list">
          {COURSEWORK.map((c, i) => {
            const Icon = c.icon;
            return (
              <li key={i} className="lh-course">
                <Icon size={20} strokeWidth={2} style={{ color: toneColor[c.tone], flexShrink: 0 }} />
                <div className="lh-course__body">
                  <p className="lh-course__title">{c.title}</p>
                  <button className="lh-link lh-link--sm" onClick={() => openDashboard("Course")}>
                    {c.course} · Go to course
                  </button>
                </div>
                <span className="lh-pill" style={{ color: toneColor[c.tone], borderColor: toneColor[c.tone] }}>
                  {c.status}
                </span>
              </li>
            );
          })}
        </ul>
      </Panel>

      <Panel
        title="Credentials"
        headerRight={<Button variant="secondary" onClick={openParchment}>Order Records</Button>}
        showMenu
      >
        <ul className="lh-list">
          {CREDENTIALS.map((cr, i) => (
            <li key={i} className="lh-cred">
              <div className="lh-cred__thumb" aria-hidden="true">
                <FileText size={22} strokeWidth={1.75} />
              </div>
              <div className="lh-cred__body">
                <p className="lh-cred__kind">{cr.kind}</p>
                <p className="lh-cred__title">{cr.title}</p>
                <p className="lh-cred__meta">{cr.school}</p>
                <p className="lh-cred__meta">Acq/Awd: {cr.date}</p>
              </div>
              <ChevronRight size={20} strokeWidth={2} style={{ color: "var(--text-mutedcolor)" }} />
            </li>
          ))}
        </ul>
        <button className="lh-link lh-link--center" onClick={openParchment}>
          View more in Parchment
        </button>
      </Panel>

      <Panel title="Digital Badges" showMenu>
        <div className="lh-badges">
          {["Mathletes", "Architectural History", "National Honor Society", "Geothermal Engineering"].map(
            (b) => (
              <div key={b} className="lh-badge">
                <div className="lh-badge__art" aria-hidden="true">🏅</div>
                <span className="lh-badge__label">{b}</span>
              </div>
            )
          )}
        </div>
      </Panel>
    </>
  );

  const trailing = (
    <>
      <Panel title="Featured Widget" showMenu>
        <div className="lh-featured">
          <p className="lh-featured__title">Study Buddy</p>
          <p className="lh-featured__desc">
            Have a test or quiz coming up? Study Buddy generates flashcards and
            practice quizzes to help you reach your goals.
          </p>
          <Button variant="secondary">Add Widget</Button>
        </div>
      </Panel>

      <Panel title="To-do list" headerRight={<Button variant="secondary">+ New</Button>} showMenu>
        <ul className="lh-todos">
          {TODOS.map((t, i) => (
            <li key={i} className="lh-todo">
              <input type="checkbox" aria-label={`Mark ${t} as done`} />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="People" showMenu>
        <ul className="lh-people">
          {PEOPLE.map((p, i) => (
            <li key={i} className="lh-person">
              <span className="lh-person__avatar" aria-hidden="true">
                {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </span>
              <span className="lh-person__body">
                <span className="lh-person__name">{p.name}</span>
                <span className="lh-person__detail">{p.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );

  return (
    <Wrapper
      navProps={{
        institutionName: account.institution,
        username: account.name,
        userRole: account.learnerRole,
        items: NAV_ITEMS,
        productLogo: "instructure",
      }}
      activeProfileId="learner"
      title="Hub Dashboard"
      actions={
        <>
          <Button variant="secondary">Customize Dashboard</Button>
          <IconButton icon={Maximize} variant="secondary" screenReaderLabel="Expand view" />
        </>
      }
      tabs={
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { id: "professional", label: "Professional" },
            { id: "personal", label: "Personal" },
          ]}
        />
      }
      trailing={trailing}
    >
      {main}
    </Wrapper>
  );
}
