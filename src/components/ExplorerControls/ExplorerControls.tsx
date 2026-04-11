"use client";

import { GlobalSearch } from "../Search/Search";
import { SortSelect } from "../SortSelect/SortSelect";
import styles from "./ExplorerControls.module.css";

// Renders the search and sort controls for category pages.
export function ExplorerControls() {
  return (
    <div className={styles.controls}>
      <div className={styles.primaryControl}>
        <GlobalSearch />
      </div>
      <div className={styles.secondaryControl}>
        <SortSelect />
      </div>
    </div>
  );
}
