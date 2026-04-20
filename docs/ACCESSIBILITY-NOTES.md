# Accessibility Notes

This document lists the explicit accessibility-related attributes and associations currently used in the application.

## ARIA Roles And Live Regions

- `role="alert"` on the error state in `src/components/ErrorState/ErrorState.tsx`
- `role="status"`, `aria-live="polite"`, `aria-atomic="true"` on the empty state in `src/components/EmptyState/EmptyState.tsx`
- `role="status"`, `aria-live="polite"`, `aria-atomic="true"` on the category result count in `src/components/CategoryList/CategoryList.tsx`
- `role="status"`, `aria-live="polite"`, `aria-atomic="true"`, `aria-busy="true"` on the loading state in `src/components/LoadingState/LoadingState.tsx`
- `role="search"` with a dynamic `aria-label` on the search wrapper in `src/components/Search/Search.tsx`

## Landmark And Navigation Labels

- `aria-label="Category navigation"` on the top navigation in `src/components/AppHeader/AppHeaderNav.tsx`
- `aria-current="page"` on the active category link in `src/components/AppHeader/AppHeaderNav.tsx`

## Labelled Regions

- `aria-labelledby="home-categories-heading"` on the home categories section in `src/components/HomeMain/HomeMain.tsx`
- `aria-labelledby="not-found-title"` on the not-found section in `src/components/NotFoundState/NotFoundState.tsx`

## Decorative Hidden Elements

- `aria-hidden="true"` on the category count divider in `src/components/CategoryList/CategoryList.tsx`
- `aria-hidden="true"` on the app brand icon in `src/components/AppHeader/AppHeader.tsx`
- `aria-hidden="true"` on the loading spinner in `src/components/LoadingState/LoadingState.tsx`
- `aria-hidden="true"` on decorative SVGs and illustration wrappers in `src/components/CategoryIllustration/CategoryIllustration.tsx`

## IDs And Focus Targets

- `id="main-content"` with `tabIndex={-1}` on the main content region in:
  - `src/app/(explorer)/layout.tsx`
  - `src/app/not-found.tsx`
  - `src/components/HomeMain/HomeMain.tsx`
- `id="home-categories-heading"` used by `aria-labelledby` in `src/components/HomeMain/HomeMain.tsx`
- `id="not-found-title"` used by `aria-labelledby` in `src/components/NotFoundState/NotFoundState.tsx`

## Form Label Associations

- Search input uses `useId()`, `id`, and `<label htmlFor={inputId}>` in `src/components/Search/Search.tsx`
- Sort select uses `useId()`, `id`, and `<label htmlFor={selectId}>` in `src/components/SortSelect/SortSelect.tsx`
- Search input also uses `enterKeyHint="search"` in `src/components/Search/Search.tsx`

## Attributes Not Currently Used

The current app code does not appear to use these ARIA patterns:

- `aria-describedby`
- `aria-controls`
- `aria-expanded`
- `aria-pressed`
- `aria-modal`
- `aria-invalid`
