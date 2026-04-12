# Interview Reference — SWAPI Explorer

This document is a talk-track and concept guide for discussing the SWAPI Explorer project in an interview setting.

---

## Table of Contents

1. [Project overview — talk track](#1-project-overview--talk-track)
2. [TypeScript](#2-typescript)
3. [React](#3-react)
4. [Next.js](#4-nextjs)
5. [Routing](#5-routing)
6. [Client-side vs server-side rendering](#6-client-side-vs-server-side-rendering)
7. [State management](#7-state-management)
8. [Mapping data from APIs](#8-mapping-data-from-apis)
9. [Performance optimisation](#9-performance-optimisation)
10. [Accessibility (a11y)](#10-accessibility-a11y)
11. [CI/CD pipelines](#11-cicd-pipelines)

---

## 1. Project overview — talk track

I built a Star Wars data explorer using Next.js and TypeScript to demonstrate my approach to building maintainable, production-quality frontend applications.

The app fetches data from the SWAPI REST API across six categories — people, planets, films, species, starships, and vehicles. One of the first decisions I made was to use Next.js App Router with server components as the default. This means data fetching happens on the server, so the user receives fully rendered HTML rather than waiting for JavaScript to load and hydrate the page. I only drop to client components where genuinely necessary — for example, the search input and sort dropdown, which need to respond to user interaction.

For search and sort state, I deliberately stored everything in the URL as query parameters rather than in component state. This means the current search is preserved on page refresh, bookmarkable, and shareable. It also keeps the server and client in sync naturally, avoiding the common issue of UI state drifting out of step with the actual data.

SWAPI paginates its results in batches of ten, so I wrote a pagination loop that follows every `next` link until the full dataset is collected. This ensures users always see all results rather than a truncated first page.

I used TypeScript throughout. Having a shared type system across the data layer, components, and page functions means the compiler catches shape mismatches early, and it makes refactoring safer because the types encode the contracts between different parts of the codebase.

For styling I used CSS Modules, which gives component-level scope without a runtime cost. Global design tokens — colours, spacing, shadows — are defined once in a global stylesheet and consumed as CSS custom properties everywhere else, so the visual language stays consistent without duplicating values.

I also paid attention to accessibility. Error states render with `role="alert"` so screen readers announce failures immediately. Interactive controls have visible focus styles and appropriate ARIA labels. I followed WCAG 2.2 Level AA guidelines throughout.

Finally, I added a developer panel overlay that surfaces routing decisions, component trees, and raw API responses inline on the page. It is not part of the core product, but it reflects how I think about making technical decisions visible and the codebase approachable for others.

---

## 2. TypeScript

**What it is:**
TypeScript is a superset of JavaScript that adds static typing. You annotate variables, function parameters, and return values with types, and the compiler checks them before the code ever runs.

**Why it matters:**
It catches errors at development time rather than at runtime in front of a user. The bigger the codebase, the more valuable this becomes — refactoring a shared function is safe because any caller that breaks the new shape is flagged immediately.

**In this project:**
All SWAPI response shapes are defined as shared types in [`src/lib/types.ts`](https://github.com/djraivis/swapi-explorer/blob/main/src/lib/types.ts). Components, data-fetching functions, and page files all import from the same source of truth, so a field rename in one place surfaces every affected site across the codebase.

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

---

## 3. React

**What it is:**
React is a JavaScript library for building user interfaces. You compose the UI from components — self-contained functions that return markup and can hold their own state or receive data as props. React keeps the DOM in sync with the current state using a reconciliation process, updating only the parts of the page that actually changed.

**Why it matters:**
Splitting a UI into components makes each piece easier to test, reason about, and reuse. React's model makes the relationship between data and UI explicit — if the data changes, the UI updates deterministically.

**In this project:**
Each visual element is its own component — [`CategoryList`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/CategoryList/CategoryList.tsx), [`DetailField`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/DetailField/DetailField.tsx), [`ErrorState`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ErrorState/ErrorState.tsx), and so on. The transport details panel is shared between the starships and vehicles routes, so any change to it applies in both places at once.

---

## 4. Next.js

**What it is:**
Next.js is a React framework that adds server-side rendering, file-based routing, and production optimisations out of the box. The App Router (introduced in Next.js 13) makes React Server Components the default, so data fetching and rendering happen on the server unless you explicitly opt a component into client-side behaviour with `"use client"`.

**Why it matters:**
It solves two common problems: performance and SEO. Because the server sends fully rendered HTML, the user sees content faster and search engines can index it without executing JavaScript. Next.js also handles code splitting automatically, so users only download the JavaScript needed for the current page.

**In this project:**
Category and detail pages are server components. They `await` the SWAPI fetch directly in the page function body, so there is no loading spinner for the initial render — the page arrives with data already in place. Only interactive components (search input, sort dropdown, the panel visibility toggle) are wrapped in `"use client"`.

---

## 5. Routing

**What it is:**
Routing is how a web application maps a URL to a page or view. In traditional multi-page apps, every URL is a separate HTML file served by the server. In single-page apps, JavaScript intercepts navigation and swaps content without a full page reload.

**In Next.js:**
Routing is file-based. A file at `src/app/(explorer)/planets/page.tsx` automatically becomes the `/planets` route. Dynamic segments use folder names in square brackets — `[item]` — so `src/app/(explorer)/planets/[item]/page.tsx` matches `/planets/1`, `/planets/2`, and so on, with the segment value available as a prop.

**In this project:**
The six categories each have a list route (`/films`, `/people`, etc.) and a detail route (`/films/1`, `/people/5`, etc.), all created purely through folder structure with no router configuration needed.

```
src/app/(explorer)/
  films/
    page.tsx          → /films
    [item]/
      page.tsx        → /films/:id
  planets/
    page.tsx          → /planets
    [item]/
      page.tsx        → /planets/:id
```

---

## 6. Client-side vs server-side rendering

**What it is:**

- **Server-side rendering (SSR):** The server generates the full HTML for a page and sends it to the browser. The user sees content immediately; no JavaScript execution is needed before paint.
- **Client-side rendering (CSR):** The server sends a minimal HTML shell. JavaScript runs in the browser, fetches data, and builds the UI. The user sees a blank or loading page until this is complete.

**Why the distinction matters:**
SSR is better for initial load performance and SEO. CSR is better for highly interactive experiences that update frequently after the first load.

**In this project:**
Data pages use server-side rendering — SWAPI is fetched on the server and the HTML arrives fully populated. Interactive controls (search, sort, the developer panel toggle) use client-side React so they respond instantly to input without a round-trip to the server. This hybrid approach — server by default, client only where needed — is the core idea behind Next.js App Router.

---

## 7. State management

**What it is:**
State is data that changes over time and affects what the UI renders. Managing state means deciding where that data lives and how it flows through the application. Options range from React's built-in `useState` for local state, to the Context API for shared state across a tree, to external libraries like Redux or Zustand for larger-scale needs.

**In this project:**
Three different state strategies are used, each chosen for its scope:

| State                                   | Where it lives                      | Why                                         |
| --------------------------------------- | ----------------------------------- | ------------------------------------------- |
| Search query, sort order                | URL query params (`?search=&sort=`) | Shareable, bookmarkable, survives refresh   |
| Panel visibility (show/hide dev panels) | `localStorage` via React Context    | Persists across pages and sessions          |
| Most recently viewed category           | `localStorage`                      | Persists across sessions, read on home page |

Keeping search and sort in the URL avoids a common pitfall where component state and server-rendered data get out of sync. The URL is the single source of truth.

---

## 8. Mapping data from APIs

**What it is:**
Fetching data from an API returns a JavaScript object or array. Mapping means transforming that raw data into something the UI can render — typically using `.map()` to loop over an array and return a component for each item.

**In this project:**
[`fetchCategoryItems`](https://github.com/djraivis/swapi-explorer/blob/main/src/lib/swapi.ts) handles the full fetch-and-accumulate cycle, following pagination links until all items are collected. The result is passed to [`CategoryList`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/CategoryList/CategoryList.tsx), which maps each item to a card:

```ts
// src/lib/swapi.ts — accumulate all pages
while (nextUrl) {
  const data = await fetch(nextUrl).then((r) => r.json())
  items.push(...data.results)
  nextUrl = data.next
}
```

```tsx
// src/components/CategoryList/CategoryList.tsx — render each item
{
  items.map((item) => <CategoryListItem key={item.url} item={item} category={category} />)
}
```

---

## 9. Performance optimisation

**What it is:**
Performance optimisation is the practice of making an application load faster and respond more smoothly. Common techniques include:

- **Code splitting:** Only loading the JavaScript needed for the current page instead of everything at once.
- **Lazy loading:** Deferring the loading of components or images until they are actually needed (e.g. when they scroll into view).
- **Caching:** Reusing previously fetched data to avoid redundant network requests.
- **Server-side rendering:** Sending fully rendered HTML so the browser can paint content before any JavaScript runs.

**In this project:**
Next.js applies code splitting automatically per route — visiting `/planets` does not download the JavaScript for `/starships`. Server components handle data fetching at build/request time on the server, removing the need for client-side loading spinners on initial page visits. The Next.js `Image` component (if used) would also handle lazy loading and format optimisation, though the current app uses category illustrations rather than external images.

The biggest deliberate performance decision is the server-first architecture: because pages arrive pre-rendered, the user sees real content on first paint rather than a loading skeleton.

---

## 10. Accessibility (a11y)

**What it is:**
Accessibility means building applications that work for all users, including those using assistive technologies such as screen readers, keyboard-only navigation, or high-contrast displays. WCAG (Web Content Accessibility Guidelines) defines a set of criteria — Level A is the minimum baseline, Level AA is the standard target for most production applications.

**Key practices:**

- Semantic HTML (using `<nav>`, `<main>`, `<button>`, `<ul>` etc. for their intended purpose so screen readers understand the structure)
- ARIA roles and labels where native semantics are not sufficient
- Visible focus indicators for keyboard navigation
- Sufficient colour contrast ratios

**In this project:**

- [`ErrorState`](https://github.com/djraivis/swapi-explorer/blob/main/src/components/ErrorState/ErrorState.tsx) uses `role="alert"` so screen readers announce errors immediately without the user navigating to them
- The developer panel toggle uses `aria-pressed` to communicate its current state
- Navigation landmarks use `<nav>` with an `aria-label` to distinguish between multiple navigation regions on the same page
- Focus styles are preserved rather than removed, so keyboard users always have a visible indicator of where they are
- The app targets WCAG 2.2 Level AA throughout

---

## 11. CI/CD pipelines

**What it is:**
CI/CD stands for Continuous Integration and Continuous Deployment. A CI/CD pipeline is an automated sequence of steps that runs whenever code is pushed — typically: install dependencies, run linting, run tests, build the application, and deploy if everything passes.

**Why it matters:**
It eliminates the "works on my machine" problem. Every change is validated against the same automated checks before it reaches production, so bugs and regressions are caught early rather than after deployment.

**How it applies:**
Although this project does not have a CI/CD pipeline configured, the linting (`npm run lint`) and type-checking (`tsc --noEmit`) steps that would sit inside one are both set up and passing cleanly. Adding a GitHub Actions workflow would mean those checks run on every pull request automatically, preventing regressions from being merged.

A typical pipeline for a Next.js project looks like:

```yaml
# .github/workflows/ci.yml (example)
- run: npm ci
- run: npm run lint
- run: npx tsc --noEmit
- run: npm run build
```
