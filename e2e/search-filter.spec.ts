import { test, expect } from "@playwright/test"

// Sample E2E test for search filtering and homepage navigation

test.describe("SWAPI Explorer E2E", () => {
  test("Homepage navigation works", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/SWAPI Explorer/i)
    // Check for a visible category list or main heading
    await expect(page.getByRole("heading", { name: /explore/i })).toBeVisible()
  })

  test("Search filtering works", async ({ page }) => {
    // Go directly to the people category where the search bar is present
    await page.goto("/people")
    // Find the search input (by placeholder or label)
    const searchInput = page.getByPlaceholder("Search").or(page.getByRole("textbox", { name: /search/i }))
    await searchInput.fill("sky")
    // Wait for filtered results to appear (at least one Skywalker link is visible)
    const skywalkerLinks = page.getByRole("link", { name: /skywalker/i })
    await expect(skywalkerLinks.first()).toBeVisible()
    // Optionally, assert the number of results (adjust if needed)
    // await expect(skywalkerLinks).toHaveCount(3);
    // Optionally, check that unrelated results are not visible
    await expect(page.getByText(/tatooine/i)).not.toBeVisible()
  })
  test("Search with no results shows empty state", async ({ page }) => {
    await page.goto("/people")
    const searchInput = page.getByPlaceholder("Search").or(page.getByRole("textbox", { name: /search/i }))
    // Enter a random string that should not match any result
    await searchInput.fill("qwertyuiop")
    // Wait for the empty state message to appear
    await expect(page.getByRole("heading", { level: 2, name: /no people found/i })).toBeVisible()
    await expect(page.getByText(/no results matched the current search/i)).toBeVisible()
    await expect(page.getByText("Showing 0 out of 82 people.")).toBeVisible()
  })
})
