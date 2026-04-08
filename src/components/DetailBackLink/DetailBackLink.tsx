import Link from "next/link";

import { CATEGORY_LABELS } from "@/lib/constants";
import type { SwapiCategory } from "@/lib/types";

import styles from "./DetailBackLink.module.css";

type DetailBackLinkProps = {
  category: SwapiCategory;
};

// Renders a link back to the current category list page.
export function DetailBackLink({ category }: DetailBackLinkProps) {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={`/${category}`}>
        Back to {CATEGORY_LABELS[category]}
      </Link>
    </div>
  );
}
