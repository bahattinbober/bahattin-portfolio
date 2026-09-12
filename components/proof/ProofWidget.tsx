"use client";

import styles from "./ProofWidget.module.css";
import { useWebVitals } from "./useWebVitals";

function formatMs(ms: number | null): string {
  if (ms === null) return "—";
  if (ms >= 1000) return `${(ms / 1000).toFixed(2)} s`;
  return `${ms} ms`;
}

function formatCls(v: number | null): string {
  if (v === null) return "—";
  return v.toFixed(3);
}

export default function ProofWidget({
  publicRepos,
  lastPushRelative,
  live,
}: {
  publicRepos: number | null;
  lastPushRelative: string | null;
  live: boolean;
}) {
  const { ttfb, lcp, cls } = useWebVitals();

  return (
    <section className={styles.section} aria-label="Canlı performans ve GitHub kanıtı">
      <div className={styles.panel}>
        <span className={styles.label}>
          <span className={styles.dot} />
          BU SAYFADA, ŞİMDİ ÖLÇÜLDÜ
        </span>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={`${styles.metricValue} ${ttfb === null ? styles.pending : ""}`}>
              {formatMs(ttfb)}
            </span>
            <span className={styles.metricLabel}>TTFB</span>
          </div>
          <div className={styles.metric}>
            <span className={`${styles.metricValue} ${lcp === null ? styles.pending : ""}`}>
              {formatMs(lcp)}
            </span>
            <span className={styles.metricLabel}>LCP</span>
          </div>
          <div className={styles.metric}>
            <span className={`${styles.metricValue} ${cls === null ? styles.pending : ""}`}>
              {formatCls(cls)}
            </span>
            <span className={styles.metricLabel}>CLS</span>
          </div>
        </div>

        <span className={styles.divider} />

        <span className={styles.githubFact}>
          {live ? (
            <>
              GitHub&apos;da <strong>{publicRepos ?? "—"}</strong> herkese açık depo
              {lastPushRelative ? (
                <>
                  {" "}
                  · son push <strong>{lastPushRelative}</strong>
                </>
              ) : null}
            </>
          ) : (
            "GitHub verisi şu anda alınamıyor"
          )}
        </span>
      </div>
    </section>
  );
}
