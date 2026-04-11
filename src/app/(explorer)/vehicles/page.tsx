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

// Renders the vehicles category list page.
export default async function VehiclesItemPage({
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
      category: "vehicles",
      pageFunction: "VehiclesItemPage",
      search,
      sort,
      fetches,
    });
  let categoryData: SwapiListItem[];
  let totalCount: number;

  try {
    [categoryData, totalCount] = await Promise.all([
      fetchCategoryItems<SwapiListItem>("vehicles", {
        search,
        onFetch: recordFetch,
        ...getListItemsFetchMeta({
          category: "vehicles",
          pageFunction: "VehiclesItemPage",
          search,
        }),
      }),
      fetchCategoryTotal("vehicles", {
        onFetch: recordFetch,
        ...getListTotalFetchMeta({
          category: "vehicles",
          pageFunction: "VehiclesItemPage",
        }),
      }),
    ]);
  } catch {
    return (
      <ExplorerPageShell developerInfo={getDeveloperInfo()}>
        <ErrorState
          title="Unable to load vehicles"
          message="The API request failed. Please try again later."
        />
      </ExplorerPageShell>
    );
  }

  categoryData = sortCategoryItems(categoryData, "vehicles", sort);

  return (
    <ExplorerPageShell developerInfo={getDeveloperInfo()}>
      <CategoryList
        category="vehicles"
        items={categoryData}
        totalCount={totalCount}
        emptyTitle="No vehicles found"
        emptyMessage="No results matched the current search."
      />
    </ExplorerPageShell>
  );
}
