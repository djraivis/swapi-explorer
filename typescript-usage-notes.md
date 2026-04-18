# TypeScript Usage in the SWAPI Explorer Project

## Overview

This project is built with TypeScript, which provides static typing and improved developer experience for React and Next.js applications. TypeScript is used throughout the codebase for type safety, autocompletion, and documentation.

---

## 1. TypeScript Project Setup

- The project includes a `tsconfig.json` file, which configures TypeScript options.
- Source files use `.ts` and `.tsx` extensions for TypeScript and TypeScript with JSX, respectively.

---

## 2. Type Definitions

- Custom types are defined in `src/lib/types.ts`:
  - `SwapiCategory`: Union type for all supported SWAPI categories.
  - `SwapiListItem`: Base type for SWAPI items (with `url`, `name`, `title`).
  - Specialized types for people, planets, films, species, starships, vehicles, etc.
  - `SortOrder`: Union type for sort direction ("asc" | "desc").

---

## 3. Generics

- Functions like `findCategoryItemBySlug<T>` and `fetchCategoryItems<T>` use TypeScript generics to work with any SWAPI item type while preserving type safety.
- Example:

```ts
export async function findCategoryItemBySlug<T extends SwapiListItem>(
  category: SwapiCategory,
  itemSlug: string,
): Promise<T | undefined> {
  /* ... */
}
```

---

## 4. Component Props

- React components use TypeScript interfaces or types for their props.
- Example from `CategoryList.tsx`:

```ts
type CategoryListProps = {
  category: SwapiCategory
  items: SwapiListItem[]
  totalCount: number
  emptyTitle?: string
  emptyMessage?: string
}
```

- This ensures that components receive the correct data shapes and helps catch errors at compile time.

---

## 5. Type Imports

- Types are imported where needed, e.g.:

```ts
import type { SwapiCategory, SwapiListItem } from "@/lib/types"
```

- Using `import type` helps with tree-shaking and clarity.

---

## 6. Type Inference and Safety

- TypeScript infers types for variables, function returns, and component props, reducing the need for manual type annotations.
- Type safety helps prevent runtime errors and improves code maintainability.

---

## 7. Next.js and TypeScript

- Next.js supports TypeScript out of the box.
- Files like `layout.tsx`, `page.tsx`, and API utilities are all written in TypeScript.
- TypeScript types are used for Next.js-specific props (e.g., `params`, `searchParams`).

---

## 8. Benefits

- Early error detection during development.
- Better autocompletion and documentation in editors.
- Safer refactoring and easier onboarding for new developers.

---

TypeScript is a core part of this project’s structure and quality, ensuring robust, maintainable, and scalable code.
