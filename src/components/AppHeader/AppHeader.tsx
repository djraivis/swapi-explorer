import { Suspense } from "react";
import Link from "next/link";

import { CATEGORY_LABELS, SWAPI_CATEGORIES } from "@/lib/constants";

import { GlobalSearch } from "../Search/Search";
import styles from "./AppHeader.module.css";

type AppHeaderProps = {
  showSearch?: boolean;
};

export function AppHeader({ showSearch = true }: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerBar}>
        <Link className={styles.brand} href="/">
          SWAPI Explorer
        </Link>

        <nav className={styles.nav} aria-label="Category navigation">
          {SWAPI_CATEGORIES.map((category) => (
            <Link
              key={category}
              className={styles.navLink}
              href={`/${category}`}
            >
              {CATEGORY_LABELS[category]}
            </Link>
          ))}
        </nav>

        {showSearch ? (
          <Suspense fallback={null}>
            <GlobalSearch />
          </Suspense>
        ) : null}
      </div>
    </header>
  );
}
