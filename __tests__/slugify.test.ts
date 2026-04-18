import { slugify } from "../src/utils/wizard"

describe("slugify", () => {
  it("converts a name to a URL-friendly slug", () => {
    expect(slugify("Luke Skywalker")).toBe("luke-skywalker")
    expect(slugify("C-3PO")).toBe("c-3po")
    expect(slugify("Obi-Wan Kenobi")).toBe("obi-wan-kenobi")
  })
})
