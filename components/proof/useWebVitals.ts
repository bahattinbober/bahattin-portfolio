"use client";

import { useEffect, useState } from "react";

export interface VitalsState {
  ttfb: number | null;
  lcp: number | null;
  cls: number | null;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

// Measures this page's own real navigation timing in the visitor's browser —
// nothing here is precomputed or hardcoded. TTFB comes from the Navigation
// Timing entry; LCP and CLS come from their respective PerformanceObservers.
export function useWebVitals(): VitalsState {
  const [state, setState] = useState<VitalsState>({ ttfb: null, lcp: null, cls: null });

  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") return;

    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav) {
      const ttfb = Math.max(0, Math.round(nav.responseStart));
      // One-time read of a real browser timing API on mount — not a props
      // mirror, so the cascading-render concern the rule guards against
      // doesn't apply here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState((s) => ({ ...s, ttfb }));
    }

    let clsValue = 0;
    let lcpObserver: PerformanceObserver | undefined;
    let clsObserver: PerformanceObserver | undefined;

    try {
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) setState((s) => ({ ...s, lcp: Math.round(last.startTime) }));
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // Not supported in this browser — LCP stays null.
    }

    try {
      clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as LayoutShiftEntry[]) {
          if (!entry.hadRecentInput) clsValue += entry.value;
        }
        setState((s) => ({ ...s, cls: Math.round(clsValue * 1000) / 1000 }));
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch {
      // Not supported in this browser — CLS stays null.
    }

    return () => {
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
    };
  }, []);

  return state;
}
