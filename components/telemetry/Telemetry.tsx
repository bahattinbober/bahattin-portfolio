import styles from "./Telemetry.module.css";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { EDUCATION, INTERNSHIPS, PROJECTS } from "@/lib/config";

export default function Telemetry({
  publicRepos,
  lastPushRelative,
  live,
}: {
  publicRepos: number | null;
  lastPushRelative: string | null;
  live: boolean;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <h2 className={styles.title}>Sayılarla ben.</h2>
        <div className={styles.head}>
          <span className={styles.kicker}>TELEMETRİ</span>
          <span className={styles.status}>
            <span className={styles.dot} />
            {live ? "GitHub API'den canlı" : "GitHub API şu anda erişilemiyor"}
          </span>
        </div>

        <Reveal>
          <div className={styles.grid}>
            <div className={styles.cell}>
              <span className={styles.value}>
                <Counter value={PROJECTS.length} />
              </span>
              <span className={styles.label}>Öne Çıkan Proje</span>
            </div>

            <div className={styles.cell}>
              <span className={styles.value}>
                {publicRepos !== null ? <Counter value={publicRepos} /> : "—"}
              </span>
              <span className={styles.label}>Herkese Açık GitHub Deposu</span>
              <span className={styles.sub}>github.com/bahattinbober</span>
            </div>

            <div className={styles.cell}>
              <span className={styles.value}>{lastPushRelative ?? "—"}</span>
              <span className={styles.label}>Son Push</span>
              <span className={styles.sub}>En güncel depo</span>
            </div>

            <div className={styles.cell}>
              <span className={styles.value}>
                <Counter value={INTERNSHIPS.length} />
              </span>
              <span className={styles.label}>Tamamlanan Staj</span>
              <span className={styles.sub}>{INTERNSHIPS.map((i) => i.company).join(" · ")}</span>
            </div>

            <div className={styles.cell}>
              <span className={styles.value}>
                <Counter value={parseFloat(EDUCATION.gpa)} decimals={2} />/{EDUCATION.gpaMax}
              </span>
              <span className={styles.label}>Mezuniyet Notu</span>
            </div>

            <div className={styles.cell}>
              <span className={styles.value}>
                <Counter value={1} />
              </span>
              <span className={styles.label}>Araştırma / Tez Projesi</span>
              <span className={styles.sub}>Pamukkale Teknokent</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
