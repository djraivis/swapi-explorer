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

// Renders the starships category list page.
export default async function StarshipsItemPage({
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
      category: "starships",
      pageFunction: "StarshipsItemPage",
      search,
      sort,
      fetches,
    });
  let categoryData: SwapiListItem[];
  let totalCount: number;

  try {
    [categoryData, totalCount] = await Promise.all([
      fetchCategoryItems<SwapiListItem>("starships", {
        search,
        onFetch: recordFetch,
        ...getListItemsFetchMeta({
          category: "starships",
          pageFunction: "StarshipsItemPage",
          search,
        }),
      }),
      fetchCategoryTotal("starships", {
        onFetch: recordFetch,
        ...getListTotalFetchMeta({
          category: "starships",
          pageFunction: "StarshipsItemPage",
        }),
      }),
    ]);
  } catch {
    return (
      <ExplorerPageShell developerInfo={getDeveloperInfo()}>
        <ErrorState
          title="Unable to load starships"
          message="The API request failed. Please try again later."
        />
      </ExplorerPageShell>
    );
  }

  categoryData = sortCategoryItems(categoryData, "starships", sort);

  return (
    <ExplorerPageShell developerInfo={getDeveloperInfo()}>
      <CategoryList
        category="starships"
        items={categoryData}
        totalCount={totalCount}
        emptyTitle="No starships found"
        emptyMessage="No results matched the current search."
      />
    </ExplorerPageShell>
  );
}
