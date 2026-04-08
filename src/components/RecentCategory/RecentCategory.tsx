"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { CATEGORY_LABELS } from "@/lib/constants";
import { getRecentCategory } from "@/lib/explorerStorage";
import type { SwapiCategory } from "@/lib/types";

import styles from "./RecentCategory.module.css";

// Subscribes the recent-category view to storage updates.
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
}

// Reads the current recent-category value for client-side rendering.
function getSnapshot() {
  return getRecentCategory();
}

// Provides the server-rendered fallback value for the recent category.
function getServerSnapshot() {
  return null;
}

// Renders a link to the most recently viewed category when available.
export function RecentCategory() {
  const recentCategory = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  ) as SwapiCategory | null;

  if (!recentCategory) {
    return null;
  }

  return (
    <Link className={styles.link} href={`/${recentCategory}`}>
      Recently viewed category: {CATEGORY_LABELS[recentCategory]}
    </Link>
  );
}
