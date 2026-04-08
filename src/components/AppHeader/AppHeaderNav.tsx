"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CATEGORY_LABELS, SWAPI_CATEGORIES } from "@/lib/constants";
import { getCategoryFromPathname } from "@/lib/explorerStorage";

import styles from "./AppHeader.module.css";

// Renders the top-level navigation for all SWAPI categories.
export function AppHeaderNav() {
  const pathname = usePathname();
  const activeCategory = getCategoryFromPathname(pathname);

  return (
    <nav className={styles.nav} aria-label="Category navigation">
      {SWAPI_CATEGORIES.map((category) => {
        const isActive = activeCategory === category;

        return (
          <Link
            key={category}
            className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
            href={`/${category}`}
            aria-current={isActive ? "page" : undefined}
          >
            {CATEGORY_LABELS[category]}
          </Link>
        );
      })}
    </nav>
  );
}
