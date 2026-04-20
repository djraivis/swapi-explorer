# Technology Usage

## Overview

This document details how I used each technology in the SWAPI Explorer project, with specific examples and code snippets from my implementation.

---

## Frontend

### Next.js

- **How I used it:**
  - Used the App Router (`src/app/`) for all routing and page structure.
  - Implemented dynamic routes for categories and item detail pages (e.g., `/people/[item]/page.tsx`).
  - Used server components for data fetching and rendering, and client components for interactivity.
- **Example:**

```tsx
// src/app/(explorer)/people/page.tsx
export default async function PeopleItemPage({ searchParams }) {
  const data = await fetchCategoryItems("people")
  return <CategoryList category="people" items={data} />
}
```

- **Why:**
  - Enables file-based routing and SSR out of the box.
  - Makes it easy to build scalable, SEO-friendly apps.

---

### React

- **How I used it:**
  - Built all UI as functional components.
  - Used `useState` for local state (e.g., toggling UI, managing open/close states).
  - Used `useEffect` for side effects (e.g., syncing state, client-only logic).
  - Used Next.js navigation hooks (`usePathname`, `useRouter`, `useSearchParams`) for routing and URL management.
- **Example:**

```tsx
// src/components/SortSelect/SortSelect.tsx
const [currentValue, setCurrentValue] = useState("")
useEffect(() => {
  setCurrentValue(searchParams.get("sort") ?? "")
}, [searchParams])
```

- **Why:**
  - React’s component model and hooks make UI logic clear and maintainable.

---

### TypeScript

- **How I used it:**
  - Defined types for categories, items, and API responses in `src/lib/types.ts`.
  - Used generics for reusable data-fetching functions.
  - Typed all component props and API utilities for safety and autocompletion.
- **Example:**

```ts
// src/lib/types.ts
export const SWAPI_CATEGORIES = ["people", "planets", "films", "species", "starships", "vehicles"] as const
export type SwapiCategory = (typeof SWAPI_CATEGORIES)[number]
export type SwapiListItem = { url: string; name?: string; title?: string }
```

- **Why:**
  - TypeScript helps catch errors early and makes the codebase easier to refactor.

---

## State Management

- **How I used it:**
  - Managed local state with `useState` in client components (e.g., search, sort selection).
  - Passed state as props to child components.
  - Did not use any global state library.
- **Example:**

```tsx
// src/components/Search/Search.tsx
const [query, setQuery] = useState("")
```

- **Why:**
  - Keeping state local keeps the app simple and easy to debug.

---

## Data Fetching

- **How I used it:**
  - Fetched the list of categories from a static array (`SWAPI_CATEGORIES`).
  - Fetched items for each category using a utility function that handles SWAPI pagination.
  - Used server-side data fetching in async page components.
- **Examples:**

```ts
// src/lib/constants.ts
export const SWAPI_CATEGORIES = ["people", "planets", "films", "species", "starships", "vehicles"] as const

// src/lib/swapi.ts
export async function fetchCategoryItems<T extends SwapiListItem>(category: SwapiCategory) {
  // ...fetches all paginated items for a category
}
```

- **Why:**
  - Server-side fetching ensures fresh data and better SEO.

---

## Styling

### CSS Modules

- **How I used it:**
  - Styled all components with CSS Modules (e.g., `AppHeader.module.css`).
  - Scoped styles to each component to avoid conflicts.
- **Example:**

```css
/* src/components/AppHeader/AppHeader.module.css */
.nav {
  display: flex;
  gap: 1rem;
}
```

- **Why:**
  - CSS Modules keep styles modular and maintainable.

---

## CI/CD

### GitHub Actions

- **Status:** Configured for this project.
- **How I used it:**
  - Added a `checks` job for install, type checking, linting, Jest, and production build validation.
  - Added a separate `e2e` job for Playwright browser tests and artifact upload.
  - Kept CI focused on validation only; deployment is still handled separately by Netlify.
- **Why:**
  - Splitting the jobs makes failures easier to understand and keeps browser testing separate from faster code-quality checks.
- **Note:** The Playwright E2E flow uses local mock SWAPI data during test runs so CI does not depend on the live external API.

---

### Deployment

- **Platform:** Netlify
- **How I used it:**
  - Connected the GitHub repository to Netlify for automatic deploys on push.
  - Netlify handles build, hosting, and CDN.
- **Note:** No special Netlify configuration was needed beyond the default Next.js setup.

---

## Key Decisions

- Used **Next.js App Router** for modern routing and layouts.
- Used **slug-based dynamic routing** for item detail pages (e.g., `/people/luke-skywalker`).
- Used **server-side data fetching** for all main pages to ensure up-to-date data.
- Kept **state management local** to components for simplicity.
- Used **CSS Modules** for all styling to avoid global CSS issues.
- Deployed to **Netlify** for fast, reliable hosting.

---

## Learnings / Notes

- **What I built:**
  - A Star Wars API explorer with category browsing, search, and detail pages.
- **Main takeaways:**
  - Next.js App Router and server components make data fetching and routing much easier.
  - TypeScript and modular CSS improve code quality and maintainability.
- **What I learned:**
  - How to implement dynamic routing with slugs in Next.js.
  - How to structure a modern React/Next.js project for clarity and scalability.
- **What I am still learning:**
  - Advanced Next.js features (e.g., middleware, incremental static regeneration).
  - Optimizing performance for larger datasets and more complex UI.

---

## Summary

This project is a modern, type-safe, and maintainable SWAPI explorer built with Next.js, React, TypeScript, and CSS Modules. I focused on clear routing, robust data fetching, and modular UI. Deploying to Netlify made the process fast and reliable. The project reflects my current best practices and areas where I am still growing as a developer.
