"use client";

import { useEffect, useRef } from "react";
import styles from "./Landing.module.css";
import { SITE } from "@/lib/config";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Landing() {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // This section sits well below the fold. The bare `autoplay` attribute
  // alone isn't reliable that far down the page — some browsers defer or
  // silently drop it, which left the video stuck on a single frame instead
  // of looping. Force-start it explicitly once it actually scrolls into
  // view, and keep retrying if the play() promise rejects.
  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    if (typeof IntersectionObserver === "undefined") {
      tryPlay();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) tryPlay();
        });
      },
      { threshold: 0.15 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reducedMotion]);

  return (
    <section id="iletisim" className={styles.section}>
      {reducedMotion ? (
        <img src="/images/street-poster.jpg" alt="" className={styles.media} />
      ) : (
        <video
          ref={videoRef}
          className={styles.media}
          src="/videos/street-night-arrival.mp4"
          poster="/images/street-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      )}
      <div className={styles.scrim} />

      <div className={styles.content}>
        <span className={styles.kicker}>İLETİŞİM</span>
        <p className={styles.closing}>Gördüklerin gerçek. Konuşmaya ne dersin?</p>

        <div className={styles.actions}>
          <a className={styles.primary} href={SITE.cvHref} download={SITE.cvFilename}>
            CV İndir ↓
          </a>
          <div className={styles.links}>
            <a className={styles.link} href={SITE.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className={styles.link} href={SITE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className={styles.link} href={`mailto:${SITE.email}`}>
              E-posta
            </a>
          </div>
        </div>

        <div className={styles.footer}>
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>Next.js ve GSAP ile inşa edildi</span>
        </div>

        <p className={styles.joke}>
          Buraya kadar scroll ettiysen: ya beni işe almak üzeresin ya da fare tekerleğin bozuk. Her ihtimalde teşekkürler.
        </p>
      </div>
    </section>
  );
}
