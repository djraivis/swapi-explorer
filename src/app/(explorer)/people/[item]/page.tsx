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
import type { PersonItem } from "@/lib/types";

import styles from "./page.module.css";

// Renders the people detail page for the requested slug.
export default async function ItemPage({
  params,
}: {
  params: { item: string };
}) {
  const { item } = await params;
  const fetches: DeveloperFetchEntry[] = [];
  const recordFetch = createFetchRecorder(fetches);
  const getDeveloperInfo = () =>
    getDetailPageDeveloperInfo({
      category: "people",
      itemSlug: item,
      pageFunction: "ItemPage",
      fetches,
    });

  let itemData;

  try {
    itemData = await findCategoryItemBySlug<PersonItem>("people", item, {
      onFetch: recordFetch,
      ...getDetailFetchMeta({
        category: "people",
        pageFunction: "ItemPage",
      }),
    });
  } catch {
    return (
      <ExplorerPageShell developerInfo={getDeveloperInfo()}>
        <ErrorState
          title="Unable to load person"
          message="The API request failed. Please try again later."
        />
      </ExplorerPageShell>
    );
  }

  if (!itemData) {
    return (
      <ExplorerPageShell developerInfo={getDeveloperInfo()}>
        <EmptyState
          title="Person not found"
          message="No item matched this slug."
        />
      </ExplorerPageShell>
    );
  }

  return (
    <ExplorerPageShell developerInfo={getDeveloperInfo()}>
      <main className={styles.page}>
        <section className={styles.panel}>
          <DetailBackLink category="people" />
          <p className={styles.eyebrow}>Character Profile</p>
          <h1 className={styles.title}>{itemData.name ? itemData.name : itemData.title}</h1>
          <DetailSummary
            fields={[
              { label: "Name", value: itemData.name },
              { label: "Birth Year", value: itemData.birth_year },
              { label: "Gender", value: itemData.gender },
            ]}
          />
        </section>
      </main>
    </ExplorerPageShell>
  );
}
