# Playwright E2E Testing Notes

## Current Observations

- The Playwright E2E tests are set up to check homepage navigation and search filtering on the SWAPI Explorer app.
- When entering a random string in the search (e.g., `qwertyuiop`), the UI correctly displays the empty state ("No people found").
- When entering a partial match (e.g., `sky`), the UI should filter and show only matching results (e.g., Skywalkers). However, sometimes the UI does not update and still shows all items, even though the API returns only the correct matches.

## Debugging Steps

- Verified that the SWAPI API returns only the correct results for `/people/?search=sky`.
- The issue is likely due to the Next.js App Router not re-rendering the server component on search param change.
- A common fix is to add `export const dynamic = "force-dynamic";` to the relevant page (e.g., `/people/page.tsx`) to ensure dynamic rendering.

## Recommendations

- Ensure all category pages that depend on search params are rendered dynamically.
- Keep Playwright tests strict: check that only the expected results are visible after filtering.
- Use Playwright UI (`npx playwright test --ui`) to visually debug test runs and UI updates.

## Next Steps

- Add `export const dynamic = "force-dynamic";` to category pages if UI does not update on search.
- Expand Playwright tests to cover more edge cases and categories.
- Document any further issues or fixes in this file.
