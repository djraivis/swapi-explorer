import { DetailBackLink } from "@/components/DetailBackLink/DetailBackLink";
import { DetailSummary } from "@/components/DetailSummary/DetailSummary";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { ItemNotFoundState } from "@/components/ItemNotFoundState/ItemNotFoundState";
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

  let itemData;

  try {
    itemData = await findCategoryItemBySlug<PlanetItem>("planets", item);
  } catch {
    return (
      <ErrorState
        title="Unable to load planet"
        message="The API request failed. Please try again later."
      />
    );
  }

  if (!itemData) {
    return <ItemNotFoundState category="planets" itemLabel="Planet" />;
  }

  return (
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
  )
}
