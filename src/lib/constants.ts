import type { SwapiCategory } from "./types";

// Lists every SWAPI category supported by the app.
export const SWAPI_CATEGORIES: SwapiCategory[] = [
  "people",
  "planets",
  "films",
  "species",
  "starships",
  "vehicles",
];

// Maps each category key to the label shown in the UI.
export const CATEGORY_LABELS: Record<SwapiCategory, string> = {
  people: "People",
  planets: "Planets",
  films: "Films",
  species: "Species",
  starships: "Starships",
  vehicles: "Vehicles",
};
