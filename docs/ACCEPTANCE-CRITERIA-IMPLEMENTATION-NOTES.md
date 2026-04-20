# Acceptance Criteria — Implementation Notes

This document explains how each acceptance criterion is implemented in the current SWAPI Explorer codebase.

## Table of Contents

1. [Search across all available categories](#1-search-across-all-available-categories)
2. [Show the full list of results for a category](#2-show-the-full-list-of-results-for-a-category)
3. [Sort by name or title depending on the category](#3-sort-by-name-or-title-depending-on-the-category)
4. [Error message for invalid or failed requests](#4-error-message-for-invalid-or-failed-requests)
5. [Transport categories show the required 8 fields](#5-transport-categories-show-the-required-8-fields)
6. [Most recently searched category](#6-most-recently-searched-category)
7. [Retain search and sort state when switching categories](#7-retain-search-and-sort-state-when-switching-categories)
8. [WCAG 2.2 Level A/AA accessibility](#8-wcag-22-level-aa-accessibility)
9. [Clear loading state while data is fetching](#9-clear-loading-state-while-data-is-fetching)
10. [Styled using CSS Modules](#10-styled-using-css-modules)

## 1. Search across all available categories

> The user should be able to search via all available categories (i.e. planets).

Every category list page renders `ExplorerControls`, which includes the `GlobalSearch` component:

- `src/components/ExplorerControls/ExplorerControls.tsx`
- `src/components/Search/Search.tsx`

`GlobalSearch` keeps the search term in the URL via `router.replace()` and `startTransition()`. That means the search state is refresh-safe and shareable:

```ts
const queryString = params.toString();
startTransition(() => {
  router.replace(queryString ? `${pathname}?${queryString}` : pathname);
});
```

The list page reads `searchParams.search` and passes it into `fetchCategoryItems`. The fetch helper appends the search term to the API URL:

```ts
const initialUrl = search
  ? `${SWAPI_BASE_URL}/${category}/?search=${encodeURIComponent(search)}`
  : `${SWAPI_BASE_URL}/${category}/`
```

This works for every supported category because the same search control and fetch helper are reused across the route set.

## 2. Show the full list of results for a category

> The user should see a full list of the relevant data for the searched category (i.e. 60 planets).

SWAPI paginates its list responses. `fetchCategoryItems` follows the `next` link until it reaches the end of the dataset:

```ts
while (nextUrl) {
  const response = await fetch(nextUrl)
  const data = (await response.json()) as SwapiListResponse<T>
  items.push(...data.results)
  nextUrl = data.next
}
```

Relevant files:

- `src/lib/swapi.ts`
- `src/components/CategoryList/CategoryList.tsx`

The final array is rendered as one list, and the header shows `Showing {items.length} out of {totalCount}` so the user can see the filtered count against the full category total.

## 3. Sort by name or title depending on the category

> The user should have the option to sort via name or title (depending on the category).

`SortSelect` writes `sort=asc` or `sort=desc` into the URL:

- `src/components/SortSelect/SortSelect.tsx`

The sort label adapts to the current route:

```ts
function getSortLabel(pathname: string) {
  return pathname.startsWith("/films") ? "Title" : "Name";
}
```

The server-side list page reads the `sort` param and passes it into `sortCategoryItems`:

- `src/lib/swapi.ts`

`sortCategoryItems` uses `title` for films and `name` for all other categories.

## 4. Error message for invalid or failed requests

> The user should receive an error message if an invalid request is made.

Each list page and detail page wraps data fetching in `try/catch`. On fetch failure, the page returns `ErrorState` instead of the normal content:

- `src/components/ErrorState/ErrorState.tsx`
- `src/app/(explorer)/people/page.tsx`
- `src/app/(explorer)/starships/[item]/page.tsx`

`ErrorState` renders with `role="alert"` so assistive technology announces the failure immediately.

For valid detail routes where a slug does not match any item, the app uses a separate `ItemNotFoundState` instead of treating it as a fetch error:

- `src/components/ItemNotFoundState/ItemNotFoundState.tsx`

That keeps “request failed” distinct from “item does not exist.”

## 5. Transport categories show the required 8 fields

> For all transportation categories, the following data should be shown as a minimum: Name, Model, Manufacturer, Cost in credits, Length, Crew, Passengers, Cargo capacity.

The transport fields are defined through the shared `TransportItem` type:

- `src/lib/types.ts`

The `TransportDetails` component renders the required eight fields for both vehicles and starships:

- `src/components/TransportDetails/TransportDetails.tsx`

It uses a shared field list:

```ts
const requiredFields = [
  { label: "Name", key: "name" },
  { label: "Model", key: "model" },
  { label: "Manufacturer", key: "manufacturer" },
  { label: "Cost in Credits", key: "cost_in_credits" },
  { label: "Length", key: "length" },
  { label: "Crew", key: "crew" },
  { label: "Passengers", key: "passengers" },
  { label: "Cargo Capacity", key: "cargo_capacity" },
]
```

The same component is reused in:

- `src/app/(explorer)/vehicles/[item]/page.tsx`
- `src/app/(explorer)/starships/[item]/page.tsx`

## 6. Most recently searched category

> The user should be able to view their most recently searched category.

The current implementation stores and displays the most recently viewed category route. That is the category the user last visited in the explorer UI.

Relevant files:

- `src/components/ExplorerStateSync/ExplorerStateSync.tsx`
- `src/components/RecentCategory/RecentCategory.tsx`
- `src/lib/explorerStorage.ts`

`ExplorerStateSync` runs on route changes and calls `setRecentCategory(category)`. The homepage then reads that stored value through `RecentCategory` and shows a link back to the category.

This is slightly narrower than a true “recently searched category history,” but it satisfies the requirement in the current UX by surfacing the user’s last active category.

## 7. Retain search and sort state when switching categories

> The user should retain their previous search and sort state when switching between categories.

`ExplorerStateSync` stores per-category `search` and `sort` values in `localStorage`:

```ts
setStoredCategoryState(category, {
  search,
  sort,
});
```

When the user returns to a category route without explicit query params, the component restores the saved state into the URL:

```ts
if (shouldAttemptRestore) {
  if (storedState?.search) {
    nextParams.set("search", storedState.search);
  }

  if (storedState?.sort) {
    nextParams.set("sort", storedState.sort);
  }

  router.replace(queryString ? `${pathname}?${queryString}` : pathname);
}
```

Relevant files:

- `src/components/ExplorerStateSync/ExplorerStateSync.tsx`
- `src/lib/explorerStorage.ts`

Because the restored state is written back into the URL, the server-rendered list page responds with the correct filtered and sorted data immediately.

## 8. WCAG 2.2 Level A/AA accessibility

> The solution should meet basic WCAG 2.2 Level A/AA expectations.

The implementation includes practical accessibility basics across semantics, focus behavior, form labeling, and live region feedback.

Examples:

- skip link in `src/app/layout.tsx`
- `id="main-content"` targets in the main layout files
- `role="alert"` in `src/components/ErrorState/ErrorState.tsx`
- `role="status"`, `aria-live`, and `aria-busy` in `src/components/LoadingState/LoadingState.tsx`
- `aria-current="page"` and `aria-label="Category navigation"` in `src/components/AppHeader/AppHeaderNav.tsx`
- explicit `<label htmlFor>` pairs in `src/components/Search/Search.tsx` and `src/components/SortSelect/SortSelect.tsx`
- visible focus styles and focus token definitions in `src/app/globals.css`

A fuller inventory of explicit ARIA and related accessibility attributes is documented in:

- `docs/ACCESSIBILITY-NOTES.md`

## 9. Clear loading state while data is fetching

> The user should see a clear loading state while data is being fetched.

The explorer route group includes a `loading.tsx` file:

- `src/app/(explorer)/loading.tsx`

Next.js App Router uses that file automatically while the server component tree is waiting for data. The file renders `LoadingState`:

```tsx
export default function Loading() {
  return <LoadingState label="Loading category..." />
}
```

`LoadingState` uses a visible spinner plus accessible status text:

- `src/components/LoadingState/LoadingState.tsx`

## 10. Styled using CSS Modules

> The solution should be styled using CSS modules.

The app uses CSS Modules throughout the component and route structure:

- `src/components/AppHeader/AppHeader.module.css`
- `src/components/CategoryList/CategoryList.module.css`
- `src/components/TransportDetails/TransportDetails.module.css`
- `src/app/(explorer)/people/[item]/page.module.css`

Each component or page owns its local stylesheet, while global concerns such as CSS variables, base resets, and focus styles live in:

- `src/app/globals.css`

This keeps styling scoped and predictable while still allowing shared design tokens to live at the app level.
