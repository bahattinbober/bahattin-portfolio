import styles from "./AlgoStats.module.css";
import { SHOW_ALGO_STATS } from "@/lib/config";

export interface AlgoPlatformStat {
  platform: string;
  solved: number;
  total: number;
}

// Ready to switch on the moment real numbers exist — flip SHOW_ALGO_STATS in
// lib/config.ts and pass real solved/total counts here. No placeholder data
// is shown while it's off.
export default function AlgoStats({ stats }: { stats: AlgoPlatformStat[] }) {
  if (!SHOW_ALGO_STATS) return null;

  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <h2 className={styles.title}>Algoritma Pratiği</h2>
        <div className={styles.rows}>
          {stats.map((s) => (
            <div key={s.platform} className={styles.row}>
              <span className={styles.platform}>{s.platform}</span>
              <span className={styles.track}>
                <span
                  className={styles.fill}
                  style={{ width: `${Math.min(100, (s.solved / s.total) * 100)}%` }}
                />
              </span>
              <span className={styles.count}>
                {s.solved}/{s.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
