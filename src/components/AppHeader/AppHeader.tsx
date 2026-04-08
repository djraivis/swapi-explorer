import Link from "next/link";
import { Suspense } from "react";

import { ExplorerStateSync } from "../ExplorerStateSync/ExplorerStateSync";
import { AppHeaderNav } from "./AppHeaderNav";
import styles from "./AppHeader.module.css";

export function AppHeader() {
  return (
    <header className={styles.header}>
      <Suspense fallback={null}>
        <ExplorerStateSync />
      </Suspense>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <Link className={styles.brand} href="/">
            <span className={styles.brandIcon} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10.5L12 4L20 10.5V20H14.5V14H9.5V20H4V10.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            SWAPI Explorer
          </Link>

          <AppHeaderNav />
        </div>
      </div>
    </header>
  );
}
