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
  const response = await fetch(`https://swapi.dev/api/planets?search=${unslugify(item)}`);

  if (!response.ok) {
    return (
      <ErrorState
        title="Unable to load planet"
        message="The API request failed. Please try again later."
      />
    );
  }

  const data = await response.json();
  const itemData = data.results[0]

  if (!itemData) {
    return (
      <EmptyState
        title="Planet not found"
        message="No item matched this slug."
      />
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>Planet Profile</p>
        <h1 className={styles.title}>{itemData.name ? itemData.name : itemData.title}</h1>
        <p className={styles.description}>
          This is a planet from the Star Wars API.
        </p>
        <p className={styles.meta}>Planets</p>
      </section>
    </main>
  )
}
