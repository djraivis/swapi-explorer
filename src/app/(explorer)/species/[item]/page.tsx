import { DetailBackLink } from "@/components/DetailBackLink/DetailBackLink";
import { DetailSummary } from "@/components/DetailSummary/DetailSummary";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { ItemNotFoundState } from "@/components/ItemNotFoundState/ItemNotFoundState";
import { findCategoryItemBySlug } from "@/lib/swapi";
import type { SpeciesItem } from "@/lib/types";
import styles from "./page.module.css";

// Renders the species detail page for the requested slug.
export default async function ItemPage({
  params,
}: {
  params: { item: string };
}) {
  const { item } = await params;

  let itemData;

  try {
    itemData = await findCategoryItemBySlug<SpeciesItem>("species", item);
  } catch {
    return (
      <ErrorState
        title="Unable to load species"
        message="The API request failed. Please try again later."
      />
    );
  }

  if (!itemData) {
    return <ItemNotFoundState category="species" itemLabel="Species" />;
  }

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <DetailBackLink category="species" />
        <p className={styles.eyebrow}>Species Profile</p>
        <h1 className={styles.title}>{itemData.name ? itemData.name : itemData.title}</h1>
        <DetailSummary
          fields={[
            { label: "Name", value: itemData.name },
            { label: "Classification", value: itemData.classification },
            { label: "Language", value: itemData.language },
          ]}
        />
      </section>
    </main>
  )
}
