"use client";

import { usePathname } from "next/navigation";

import { getCategoryFromPathname } from "@/lib/explorerStorage";

import { GlobalSearch } from "../Search/Search";
import { SortSelect } from "../SortSelect/SortSelect";
import styles from "../AppHeader/AppHeader.module.css";

export function ExplorerControls() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const category = getCategoryFromPathname(pathname);

  if (!category || pathSegments.length !== 1) {
    return null;
  }

  return (
    <div className={styles.controls}>
      <GlobalSearch />
      <SortSelect />
    </div>
  );
}
