import Link from "next/link";

import { CATEGORY_LABELS, SWAPI_CATEGORIES } from "@/lib/constants";

import styles from "./NotFoundState.module.css";

// Renders the global 404 state with links back into the explorer.
export function NotFoundState() {
  return (
    <section className={styles.main} aria-labelledby="not-found-title">
      <div className={styles.panel}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title} id="not-found-title">
          Page Not Found
        </h1>
        <p className={styles.message}>
          That route does not exist in this SWAPI explorer. Try one of the six
          supported categories instead.
        </p>

        <div className={styles.actions}>
          <Link className={styles.primaryLink} href="/">
            Back To Home
          </Link>
        </div>

        <div className={styles.grid}>
          {SWAPI_CATEGORIES.map((category) => (
            <Link key={category} className={styles.categoryLink} href={`/${category}`}>
              {CATEGORY_LABELS[category]}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
