# React Hooks Usage in the SWAPI Explorer Project

## Overview

This project uses several React and Next.js hooks to manage state, navigation, and side effects. Below is a list of hooks used, where they are applied, and details about the `key` attribute in list rendering.

---

## 1. List of Hooks Used

### React Hooks

- `useState` – For local component state (e.g., toggling UI, managing open/closed states).
- `useEffect` – For running side effects (e.g., fetching data, syncing state).

### Next.js Hooks

- `usePathname` – To get the current route path (used in navigation components).
- `useRouter` – For programmatic navigation and route changes.
- `useSearchParams` – To read and update query parameters in the URL.
- `useId` – For generating unique IDs for form elements (e.g., in select components).

---

## 2. How the `key` Attribute is Applied

- When rendering lists (e.g., mapping over items or categories), the `key` attribute is used to help React identify which items have changed, are added, or are removed.
- Example:

```tsx
<ul>
  {items.map((item) => (
    <li key={item.url}>{item.name}</li>
  ))}
</ul>
```

- The `key` should be a unique and stable value for each item (e.g., `item.url` from the API).
- Using array indices as keys is discouraged unless the list is static and never changes.

---

## 3. Best Practices for Hooks

- Only call hooks at the top level of React function components or custom hooks.
- Do not call hooks inside loops, conditions, or nested functions.
- Use the appropriate hook for the job (e.g., `useEffect` for side effects, `useState` for local state).
- For Next.js navigation and URL management, prefer Next.js hooks (`useRouter`, `usePathname`, `useSearchParams`).

---

## 4. Custom Hooks

- If you have custom hooks, they are typically named with a `use` prefix (e.g., `useMyCustomHook`).
- Review the codebase for any custom hooks and document their purpose and usage.

---

## 5. Summary

- Hooks are essential for managing state, effects, and navigation in React and Next.js apps.
- The `key` attribute is critical for efficient list rendering and should always be unique and stable.

---

Refer to this file for a quick overview of hooks and key usage in the project.
