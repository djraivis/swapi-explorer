# Playwright E2E Testing Notes

## Current Observations

- The Playwright suite currently covers:
  - homepage navigation and search filtering
  - required transportation detail fields for `vehicles` and `starships`
- Playwright starts the Next.js app automatically through `playwright.config.ts`.
- During Playwright runs, the app uses `SWAPI_BASE_URL=http://127.0.0.1:3000/api/mock-swapi` so tests use local deterministic data instead of the live `swapi.dev` API.

## Debugging Steps

- If an E2E assertion fails, inspect:
  - the HTML report in `playwright-report/`
  - the per-run artifacts in `test-results/`
  - the mock API responses in `src/app/api/mock-swapi/[category]/route.ts`
- When debugging selectors, use Playwright UI with `npx playwright test --ui`.
- When debugging route-driven behavior, confirm the test is using the expected mock payload for the route being visited.

## Recommendations

- Keep Playwright tests focused on user-visible behavior rather than implementation details.
- Prefer deterministic mock data for E2E coverage so CI does not depend on external API uptime.
- Keep selectors strict and accessible, favoring headings, labels, links, and definitions over brittle CSS selectors.

## Next Steps

- Expand E2E coverage to additional detail pages and error scenarios.
- Add more accessibility-oriented browser assertions where useful.
- Keep this file aligned with the actual test suite and Playwright config as coverage grows.
