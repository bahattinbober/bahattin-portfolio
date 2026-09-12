"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Always starts false so the server-rendered markup (which never sees a
  // real IntersectionObserver) matches the client's first render — the
  // reveal itself only ever happens client-side, after mount.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // Very old browser fallback: just show the content.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        // `transform` (even a no-op translateY(0)) creates a new stacking
        // context, which would otherwise trap this element's own z-index
        // locally and make the *wrapper* itself — which has none — lose to
        // the ParticleField canvas (z-index:1) at the root level. Setting
        // it explicitly here means every Reveal-wrapped section correctly
        // stays above the particle layer, regardless of what z-index (if
        // any) its own children set. `isolation: isolate` makes this an
        // unambiguous, self-contained stacking root regardless of what any
        // ancestor between here and <body> does in the future — belt and
        // suspenders on top of the position+z-index that already achieves
        // the same thing per spec.
        isolation: "isolate",
        zIndex: 2,
        height: "100%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s var(--ease-out) ${delay}ms, transform 0.75s var(--ease-out) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
