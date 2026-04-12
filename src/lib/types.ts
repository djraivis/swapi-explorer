// Lists every SWAPI category supported by the app.
export const SWAPI_CATEGORIES = ["people", "planets", "films", "species", "starships", "vehicles"] as const

// Derives the SWAPI category union type from the shared category list.
export type SwapiCategory = (typeof SWAPI_CATEGORIES)[number]

// Checks whether a string matches one of the supported SWAPI categories.
export function isSwapiCategory(value: string): value is SwapiCategory {
  return SWAPI_CATEGORIES.includes(value as SwapiCategory)
}

export type SwapiListItem = {
  url: string
  name?: string
  title?: string
}

export type SortOrder = "asc" | "desc"

export type TransportItem = SwapiListItem & {
  model?: string
  manufacturer?: string
  cost_in_credits?: string
  length?: string
  crew?: string
  passengers?: string
  cargo_capacity?: string
  vehicle_class?: string
}

export type PersonItem = SwapiListItem & {
  birth_year?: string
  gender?: string
}

export type PlanetItem = SwapiListItem & {
  climate?: string
  population?: string
}

export type FilmItem = SwapiListItem & {
  episode_id?: number
  release_date?: string
}

export type SpeciesItem = SwapiListItem & {
  classification?: string
  language?: string
}
