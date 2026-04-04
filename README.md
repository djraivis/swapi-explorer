# SWAPI Explorer

A small Next.js and TypeScript application for browsing, searching, and sorting Star Wars data from SWAPI.

## Current Status

The project foundation is already in place:

- Next.js app scaffolded
- TypeScript configured
- App Router enabled
- global styles simplified
- default starter content removed
- project structure planned

The core SWAPI functionality is the next implementation step.

## Planned Features

The application is intended to support:

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

## Accessibility

The app is intended to cover basic WCAG 2.2 Level A/AA expectations through:

- semantic HTML
- labelled inputs
- visible focus states
- sufficient color contrast
- accessible table markup
- clear loading and error feedback

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
