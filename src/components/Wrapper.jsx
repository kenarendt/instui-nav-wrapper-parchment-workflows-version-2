import GlobalNav from "./GlobalNav.jsx";
import { useBrowser } from "../browser/BrowserContext.jsx";
import { PROFILES } from "../data/experiences.js";
import "./Wrapper.css";

/**
 * Wrapper — the Desktop Wrapper (beta) page shell.
 *
 * Composes GlobalNav + a content region (header, main, optional trailing
 * content area). The nav's profile switcher opens/focuses the tab for the
 * chosen profile.
 */
export default function Wrapper({
  navProps = {},
  activeProfileId,
  experienceType,
  breadcrumb,
  topRight,
  title,
  description,
  actions,
  tabs,
  fullWidth = false,
  trailing,
  children,
}) {
  const { openTab } = useBrowser();

  const handleSwitchProfile = (profile) => {
    openTab(profile.tab);
  };

  const handleLogout = () => {
    window.location.reload();
  };

  // Jump between the Learner and Admin Connect experiences from the Account menu.
  const crossConnect =
    experienceType === "learner"
      ? {
          label: "Admin Connect Dashboard",
          onClick: () => openTab({ kind: "adminHub", title: "Admin Connect", dedupeKey: "adminHub" }),
        }
      : experienceType === "admin"
      ? {
          label: "Learner Connect Dashboard",
          onClick: () => openTab({ kind: "learnerHub", title: "Learner Connect", dedupeKey: "learnerHub" }),
        }
      : null;

  return (
    <div className="wrap">
      <GlobalNav
        {...navProps}
        profiles={PROFILES}
        activeProfileId={activeProfileId}
        crossConnect={crossConnect}
        onSwitchProfile={handleSwitchProfile}
        onLogout={handleLogout}
      />

      <main className="wrap__container">
        <div className={`wrap__content${fullWidth ? " wrap__content--full" : ""}`}>
          {(breadcrumb || topRight) && (
            <div className="wrap__topbar">
              {breadcrumb && (
                <nav className="wrap__breadcrumb" aria-label="Breadcrumb">
                  {breadcrumb}
                </nav>
              )}
              {topRight && <div className="wrap__topright">{topRight}</div>}
            </div>
          )}
          {(title || actions) && (
            <div className="wrap__header">
              <div className="wrap__header-row">
                <div className="wrap__page-info">
                  {title && <h1 className="wrap__title">{title}</h1>}
                  {description && (
                    <p className="wrap__description">{description}</p>
                  )}
                </div>
                {actions && <div className="wrap__actions">{actions}</div>}
              </div>
              {tabs && <div className="wrap__tabs">{tabs}</div>}
            </div>
          )}

          <div className={`wrap__body${trailing ? " wrap__body--split" : ""}`}>
            <div className="wrap__main">{children}</div>
            {trailing && (
              <aside className="wrap__trailing" aria-label="Additional content">
                {trailing}
              </aside>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
