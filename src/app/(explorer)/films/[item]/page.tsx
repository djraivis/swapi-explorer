import { DetailBackLink } from "@/components/DetailBackLink/DetailBackLink";
import { DetailSummary } from "@/components/DetailSummary/DetailSummary";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { findCategoryItemBySlug } from "@/lib/swapi";
import type { FilmItem } from "@/lib/types";

import styles from "./page.module.css";

export default async function FilmsPage({
  params,
}: {
  params: { item: string };
}) {
  const { item } = await params;

  let itemData;

  try {
    itemData = await findCategoryItemBySlug<FilmItem>("films", item);
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
        <DetailSummary
          fields={[
            { label: "Title", value: itemData.title },
            { label: "Episode", value: itemData.episode_id },
            { label: "Release Date", value: itemData.release_date },
          ]}
        />
      </section>
    </main>
  )
}
