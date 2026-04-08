# SWAPI Explorer

A Next.js and TypeScript app for browsing Star Wars data from SWAPI across all six main categories:

- `people`
- `planets`
- `films`
- `species`
- `starships`
- `vehicles`

The application uses the App Router, CSS Modules, category routes, and slug-based item detail pages.

## Live Features

- browse all six SWAPI categories
- search within the current category
- sort by `name` or `title`, depending on the category
- fetch the full paginated dataset for each category
- show loading, error, empty, and not-found states
- preserve recent category and per-category search/sort state
- show required transportation details for `vehicles` and `starships`

## Acceptance Criteria Mapping

| Requirement                                                     | Status     | Notes                                                                                     |
| --------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------- |
| Search via all available categories                             | Done       | Search is available on each category page.                                                |
| Full list of relevant data for the searched category            | Done       | SWAPI pagination is followed until `next` is `null`.                                      |
| Sort via name or title                                          | Done       | Films sort by `title`; other categories sort by `name`.                                   |
| Error message on invalid request / failed request               | Done       | Clear inline error state is shown when fetch fails.                                       |
| Transportation categories show required minimum fields          | Done       | `vehicles` and `starships` detail pages show the required fields.                         |
| View most recently searched category                            | Done       | The most recently viewed category is stored and shown on the homepage.                    |
| Retain previous search and sort state when switching categories | Done       | Search and sort are stored per category in `localStorage`.                                |
| Basic WCAG 2.2 Level A/AA expectations                          | Basic pass | Visible labels, visible focus, larger targets, clear states, semantic headings and links. |
| Clear loading state while data is being fetched                 | Done       | Route loading UI is provided.                                                             |
| Styled using CSS modules                                        | Done       | Component and route styles use CSS Modules.                                               |

## Route-Based Approach

I decided to build this version as a route-based explorer using the Next.js App Router. Each category has its own route, such as `/people` or `/planets`, and each item has its own slug-based detail page, such as `/people/luke-skywalker`. I chose this approach mainly as a way to learn more about Next.js routing, layouts, and page structure in a practical way.

## Full Category Data

For the category pages, I updated the data fetching so the app does not stop at the first SWAPI response page. SWAPI returns list results in pages of 10 items, so I added a shared helper that keeps following the `next` link, collects all pages, and returns one full array to render. This means categories like planets now show the full dataset instead of only the first 10 results.

Example idea:

```ts
type SwapiListResponse<T> = {
  count: number
  next: string | null
  results: T[]
}

export async function fetchCategoryItems<T>(category: string) {
  const items: T[] = []
  let nextUrl: string | null = `https://swapi.dev/api/${category}/`

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
```

## Sorting

I added a reusable sort control that stores the selected sort option in the URL query string. The category pages read that value and sort the results before rendering, using `title` for films and `name` for the other categories.

## Recent Category and Per-Category State

I added `localStorage` persistence so the app remembers the most recently viewed category, and also keeps search and sort state separately for each category. When the user comes back to a category page, that saved state is restored into the URL so the page shows the same filtered and sorted view as before.

## Slug-Based Detail Routes

For item detail routes, I used a slug-based URL approach so pages can have readable paths such as `/people/luke-skywalker`. One edge case with this approach is that some SWAPI values contain punctuation or special characters, for example `Yoda's species` or `TIE/LN starfighter`. To make those routes resolve reliably, I match the route slug against a slugified version of each item’s `name` or `title`, rather than trying to reconstruct the original string from the URL and search with that.

## Transportation Detail Fields

For the transportation categories, I added the required detail fields from the task brief on the `vehicles` and `starships` item pages. These pages show name, model, manufacturer, cost in credits, length, crew, passengers, and cargo capacity. I also extracted some of that repeated UI into reusable components to keep the code easier to read.

## Accessibility

I tried to keep the app aligned with basic WCAG 2.2 Level A and AA expectations. I added visible labels for form controls, visible keyboard focus states, larger interactive target areas, and clear loading, error, empty, and not-found states. I also kept the structure fairly simple so the pages are easier to navigate and understand.

## Error, Empty, Loading, and Not-Found States

I added separate UI states for loading, error, empty results, and unknown routes so the app always gives clear feedback instead of failing silently. This helped make the app easier to use and also easier to reason about while building.

## Project Structure

```text
src/
├── app/
│   ├── (explorer)/
│   │   ├── films/
│   │   ├── people/
│   │   ├── planets/
│   │   ├── species/
│   │   ├── starships/
│   │   ├── vehicles/
│   │   ├── layout.module.css
│   │   ├── layout.tsx
│   │   └── loading.tsx
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   ├── not-found.module.css
│   ├── not-found.tsx
│   ├── page.module.css
│   └── page.tsx
├── components/
│   ├── AppFooter/
│   ├── AppHeader/
│   ├── CategoryList/
│   ├── DetailBackLink/
│   ├── DetailField/
│   ├── EmptyState/
│   ├── ErrorState/
│   ├── ExplorerControls/
│   ├── ExplorerStateSync/
│   ├── HomeMain/
│   ├── LoadingState/
│   ├── NotFoundState/
│   ├── RecentCategory/
│   ├── Search/
│   ├── SortSelect/
│   └── TransportDetails/
├── examples/
│   └── dynamic-routes/
├── lib/
│   ├── constants.ts
│   ├── explorerStorage.ts
│   ├── swapi.ts
│   └── types.ts
└── utils/
    └── wizard.ts
```

## Dynamic Routes Example

A separate dynamic-routing example is included under `src/examples/dynamic-routes/`.

It is not part of the live application route tree and does not affect the running app. I kept it as a learning/reference example to compare a dynamic route approach with the manually defined category routes used in the current implementation.

## Getting Started

Install dependencies:

```bash
yarn
```

Start the development server:

```bash
yarn dev
```

Run linting:

```bash
yarn lint
```

Create a production build:

```bash
yarn build
```

## AI Usage

AI was used during implementation support, code review, debugging, and documentation. I especially used it to help think through pagination, slug matching, sorting, persistence, and some accessibility improvements. I still reviewed the code manually and adjusted the implementation as I went.

## Submission

Public repository:

- Add GitHub repository URL here

Public deployment:

- Add deployed URL here if available
