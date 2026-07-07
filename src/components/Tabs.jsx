import { useState } from "react";
import "./Tabs.css";

/**
 * Tabs — mirrors InstUI Tabs v2 (primary variant).
 *
 * Uncontrolled: pass tabs with `content`; the component renders the panel.
 * Controlled: pass `value` + `onChange` to own the active tab externally and
 * render the body yourself (the component then renders only the tab strip).
 */
export default function Tabs({ tabs = [], defaultTabId, value, onChange }) {
  const controlled = value != null && typeof onChange === "function";
  const [internal, setInternal] = useState(defaultTabId ?? tabs[0]?.id);
  const active = controlled ? value : internal;
  const activeTab = tabs.find((t) => t.id === active);

  const select = (id) => {
    if (controlled) onChange(id);
    else setInternal(id);
  };

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === active}
            className={`tabs__tab${tab.id === active ? " tabs__tab--selected" : ""}`}
            onClick={() => select(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {!controlled && activeTab?.content != null && (
        <div className="tabs__panel" role="tabpanel">
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
