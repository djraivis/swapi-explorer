import { CategoryList } from "@/components/CategoryList/CategoryList";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { fetchCategoryItems, sortCategoryItems } from "@/lib/swapi";
import type { SortOrder, SwapiListItem } from "@/lib/types";

export default async function SpeciesItemPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParam = (await searchParams).search;
  const sortParam = (await searchParams).sort;
  const search = typeof searchParam === "string" ? searchParam : undefined;
  const sort = sortParam === "asc" || sortParam === "desc" ? (sortParam as SortOrder) : undefined;
  let categoryData: SwapiListItem[];

  try {
    categoryData = await fetchCategoryItems<SwapiListItem>("species", { search });
  } catch {
    return (
      <ErrorState
        title="Unable to load species"
        message="The API request failed. Please try again later."
      />
    );
  }

  categoryData = sortCategoryItems(categoryData, "species", sort);

  if (categoryData.length === 0) {
    return (
      <EmptyState
        title="No species found"
        message="No results matched the current search."
      />
    );
  }

  return (
    <CategoryList
      category="species"
      items={categoryData}
    />
  );
}
