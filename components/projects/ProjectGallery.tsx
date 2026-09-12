import { PROJECTS } from "@/lib/config";
import styles from "./ProjectGallery.module.css";
import ProjectBlock from "./ProjectBlock";
import FlightThread from "./FlightThread";
import Reveal from "@/components/Reveal";

export default function ProjectGallery() {
  const projects = [...PROJECTS].sort((a, b) => a.order - b.order);

  return (
    <section id="projeler" className={styles.section}>
      <FlightThread projects={projects} />

      <div className={styles.sectionHead}>
        <span className={styles.kicker}>{String(projects.length).padStart(2, "0")} PROJE</span>
        <h2 className={styles.sectionTitle}>Fikirden canlıya taşıdıklarım.</h2>
      </div>

      {projects.map((project, i) => (
        <Reveal key={project.id}>
          <ProjectBlock project={project} index={i} total={projects.length} />
        </Reveal>
      ))}
    </section>
  );
}
