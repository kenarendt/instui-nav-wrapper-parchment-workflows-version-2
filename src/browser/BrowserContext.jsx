import { createContext, useContext, useState, useCallback } from "react";

const BrowserContext = createContext(null);

let counter = 0;
const nextId = () => `tab-${++counter}`;

/**
 * BrowserProvider — owns the simulated browser's tab state.
 *
 * openTab dedupes on `dedupeKey`: if a tab with the same key already exists it
 * is focused instead of duplicated (matching the "open a new tab only if one
 * isn't already open for that service" behavior). Otherwise a new tab opens
 * and becomes active.
 */
export function BrowserProvider({ initialTabs = [], children }) {
  const [tabs, setTabs] = useState(() =>
    initialTabs.map((t) => ({ id: nextId(), ...t }))
  );
  const [activeId, setActiveId] = useState(() => (tabs[0] ? tabs[0].id : null));

  const openTab = useCallback((tab) => {
    setTabs((prev) => {
      if (tab.dedupeKey) {
        const existing = prev.find((t) => t.dedupeKey === tab.dedupeKey);
        if (existing) {
          setActiveId(existing.id);
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

  const value = { tabs, activeId, openTab, closeTab, focusTab };
  return (
    <BrowserContext.Provider value={value}>{children}</BrowserContext.Provider>
  );
}

export function useBrowser() {
  const ctx = useContext(BrowserContext);
  if (!ctx) throw new Error("useBrowser must be used within BrowserProvider");
  return ctx;
}
