import { formatResponseStatus, type DeveloperCodeReference, type DeveloperFetchRecorder } from "@/lib/developerInfo"
import type { SortOrder, SwapiCategory, SwapiListItem } from "@/lib/types"
import { slugify } from "@/utils/wizard"

type SwapiListResponse<T> = {
  count: number
  next: string | null
  results: T[]
}

type FetchCategoryItemsOptions = {
  search?: string
  onFetch?: DeveloperFetchRecorder
  trigger?: string
  explanation?: string
  codeReferences?: DeveloperCodeReference[]
}

type FetchCategoryTotalOptions = {
  onFetch?: DeveloperFetchRecorder
  trigger?: string
  explanation?: string
  codeReferences?: DeveloperCodeReference[]
}

type FindCategoryItemBySlugOptions = {
  onFetch?: DeveloperFetchRecorder
  trigger?: string
  explanation?: string
  codeReferences?: DeveloperCodeReference[]
}

function recordFetch(
  options: {
    onFetch?: DeveloperFetchRecorder
    trigger?: string
    explanation?: string
    codeReferences?: DeveloperCodeReference[]
  },
  endpoint: string,
  responseStatus: string,
  metadata: { durationMs?: number; cacheStatus?: string; pageIndex?: number } = {},
) {
  options.onFetch?.({
    endpoint,
    trigger: options.trigger ?? "fetch()",
    responseStatus,
    explanation: options.explanation ?? "SWAPI request completed.",
    codeReferences: options.codeReferences ?? [],
    durationMs: metadata.durationMs,
    cacheStatus: metadata.cacheStatus,
    pageIndex: metadata.pageIndex,
  })
}

function getCacheStatus(response: Response) {
  return (
    response.headers.get("x-vercel-cache") ??
    response.headers.get("cf-cache-status") ??
    response.headers.get("cache-control") ??
    "unknown"
  )
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
  let pageIndex = 1

  while (nextUrl) {
    let response: Response
    const startedAt = performance.now()

    try {
      response = await fetch(nextUrl)
    } catch {
      recordFetch(options, nextUrl, "Network error", {
        durationMs: performance.now() - startedAt,
        pageIndex,
      })
      throw new Error(`Failed to fetch ${category}`)
    }

    recordFetch(options, nextUrl, formatResponseStatus(response.status), {
      durationMs: performance.now() - startedAt,
      cacheStatus: getCacheStatus(response),
      pageIndex,
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${category}`)
    }

    const data = (await response.json()) as SwapiListResponse<T>
    items.push(...data.results)
    nextUrl = data.next
    pageIndex += 1
  }

  return items
}

// Fetches the total item count for a SWAPI category.
export async function fetchCategoryTotal(category: SwapiCategory, options: FetchCategoryTotalOptions = {}) {
  const endpoint = `https://swapi.dev/api/${category}/`
  let response: Response
  const startedAt = performance.now()

  try {
    response = await fetch(endpoint)
  } catch {
    recordFetch(options, endpoint, "Network error", {
      durationMs: performance.now() - startedAt,
    })
    throw new Error(`Failed to fetch ${category} total`)
  }

  recordFetch(options, endpoint, formatResponseStatus(response.status), {
    durationMs: performance.now() - startedAt,
    cacheStatus: getCacheStatus(response),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${category} total`)
  }

  const data = (await response.json()) as SwapiListResponse<SwapiListItem>
  return data.count
}

// Finds a category item by matching the requested slug against its label.
export async function findCategoryItemBySlug<T extends SwapiListItem>(
  category: SwapiCategory,
  itemSlug: string,
  options: FindCategoryItemBySlugOptions = {},
) {
  const items = await fetchCategoryItems<T>(category, options)

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
