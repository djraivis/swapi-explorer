import Link from "next/link";

import { CATEGORY_LABELS, SWAPI_CATEGORIES } from "@/lib/constants";

import styles from "./HomeMain.module.css";

export function HomeMain() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Route-Based Explorer</p>
        <h1 className={styles.title}>Star Wars API Explorer</h1>
        <p className={styles.description}>
          Browse the six SWAPI categories through simple Next.js routes and
          slug-based item pages.
        </p>
      </section>

      <section className={styles.grid}>
        {SWAPI_CATEGORIES.map((category) => (
          <Link key={category} className={styles.card} href={`/${category}`}>
            <span className={styles.cardLabel}>{CATEGORY_LABELS[category]}</span>
            <span className={styles.cardMeta}>Open category</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
