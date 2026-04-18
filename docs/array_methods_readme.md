# Array Methods Used in the Project

This file highlights the main JavaScript array methods used in the project and explains what each one does in a practical way.

---

## `map()`

### What it does
`map()` goes through an array and returns a new array with each item transformed.

### Where we use it
We use `map()` when rendering lists in React, such as categories, items, cards, or related entities.

### Why it is useful
It helps us take raw data and turn it into UI elements.

### Example
```ts
const categoryNames = categories.map((category) => category.name)
```

In React:

```tsx
{categories.map((category) => (
  <CategoryCard key={category.id} category={category} />
))}
```

---

## `filter()`

### What it does
`filter()` goes through an array and returns a new array containing only the items that match a condition.

### Where we use it
We use `filter()` when we want to narrow down data, for example:
- showing only items from one category
- excluding empty values
- matching search results
- showing related items

### Why it is useful
It helps us display only the data we need.

### Example
```ts
const films = items.filter((item) => item.category === 'films')
```

---

## `find()`

### What it does
`find()` returns the first item in an array that matches a condition.

### Where we use it
We use `find()` when we need one specific item, such as:
- finding a selected category
- finding a single entity by id
- matching a route param to the correct item

### Why it is useful
It is perfect when only one result is needed.

### Example
```ts
const selectedFilm = films.find((film) => film.id === selectedId)
```

---

## `includes()`

### What it does
`includes()` checks whether an array or string contains a specific value and returns `true` or `false`.

### Where we use it
We use `includes()` when checking:
- whether a category is active
- whether a value exists in a list
- whether text contains a search term

### Why it is useful
It gives a quick way to check if something is present.

### Example
```ts
const isActive = activeCategories.includes('films')
```

For strings:

```ts
const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase())
```

---

## `some()`

### What it does
`some()` checks whether at least one item in an array matches a condition.

### Where we use it
We use `some()` when checking whether any item meets a rule, for example:
- whether any field is missing
- whether any related item is highlighted
- whether any result matches the current state

### Why it is useful
It is helpful for quick boolean checks.

### Example
```ts
const hasFavorites = items.some((item) => item.isFavorite)
```

---

## `every()`

### What it does
`every()` checks whether all items in an array match a condition.

### Where we use it
We use `every()` when we want to confirm that all items pass a rule.

### Why it is useful
It helps validate consistency across a whole array.

### Example
```ts
const allLoaded = images.every((image) => image.loaded)
```

---

## `forEach()`

### What it does
`forEach()` loops through an array and runs a function for each item, but it does not return a new array.

### Where we use it
We use `forEach()` when performing side effects, such as:
- logging values
- updating something outside the array
- running extra logic for each item

### Why it is useful
It is good when we want to do something with each item, without creating a new array.

### Example
```ts
items.forEach((item) => {
  console.log(item.name)
})
```

---

## `reduce()`

### What it does
`reduce()` turns an array into a single value, such as a total, grouped object, or combined result.

### Where we use it
We use `reduce()` when:
- counting items
- grouping data
- building lookup objects
- calculating totals

### Why it is useful
It is powerful for transforming data into a different final shape.

### Example
```ts
const total = numbers.reduce((sum, num) => sum + num, 0)
```

---

## `sort()`

### What it does
`sort()` reorders items in an array.

### Where we use it
We use `sort()` when displaying data in a specific order, such as:
- alphabetical titles
- chronological order
- ranking or priority

### Why it is useful
It helps present data in a cleaner and more logical way.

### Example
```ts
const sortedFilms = [...films].sort((a, b) => a.title.localeCompare(b.title))
```

---

## `slice()`

### What it does
`slice()` returns a shallow copy of part of an array.

### Where we use it
We use `slice()` when:
- limiting visible items
- showing only the first few results
- splitting data for layout purposes

### Why it is useful
It helps control how much data is shown.

### Example
```ts
const featuredItems = items.slice(0, 6)
```

---

## `flatMap()`

### What it does
`flatMap()` maps over an array and then flattens the result by one level.

### Where we use it
We use `flatMap()` when one item can produce multiple results and we want one combined array.

### Why it is useful
It combines transformation and flattening in one step.

### Example
```ts
const allLinks = sections.flatMap((section) => section.links)
```

---

## Summary

These array methods are important because they help us:

- render UI lists
- search and filter data
- find specific items
- check conditions
- sort results
- transform API data into usable structures

In a React and TypeScript project, methods like `map()`, `filter()`, `find()`, and `includes()` are especially common because they make the code cleaner, more readable, and easier to maintain.

---

## Suggested Project-Specific Follow-Up

To make this file even stronger, replace the generic examples above with the exact places from your project where each method is used. For example:

- where `map()` renders category cards
- where `find()` selects one item from route params
- where `filter()` narrows related entities
- where `includes()` checks active states or search matches

That way, the README becomes fully tailored to your app rather than just explaining the methods in theory.

