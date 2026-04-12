# Acceptance Criteria — Implementation Notes

This document explains how each acceptance criterion was implemented in the SWAPI Explorer app. Each section links directly to the relevant source files on GitHub.

---

## Table of Contents

1. [Search across all available categories](#1-search-across-all-available-categories)
2. [Show the full list of results for a category](#2-show-the-full-list-of-results-for-a-category)
3. [Sort by name or title depending on the category](#3-sort-by-name-or-title-depending-on-the-category)
4. [Error message for invalid or failed requests](#4-error-message-for-invalid-or-failed-requests)
5. [Transport categories show the required 8 fields](#5-transport-categories-show-the-required-8-fields)
6. [Most recently viewed category](#6-most-recently-viewed-category)
7. [Retain search and sort state when switching categories](#7-retain-search-and-sort-state-when-switching-categories)
8. [Clear loading state while data is fetching](#8-clear-loading-state-while-data-is-fetching)
9. [WCAG 2.2 Level A/AA accessibility](#9-wcag-22-level-aa-accessibility)
10. [Architecture decisions summary (including CSS Modules)](#10-architecture-decisions-summary-including-css-modules)

---

## 1. Search across all available categories

> _The user should be able to search via all available categories (e.g. planets)._

**How it works:**

Every category page (`/films`, `/planets`, `/people`, etc.) renders an [`ExplorerControls`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ExplorerControls/ExplorerControls.tsx) bar containing a [`GlobalSearch`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/Search/Search.tsx) component.

When the user types, the component calls `router.replace()` to write the query into the URL as a `?search=` param, using `startTransition` so the UI stays responsive during the server re-fetch. Because the search term lives in the URL, sharing or refreshing the page preserves the search — there is no hidden client-only state.

The server-side page function reads `searchParams.search` and passes it to [`fetchCategoryItems`](https://github.com/djraivis/swapi-explorer/blob/main/src/lib/swapi.ts), which appends it to the SWAPI query string:

```ts
// src/lib/swapi.ts
const initialUrl = search
  ? `https://swapi.dev/api/${category}/?search=${encodeURIComponent(search)}`
  : `https://swapi.dev/api/${category}/`
```

<details>
<summary>Trade-off: URL-based search state improves shareability but adds routing complexity</summary>

Using URL query params makes search persistent on refresh and easy to share, but it requires tighter coordination between client input state and server-rendered pages.

</details>

**Key files:**

- [`src/components/Search/Search.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/Search/Search.tsx) — search input, URL sync
- [`src/components/ExplorerControls/ExplorerControls.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ExplorerControls/ExplorerControls.tsx) — composes search + sort controls
- [`src/lib/swapi.ts`](https://github.com/djraivis/swapi-explorer/blob/main/src/lib/swapi.ts) — passes search param to SWAPI API

---

## 2. Show the full list of results for a category

> _The user should see a full list of the relevant data for the searched category (e.g. 60 planets)._

**How it works:**

SWAPI paginates its API in pages of 10. [`fetchCategoryItems`](https://github.com/djraivis/swapi-explorer/blob/main/src/lib/swapi.ts) follows every `next` link until none remains, accumulating every item across all pages:

```ts
// src/lib/swapi.ts
while (nextUrl) {
  const data = await fetch(nextUrl).then((r) => r.json())
  items.push(...data.results)
  nextUrl = data.next
}
```

<details>
<summary>Trade-off: complete pagination gives accurate totals but can increase response time</summary>

Fetching every SWAPI page guarantees users see the full dataset, but it can take longer on larger categories compared with only loading the first page.

</details>

The complete array is then rendered in [`CategoryList`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/CategoryList/CategoryList.tsx) as a flat grid. The header shows a live count — `Showing {items.length} out of {totalCount}` — giving the user confirmation they are seeing the full set.

**Key files:**

- [`src/lib/swapi.ts`](https://github.com/djraivis/swapi-explorer/blob/main/src/lib/swapi.ts) — pagination loop (`fetchCategoryItems`)
- [`src/components/CategoryList/CategoryList.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/CategoryList/CategoryList.tsx) — renders the full item grid with count

---

## 3. Sort by name or title depending on the category

> _The user should have the option to sort via name or title (depending on the category)._

**How it works:**

A [`SortSelect`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/SortSelect/SortSelect.tsx) dropdown writes `?sort=asc` or `?sort=desc` into the URL. The sort label adapts based on the current route — films use "Title", all other categories use "Name":

```ts
// src/components/SortSelect/SortSelect.tsx
function getSortLabel(pathname: string) {
  return pathname.startsWith("/films") ? "Title" : "Name"
}
```

<details>
<summary>Trade-off: server-aligned sorting is consistent but updates are navigation-driven</summary>

Sorting through URL changes keeps behavior deterministic and shareable, but each sort change triggers a route update instead of instant purely client-side reordering.

</details>

Each category page reads the `sort` param from `searchParams` and passes it to `sortCategoryItems`, which runs server-side after the full item list is fetched.

**Key files:**

- [`src/components/SortSelect/SortSelect.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/SortSelect/SortSelect.tsx) — dropdown, URL sync, adaptive label
- [`src/lib/swapi.ts`](https://github.com/djraivis/swapi-explorer/blob/main/src/lib/swapi.ts) — `sortCategoryItems` function

---

## 4. Error message for invalid or failed requests

> _The user should receive an error message if an invalid request is made._

**How it works:**

Every fetch is wrapped in a `try/catch`. On failure the page returns an [`ErrorState`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ErrorState/ErrorState.tsx) component instead of the normal content:

```tsx
// src/app/(explorer)/starships/[item]/page.tsx
} catch {
  return (
    <ExplorerPageShell developerInfo={getDeveloperInfo()}>
      <ErrorState
        title="Unable to load starship"
        message="The API request failed. Please try again later."
      />
    </ExplorerPageShell>
  );
}
```

<details>
<summary>Trade-off: friendly generic errors are clear for users but less diagnostic</summary>

User-facing messages are intentionally simple and non-technical, but this means internal failure specifics are not surfaced directly in the UI.

</details>

`ErrorState` renders with `role="alert"` so screen readers announce the error immediately. The header and navigation stay visible so the user is never left stranded with no way forward.

**Key files:**

- [`src/components/ErrorState/ErrorState.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ErrorState/ErrorState.tsx) — reusable error UI with `role="alert"`
- [`src/app/(explorer)/people/page.tsx`](<https://github.com/djraivis/swapi-explorer/blob/main/src/app/(explorer)/people/page.tsx>) — example of error boundary pattern on a list page
- [`src/app/(explorer)/starships/[item]/page.tsx`](<https://github.com/djraivis/swapi-explorer/blob/main/src/app/(explorer)/starships/%5Bitem%5D/page.tsx>) — example of error boundary pattern on a detail page

---

## 5. Transport categories show the required 8 fields

> _For all transportation categories, the following data should be shown as a minimum: Name, Model, Manufacturer, Cost in credits, Length, Crew, Passengers, Cargo capacity._

**How it works:**

A shared [`TransportItem`](https://github.com/djraivis/swapi-explorer/blob/main/src/lib/types.ts) type models all transport-specific fields:

```ts
// src/lib/types.ts
export type TransportItem = SwapiListItem & {
  model?: string
  manufacturer?: string
  cost_in_credits?: string
  length?: string
  crew?: string
  passengers?: string
  cargo_capacity?: string
}
```

A dedicated [`TransportDetails`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/TransportDetails/TransportDetails.tsx) component renders all 8 required fields via [`DetailField`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/DetailField/DetailField.tsx), and is reused by both the starships and vehicles detail pages:

```tsx
// src/components/TransportDetails/TransportDetails.tsx
<DetailField label="Name" value={item.name} />
<DetailField label="Model" value={item.model} />
<DetailField label="Manufacturer" value={item.manufacturer} />
<DetailField label="Cost in Credits" value={item.cost_in_credits} />
<DetailField label="Length" value={item.length} />
<DetailField label="Crew" value={item.crew} />
<DetailField label="Passengers" value={item.passengers} />
<DetailField label="Cargo Capacity" value={item.cargo_capacity} />
```

<details>
<summary>Trade-off: shared transport UI improves consistency but reduces per-category tailoring</summary>

Reusing one component across vehicles and starships keeps implementation clean and consistent, though category-specific presentation nuances are minimized.

</details>

**Key files:**

- [`src/lib/types.ts`](https://github.com/djraivis/swapi-explorer/blob/main/src/lib/types.ts) — `TransportItem` type definition
- [`src/components/TransportDetails/TransportDetails.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/TransportDetails/TransportDetails.tsx) — renders all 8 required fields
- [`src/app/(explorer)/starships/[item]/page.tsx`](<https://github.com/djraivis/swapi-explorer/blob/main/src/app/(explorer)/starships/%5Bitem%5D/page.tsx>) — starships detail page
- [`src/app/(explorer)/vehicles/[item]/page.tsx`](<https://github.com/djraivis/swapi-explorer/blob/main/src/app/(explorer)/vehicles/%5Bitem%5D/page.tsx>) — vehicles detail page

---

## 6. Most recently viewed category

> _The user should be able to view their most recently searched category._

**How it works:**

[`ExplorerStateSync`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ExplorerStateSync/ExplorerStateSync.tsx) is a client component that renders nothing visible but runs on every route change. It calls `setRecentCategory(category)` whenever the pathname moves into a category route, storing the value in `localStorage`.

The home page renders [`RecentCategory`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/RecentCategory/RecentCategory.tsx), which reads from `localStorage` using `useSyncExternalStore` — a React hook that keeps the UI in sync with external storage updates and avoids SSR/hydration mismatches via a `getServerSnapshot` that always returns `null`:

```ts
// src/components/RecentCategory/RecentCategory.tsx
const recentCategory = useSyncExternalStore(
  subscribe, // listens for "storage" events
  getSnapshot, // browser: reads localStorage
  getServerSnapshot, // server: returns null to avoid mismatch
)
```

<details>
<summary>Trade-off: localStorage is lightweight but scoped to one browser/device</summary>

Recent-category state is fast and simple with localStorage, but it is not shared across devices or user accounts.

</details>

**Key files:**

- [`src/components/ExplorerStateSync/ExplorerStateSync.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ExplorerStateSync/ExplorerStateSync.tsx) — writes recent category on navigation
- [`src/components/RecentCategory/RecentCategory.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/RecentCategory/RecentCategory.tsx) — reads and displays the recent category link
- [`src/lib/explorerStorage.ts`](https://github.com/djraivis/swapi-explorer/blob/main/src/lib/explorerStorage.ts) — `getRecentCategory` / `setRecentCategory` helpers

---

## 7. Retain search and sort state when switching categories

> _The user should retain their previous search and sort state when switching between categories._

**How it works:**

[`ExplorerStateSync`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ExplorerStateSync/ExplorerStateSync.tsx) saves the current `search` and `sort` values for each category into a single `localStorage` key, keyed by category name:

```ts
// src/lib/explorerStorage.ts
type StoredCategoryState = Partial<
  Record<
    SwapiCategory,
    {
      search?: string
      sort?: SortOrder
    }
  >
>
```

When navigating back to a category that has no URL params but has stored state, `ExplorerStateSync` calls `router.replace()` to restore the previous search and sort into the URL:

```ts
// src/components/ExplorerStateSync/ExplorerStateSync.tsx
if (shouldAttemptRestore) {
  if (storedState?.search) nextParams.set("search", storedState.search)
  if (storedState?.sort) nextParams.set("sort", storedState.sort)
  router.replace(`${pathname}?${nextParams.toString()}`)
}
```

<details>
<summary>Trade-off: automatic state restore improves continuity but can surprise first-time viewers</summary>

Restoring prior search/sort reduces repetitive input for returning users, but a revisited category may not initially appear in its default unfiltered state.

</details>

Because the restored state is written into the URL, the server component immediately re-renders with the correct filtered and sorted data — no client-side filtering needed.

**Key files:**

- [`src/components/ExplorerStateSync/ExplorerStateSync.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ExplorerStateSync/ExplorerStateSync.tsx) — reads, writes, and restores per-category state
- [`src/lib/explorerStorage.ts`](https://github.com/djraivis/swapi-explorer/blob/main/src/lib/explorerStorage.ts) — `getStoredCategoryState` / `setStoredCategoryState` helpers

---

## 8. Clear loading state while data is fetching

> _The user should see a clear loading state while data is fetching._

**How it works:**

Next.js App Router uses a [`loading.tsx`](<https://github.com/djraivis/swapi-explorer/blob/main/src/app/(explorer)/loading.tsx>) file colocated with the explorer layout. While the server component awaits SWAPI data, Next.js automatically renders this file as a [Suspense](https://react.dev/reference/react/Suspense) boundary fallback — no manual wiring required.

```tsx
// src/app/(explorer)/loading.tsx
export default function Loading() {
  return <LoadingState label="Loading category..." />
}
```

[`LoadingState`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/LoadingState/LoadingState.tsx) uses the correct ARIA attributes so screen readers announce the loading status. The spinner element is `aria-hidden` (decorative) while the text label carries the accessible meaning:

```tsx
// src/components/LoadingState/LoadingState.tsx
<div role="status" aria-live="polite" aria-atomic="true" aria-busy="true">
  <div aria-hidden="true" className={styles.spinner} />
  <p className={styles.label}>{label}</p>
</div>
```

<details>
<summary>Trade-off: route-level loading is simple and reliable but less granular</summary>

Using App Router loading boundaries gives robust default behavior, though it does not provide fine-grained skeleton states for every subsection of the page.

</details>

**Key files:**

- [`src/app/(explorer)/loading.tsx`](<https://github.com/djraivis/swapi-explorer/blob/main/src/app/(explorer)/loading.tsx>) — Next.js Suspense boundary fallback
- [`src/components/LoadingState/LoadingState.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/LoadingState/LoadingState.tsx) — accessible spinner component

---

## 9. WCAG 2.2 Level A/AA accessibility

> _The solution should meet basic WCAG 2.2 Level A/AA expectations._

**How it was approached:**

| Area                | Implementation                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Semantic structure  | Every page uses `<h1>` for the primary heading; layout uses `<section>`, `<nav>`, `<main>`, `<header>`, `<footer>` throughout      |
| Skip link           | `<a href="#main-content">Skip to content</a>` present in every page shell, allowing keyboard users to bypass the header            |
| Keyboard navigation | All interactive elements are native `<a>`, `<button>`, `<input>`, `<select>` — no `<div onClick>` patterns                         |
| Focus indicators    | `outline-color: var(--focus-ring)` applied to all focusable elements across the stylesheet                                         |
| Form labels         | Search uses `<label htmlFor>` with explicit visible text; Sort uses `<label htmlFor>`; Nav uses `aria-label="Category navigation"` |
| Live regions        | Result count: `role="status" aria-live="polite" aria-atomic="true"`; Loading: `aria-busy="true"`; Errors: `role="alert"`           |
| Current page        | Active nav link receives `aria-current="page"`                                                                                     |
| Link text           | All item links use the item's name or title as visible text — no "click here" or ambiguous labels                                  |
| Colour contrast     | CSS custom properties use token-based colour pairs designed for sufficient contrast ratios                                         |

<details>
<summary>Trade-off: practical AA-focused accessibility coverage over exhaustive certification</summary>

The implementation targets strong day-to-day WCAG A/AA behavior in code and semantics, but a full compliance audit would still require dedicated tooling and formal testing workflows.

</details>

**Key files:**

- [`src/components/LoadingState/LoadingState.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/LoadingState/LoadingState.tsx) — `role="status"`, `aria-busy`, `aria-live`
- [`src/components/ErrorState/ErrorState.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ErrorState/ErrorState.tsx) — `role="alert"`
- [`src/components/CategoryList/CategoryList.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/CategoryList/CategoryList.tsx) — live result count, semantic list
- [`src/components/AppHeader/AppHeaderNav.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/AppHeader/AppHeaderNav.tsx) — `aria-label`, `aria-current="page"`
- [`src/components/Search/Search.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/Search/Search.tsx) — `role="search"`, visible label, `aria-label`
- [`src/app/globals.css`](https://github.com/djraivis/swapi-explorer/blob/main/src/app/globals.css) — focus ring and colour token definitions

**Further reading:**

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Next.js Accessibility docs](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#focus-management)
- [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

---

## 10. Architecture decisions summary (including CSS Modules)

> _Interview narrative page: why these implementation choices were made and what trade-offs were accepted._

### 10.1 URL-driven state over local component-only state

Search and sort live in the query string (`?search=...&sort=...`) so views are shareable, refresh-safe, and compatible with server-rendered data fetching.

- [`src/components/Search/Search.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/Search/Search.tsx) — writes search to URL
- [`src/components/SortSelect/SortSelect.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/SortSelect/SortSelect.tsx) — writes sort to URL
- [`src/components/ExplorerStateSync/ExplorerStateSync.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ExplorerStateSync/ExplorerStateSync.tsx) — restores per-category URL state

<details>
<summary>Trade-off: better UX continuity, but more coordination between router + server components</summary>

This approach improves reliability and shareability, but increases implementation complexity compared with purely local React state.

</details>

### 10.2 Shared reusable UI for consistency

Common state patterns are implemented once and reused: loading, error, empty, details fields, and transport details.

- [`src/components/LoadingState/LoadingState.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/LoadingState/LoadingState.tsx)
- [`src/components/ErrorState/ErrorState.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ErrorState/ErrorState.tsx)
- [`src/components/DetailField/DetailField.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/DetailField/DetailField.tsx)
- [`src/components/TransportDetails/TransportDetails.tsx`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/TransportDetails/TransportDetails.tsx)

<details>
<summary>Trade-off: consistent UX and lower maintenance, but less one-off page customization</summary>

Reusable components reduce duplication and bugs, but make custom per-page variations more deliberate and explicit.

</details>

### 10.3 CSS Modules strategy across the site

The app uses CSS Modules for component-level styling isolation and predictable class ownership.

How CSS Modules are used here:

1. Each component/page has its own scoped stylesheet (`*.module.css`) to avoid global selector collisions.
2. Layout-level styles are colocated with route files (for example explorer route wrappers and detail pages).
3. Reusable components own their visual tokens and structure (headers, panels, controls, cards) without leaking styles globally.
4. Global concerns (reset, theme variables, base typography/focus defaults) stay in [`src/app/globals.css`](https://github.com/djraivis/swapi-explorer/blob/main/src/app/globals.css).

Representative examples:

- [`src/components/CategoryList/CategoryList.module.css`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/CategoryList/CategoryList.module.css) — category list surface, grid, and responsive layout
- [`src/components/AppHeader/AppHeader.module.css`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/AppHeader/AppHeader.module.css) — sticky header/nav/toggle styling
- [`src/components/DeveloperInfoPanel/DeveloperInfoPanel.module.css`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/DeveloperInfoPanel/DeveloperInfoPanel.module.css) — dev panel look and disclosure styling
- [`src/app/(explorer)/people/[item]/page.module.css`](<https://github.com/djraivis/swapi-explorer/blob/main/src/app/(explorer)/people/%5Bitem%5D/page.module.css>) — detail page panel treatment

<details>
<summary>Trade-off: CSS Modules give strong encapsulation, but shared design patterns require deliberate duplication or extraction</summary>

Scoped styles make regressions less likely, though cross-component visual consistency needs intentional token reuse and periodic refactoring into shared primitives.

</details>

### 10.4 Why this architecture works well for interviews

It demonstrates practical full-stack thinking:

- Data correctness (full pagination + typed mapping)
- UX continuity (URL state + localStorage recovery)
- Accessibility fundamentals (semantic HTML + ARIA + keyboard/focus behavior)
- Maintainability (reusable components + CSS Modules boundaries)

This gives clear examples for discussing trade-offs, debugging approach, and how implementation decisions support product requirements.
