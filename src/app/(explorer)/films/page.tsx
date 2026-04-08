import { CategoryList } from "@/components/CategoryList/CategoryList";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { fetchCategoryItems, fetchCategoryTotal, sortCategoryItems } from "@/lib/swapi";
import type { SortOrder, SwapiListItem } from "@/lib/types";

export default async function FilmsItemPage({
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
      fetchCategoryItems<SwapiListItem>("films", { search }),
      fetchCategoryTotal("films"),
    ]);
  } catch {
    return (
      <ErrorState
        title="Unable to load films"
        message="The API request failed. Please try again later."
      />
    );
  }

  categoryData = sortCategoryItems(categoryData, "films", sort);

  return (
    <CategoryList
      category="films"
      items={categoryData}
      totalCount={totalCount}
      emptyTitle="No films found"
      emptyMessage="No results matched the current search."
    />
  );
}
