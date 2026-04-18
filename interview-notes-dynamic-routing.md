# Next.js SWAPI Explorer: Dynamic Routing with Slugs – Interview Notes

## Overview
This app uses Next.js App Router to explore Star Wars API (SWAPI) data. It implements dynamic routing for detail pages using slugs generated from item names/titles, rather than numeric IDs.

---

## 1. Category Listing
- Categories (people, planets, films, etc.) are hardcoded in SWAPI_CATEGORIES.
- Components like navigation and 404 pages map over this array to render category links.
- No API fetch is needed for the category list; it is static.

---

## 2. List Pages
- Each category page (e.g., /people) fetches all items for that category using `fetchCategoryItems`.
- Items are displayed in a list. For each item:
  - The display label is `item.name ?? item.title ?? "Unknown"`.
  - A slug is generated from the label using the `slugify` utility (e.g., "Luke Skywalker" → "luke-skywalker").
  - The link to the detail page uses this slug: `/people/luke-skywalker`.

---

## 3. Slug Generation
- The `slugify` function converts a name/title to a URL-friendly string:
  - Lowercases, trims, removes special characters, replaces spaces with dashes.
- This ensures the URL is readable and consistent.

---

## 4. Detail Pages (Dynamic Routing)
- Each detail page is a dynamic route: `/[category]/[item]`.
- When a user visits a detail page (e.g., `/people/luke-skywalker`):
  1. The app fetches all items for that category.
  2. For each item, it generates a slug from the name/title.
  3. It compares the generated slug to the slug from the URL.
  4. When a match is found, it displays that item's details.
- This is implemented in `findCategoryItemBySlug`:
```ts
export async function findCategoryItemBySlug<T extends SwapiListItem>(category: SwapiCategory, itemSlug: string) {
  const items = await fetchCategoryItems<T>(category);
  return items.find(
    (item) => slugify(item.name ?? item.title ?? "") === itemSlug
  );
}
```

---

## 5. Why Not Use Numeric IDs?
- SWAPI does not provide a direct `id` field, but each item has a unique URL (e.g., `https://swapi.dev/api/people/1/`).
- The current implementation uses slugs for routing, not numeric IDs.
- This works, but is less robust than using a numeric ID, because names/titles may not be unique or stable.

---

## 6. TypeScript Generics
- Functions like `findCategoryItemBySlug<T>` use generics so they can work with any SWAPI item type (person, planet, etc.) while preserving type safety.

---

## 7. Summary of the Flow
1. User visits a list page (e.g., `/people`).
2. The app fetches all people and renders links using slugified names.
3. User clicks a link (e.g., `/people/luke-skywalker`).
4. The detail page fetches all people, generates slugs for each, and finds the one matching the URL slug.
5. The matching item's details are displayed.

---

## 8. Professional Note
- This approach is readable and works for small datasets, but for large datasets or where names are not unique, using a numeric ID from the API URL is more robust and efficient.

---

Feel free to use these notes to explain or discuss the app’s routing and data-fetching strategy in an interview!
