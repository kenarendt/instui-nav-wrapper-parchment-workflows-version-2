import { LayoutDashboard, Building2, Users, Settings } from "lucide-react";
import Wrapper from "../components/Wrapper.jsx";
import Panel from "../components/blocks/Panel.jsx";
import { account } from "../data/experiences.js";

const NAV_ITEMS = [
  { key: "overview", label: "Overview", Icon: LayoutDashboard, active: true },
  { key: "org", label: "Organization", Icon: Building2 },
  { key: "users", label: "Users", Icon: Users },
  { key: "settings", label: "Settings", Icon: Settings },
];

/**
 * PlatformSettings — placeholder super-user administration page opened from the
 * profile switcher. Uses the shared wrapper.
 */
export default function PlatformSettings() {
  return (
    <Wrapper
      navProps={{
        institutionName: account.institution,
        username: account.name,
        userRole: account.adminRole,
        items: NAV_ITEMS,
        productLogo: "parchment",
      }}
      activeProfileId="platform"
      experienceType="admin"
      title="Platform Settings"
      description="Configure and manage system level settings across all of your Parchment services."
    >
      <Panel title="System settings" subtitle="Super user platform administration.">
        <p style={{ fontFamily: "var(--fontfamily-base)", color: "var(--text-mutedcolor)", margin: 0 }}>
          Platform-level configuration modules would appear here.
        </p>
      </Panel>
    </Wrapper>
  );
}
