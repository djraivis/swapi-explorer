# SWAPI Explorer – Interview Cheat Sheet

## Project Overview

- **Stack:** Next.js (App Router), React, TypeScript, CSS Modules
- **Purpose:** Explore Star Wars API (SWAPI) data by category, with search, sort, and detail views
- **Key Features:**
  - Search and sort across all categories
  - Detail pages with dynamic routing (slug-based)
  - State retention for search/sort between categories
  - Error and loading states
  - Accessibility (WCAG 2.2 A/AA basics)
  - Styled with CSS Modules
  - CI/CD with GitHub Actions, deployed on Netlify

---

## Acceptance Criteria Checklist

- [x] Search via all categories
- [x] Full list of relevant data for each category
- [x] Sort by name/title
- [x] Error message for invalid requests
- [x] Transportation categories show: Name, Model, Manufacturer, Cost, Length, Crew, Passengers, Cargo
- [x] Recently searched category shown
- [x] Previous search/sort state retained
- [x] WCAG 2.2 Level A/AA basics
- [x] Clear loading state
- [x] CSS Modules for styling

---

## Key Technical Talking Points

- **Dynamic Routing:** Uses slugs from name/title for detail pages (no numeric IDs)
- **Array Methods:** Heavy use of map, filter, find, includes, sort
- **Conditional Logic:** Ternary, &&, ?? for rendering and fallbacks
- **State Management:** useState/useEffect for local state, no global state lib
- **Hooks:** useState, useEffect, useRouter, usePathname, useSearchParams
- **TypeScript:** Typed API responses, generics for data fetching, strict props
- **Testing:** Jest for unit/component, Playwright for E2E, CI runs all
- **Accessibility:** Semantic HTML, keyboard navigation, color contrast, ARIA basics
- **Error/Loading:** User feedback for errors, loading spinners
- **CI/Deployment:** GitHub Actions for validation, Netlify for hosting

---

## Common Interview Questions

- Why slugs for routing? (Readable, no numeric IDs in SWAPI)
- How do you handle state and URL params? (Hooks, Next.js navigation)
- How do you ensure accessibility? (Semantic HTML, ARIA, keyboard nav)
- How do you test? (Jest, Playwright, CI)
- Why mock SWAPI in Playwright? (Deterministic E2E runs, avoids third-party API flakiness)
- How do you handle errors/loading? (Dedicated UI states)
- How do you style components? (CSS Modules)
- How do you use TypeScript? (Types, generics, props)
- How do you fetch data? (SSR, client hooks, utility functions)

---

## Quick Code Patterns

- **map/filter/sort:** For list rendering and transformation
- **Ternary/&&/??:** For conditional rendering and fallbacks
- **Slugify:** For readable, unique URLs
- **useState/useEffect:** For local state and side effects
- **Error/Loading UI:** Always provide user feedback

---

**Tip:** Use this sheet to quickly recall project structure, technical decisions, and how you met the acceptance criteria. Good luck!
