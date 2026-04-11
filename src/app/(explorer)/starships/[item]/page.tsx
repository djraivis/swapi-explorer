import { DetailBackLink } from "@/components/DetailBackLink/DetailBackLink";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { ExplorerPageShell } from "@/components/ExplorerPageShell/ExplorerPageShell";
import { TransportDetails } from "@/components/TransportDetails/TransportDetails";
import {
  createFetchRecorder,
  getDetailFetchMeta,
  getDetailPageDeveloperInfo,
  type DeveloperFetchEntry,
} from "@/lib/developerInfo";
import type { TransportItem } from "@/lib/types";
import { findCategoryItemBySlug } from "@/lib/swapi";

import styles from "./page.module.css";

// Renders the starships detail page for the requested slug.
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
      category: "starships",
      itemSlug: item,
      pageFunction: "ItemPage",
      fetches,
    });

  let itemData: TransportItem | undefined;

  try {
    itemData = await findCategoryItemBySlug<TransportItem>("starships", item, {
      onFetch: recordFetch,
      ...getDetailFetchMeta({
        category: "starships",
        pageFunction: "ItemPage",
      }),
    });
  } catch {
    return (
      <ExplorerPageShell developerInfo={getDeveloperInfo()}>
        <ErrorState
          title="Unable to load starship"
          message="The API request failed. Please try again later."
        />
      </ExplorerPageShell>
    );
  }

  if (!itemData) {
    return (
      <ExplorerPageShell developerInfo={getDeveloperInfo()}>
        <EmptyState
          title="Starship not found"
          message="No item matched this slug."
        />
      </ExplorerPageShell>
    );
  }

  return (
    <ExplorerPageShell developerInfo={getDeveloperInfo()}>
      <main className={styles.page}>
        <section className={styles.panel}>
          <DetailBackLink category="starships" />
          <p className={styles.eyebrow}>Transport Profile</p>
          <h1 className={styles.title}>{itemData.name ? itemData.name : itemData.title}</h1>
          <p className={styles.description}>
            This starship view shows the required transportation fields from the task brief.
          </p>

          <TransportDetails item={itemData} />
        </section>
      </main>
    </ExplorerPageShell>
  );
}
