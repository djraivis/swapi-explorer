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
import type { PlanetItem } from "@/lib/types";

import styles from "./page.module.css";

// Renders the planets detail page for the requested slug.
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
      category: "planets",
      itemSlug: item,
      pageFunction: "ItemPage",
      fetches,
    });

  let itemData;

  try {
    itemData = await findCategoryItemBySlug<PlanetItem>("planets", item, {
      onFetch: recordFetch,
      ...getDetailFetchMeta({
        category: "planets",
        pageFunction: "ItemPage",
      }),
    });
  } catch {
    return (
      <ExplorerPageShell developerInfo={getDeveloperInfo()}>
        <ErrorState
          title="Unable to load planet"
          message="The API request failed. Please try again later."
        />
      </ExplorerPageShell>
    );
  }

  if (!itemData) {
    return (
      <ExplorerPageShell developerInfo={getDeveloperInfo()}>
        <EmptyState
          title="Planet not found"
          message="No item matched this slug."
        />
      </ExplorerPageShell>
    );
  }

  return (
    <ExplorerPageShell developerInfo={getDeveloperInfo()}>
      <main className={styles.page}>
        <section className={styles.panel}>
          <DetailBackLink category="planets" />
          <p className={styles.eyebrow}>Planet Profile</p>
          <h1 className={styles.title}>{itemData.name ? itemData.name : itemData.title}</h1>
          <DetailSummary
            fields={[
              { label: "Name", value: itemData.name },
              { label: "Climate", value: itemData.climate },
              { label: "Population", value: itemData.population },
            ]}
          />
        </section>
      </main>
    </ExplorerPageShell>
  );
}
