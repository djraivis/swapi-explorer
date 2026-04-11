import { DetailBackLink } from "@/components/DetailBackLink/DetailBackLink";
import { DetailSummary } from "@/components/DetailSummary/DetailSummary";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { ExplorerPageShell } from "@/components/ExplorerPageShell/ExplorerPageShell";
import {
  createFetchRecorder,
  getDetailFetchMeta,
  getDetailPageDeveloperInfo,
  type DeveloperFetchEntry,
} from "@/lib/developerInfo";
import { findCategoryItemBySlug } from "@/lib/swapi";
import type { FilmItem } from "@/lib/types";

import styles from "./page.module.css";

// Renders the films detail page for the requested slug.
export default async function FilmsPage({
  params,
}: {
  params: { item: string };
}) {
  const { item } = await params;
  const fetches: DeveloperFetchEntry[] = [];
  const recordFetch = createFetchRecorder(fetches);
  const getDeveloperInfo = () =>
    getDetailPageDeveloperInfo({
      category: "films",
      itemSlug: item,
      pageFunction: "FilmsPage",
      fetches,
    });

  let itemData;

  try {
    itemData = await findCategoryItemBySlug<FilmItem>("films", item, {
      onFetch: recordFetch,
      ...getDetailFetchMeta({
        category: "films",
        pageFunction: "FilmsPage",
      }),
    });
  } catch {
    return (
      <ExplorerPageShell developerInfo={getDeveloperInfo()}>
        <ErrorState
          title="Unable to load film"
          message="The API request failed. Please try again later."
        />
      </ExplorerPageShell>
    );
  }

  if (!itemData) {
    return (
      <ExplorerPageShell developerInfo={getDeveloperInfo()}>
        <EmptyState
          title="Film not found"
          message="No item matched this slug."
        />
      </ExplorerPageShell>
    );
  }

  return (
    <ExplorerPageShell developerInfo={getDeveloperInfo()}>
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
    </ExplorerPageShell>
  );
}
