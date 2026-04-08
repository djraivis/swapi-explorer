"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { CATEGORY_LABELS } from "@/lib/constants";
import { getCategoryFromPathname } from "@/lib/explorerStorage";

import styles from "./Search.module.css";

export function GlobalSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const category = getCategoryFromPathname(pathname);
  const currentValue = searchParams.get("search") ?? "";
  const [inputValue, setInputValue] = useState(currentValue);
  const placeholder = category
    ? `Search ${CATEGORY_LABELS[category].toLowerCase()}`
    : "Search";

  useEffect(() => {
    setInputValue(currentValue);
  }, [currentValue]);

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
    <input
      aria-label={placeholder}
      className={styles.input}
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
