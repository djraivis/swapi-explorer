// Lists the SWAPI categories supported by the app.
export type SwapiCategory = "people" | "planets" | "films" | "species" | "starships" | "vehicles"

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
}
