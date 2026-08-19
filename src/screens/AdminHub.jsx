import { LayoutDashboard, Sparkles, Inbox, CircleHelp, Maximize } from "lucide-react";
import Wrapper from "../components/Wrapper.jsx";
import Panel from "../components/blocks/Panel.jsx";
import ServiceRow from "../components/blocks/ServiceRow.jsx";
import Button from "../components/Button.jsx";
import IconButton from "../components/IconButton.jsx";
import { useBrowser } from "../browser/BrowserContext.jsx";
import { SERVICE_GROUPS, serviceById, account } from "../data/experiences.js";
import "./AdminHub.css";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard, active: true },
  { key: "assist", label: "Assistant", Icon: Sparkles },
  { key: "inbox", label: "Inbox", Icon: Inbox, badge: 9 },
  { key: "help", label: "Help", Icon: CircleHelp },
];

export default function AdminHub() {
  const { openTab } = useBrowser();

  const openService = (service) => {
    openTab({
      kind: "service",
      title: service.short,
      params: { serviceId: service.id },
      dedupeKey: `service:${service.id}`,
    });
  };

  const main = SERVICE_GROUPS.map((group) => (
    <Panel key={group.id}>
      <div className="adminhub__group-head">
        <h2 className="adminhub__group-title">{group.name}</h2>
        <span className="adminhub__brand">{group.brand}</span>
      </div>
      <div className="adminhub__rows">
        {group.services.map((id) => {
          const svc = serviceById(id);
          return (
            <ServiceRow key={id} service={svc} onOpen={() => openService(svc)} />
          );
        })}
      </div>
    </Panel>
  ));

  const trailing = (
    <>
      <Panel title="My credentials" subtitle="My personal credentials and achievements." showMenu>
        <div className="adminhub__promo">
          <div className="adminhub__promo-art" aria-hidden="true">🎓</div>
          <p className="adminhub__promo-text">
            Your personal Parchment academic and professional credential profile.
          </p>
          <span className="adminhub__promo-brand">Parchment</span>
          <Button
            variant="secondary"
            onClick={() =>
              openTab({
                kind: "parchmentCredentials",
                title: "Parchment",
                dedupeKey: "parchmentCredentials",
              })
            }
          >
            Open
          </Button>
        </div>
      </Panel>
      <Panel title="Platform settings" subtitle="Super user platform administration." showMenu>
        <div className="adminhub__promo">
          <div className="adminhub__promo-art" aria-hidden="true">⚙️</div>
          <p className="adminhub__promo-text">
            Configure and manage system level settings across all of your
            Parchment services.
          </p>
          <span className="adminhub__promo-brand">Parchment</span>
          <Button variant="secondary">Open</Button>
        </div>
      </Panel>
    </>
  );

  return (
    <Wrapper
      navProps={{
        institutionName: account.institution,
        username: account.name,
        userRole: account.adminRole,
        items: NAV_ITEMS,
        productLogo: "instructure",
      }}
      experienceType="admin"
      title="Admin Connect Dashboard"
      actions={
        <>
          <Button variant="secondary">Customize Dashboard</Button>
          <IconButton icon={Maximize} variant="secondary" screenReaderLabel="Expand view" />
        </>
      }
      fullWidth
      trailing={trailing}
    >
      {main}
    </Wrapper>
  );
}
