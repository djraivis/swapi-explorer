# Logical AND (&&) Conditional Usage in SWAPI Explorer

This document summarizes all usages of the logical AND (`&&`) operator for conditional rendering and value selection in the codebase, with code examples and explanations for interview preparation.

---

## 1. Category Extraction (src/lib/explorerStorage.ts)

```ts
if (firstSegment && isSwapiCategory(firstSegment)) {
  return firstSegment
}
```

- **Usage:** Ensures both `firstSegment` exists and is a valid category before returning it.

---

## 2. Recent Category Retrieval (src/lib/explorerStorage.ts)

```ts
if (category && isSwapiCategory(category)) {
  return category
}
```

- **Usage:** Ensures both `category` exists and is valid before returning it from localStorage.

---

## 3. State Restoration Logic (src/components/ExplorerStateSync/ExplorerStateSync.tsx)

```ts
const shouldAttemptRestore =
  restoredPathRef.current !== pathname && !search && !sort && (storedState?.search || storedState?.sort)
```

- **Usage:** All conditions must be true to attempt restoring state from localStorage.

---

**Summary:**

- The logical AND (`&&`) operator is used for safe property access, type guards, and multi-condition checks before performing actions.
- This pattern is common in React/TypeScript for conditional rendering and logic flow.

Use this as a reference for interview questions about conditional rendering and short-circuit evaluation in JavaScript/TypeScript.
