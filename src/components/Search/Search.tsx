"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import styles from "./Search.module.css";

export function GlobalSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentValue = searchParams.get("search") ?? "";
  const [inputValue, setInputValue] = useState(currentValue);

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
      aria-label="Search current category"
      className={styles.input}
      placeholder="Search..."
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
