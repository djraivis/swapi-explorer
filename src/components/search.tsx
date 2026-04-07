"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import styles from "./search.module.css";

export function GlobalSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      aria-label="Search current category"
      className={styles.input}
      placeholder="Search..."
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
