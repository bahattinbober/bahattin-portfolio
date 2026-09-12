"use client";

import { useEffect, useState } from "react";
import styles from "./Nav.module.css";
import { SITE } from "@/lib/config";

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${solid ? styles.solid : ""}`}>
      <a href="#top" className={styles.mark}>
        BB
      </a>
      <ul className={styles.links}>
        <li>
          <a href="#projeler">Projeler</a>
        </li>
        <li>
          <a href="#deneyim">Deneyim</a>
        </li>
        <li>
          <a href="#iletisim">İletişim</a>
        </li>
      </ul>
      <a
        className={styles.cv}
        href={SITE.cvHref}
        download={SITE.cvFilename}
      >
        CV İndir
      </a>
    </nav>
  );
}
