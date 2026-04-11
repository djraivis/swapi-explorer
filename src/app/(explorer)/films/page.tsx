import { CategoryList } from "@/components/CategoryList/CategoryList";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { ExplorerPageShell } from "@/components/ExplorerPageShell/ExplorerPageShell";
import {
  createFetchRecorder,
  getListItemsFetchMeta,
  getListPageDeveloperInfo,
  getListTotalFetchMeta,
  type DeveloperFetchEntry,
} from "@/lib/developerInfo";
import { fetchCategoryItems, fetchCategoryTotal, sortCategoryItems } from "@/lib/swapi";
import type { SortOrder, SwapiListItem } from "@/lib/types";

// Renders the films category list page.
export default async function FilmsItemPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParam = (await searchParams).search;
  const sortParam = (await searchParams).sort;
  const search = typeof searchParam === "string" ? searchParam : undefined;
  const sort = sortParam === "asc" || sortParam === "desc" ? (sortParam as SortOrder) : undefined;
  const fetches: DeveloperFetchEntry[] = [];
  const recordFetch = createFetchRecorder(fetches);
  const getDeveloperInfo = () =>
    getListPageDeveloperInfo({
      category: "films",
      pageFunction: "FilmsItemPage",
      search,
      sort,
      fetches,
    });
  let categoryData: SwapiListItem[];
  let totalCount: number;

  try {
    [categoryData, totalCount] = await Promise.all([
      fetchCategoryItems<SwapiListItem>("films", {
        search,
        onFetch: recordFetch,
        ...getListItemsFetchMeta({
          category: "films",
          pageFunction: "FilmsItemPage",
          search,
        }),
      }),
      fetchCategoryTotal("films", {
        onFetch: recordFetch,
        ...getListTotalFetchMeta({
          category: "films",
          pageFunction: "FilmsItemPage",
        }),
      }),
    ]);
  } catch {
    return (
      <ExplorerPageShell developerInfo={getDeveloperInfo()}>
        <ErrorState
          title="Unable to load films"
          message="The API request failed. Please try again later."
        />
      </ExplorerPageShell>
    );
  }

  categoryData = sortCategoryItems(categoryData, "films", sort);

  return (
    <ExplorerPageShell developerInfo={getDeveloperInfo()}>
      <CategoryList
        category="films"
        items={categoryData}
        totalCount={totalCount}
        emptyTitle="No films found"
        emptyMessage="No results matched the current search."
      />
    </ExplorerPageShell>
  );
}
