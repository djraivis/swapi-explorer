import { EmptyState } from "@/components/EmptyState/EmptyState";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { TransportDetails } from "@/components/TransportDetails/TransportDetails";
import type { TransportItem } from "@/lib/types";
import { unslugify } from "@/utils/wizard";

import styles from "./page.module.css";

export default async function ItemPage({
  params,
}: {
  params: { item: string };
}) {
  const { item } = await params;
  const response = await fetch(`https://swapi.dev/api/vehicles?search=${unslugify(item)}`);
 
  if (!response.ok) {
    return (
      <ErrorState
        title="Unable to load vehicle"
        message="The API request failed. Please try again later."
      />
    );
  }

  const data = await response.json();
  const itemData = data.results[0] as TransportItem | undefined

  if (!itemData) {
    return (
      <EmptyState
        title="Vehicle not found"
        message="No item matched this slug."
      />
    );
  }
  
 return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>Transport Profile</p>
        <h1 className={styles.title}>{itemData.name ? itemData.name : itemData.title}</h1>
        <p className={styles.description}>
          This vehicle view shows the required transportation fields from the task brief.
        </p>

        <TransportDetails item={itemData} />
      </section>
    </main>
 )
}
