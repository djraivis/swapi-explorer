"use client";

import { GlobalSearch } from "../Search/Search";
import { SortSelect } from "../SortSelect/SortSelect";
import styles from "./ExplorerControls.module.css";

// Renders the search and sort controls for category pages.
export function ExplorerControls() {
  return (
    <div className={styles.controls}>
      <GlobalSearch />
      <SortSelect />
    </div>
  );
}
