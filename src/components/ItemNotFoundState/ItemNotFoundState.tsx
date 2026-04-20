import Link from "next/link";

import { CATEGORY_LABELS } from "@/lib/constants";
import type { SwapiCategory } from "@/lib/types";

import styles from "./ItemNotFoundState.module.css";

type ItemNotFoundStateProps = {
  category: SwapiCategory;
  itemLabel: string;
};

// Renders the dedicated missing-item state for valid detail routes.
export function ItemNotFoundState({ category, itemLabel }: ItemNotFoundStateProps) {
  return (
    <section className={styles.state} aria-labelledby="item-not-found-title">
      <div className={styles.panel}>
        <p className={styles.eyebrow}>Item Not Found</p>
        <h1 className={styles.title} id="item-not-found-title">
          {itemLabel} not found
        </h1>
        <p className={styles.message}>
          No item matched this slug. Return to {CATEGORY_LABELS[category]} and try a different selection.
        </p>
        <Link className={styles.link} href={`/${category}`}>
          Back to {CATEGORY_LABELS[category]}
        </Link>
      </div>
    </section>
  );
}
