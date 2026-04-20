import { DetailBackLink } from "@/components/DetailBackLink/DetailBackLink";
import { DetailSummary } from "@/components/DetailSummary/DetailSummary";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { ItemNotFoundState } from "@/components/ItemNotFoundState/ItemNotFoundState";
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

  let itemData;

  try {
    itemData = await findCategoryItemBySlug<PersonItem>("people", item);
  } catch {
    return (
      <ErrorState
        title="Unable to load person"
        message="The API request failed. Please try again later."
      />
    );
  }

  if (!itemData) {
    return <ItemNotFoundState category="people" itemLabel="Person" />;
  }

  return (
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
  )
}
