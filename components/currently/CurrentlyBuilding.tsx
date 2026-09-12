import styles from "./CurrentlyBuilding.module.css";
import Reveal from "@/components/Reveal";
import { relativeTimeFromNow, type GithubRepo } from "@/lib/github";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#38bdf8",
  JavaScript: "#facc15",
  Python: "#34d399",
  Dart: "#22d3ee",
  HTML: "#fb923c",
  CSS: "#a78bfa",
};

export default function CurrentlyBuilding({ repos }: { repos: GithubRepo[] }) {
  const recent = repos.slice(0, 6);

  return (
    <section id="deneyim" className={styles.section}>
      <div className={styles.frame}>
        <span className={styles.kicker}>ŞU AN</span>
        <h2 className={styles.title}>Şu an ne üzerinde çalışıyorum</h2>

        <div className={styles.focusGrid}>
          <Reveal>
            <div className={styles.focusCard}>
              <span className={`${styles.focusLabel} ${styles.focusExploring}`}>KEŞFEDİYOR</span>
              <p className={styles.focusText}>
                LLM/RAG/agent araçları üzerine keşif — LangChain, LangGraph ve MCP protokolü.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className={styles.focusCard}>
              <span className={`${styles.focusLabel} ${styles.focusBuilding}`}>GELİŞTİRİYOR</span>
              <p className={styles.focusText}>
                NOD platformunun frontend–backend entegrasyonu ve yeniden dağıtımı.
              </p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className={styles.focusCard}>
              <span className={`${styles.focusLabel} ${styles.focusEvaluating}`}>DEĞERLENDİRİYOR</span>
              <p className={styles.focusText}>
                SAP ABAP uzmanlaşması ile full-stack kariyer yolu arasındaki yön kararı.
              </p>
            </div>
          </Reveal>
        </div>

        <div className={styles.feedHead}>
          <span className={styles.feedTitle}>SON GÜNCELLENEN DEPOLAR</span>
          <span className={styles.feedTitle}>github.com/bahattinbober</span>
        </div>

        <Reveal>
          {recent.length > 0 ? (
            <div className={styles.feedList}>
              {recent.map((r) => (
                <a
                  key={r.name}
                  className={styles.feedItem}
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={styles.feedName}>{r.name}</span>
                  <span className={styles.feedDesc}>{r.description ?? "Açıklama eklenmemiş."}</span>
                  <span className={styles.feedMeta}>
                    {r.language && (
                      <>
                        <span
                          className={styles.langDot}
                          style={{ background: LANG_COLORS[r.language] ?? "#a7b0c4" }}
                        />
                        {r.language}
                      </>
                    )}
                    <span>{relativeTimeFromNow(r.pushed_at)} güncellendi</span>
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>GitHub verisi şu anda alınamıyor.</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
