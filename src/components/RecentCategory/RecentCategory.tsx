"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { CATEGORY_LABELS } from "@/lib/constants";
import { getRecentCategory } from "@/lib/explorerStorage";
import type { SwapiCategory } from "@/lib/types";

import styles from "./RecentCategory.module.css";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return getRecentCategory();
}

function getServerSnapshot() {
  return null;
}

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
