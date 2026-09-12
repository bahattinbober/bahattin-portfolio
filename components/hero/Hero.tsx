"use client";

import { PROJECTS, SITE } from "@/lib/config";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Hero.module.css";

interface CardLayout {
  top: number;
  left: number;
  rotate: number;
}

// Hand-placed, not randomized — keeps the collage's rhythm consistent
// between renders and avoids clustering over the bottom-left text zone.
const LAYOUT: CardLayout[] = [
  { top: 8, left: 5, rotate: -6 },
  { top: 6, left: 58, rotate: 5 },
  { top: 40, left: 68, rotate: -5 },
  { top: 55, left: 48, rotate: 4 },
  { top: 34, left: 17, rotate: 3 },
  { top: 60, left: 74, rotate: -7 },
];

const HERO_PHOTOS = PROJECTS.filter((p) => p.photo);

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const goToProject = (id: string) => {
    const el = document.getElementById(`gallery-stop-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.collage}>
        {HERO_PHOTOS.map((project, i) => {
          const layout = LAYOUT[i % LAYOUT.length];
          const restTransform = `rotate(${layout.rotate}deg)`;
          const hoverTransform = `rotate(0deg) scale(1.1)`;
          return (
            <button
              key={project.id}
              type="button"
              className={styles.card}
              onClick={() => goToProject(project.id)}
              aria-label={`${project.title} bölümüne git`}
              style={{
                top: `${layout.top}%`,
                left: `${layout.left}%`,
                animationDelay: `${i * 90}ms`,
                zIndex: i + 1,
                ["--accent" as string]: project.color,
                ["--rest-transform" as string]: restTransform,
                ["--hover-transform" as string]: hoverTransform,
                transform: restTransform,
              }}
            >
              <img
                src={`/images/buildings/${project.photo}`}
                alt=""
                className={styles.cardImg}
                loading="eager"
              />
              <span className={styles.cardLabel}>{project.title}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.scrim} />

      <div className={styles.heroText}>
        <h1 className={styles.wordmark}>{SITE.wordmark}</h1>
        <p className={styles.role}>{SITE.role}</p>
        <div className={styles.scrollCue}>
          <span className={styles.scrollCueLine} />
          <span>Aşağı kaydır</span>
        </div>
      </div>
    </section>
  );
}
