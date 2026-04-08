import Link from "next/link";

import { CATEGORY_LABELS } from "@/lib/constants";
import type { SwapiCategory, SwapiListItem } from "@/lib/types";
import { slugify } from "@/utils/wizard";

import styles from "./CategoryList.module.css";

type CategoryListProps = {
  category: SwapiCategory;
  items: SwapiListItem[];
};

export function CategoryList({ category, items }: CategoryListProps) {
  const label = CATEGORY_LABELS[category];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Category Explorer</p>
        <h1 className={styles.title}>{label}</h1>
        <p className={styles.description}>
          Browse {items.length} {label.toLowerCase()} from SWAPI.
        </p>
      </div>

      <div className={styles.grid}>
        {items.map((item) => {
          const itemLabel = item.name ?? item.title ?? "Unknown";

          return (
            <Link
              key={item.url}
              className={styles.card}
              href={`/${category}/${slugify(itemLabel)}`}
            >
              <span className={styles.cardLabel}>{itemLabel}</span>
              <span className={styles.cardMeta}>Open details</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
