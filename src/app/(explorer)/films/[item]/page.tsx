import { DetailBackLink } from "@/components/DetailBackLink/DetailBackLink";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { findCategoryItemBySlug } from "@/lib/swapi";

import styles from "./page.module.css";

export default async function FilmsPage({
  params,
}: {
  params: { item: string };
}) {
  const { item } = await params;

  let itemData;

  try {
    itemData = await findCategoryItemBySlug("films", item);
  } catch {
    return (
      <ErrorState
        title="Unable to load film"
        message="The API request failed. Please try again later."
      />
    );
  }

  if (!itemData) {
    return (
      <EmptyState
        title="Film not found"
        message="No item matched this slug."
      />
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <DetailBackLink category="films" />
        <p className={styles.eyebrow}>Film Profile</p>
        <h1 className={styles.title}>{itemData.name ? itemData.name : itemData.title}</h1>
        <p className={styles.description}>
          This is a film from the Star Wars API.
        </p>
        <p className={styles.meta}>Films</p>
      </section>
    </main>
  )
}
