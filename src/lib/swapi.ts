import type { SwapiCategory } from "./types";

// SWAPI uses this root URL for all category requests.
const SWAPI_BASE_URL = "https://swapi.dev/api";

type SwapiListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: unknown[];
};

// Builds the first list URL for a selected SWAPI category.
function getCategoryUrl(category: SwapiCategory) {
  return `${SWAPI_BASE_URL}/${category}/`;
}

// Fetches one SWAPI list page and throws a clear error if the request fails.
async function fetchPage(url: string): Promise<SwapiListResponse> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch data from SWAPI.");
  }

  return response.json();
}

// Fetches every page for a category so the app can show the full dataset.
export async function fetchAllCategoryItems(category: SwapiCategory) {
  const allResults: unknown[] = [];
  let nextPageUrl: string | null = getCategoryUrl(category);

  while (nextPageUrl) {
    const page = await fetchPage(nextPageUrl);

    allResults.push(...page.results);
    nextPageUrl = page.next;
  }

  return allResults;
}
