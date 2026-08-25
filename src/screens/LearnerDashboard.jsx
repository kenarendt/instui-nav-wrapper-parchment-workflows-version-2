import { LayoutDashboard, BookText, CalendarDays, User } from "lucide-react";
import Wrapper from "../components/Wrapper.jsx";
import Panel from "../components/blocks/Panel.jsx";
import StatTile from "../components/blocks/StatTile.jsx";
import LineChart from "../components/blocks/LineChart.jsx";
import Button from "../components/Button.jsx";
import { account } from "../data/experiences.js";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard, active: true },
  { key: "courses", label: "Courses", Icon: BookText },
  { key: "calendar", label: "Calendar", Icon: CalendarDays },
  { key: "people", label: "People", Icon: User },
];

const GRADES = [
  { label: "Grade point average", color: "#7f77dd", points: [3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.7] },
];

/**
 * LearnerDashboard — the detailed learner experience opened from a Hub
 * deep-link. Representative content built on the shared wrapper + blocks.
 */
export default function LearnerDashboard({ params = {} }) {
  const trailing = (
    <>
      <Panel title="Upcoming" showMenu>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {["Midterm review — Wed 6:00 pm", "Problem Set 3 due — Tomorrow", "Advising — Fri 10:30 am"].map((t) => (
            <li key={t} style={{ fontFamily: "var(--fontfamily-base)", fontSize: 14, color: "var(--heading-basecolor)" }}>
              {t}
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
      experienceType="learner"
      title={params.title || "Learner Dashboard"}
      description="Your courses, grades, and progress at a glance."
      trailing={trailing}
    >
      <Panel title="This term" showMenu>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-xl)" }}>
          <StatTile value="5" label="Active courses" hint="Enrolled this term." />
          <StatTile value="3.7" label="GPA" hint="Cumulative grade point average." />
          <StatTile value="92%" label="On-time submissions" hint="Assignments submitted on time." />
        </div>
      </Panel>

      <Panel title="Grade trend" subtitle="This year" showMenu>
        <LineChart series={GRADES} height={200} />
      </Panel>

      <Panel title="Courses" headerRight={<Button variant="secondary">View all</Button>} showMenu>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {["Contemporary American Fiction", "Intro to Cognitive Science", "Foundations of Modern Political Thought"].map(
            (c, i) => (
              <li
                key={c}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderTop: i === 0 ? "none" : "1px solid var(--nav-border-color)",
                  fontFamily: "var(--fontfamily-base)",
                  fontSize: 16,
                  color: "var(--heading-basecolor)",
                }}
              >
                <span>{c}</span>
                <span style={{ color: "var(--text-mutedcolor)", fontSize: 14 }}>In progress</span>
              </li>
            )
          )}
        </ul>
      </Panel>
    </Wrapper>
  );
}
