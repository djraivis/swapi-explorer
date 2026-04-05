# SWAPI Explorer

A small Next.js and TypeScript application for browsing, searching, and sorting Star Wars data from SWAPI.

## Current Status

Implemented so far:

- Next.js app scaffolded
- category selection
- full category fetching across all SWAPI pages
- results table rendering
- loading and error states
- client-side search
- client-side sorting
- category-specific table columns
- CSS Modules styling

Still to complete:

- persistence for recent category
- persistence for per-category search and sort state
- final accessibility pass
- final README/submission polish

## Acceptance Criteria Mapping

The application is being built to support:

- selecting any available SWAPI category
- searching within the selected category
- fetching all SWAPI pages internally so the full dataset is available
- sorting by `name` or `title`, depending on the category
- clear loading and error states
- required transportation fields for `vehicles` and `starships`
- remembering the most recently searched category
- preserving search and sort state per category
- basic WCAG 2.2 Level A/AA expectations
- styling with CSS Modules

## Development Checklist

Use this checklist to track progress against the implementation plan.

Completed:

- [x] Scaffold the Next.js app
- [x] Inspect the generated starter files
- [x] Remove the default starter/demo code and simplify the foundation
- [x] Create the main app shell
- [x] Add shared SWAPI types and constants
- [x] Add the SWAPI fetch helper
- [x] Add the first explorer controls UI
- [x] Wire category selection into state and fetch on change
- [x] Show loading, error, and loaded-count status
- [x] Render fetched data in a results table
- [x] Add client-side search filtering
- [x] Add client-side sorting
- [x] Persist recent category, search state, and sort state
- [x] Polish the reload behavior so the app restores saved state before fetching
- [x] Improve small UX wording, like the empty-state message and helper text

Remaining:

- [x] Final accessibility pass
- [ ] Final README and submission cleanup

## Accessibility Checklist

Use this checklist during the final WCAG 2.2 Level A/AA review.

| Area | What to check | Status |
| --- | --- | --- |
| Form labels | Category, search, and sort controls all have visible labels | [x] |
| Keyboard focus | Focus states are visible and easy to notice on all interactive elements | [x] |
| Loading state | A clear loading message is shown while data is being fetched | [x] |
| Error state | Error messages are visible and understandable | [x] |
| Status updates | Status text is announced in a live region where appropriate | [x] |
| Table semantics | Table uses semantic markup such as `table`, `thead`, `tbody`, and column headers | [x] |
| Empty state | Empty-state text is clear when no results match the current search | [x] |
| Color contrast | Text and controls remain readable with sufficient contrast | [x] |
| Responsive layout | Controls and table remain usable on smaller screens | [x] |
| Touch target size | Inputs and selects remain comfortably usable on touch devices | [x] |

## Keyboard and Screen Reader Audit

### Focusable Elements

- Category `<select>`
  - keyboard-focusable
  - should be reachable with `Tab`
  - should be read by screen readers

- Search `<input>`
  - keyboard-focusable
  - should be reachable with `Tab`
  - should be read by screen readers

- Sort `<select>`
  - keyboard-focusable
  - should be reachable with `Tab`
  - should be read by screen readers

### Not Focusable, But Readable

- Page title (`<h1>`)
  - not keyboard-focusable with `Tab`
  - should be readable by screen readers

- Subtitle paragraph
  - not keyboard-focusable with `Tab`
  - should be readable by screen readers

- Loading message
  - not keyboard-focusable
  - should be announced by screen readers

- Error message
  - not keyboard-focusable
  - should be announced by screen readers

- Table caption
  - not keyboard-focusable
  - should be readable by screen readers as table context

- Table headers and cells
  - not keyboard-focusable with `Tab`
  - should be readable through screen reader table navigation

- Empty-state message
  - not keyboard-focusable
  - should be readable by screen readers

- Hidden success announcement
  - not keyboard-focusable
  - should be announced by screen readers when results update

### Not Focusable and Not Intended to Be Read

- Decorative loading bar
  - not keyboard-focusable
  - marked as decorative and should not be announced

### Keyboard Order Checklist

- [x] `Tab` reaches Category
- [x] `Tab` reaches Search
- [x] `Tab` reaches Sort
- [x] Focus ring is visible on all three controls
- [x] Clicking each visible label focuses the matching control

### Screen Reader Checklist

- [x] Screen reader reads the page title
- [x] Screen reader reads the subtitle
- [x] Screen reader announces the loading state
- [x] Screen reader announces the error state
- [x] Screen reader reads the table caption
- [x] Screen reader can navigate table headers and cells
- [x] Screen reader announces the hidden success status when results update

Note:

- a full page refresh is announced very clearly by VoiceOver because the whole page reloads
- category-to-category loading updates happen inside the page and can be harder to hear when the response is very fast

## Approach

This solution is intentionally kept simple:

- a single-page app on `/`
- no detail pages
- no route-based search page
- no React context unless clearly needed
- no unnecessary custom hooks
- no UI pagination
- minimal file structure

The idea is to keep the app practical and interview-friendly rather than over-architected.

## Project Structure

```text
swapi-explorer/
├── public/
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ResultsTable.module.css
│   │   ├── ResultsTable.tsx
│   │   ├── SwapiExplorer.module.css
│   │   └── SwapiExplorer.tsx
│   └── lib/
│       ├── constants.ts
│       ├── swapi.ts
│       └── types.ts
├── .gitignore
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── yarn.lock
```

The `components` and `lib` folders are the planned target structure for the main app implementation.

## File Responsibilities

### `src/app`

Next.js App Router files.

- `layout.tsx`
  Root HTML layout and page metadata.
- `page.tsx`
  Entry point for `/` and a thin wrapper around the main explorer component.
- `globals.css`
  Global reset and base styles.

### `src/components`

UI components for the application.

- `SwapiExplorer.tsx`
  Main feature component containing category selection, search, sort, loading, error, and persistence logic.
- `SwapiExplorer.module.css`
  Styles for the main explorer layout and controls.
- `ResultsTable.tsx`
  Table component for rendering category results.
- `ResultsTable.module.css`
  Styles for the results table.

### `src/lib`

Shared logic and app definitions.

- `constants.ts`
  Static values such as categories, labels, sort options, and storage keys.
- `swapi.ts`
  SWAPI fetch helpers that will fetch and combine all paginated results for a selected category.
- `types.ts`
  Shared TypeScript types for component props, state, and SWAPI data.

## Category Selection

Category selection is implemented with a simple `<select>` control on the main
page.

How it works:

- the app renders all supported SWAPI categories in a dropdown
- the selected value is stored in React state
- when the selected category changes, the app triggers a new data fetch for that category

Why this approach was chosen:

- it satisfies the requirement to browse all categories
- it keeps the UI simple and easy to explain
- it works naturally with a single-page app

## Full Dataset Fetching

The app fetches the full dataset for the selected category, not just the first
page.

How it works:

- the app requests the first SWAPI page for the selected category
- if the response contains a `next` URL, the app keeps requesting the next page
- results from every page are combined into one array
- the combined array is returned to the page component

Why this approach was chosen:

- it satisfies the requirement to show the full category dataset
- it avoids adding UI pagination
- it keeps the API logic contained in one helper file

## Results Table

Loaded data is shown in a simple semantic table.

How it works:

- once the selected category has finished loading, the page renders the results table
- the table chooses its columns based on the current category
- the transport categories use the specific fields required by the brief
- films use `title`, while the other categories mainly use `name`-based records

Current category mappings:

- `people`
  - `Name`
  - `Height`
  - `Mass`
  - `Gender`
  - `Birth Year`

- `planets`
  - `Name`
  - `Climate`
  - `Terrain`
  - `Population`

- `species`
  - `Name`
  - `Classification`
  - `Language`
  - `Average Lifespan`

- `films`
  - `Title`
  - `Director`
  - `Producer`
  - `Release Date`

- `starships`
  - `Name`
  - `Model`
  - `Manufacturer`
  - `Cost in Credits`
  - `Length`
  - `Crew`
  - `Passengers`
  - `Cargo Capacity`

- `vehicles`
  - `Name`
  - `Model`
  - `Manufacturer`
  - `Cost in Credits`
  - `Length`
  - `Crew`
  - `Passengers`
  - `Cargo Capacity`

Why this approach was chosen:

- it keeps the data easy to scan
- it allows category-specific fields without adding route complexity
- it directly supports the transportation requirement from the brief

## Loading and Error States

The page shows clear feedback while data is loading or when a request fails.

How it works:

- when a category fetch starts, the app shows a loading message
- if the request fails, the app clears the stale data and shows an inline error message
- if the request succeeds, the app shows how many results are currently being displayed

Why this approach was chosen:

- it satisfies the requirement for a clear loading state
- it gives the user feedback without adding extra screens or modals
- it keeps status handling close to the page state that controls it

## Search Behavior

Search is implemented as a simple client-side filter on the already fetched
category data.

How it works:

- when the user selects a category, the app fetches all pages for that category from SWAPI
- the full dataset for the selected category is stored in memory
- when the user types in the search input, the app filters the already loaded results in the browser
- no additional API request is made for each search input change

In this context, "in memory" means the fetched results are held in React state
while the page is open. They are not read from `localStorage`.

Search field by category:

- `films`
  - searched by `title`

- all other supported categories
  - searched by `name`

Why this approach was chosen:

- it satisfies the task requirement to search across all available categories
- it keeps the implementation simple and easy to explain
- it avoids unnecessary extra API calls
- it works well with the requirement to fetch the full dataset for each category

## Sorting Behavior

Sorting is implemented as a simple client-side sort on the already fetched
category data.

How it works:

- when the user selects a category, the app fetches the full dataset for that category from SWAPI
- the app filters the loaded results using the search input
- the filtered results are then sorted in the browser before being rendered
- no additional API request is made when the sort option changes

Sort field by category:

- `films`
  - sorted by `title`

- all other supported categories
  - sorted by `name`

Sort direction options:

- `A-Z`
- `Z-A`

In this context, sorting also happens in memory, which means the app sorts the
results already stored in React state while the page is open. It does not fetch
a new sorted list from the API.

Why this approach was chosen:

- it satisfies the task requirement to sort by `name` or `title`
- it keeps the implementation simple and easy to explain
- it avoids unnecessary extra API calls
- it works naturally with the existing client-side search flow

## Persistence Behavior

The app stores recent category and per-category view state in `localStorage`.

How it works:

- when the page loads, the app checks `localStorage` for the most recently selected category
- the app also checks for saved search and sort values for each category
- when the user switches categories, the app restores that category's saved search and sort values
- when the user changes category, search, or sort, the latest values are saved back to `localStorage`

What is persisted:

- the most recently selected category
- the search value for each category
- the sort order for each category

What is not persisted:

- the fetched SWAPI results themselves are not stored in `localStorage`
- fetched data only lives in React state while the page is open
- React state = what the app is using now
- `localStorage` = what the app remembers for later
- SWAPI data is always fetched again from the API after refresh

Reload behavior:

- on refresh, the app first restores the saved category and view state from `localStorage`
- only after that restore step does it fetch the selected category data
- this avoids an unnecessary initial fetch for the default category before the saved category is applied

Why this approach was chosen:

- it satisfies the requirement to remember the most recently searched category
- it satisfies the requirement to preserve search and sort state per category
- it keeps the implementation simple and browser-native
- it avoids adding context, custom hooks, or extra libraries

## Accessibility

The app is intended to cover basic WCAG 2.2 Level A/AA expectations through:

- semantic HTML
- labelled inputs
- visible focus states
- sufficient color contrast
- accessible table markup
- clear loading and error feedback

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

Start the production server:

```bash
yarn start
```

## AI Usage

AI was used during planning, implementation guidance, and review.

All code and decisions are being kept intentionally simple and manually reviewed so the final solution remains easy to understand and explain.

## Submission

Public repository:

- Add GitHub repository URL here

Public deployment:

- Add deployed URL here if available
