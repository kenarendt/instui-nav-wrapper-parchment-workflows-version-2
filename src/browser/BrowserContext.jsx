import { createContext, useContext, useState, useCallback } from "react";

const BrowserContext = createContext(null);

let counter = 0;
const nextId = () => `tab-${++counter}`;

/**
 * BrowserProvider — owns the simulated browser's tab state.
 *
 * It also holds the expanded/collapsed display preference. That lives here, not
 * in a page, so it behaves like a saved setting: toggle it once and every page
 * in every tab follows.
 *
 * openTab dedupes on `dedupeKey`: if a tab with the same key already exists it
 * is focused instead of duplicated (matching the "open a new tab only if one
 * isn't already open for that service" behavior). Otherwise a new tab opens
 * and becomes active.
 */
export function BrowserProvider({
  initialTabs = [],
  multiSchool = false,
  singleAccount = false,
  children,
}) {
  const [tabs, setTabs] = useState(() =>
    initialTabs.map((t) => ({ id: nextId(), ...t }))
  );
  const [activeId, setActiveId] = useState(() => (tabs[0] ? tabs[0].id : null));

  // Display preference: true = content fills the container, false = content is
  // capped at a fixed max width. Shared across every page and tab. Starts
  // collapsed, so the wide view is something the user opts into.
  const [expandedView, setExpandedView] = useState(false);
  const toggleExpandedView = useCallback(
    () => setExpandedView((v) => !v),
    []
  );

  const openTab = useCallback((tab) => {
    setTabs((prev) => {
      if (tab.dedupeKey) {
        const existing = prev.find((t) => t.dedupeKey === tab.dedupeKey);
        if (existing) {
          setActiveId(existing.id);
          // Merge incoming params so re-opening a service for a different
          // school moves that tab rather than doing nothing.
          if (tab.params) {
            return prev.map((t) =>
              t.id === existing.id
                ? { ...t, params: { ...t.params, ...tab.params } }
                : t
            );
          }
          return prev;
        }
      }
      const id = nextId();
      setActiveId(id);
      return [...prev, { id, ...tab }];
    });
  }, []);

  const closeTab = useCallback((id) => {
    setTabs((prev) => {
      const idx = prev.findIndex((t) => t.id === id);
      if (idx === -1) return prev;
      const next = prev.filter((t) => t.id !== id);
      setActiveId((cur) => {
        if (cur !== id) return cur;
        const fallback = next[idx] ?? next[idx - 1] ?? next[0];
        return fallback ? fallback.id : null;
      });
      return next;
    });
  }, []);

  const focusTab = useCallback((id) => setActiveId(id), []);

  // Which school an admin is acting for inside a service. Stored on the tab so
  // it survives switching away and back, and so two tabs can sit on different
  // schools.
  const setTabSchool = useCallback((id, schoolId) => {
    setTabs((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, params: { ...t.params, schoolId } } : t
      )
    );
  }, []);

  const value = {
    tabs,
    activeId,
    activeTab: tabs.find((t) => t.id === activeId) ?? null,
    multiSchool,
    singleAccount,
    setTabSchool,
    openTab,
    closeTab,
    focusTab,
    expandedView,
    toggleExpandedView,
  };
  return (
    <BrowserContext.Provider value={value}>{children}</BrowserContext.Provider>
  );
}

export function useBrowser() {
  const ctx = useContext(BrowserContext);
  if (!ctx) throw new Error("useBrowser must be used within BrowserProvider");
  return ctx;
}
