"use client";

import { useSyncExternalStore } from "react";

function subscribeToQuery(query: string) {
  return (callback: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  };
}

export function useReducedMotion(): boolean {
  const query = "(prefers-reduced-motion: reduce)";
  return useSyncExternalStore(
    subscribeToQuery(query),
    () => window.matchMedia(query).matches,
    () => false
  );
}

export function useIsMobile(breakpointPx = 820): boolean {
  const query = `(max-width: ${breakpointPx}px)`;
  return useSyncExternalStore(
    subscribeToQuery(query),
    () => window.matchMedia(query).matches,
    () => false
  );
}
