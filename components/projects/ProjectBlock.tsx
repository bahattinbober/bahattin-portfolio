import type { Project } from "@/lib/config";
import styles from "./ProjectGallery.module.css";
import AlzheimerViz from "./AlzheimerViz";
import NodArchitectureViz from "./NodArchitectureViz";

export default function ProjectBlock({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const reverse = index % 2 === 1;
  const hasCta = Boolean(project.liveHref || project.codeHref);

  return (
    <div
      id={`gallery-stop-${project.id}`}
      className={styles.block}
      style={{
        ["--accent" as string]: project.color,
        ["--accent-2" as string]: project.colorSecondary ?? project.color,
      }}
    >
      <div className={`${styles.blockInner} ${reverse ? styles.reverse : ""}`}>
        <div className={styles.mediaCol}>
          {project.photo ? (
            <img
              src={`/images/buildings/${project.photo}`}
              alt={`${project.title} — proje görseli`}
              className={styles.mediaPhoto}
              loading="lazy"
            />
          ) : (
            <div className={styles.mediaPlaceholder}>
              <span className={styles.mediaPlaceholderLabel}>GÖRSEL YAKINDA</span>
            </div>
          )}
        </div>

        <div className={styles.textCol}>
          <div className={styles.indexRow}>
            <span className={styles.index}>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className={styles.tag}>{project.tag}</span>
          </div>

          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.desc}>{project.description}</p>

          {project.metric && (
            <p className={styles.metric}>
              {project.metric.value} — {project.metric.sublabel ?? project.metric.label}
            </p>
          )}

          {project.richViz && (
            <div className={styles.vizInset}>
              {project.id === "nod" ? (
                <NodArchitectureViz color={project.color} />
              ) : (
                <AlzheimerViz color={project.color} />
              )}
            </div>
          )}

          {project.tech.length > 0 && (
            <div className={styles.techRow}>
              {project.tech.map((t) => (
                <span key={t} className={styles.techPill}>
                  {t}
                </span>
              ))}
            </div>
          )}

          {hasCta ? (
            <div className={styles.ctaRow}>
              {project.liveHref && (
                <a className={styles.ctaPrimary} href={project.liveHref} target="_blank" rel="noreferrer">
                  {project.liveLabel ?? "Projeyi Aç"} →
                </a>
              )}
              {project.codeHref && (
                <a className={styles.ctaSecondary} href={project.codeHref} target="_blank" rel="noreferrer">
                  GitHub&apos;da Görüntüle
                </a>
              )}
            </div>
          ) : (
            <p className={styles.pending}>Bağlantılar yakında eklenecek.</p>
          )}
        </div>
      </div>
    </div>
  );
}
