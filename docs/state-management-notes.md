# State Management in the SWAPI Explorer Project

## Overview

This project primarily uses React's built-in state management (via hooks) for local UI state. There is no global state management library (like Redux or Zustand) in use; state is managed at the component level or via props.

---

## 1. Local State with useState

- Components use the `useState` hook to manage local state (e.g., toggling UI elements, tracking input values).
- Example:

```tsx
const [open, setOpen] = useState(false)
```

---

## 2. Derived State from Props

- Some components receive data via props and derive their state from those props.
- Example: List components receive `items` as a prop and render based on that data.

---

## 3. No Global State Library

- The project does not use Redux, MobX, Zustand, or other global state libraries.
- All state is either local to a component or passed down via props.

---

## 4. State in Next.js Pages

- For server components, state is managed by fetching data on the server and passing it as props to client components.
- For client components, state is managed with hooks like `useState` and `useEffect`.

---

## 5. Best Practices

- Keep state as local as possible.
- Lift state up only when necessary (e.g., when multiple components need to share data).
- Use props to pass data and callbacks between components.

---

This approach keeps the app simple, maintainable, and easy to reason about.
