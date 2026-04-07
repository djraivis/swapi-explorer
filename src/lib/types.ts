// Lists the SWAPI categories supported by the app.
export type SwapiCategory = "people" | "planets" | "films" | "species" | "starships" | "vehicles"

export type SwapiListItem = {
  url: string
  name?: string
  title?: string
}

// Represents the saved search state for one category.
export type CategoryViewState = {
  search: string
  sortOrder: "asc" | "desc"
}

// Stores saved view state for every supported category.
export type SavedCategoryState = Record<SwapiCategory, CategoryViewState>
