# Array Methods Used in This Project

This project makes extensive use of modern JavaScript array methods for data transformation, filtering, and rendering in React. Here are the main methods used, with explanations and real code examples from the codebase.

---

## 1. `.map()`

**Purpose:** Creates a new array by applying a function to each element of the original array. Commonly used in React to render lists.

**Example:**

```js
const names = items.map((item) => item.name)
```

**In React JSX:**

```tsx
<ul>
  {items.map((item) => (
    <li key={item.url}>{item.name}</li>
  ))}
</ul>
```

**In this project:** Used in almost every list rendering, e.g. `CategoryList.tsx`, `DetailSummary.tsx`, `AppHeaderNav.tsx`.

---

## 2. `.filter()`

**Purpose:** Creates a new array with only the elements that pass a test (predicate function).

**Example:**

```js
const filtered = items.filter((item) => item.name !== "C-3PO")
```

**In this project:** Used to exclude certain items before mapping, e.g. in `CategoryList.tsx`:

```js
items.filter(item => item.name !== "C-3PO").map(...)
```

---

## 3. `.find()`

**Purpose:** Returns the first element in the array that satisfies the provided testing function, or `undefined` if none is found.

**Example:**

```js
const found = items.find((item) => item.id === 42)
```

**In this project:** Used to look up a single item by slug or property, e.g. in `swapi.ts`:

```js
items.find((item) => slugify(item.name ?? item.title ?? "") === itemSlug)
```

---

## 4. `.includes()`

**Purpose:** Checks if an array includes a certain value among its entries, returning true or false.

**Example:**

```js
const hasLuke = names.includes("Luke Skywalker")
```

**In this project:** Used to check if a value is in a list, e.g. in `types.ts`:

```js
SWAPI_CATEGORIES.includes(value as SwapiCategory)
```

---

## 5. `.sort()`

**Purpose:** Sorts the array in place according to a compare function.

**Example:**

```js
const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name))
```

**In this project:** Used to sort items alphabetically before mapping, e.g. in `CategoryList-mapping-ideas.md` and `swapi.ts`.

---

## 6. `.reduce()`

**Purpose:** Reduces the array to a single value (object, number, etc.) by applying a function to each item.

**Example:**

```js
const grouped = items.reduce((acc, item) => {
  const letter = item.name[0]
  acc[letter] = acc[letter] || []
  acc[letter].push(item)
  return acc
}, {})
```

**In this project:** Used for grouping items, e.g. in `CategoryList-mapping-ideas.md`.

---

## 7. `.push()`

**Purpose:** Adds one or more elements to the end of an array (mutates the array).

**Example:**

```js
items.push(...data.results)
```

**In this project:** Used to collect results from paginated fetches, e.g. in `swapi.ts`.

---

## 8. `.split()` and `.filter(Boolean)`

**Purpose:** `.split()` splits a string into an array. `.filter(Boolean)` removes falsy values (like empty strings) from the array.

**Example:**

```js
const pathSegments = pathname.split("/").filter(Boolean)
```

**In this project:** Used to process URL path segments, e.g. in `explorerStorage.ts` and `ExplorerStateSync.tsx`.

---

## 9. Chaining Methods

You can chain these methods for powerful data transformations:

```js
const result = items
  .filter((item) => item.active)
  .map((item) => item.name)
  .includes("Luke Skywalker")
```

---

## 10. Why Use These Methods?

- **Immutability:** They return new arrays, not mutating the original.
- **Clarity:** Code is concise and expressive.
- **React:** Essential for rendering dynamic lists.

---

For more examples, see the code in `src/components/CategoryList/CategoryList.tsx`, `src/lib/swapi.ts`, and the mapping ideas markdown file.
