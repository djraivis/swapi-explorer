# SWAPI Explorer

A Next.js and TypeScript app for browsing Star Wars data from SWAPI across all six main categories:

- `people`
- `planets`
- `films`
- `species`
- `starships`
- `vehicles`

The application uses the App Router, CSS Modules, category routes, and slug-based item detail pages.

## Feature Summary

- browse all six SWAPI categories
- search within the current category
- sort by `name` or `title`, depending on the category
- fetch the full paginated dataset for each category
- show result counts for the current filtered view against the full category total
- preserve recent category and per-category search/sort state
- show dedicated detail pages for every category
- show required transportation details for `vehicles` and `starships`
- show loading, error, empty, item-not-found, and not-found states
- include Jest component/unit coverage and Playwright end-to-end coverage
- run automated checks and browser tests in GitHub Actions

## Detail Page Coverage

- `people`: name, birth year, gender
- `planets`: name, climate, population
- `films`: title, episode, release date
- `species`: name, classification, language
- `vehicles`: name, model, manufacturer, cost in credits, length, crew, passengers, cargo capacity
- `starships`: name, model, manufacturer, cost in credits, length, crew, passengers, cargo capacity

## Acceptance Criteria Mapping

| Requirement                                                     | Status | Notes                                                                                     |
| --------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------- |
| Search via all available categories                             | Done   | Search is available on each category page.                                                |
| Full list of relevant data for the searched category            | Done   | SWAPI pagination is followed until `next` is `null`.                                      |
| Sort via name or title                                          | Done   | Films sort by `title`; other categories sort by `name`.                                   |
| Error message on invalid request / failed request               | Done   | Clear inline error state is shown when fetch fails.                                       |
| Transportation categories show required minimum fields          | Done   | `vehicles` and `starships` detail pages show the required fields.                         |
| View most recently searched category                            | Done   | The most recently viewed category is stored and shown on the homepage.                    |
| Retain previous search and sort state when switching categories | Done   | Search and sort are stored per category in `localStorage`.                                |
| Basic WCAG 2.2 Level A/AA expectations                          | Done   | Visible labels, visible focus, larger targets, clear states, semantic headings and links. |
| Clear loading state while data is being fetched                 | Done   | Route loading UI is provided.                                                             |
| Styled using CSS modules                                        | Done   | Component and route styles use CSS Modules.                                               |

## Route-Based Approach

I chose a route-based approach because the task required Next.js, where routing is a core strength. Each category has its own URL, and each item also has a dedicated detail route. This makes the app easier to navigate, revisit, and share, while also giving me a practical way to work with App Router concepts such as file-based routing, nested pages, layouts, and URL-driven state.

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

I added `localStorage` persistence so the app remembers the most recently viewed category, and also keeps search and sort state separately for each category. When the user comes back to a category page, that saved state is restored into the URL so the page shows the same filtered and sorted state as before.

## Slug-Based Detail Routes

For item detail routes, I used a slug-based URL approach so pages can have readable paths such as `/people/luke-skywalker`. One edge case with this approach is that some SWAPI values contain punctuation or special characters, for example `Yoda's species` or `TIE/LN starfighter`. To make those routes resolve reliably, I match the route slug against a slugified version of each item’s `name` or `title`, rather than trying to reconstruct the original string from the URL and search with that.

## Transportation Detail Fields

For the transportation categories, I added the required detail fields from the task brief on the `vehicles` and `starships` item pages. These pages show name, model, manufacturer, cost in credits, length, crew, passengers, and cargo capacity. I also extracted some of that repeated UI into reusable components to keep the code easier to read and maintain.

## Accessibility

I tried to keep the app aligned with basic WCAG 2.2 Level A and AA expectations. I added visible labels for form controls, visible keyboard focus states and larger interactive target areas.

A current inventory of explicit accessibility-related attributes and associations is documented in `docs/ACCESSIBILITY-NOTES.md`.

## Error, Empty, Loading, and Not-Found States

I added separate UI states for loading, error, empty results, and unknown routes so the app always gives clear feedback instead of failing silently. This helped make the app easier to use and easier to reason about while building.
This video demonstrates how the error message is displayed on screen when an API endpoint fails:

- [Error handling demo](https://cleanshot.com/share/h1LthRgv)

## Testing And CI

The project currently uses two testing layers:

- **Jest + Testing Library** for smaller unit and component tests
- **Playwright** for end-to-end browser coverage

The Playwright setup starts the app automatically and points the app at a local mock SWAPI route during test runs. This keeps E2E runs deterministic and avoids depending on the live `swapi.dev` API.

GitHub Actions is configured with two jobs:

- `checks`: install, type check, lint, Jest, and production build
- `e2e`: Playwright browser install, Playwright test run, and report artifact upload

The workflow runs on pushes to `main` and pull requests targeting `main`.

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   └── mock-swapi/
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
│   ├── CategoryIllustration/
│   ├── DetailBackLink/
│   ├── DetailField/
│   ├── DetailSummary/
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
__tests__/
├── AppHeaderNav.test.tsx
├── DetailField.test.tsx
├── TransportDetails.test.tsx
└── slugify.test.ts
e2e/
├── search-filter.spec.ts
├── transport-details.spec.ts
├── PLAYWRIGHT-NOTES.md
└── README.md
.github/
└── workflows/
    └── ci.yml
docs/
└── ACCESSIBILITY-NOTES.md
```

## Dynamic Routes Example

A separate dynamic-routing example is included under `src/examples/dynamic-routes/`.

It is not part of the live application route tree and does not affect the running app. I kept it as a learning/reference example to compare a dynamic route approach with the manually defined category routes used in the current implementation.

## Future Improvements

One of the next things I would like to improve is using more of the linked relationships provided by SWAPI. Many resources already reference each other through URLs, for example people are linked to films, homeworlds, vehicles, and starships. Building on those relationships would make the app feel more connected and would allow the detail pages to become richer and more useful.

## Prototype Exploration

To explore this further, I also prompted a small prototype using plain HTML, CSS, and JavaScript. I used it to experiment with alternative ways of presenting and navigating related resources.

It is not part of the main solution, but it helped shape possible interaction ideas.

- [Related resources prototype](https://swapi-related-resources-prototype.netlify.app)

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

Run Jest tests:

```bash
yarn test
```

Run Playwright E2E tests:

```bash
yarn test:e2e
```

Run Playwright in UI mode:

```bash
yarn test:e2e:ui
```

Open the Playwright HTML report:

```bash
yarn test:e2e:report
```

Create a production build:

```bash
yarn build
```

## AI Usage

AI was used during implementation support, code review, debugging, and documentation. I especially used it to help think through pagination, slug matching, sorting, persistence, and some accessibility improvements. I still reviewed the code manually and adjusted the implementation as I went.

## Submission

Public repository:

- [GitHub](https://github.com/djraivis/swapi-explorer)

Public deployment:

- [Hosted App on Netlify](https://swapi-explorer-app.netlify.app/)

Project notes / README:

- [Readable online README](https://community.inkdrop.app/6554c0e8425877ffa35ab037b8dd8014/vBpDOIwu)
