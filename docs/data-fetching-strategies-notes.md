# Data Fetching Strategies in the SWAPI Explorer Project

## Overview

This project uses all three major Next.js data fetching strategies: server-side rendering (SSR), client-side rendering (CSR), and static site generation (SSG), depending on the use case.

---

## 1. Server-Side Rendering (SSR)

- Most category and detail pages use SSR by default in the App Router.
- Data is fetched in async page components (e.g., `page.tsx` files in `src/app/(explorer)/[category]/page.tsx`).
- Example:

```tsx
export default async function PeopleItemPage({ searchParams }) {
  // Fetch data on the server
  const data = await fetchCategoryItems("people")
  return <CategoryList items={data} />
}
```

- SSR ensures fresh data on every request and is the default for async components in the App Router.

---

## 2. Client-Side Rendering (CSR)

- Some UI state and navigation is managed on the client using hooks like `useState`, `useEffect`, and Next.js navigation hooks.
- Example: Filtering, sorting, or UI toggles that do not require a server round-trip.
- Components that use these hooks are marked with `'use client'` at the top of the file.

---

## 3. Static Site Generation (SSG)

- SSG is not the primary strategy in this project, but could be used for pages that do not change often.
- In the App Router, SSG can be achieved by using `export const dynamic = 'force-static'` or similar options.
- Example:

```tsx
export const dynamic = "force-static"
```

- This would make the page statically generated at build time.

---

## 4. Summary

- SSR is the default for most data-fetching in the App Router.
- CSR is used for interactive UI and client-only state.
- SSG can be enabled for rarely-changing pages if needed.

---

Refer to this file for a quick overview of data fetching strategies in the project.
