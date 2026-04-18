# Optional Chaining (?.) and Nullish Coalescing (??) Usage in SWAPI Explorer

This document summarizes all usages of optional chaining (`?.`) and nullish coalescing (`??`) in the codebase, with code examples and explanations for interview preparation.

---

## 1. Fallback for Undefined or Null Values (src/lib/swapi.ts)

```ts
return items.find((item) => slugify(item.name ?? item.title ?? "") === itemSlug)
```

- **Usage:** Uses `??` to provide a fallback if `item.name` is null/undefined, then falls back to `item.title`, then to an empty string.

---

## 2. Sorting with Fallbacks (src/lib/swapi.ts)

```ts
const getValue = (item: T) => {
  if (category === "films") {
    return item.title ?? ""
  }
  return item.name ?? ""
}
```

- **Usage:** Uses `??` to ensure a string is always returned for sorting, even if `name` or `title` is missing.

---

## 3. Dynamic Item Labels (src/components/CategoryList/CategoryList.tsx)

```ts
const itemLabel = item.name ?? item.title ?? "Unknown"
```

- **Usage:** Uses `??` to display the first available value among `name`, `title`, or "Unknown".

---

## 4. Dynamic Route Example (src/examples/dynamic-routes/[category]/page.tsx)

```ts
<Link href={`/${category}/${slugify(item.name ? item.name : item.title || "")}`}>
  {item.name ? item.name : item.title}
</Link>
```

- **Usage:** Uses `||` and `? :` for fallback, but could be refactored to use `??` for clarity.

---

## 5. Detail Pages (src/app/(explorer)/\*/[item]/page.tsx)

```ts
<h1 className={styles.title}>{itemData.name ? itemData.name : itemData.title}</h1>
```

- **Usage:** Uses `? :` for fallback, but could be refactored to use `??` for clarity.

---

**Summary:**

- The nullish coalescing operator (`??`) is used to provide safe fallbacks for possibly undefined or null values, especially when rendering labels or sorting.
- Optional chaining (`?.`) is less common in this codebase, but is useful for safely accessing nested properties.
- These patterns are important for robust React/TypeScript code and are common interview topics.

Use this as a reference for interview questions about safe property access and fallback values in JavaScript/TypeScript.
