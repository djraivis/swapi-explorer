import { DetailBackLink } from "@/components/DetailBackLink/DetailBackLink";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { ItemNotFoundState } from "@/components/ItemNotFoundState/ItemNotFoundState";
import { TransportDetails } from "@/components/TransportDetails/TransportDetails";
import type { TransportItem } from "@/lib/types";
import { findCategoryItemBySlug } from "@/lib/swapi";

import styles from "./page.module.css";

// Renders the vehicles detail page for the requested slug.
export default async function ItemPage({
  params,
}: {
  params: { item: string };
}) {
  const { item } = await params;

  let itemData: TransportItem | undefined;

  try {
    itemData = await findCategoryItemBySlug<TransportItem>("vehicles", item);
  } catch {
    return (
      <ErrorState
        title="Unable to load vehicle"
        message="The API request failed. Please try again later."
      />
    );
  }

  if (!itemData) {
    return <ItemNotFoundState category="vehicles" itemLabel="Vehicle" />;
  }
  
 return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <DetailBackLink category="vehicles" />
        <p className={styles.eyebrow}>Transport Profile</p>
        <h1 className={styles.title}>{itemData.name ? itemData.name : itemData.title}</h1>
        <p className={styles.description}>
          This vehicle view shows the required transportation fields from the task brief.
        </p>

        <TransportDetails itemObject={itemData} />
      </section>
    </main>
 )
}
