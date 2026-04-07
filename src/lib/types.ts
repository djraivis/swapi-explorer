// Lists the SWAPI categories supported by the app.
export type SwapiCategory = "people" | "planets" | "films" | "species" | "starships" | "vehicles"

export type SwapiListItem = {
  url: string
  name?: string
  title?: string
}
