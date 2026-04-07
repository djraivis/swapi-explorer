import type { SwapiCategory, SwapiListItem } from "@/lib/types";
import { slugify } from "@/utils/wizard";

type SwapiListResponse<T> = {
  next: string | null;
  results: T[];
};

async function fetchAllCategoryItems<T extends SwapiListItem>(category: SwapiCategory) {
  const items: T[] = [];
  let nextUrl: string | null = `https://swapi.dev/api/${category}/`;

  while (nextUrl) {
    const response = await fetch(nextUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${category}`);
    }

    const data = (await response.json()) as SwapiListResponse<T>;
    items.push(...data.results);
    nextUrl = data.next;
  }

  return items;
}

export async function findCategoryItemBySlug<T extends SwapiListItem>(
  category: SwapiCategory,
  itemSlug: string
) {
  const items = await fetchAllCategoryItems<T>(category);

  return items.find((item) => slugify(item.name ?? item.title ?? "") === itemSlug);
}
