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

// Renders the people category list page.
export default async function PeopleItemPage({
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
      category: "people",
      pageFunction: "PeopleItemPage",
      search,
      sort,
      fetches,
    });
  let categoryData: SwapiListItem[];
  let totalCount: number;

  try {
    [categoryData, totalCount] = await Promise.all([
      fetchCategoryItems<SwapiListItem>("people", {
        search,
        onFetch: recordFetch,
        ...getListItemsFetchMeta({
          category: "people",
          pageFunction: "PeopleItemPage",
          search,
        }),
      }),
      fetchCategoryTotal("people", {
        onFetch: recordFetch,
        ...getListTotalFetchMeta({
          category: "people",
          pageFunction: "PeopleItemPage",
        }),
      }),
    ]);
  } catch {
    return (
      <ExplorerPageShell developerInfo={getDeveloperInfo()}>
        <ErrorState
          title="Unable to load people"
          message="The API request failed. Please try again later."
        />
      </ExplorerPageShell>
    );
  }

  categoryData = sortCategoryItems(categoryData, "people", sort);

  return (
    <ExplorerPageShell developerInfo={getDeveloperInfo()}>
      <CategoryList
        category="people"
        items={categoryData}
        totalCount={totalCount}
        emptyTitle="No people found"
        emptyMessage="No results matched the current search."
      />
    </ExplorerPageShell>
  );
}
