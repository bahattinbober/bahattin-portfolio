"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/config";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./FlightThread.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// A thin rail beside the project gallery: a vertical line with one dot per
// project, plus a slightly larger indicator that travels down it and grows
// into that project's accent color as you scroll past its block — a quiet
// "you are here" cue, nothing more.
export default function FlightThread({ projects }: { projects: Project[] }) {
  const reducedMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const stops = projects.map((p, i) => ({
    id: p.id,
    color: p.color,
    percent: ((i + 0.5) / projects.length) * 100,
  }));

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || typeof IntersectionObserver === "undefined") {
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
      { threshold: 0.05 }
    );
    io.observe(rail);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const indicator = indicatorRef.current;
    if (!indicator) return;

    const triggers = stops.map((stop) => {
      const el = document.getElementById(`gallery-stop-${stop.id}`);
      if (!el) return null;
      const arrive = () => {
        gsap.to(indicator, {
          top: `${stop.percent}%`,
          scale: 1.7,
          duration: 0.6,
          ease: "power2.out",
          onStart: () => {
            indicator.style.background = stop.color;
            indicator.style.boxShadow = `0 0 12px ${stop.color}`;
          },
        });
      };
      return ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: arrive,
        onEnterBack: arrive,
      });
    });

    return () => {
      triggers.forEach((t) => t?.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div className={`${styles.wrap} ${visible ? styles.visible : ""}`}>
      <div ref={railRef} className={styles.rail}>
        <div className={styles.line} />

        {stops.map((stop) => (
          <div
            key={stop.id}
            className={styles.stop}
            style={{ top: `${stop.percent}%`, ["--stop-color" as string]: stop.color }}
          />
        ))}

        <div
          ref={indicatorRef}
          className={styles.indicator}
          style={{
            top: `${stops[0]?.percent ?? 0}%`,
            background: stops[0]?.color,
            boxShadow: stops[0] ? `0 0 12px ${stops[0].color}` : undefined,
          }}
        />
      </div>
    </div>
  );
}
