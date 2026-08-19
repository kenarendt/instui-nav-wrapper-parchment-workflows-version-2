import { useState } from "react";
import SignIn from "./screens/SignIn.jsx";
import { BrowserProvider } from "./browser/BrowserContext.jsx";
import BrowserFrame from "./browser/BrowserFrame.jsx";

/**
 * App — top-level flow.
 *
 * Starts at sign-in. The demo account carries both a Learner and an Admin
 * experience, so sign-in defaults to Admin Connect (Admin wins when both
 * exist). The sign-in screen exposes a prototype override to land on
 * Learner Connect instead. From there, the simulated browser owns navigation:
 * Connect modules and the nav profile switcher open or focus tabs.
 */
const LANDING_TABS = {
  admin: { kind: "adminHub", title: "Admin Connect" },
  learner: { kind: "learnerHub", title: "Learner Connect" },
};

export default function App() {
  const [landing, setLanding] = useState(null);

  if (!landing) {
    return <SignIn onSignIn={({ landing }) => setLanding(landing || "admin")} />;
  }

  const initialTab = LANDING_TABS[landing] ?? LANDING_TABS.admin;

  return (
    <BrowserProvider initialTabs={[initialTab]}>
      <BrowserFrame />
    </BrowserProvider>
  );
}
