import { expect, type Page, test } from "@playwright/test"

type TransportScenario = {
  category: "vehicles" | "starships"
  heading: string
  path: string
  fields: Record<string, string>
}

const scenarios: TransportScenario[] = [
  {
    category: "vehicles",
    heading: "Sand Crawler",
    path: "/vehicles/sand-crawler",
    fields: {
      Name: "Sand Crawler",
      Model: "Digger Crawler",
      Manufacturer: "Corellia Mining Corporation",
      "Cost in Credits": "150,000",
      Length: "36.8",
      Crew: "46",
      Passengers: "30",
      "Cargo Capacity": "50,000",
    },
  },
  {
    category: "starships",
    heading: "Death Star",
    path: "/starships/death-star",
    fields: {
      Name: "Death Star",
      Model: "DS-1 Orbital Battle Station",
      Manufacturer: "Imperial Department of Military Research, Sienar Fleet Systems",
      "Cost in Credits": "1,000,000,000,000",
      Length: "120,000",
      Crew: "342,953",
      Passengers: "843,342",
      "Cargo Capacity": "1,000,000,000,000",
    },
  },
]

function escapeForRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

async function expectDetailField(page: Page, label: string, value: string) {
  const labelField = page
    .locator("dt", {
      hasText: new RegExp(`^${escapeForRegExp(label)}$`),
    })
    .first()

  await expect(labelField).toHaveText(label)
  await expect(labelField.locator("xpath=following-sibling::dd[1]")).toHaveText(value)
}

test.describe("Transportation detail pages", () => {
  for (const scenario of scenarios) {
    test(`${scenario.category} pages show the minimum transportation details`, async ({ page }) => {
      await page.goto(scenario.path)

      await expect(page.getByRole("heading", { level: 1, name: scenario.heading })).toBeVisible()

      for (const [label, value] of Object.entries(scenario.fields)) {
        await expectDetailField(page, label, value)
      }
    })
  }
})
