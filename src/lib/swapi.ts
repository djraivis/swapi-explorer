import type { SortOrder, SwapiCategory, SwapiListItem } from "@/lib/types"
import { slugify } from "@/utils/wizard"

type SwapiListResponse<T> = {
  count: number
  next: string | null
  results: T[]
}

type FetchCategoryItemsOptions = {
  search?: string
}

// Fetches all paginated items for a SWAPI category, with optional search.
export async function fetchCategoryItems<T extends SwapiListItem>(
  category: SwapiCategory,
  options: FetchCategoryItemsOptions = {},
) {
  const items: T[] = []
  const search = typeof options.search === "string" ? options.search.trim() : ""
  const initialUrl = search
    ? `https://swapi.dev/api/${category}/?search=${encodeURIComponent(search)}`
    : `https://swapi.dev/api/${category}/`
  let nextUrl: string | null = initialUrl

  while (nextUrl) {
    const response = await fetch(nextUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch ${category}`)
    }

    const data = (await response.json()) as SwapiListResponse<T>
    items.push(...data.results)
    nextUrl = data.next
  }

  return items
}

// Fetches the total item count for a SWAPI category.
export async function fetchCategoryTotal(category: SwapiCategory) {
  const response = await fetch(`https://swapi.dev/api/${category}/`)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${category} total`)
  }

  const data = (await response.json()) as SwapiListResponse<SwapiListItem>
  return data.count
}

// Finds a category item by matching the requested slug against its label.
export async function findCategoryItemBySlug<T extends SwapiListItem>(category: SwapiCategory, itemSlug: string) {
  const items = await fetchCategoryItems<T>(category)

  return items.find((item) => slugify(item.name ?? item.title ?? "") === itemSlug)
}

// Sorts category items by name or title using the selected sort order.
export function sortCategoryItems<T extends SwapiListItem>(
  items: T[],
  category: SwapiCategory,
  sort: SortOrder | undefined,
) {
  if (!sort) {
    return items
  }

  const sortedItems = [...items]
  // Returns the correct sortable field for the current category.
  const getValue = (item: T) => {
    if (category === "films") {
      return item.title ?? ""
    }

    return item.name ?? ""
  }

  sortedItems.sort((firstItem, secondItem) => {
    const firstValue = getValue(firstItem)
    const secondValue = getValue(secondItem)
    const comparison = firstValue.localeCompare(secondValue, undefined, {
      sensitivity: "base",
    })

    return sort === "asc" ? comparison : comparison * -1
  })

  return sortedItems
}
