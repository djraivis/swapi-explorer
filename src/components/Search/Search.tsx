"use client";

import { startTransition, useEffect, useId, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { CATEGORY_LABELS } from "@/lib/constants";
import { getCategoryFromPathname } from "@/lib/explorerStorage";

import styles from "./Search.module.css";

// Keeps the current category search input in sync with the URL.
export function GlobalSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const inputId = useId();
  const category = getCategoryFromPathname(pathname);
  const currentValue = searchParams.get("search") ?? "";
  const [inputValue, setInputValue] = useState(currentValue);
  const placeholder = category
    ? `Search ${CATEGORY_LABELS[category].toLowerCase()}`
    : "Search";
  const searchRegionLabel = category
    ? `${CATEGORY_LABELS[category]} search`
    : "Category search";

  useEffect(() => {
    setInputValue(currentValue);
  }, [currentValue]);

  // Updates the current search query in the URL.
  const handleChange = (value: string) => {
    setInputValue(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    });
  };

  return (
    <div role="search" aria-label={searchRegionLabel}>
      <label className={styles.wrapper} htmlFor={inputId}>
        <span className={styles.label}>Search</span>
        <input
          id={inputId}
          name="search"
          type="search"
          enterKeyHint="search"
          className={styles.input}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
        />
      </label>
    </div>
  );
}
