import { CategoryList } from "@/components/CategoryList/CategoryList";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { fetchCategoryItems, fetchCategoryTotal, sortCategoryItems } from "@/lib/swapi";
import type { SortOrder, SwapiListItem } from "@/lib/types";

export default async function PlanetsItemPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParam = (await searchParams).search;
  const sortParam = (await searchParams).sort;
  const search = typeof searchParam === "string" ? searchParam : undefined;
  const sort = sortParam === "asc" || sortParam === "desc" ? (sortParam as SortOrder) : undefined;
  let categoryData: SwapiListItem[];
  let totalCount: number;

  try {
    [categoryData, totalCount] = await Promise.all([
      fetchCategoryItems<SwapiListItem>("planets", { search }),
      fetchCategoryTotal("planets"),
    ]);
  } catch {
    return (
      <ErrorState
        title="Unable to load planets"
        message="The API request failed. Please try again later."
      />
    );
  }

  categoryData = sortCategoryItems(categoryData, "planets", sort);

  return (
    <CategoryList
      category="planets"
      items={categoryData}
      totalCount={totalCount}
      emptyTitle="No planets found"
      emptyMessage="No results matched the current search."
    />
  );
}
