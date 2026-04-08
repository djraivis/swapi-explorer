import { Suspense } from "react";
import Link from "next/link";

import { CATEGORY_LABELS, SWAPI_CATEGORIES } from "@/lib/constants";

import { ExplorerControls } from "../ExplorerControls/ExplorerControls";
import { ExplorerStateSync } from "../ExplorerStateSync/ExplorerStateSync";
import styles from "./AppHeader.module.css";

type AppHeaderProps = {
  showSearch?: boolean;
};

export function AppHeader({ showSearch = true }: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <Suspense fallback={null}>
        <ExplorerStateSync />
      </Suspense>
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
            <ExplorerControls />
          </Suspense>
        ) : null}
      </div>
    </header>
  );
}
