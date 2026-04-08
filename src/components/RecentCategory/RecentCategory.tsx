"use client";

import { useState } from "react";
import Link from "next/link";

import { CATEGORY_LABELS } from "@/lib/constants";
import { getRecentCategory } from "@/lib/explorerStorage";
import type { SwapiCategory } from "@/lib/types";

import styles from "./RecentCategory.module.css";

export function RecentCategory() {
  const [recentCategory] = useState<SwapiCategory | null>(() => getRecentCategory());

  if (!recentCategory) {
    return null;
  }

  return (
    <Link className={styles.link} href={`/${recentCategory}`}>
      Recently viewed category: {CATEGORY_LABELS[recentCategory]}
    </Link>
  );
}
