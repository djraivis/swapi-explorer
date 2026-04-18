# Ternary Conditional Usage in SWAPI Explorer

This document summarizes all usages of the ternary conditional operator (`condition ? valueIfTrue : valueIfFalse`) in the codebase, with code examples and explanations for interview preparation.

---

## 1. API URL Construction (src/lib/swapi.ts)

```ts
const search = typeof options.search === "string" ? options.search.trim() : ""
const initialUrl = search
  ? `https://swapi.dev/api/${category}/?search=${encodeURIComponent(search)}`
  : `https://swapi.dev/api/${category}/`
```

- **Usage:** Builds the correct API URL depending on whether a search term is present.

---

## 2. Type Guards for Search/Sort (src/app/(explorer)/\*/page.tsx)

```ts
const search = typeof searchParam === "string" ? searchParam : undefined
const sort = sortParam === "asc" || sortParam === "desc" ? (sortParam as SortOrder) : undefined
```

- **Usage:** Ensures only valid string values are used for search/sort params.

---

## 3. Dynamic Labels (src/components/Search/Search.tsx)

```ts
const placeholder = category ? `Search ${CATEGORY_LABELS[category].toLowerCase()}` : "Search"
const searchRegionLabel = category ? `${CATEGORY_LABELS[category]} search` : "Category search"
```

- **Usage:** Sets input placeholder and region label based on current category.

---

## 4. Dynamic Sort Label (src/components/SortSelect/SortSelect.tsx)

```ts
return pathname.startsWith("/films") ? "Title" : "Name"
```

- **Usage:** Chooses the correct sort label for the current category route.

---

## 5. Dynamic Link Labels (src/examples/dynamic-routes/[category]/page.tsx)

```ts
<Link href={`/${category}/${slugify(item.name ? item.name : item.title || "")}`}>
  {item.name ? item.name : item.title}
</Link>
```

- **Usage:** Displays the correct label for each item, preferring `name` over `title`.

---

## 6. URL Query String Construction (src/components/Search/Search.tsx, src/components/SortSelect/SortSelect.tsx)

```ts
router.replace(queryString ? `${pathname}?${queryString}` : pathname)
```

- **Usage:** Navigates to the correct URL depending on whether there are query params.

---

## 7. Utility/Type Guards (src/components/ExplorerStateSync/ExplorerStateSync.tsx)

```ts
return searchValue ? searchValue : undefined
```

- **Usage:** Returns a value only if it is truthy, otherwise returns undefined.

---

## 8. API Fetch with Optional Search (src/examples/dynamic-routes/[category]/page.tsx)

```ts
const response = await fetch(`https://swapi.dev/api/${category}${search ? `?search=${search}` : ""}`)
```

- **Usage:** Appends the search query to the API URL only if a search term is present.

---

**Summary:**

- The ternary operator is used throughout the codebase for dynamic labels, type guards, URL construction, and conditional rendering.
- Understanding these patterns will help you answer interview questions about conditional logic and code readability in React/TypeScript projects.
