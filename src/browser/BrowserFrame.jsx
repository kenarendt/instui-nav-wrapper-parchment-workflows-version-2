import { Plus, X, Sparkles } from "lucide-react";
import { useBrowser } from "./BrowserContext.jsx";
import { renderPage } from "./pageRegistry.jsx";
import "./BrowserFrame.css";

/**
 * BrowserFrame — the simulated browser chrome: traffic-light dots, a tab
 * strip, a new-tab button, and an "Ask Gemini" pill. Renders the active tab's
 * page below the chrome.
 */
export default function BrowserFrame() {
  const { tabs, activeId, focusTab, closeTab } = useBrowser();
  const active = tabs.find((t) => t.id === activeId);

  return (
    <div className="browser">
      <div className="browser__chrome">
        <div className="browser__dots" aria-hidden="true">
          <span className="browser__dot browser__dot--red" />
          <span className="browser__dot browser__dot--amber" />
          <span className="browser__dot browser__dot--green" />
        </div>

        <div className="browser__tabs" role="tablist" aria-label="Browser tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              role="tab"
              aria-selected={tab.id === activeId}
              tabIndex={0}
              className={`browser__tab${
                tab.id === activeId ? " browser__tab--active" : ""
              }`}
              onClick={() => focusTab(tab.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") focusTab(tab.id);
              }}
            >
              <span className="browser__tab-favicon" aria-hidden="true" />
              <span className="browser__tab-title">{tab.title}</span>
              {tabs.length > 1 && (
                <button
                  className="browser__tab-close"
                  aria-label={`Close ${tab.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              )}
            </div>
          ))}
          <button className="browser__newtab" aria-label="New tab" disabled>
            <Plus size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="browser__gemini" aria-hidden="true">
          <Sparkles size={14} strokeWidth={2} />
          <span>Ask Gemini</span>
        </div>
      </div>

      <div className="browser__viewport">{active ? renderPage(active) : null}</div>
    </div>
  );
}
