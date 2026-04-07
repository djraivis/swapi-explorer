import { EmptyState } from "@/components/EmptyState/EmptyState";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { unslugify } from "@/utils/wizard";

import styles from "./page.module.css";

export default async function ItemPage({
  params,
}: {
  params: { item: string };
}) {
  const { item } = await params;
  const response = await fetch(`https://swapi.dev/api/people?search=${unslugify(item)}`);

  if (!response.ok) {
    return (
      <ErrorState
        title="Unable to load person"
        message="The API request failed. Please try again later."
      />
    );
  }

  const data = await response.json();
  const itemData = data.results[0]

  if (!itemData) {
    return (
      <EmptyState
        title="Person not found"
        message="No item matched this slug."
      />
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>Character Profile</p>
        <h1 className={styles.title}>{itemData.name ? itemData.name : itemData.title}</h1>
        <p className={styles.description}>
          This is a person from the Star Wars API route-based explorer.
        </p>
        <p className={styles.meta}>People</p>
      </section>
    </main>
  )
}
