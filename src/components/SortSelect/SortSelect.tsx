"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./SortSelect.module.css";

function getSortLabel(pathname: string) {
  return pathname.startsWith("/films") ? "Title" : "Name";
}

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sortLabel = getSortLabel(pathname);
  const currentValue = searchParams.get("sort") ?? "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>Sort by {sortLabel}</span>
      <select
        aria-label={`Sort current category by ${sortLabel.toLowerCase()}`}
        className={styles.select}
        value={currentValue}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">Default order</option>
        <option value="asc">{sortLabel} A-Z</option>
        <option value="desc">{sortLabel} Z-A</option>
      </select>
    </label>
  );
}
