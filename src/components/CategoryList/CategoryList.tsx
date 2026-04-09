import { EmptyState } from "@/components/EmptyState/EmptyState";
import { ExplorerControls } from "@/components/ExplorerControls/ExplorerControls";
import { CategoryIllustration } from "@/components/CategoryIllustration/CategoryIllustration";
import Link from "next/link";

import { CATEGORY_LABELS } from "@/lib/constants";
import type { SwapiCategory, SwapiListItem } from "@/lib/types";
import { slugify } from "@/utils/wizard";

import styles from "./CategoryList.module.css";

type CategoryListProps = {
  category: SwapiCategory;
  items: SwapiListItem[];
  totalCount: number;
  emptyTitle?: string;
  emptyMessage?: string;
};

// Renders the filtered list view for a SWAPI category.
export function CategoryList({
  category,
  items,
  totalCount,
  emptyTitle = "No results found",
  emptyMessage = "No results matched the current search.",
}: CategoryListProps) {
  const label = CATEGORY_LABELS[category];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerContent}>
            <p className={styles.eyebrow}>Category</p>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{label}</h1>
              <ExplorerControls />
            </div>
            <p
              className={styles.description}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              Showing {items.length} out of {totalCount} {label.toLowerCase()}.
            </p>
          </div>
          <div className={styles.illustrationWrap}>
            <CategoryIllustration category={category} />
          </div>
        </div>
      </div>

      <div className={styles.resultsSection}>
        {items.length === 0 ? (
          <EmptyState
            title={emptyTitle}
            message={emptyMessage}
          />
        ) : (
          <div className={styles.itemsSurface}>
            <ul className={styles.grid}>
              {items.map((item) => {
                const itemLabel = item.name ?? item.title ?? "Unknown";

                return (
                  <li key={item.url} className={styles.gridItem}>
                    <Link
                      className={styles.itemLink}
                      href={`/${category}/${slugify(itemLabel)}`}
                    >
                      {itemLabel}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
