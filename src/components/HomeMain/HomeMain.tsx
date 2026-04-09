import Link from "next/link";

import { CATEGORY_LABELS, SWAPI_CATEGORIES } from "@/lib/constants";

import { RecentCategory } from "../RecentCategory/RecentCategory";
import styles from "./HomeMain.module.css";

// Renders the landing page hero, recent link, and category cards.
export function HomeMain() {
  return (
    <main className={styles.main} id="main-content" tabIndex={-1}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Route-Based Explorer</p>
        <h1 className={styles.title}>Star Wars API Explorer</h1>
        <p className={styles.description}>
          Browse the six SWAPI categories through simple Next.js routes and
          slug-based item pages.
        </p>
        <RecentCategory />
      </section>

      <section aria-labelledby="home-categories-heading">
        <h2 className={styles.visuallyHidden} id="home-categories-heading">
          Browse categories
        </h2>
        <ul className={styles.grid}>
          {SWAPI_CATEGORIES.map((category) => (
            <li key={category} className={styles.gridItem}>
              <Link className={styles.card} href={`/${category}`}>
                <span className={styles.cardLabel}>{CATEGORY_LABELS[category]}</span>
                <span className={styles.cardMeta}>Open category</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
