# SWAPI Explorer

A small Next.js and TypeScript application for browsing, searching, and sorting Star Wars data from SWAPI.

## Implemented Features

- category selection across all supported SWAPI categories
- full dataset fetching across all SWAPI pages
- semantic results table with category-specific columns
- client-side search filtering
- client-side sorting by `name` or `title`
- clear loading and error states
- localStorage persistence for recent category, search, and sort state
- CSS Modules styling
- optional decorative Vanta Globe background, isolated from the core explorer logic
- accessibility review with keyboard and screen reader checks

## Acceptance Criteria Mapping

The application supports:

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

## Implementation History

The project was built step by step in small commits:

1. `73d7add` Initial project setup
2. `2c37b6d` Create main app shell
3. `9d586cf` Add shared SWAPI types and constants
4. `2d89f4a` Add SWAPI fetch helper
5. `728a576` Add explorer controls
6. `86e773c` Add data fetching and status states
7. `a9e42a3` Render SWAPI results table
8. `a25bc7f` Add client-side search filtering
9. `d17847b` Add client-side sorting
10. `369ee2d` Persist category search and sort state
11. `e47bdd0` Fix reload state restore and polish UI text
12. `a3fba21` Polish accessibility and UI details

## Accessibility Checklist

Use this checklist during the final WCAG 2.2 Level A/AA review.

| Area              | What to check                                                                    | Status |
| ----------------- | -------------------------------------------------------------------------------- | ------ |
| Form labels       | Category, search, and sort controls all have visible labels                      | [x]    |
| Keyboard focus    | Focus states are visible and easy to notice on all interactive elements          | [x]    |
| Loading state     | A clear loading message is shown while data is being fetched                     | [x]    |
| Error state       | Error messages are visible and understandable                                    | [x]    |
| Status updates    | Status text is announced in a live region where appropriate                      | [x]    |
| Table semantics   | Table uses semantic markup such as `table`, `thead`, `tbody`, and column headers | [x]    |
| Empty state       | Empty-state text is clear when no results match the current search               | [x]    |
| Color contrast    | Text and controls remain readable with sufficient contrast                       | [x]    |
| Responsive layout | Controls and table remain usable on smaller screens                              | [x]    |
| Touch target size | Inputs and selects remain comfortably usable on touch devices                    | [x]    |

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

Notes:

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
│   │   ├── SwapiExplorer.tsx
│   │   ├── VantaGlobeBackground.module.css
│   │   └── VantaGlobeBackground.tsx
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

The `components` and `lib` folders hold the main application UI and shared logic.

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
- `VantaGlobeBackground.tsx`
  Optional decorative background component that keeps the Vanta setup outside the main explorer logic.
- `VantaGlobeBackground.module.css`
  Masking and presentation styles for the decorative globe background.

## Optional Visual Enhancement

The app includes a small decorative Vanta Globe background effect.

Why it was added:

- the core task UI is intentionally simple and readable
- the globe gives the page a bit more visual character without changing the app flow
- the effect loosely supports the Star Wars theme by suggesting a planet or galactic map

Why it is isolated:

- it was not part of the acceptance criteria
- it should not affect how the main task logic is reviewed
- the implementation lives in its own component instead of being mixed into the main explorer logic

Implementation note:

- the globe is an optional visual layer only
- fetching, search, sorting, persistence, accessibility, and table rendering all remain in the main task-focused components

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
- when the request succeeds, the results table caption shows the visible and total result count

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

## Possible Next Steps

These are optional improvements beyond the current task requirements:

- resolve linked SWAPI resources into readable related data instead of only showing the current category row data
- use relationship data from the API to surface cross-category recommendations, for example:
  - films linked to a selected person
  - planets linked to a selected film
  - characters, species, vehicles, or starships linked to a selected film
- add a lightweight related-resources panel or drill-down view for exploring those API connections

## Optional Follow-Up Prototype

As a separate follow-up concept, I built a small standalone prototype to explore how SWAPI relationship data could be used to surface related resources and support drill-down navigation across categories.

This prototype is not part of the main submission and was not required by the acceptance criteria. I kept it separate on purpose as a focused exploration of what a good next step could look like.

The prototype is built with plain HTML, CSS, and JavaScript only. It demonstrates a simple flow:

- load a category
- browse a list of items
- select an item
- view its related linked resources
- continue exploring connected resources across categories

Example relationships shown in the prototype include:

- person -> films, vehicles, starships
- film -> planets, characters, species, vehicles, starships
- planet -> residents and films

I built this mainly to better understand how SWAPI resources relate to one another and to explore how that relationship data could support a future UI direction beyond the required scope.

If useful during the interview, this prototype can also serve as a discussion point for how the product could evolve further while keeping the main submission focused on the requested requirements.

Prototype repo: [https://github.com/djraivis/swapi-related-resources-prototype](https://github.com/djraivis/swapi-related-resources-prototype)
Prototype URL: [https://swapi-related-resources-prototype.netlify.app](https://swapi-related-resources-prototype.netlify.app)

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

- [GitHub](https://github.com/djraivis/swapi-explorer)

Public deployment:

- [Hosted App on Netlify](https://swapi-explorer-app.netlify.app/)
