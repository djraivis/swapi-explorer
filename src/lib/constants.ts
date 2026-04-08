import { SWAPI_CATEGORIES } from "./types";
import type { SwapiCategory } from "./types";

// Maps each category key to the label shown in the UI.
export const CATEGORY_LABELS: Record<SwapiCategory, string> = {
  people: "People",
  planets: "Planets",
  films: "Films",
  species: "Species",
  starships: "Starships",
  vehicles: "Vehicles",
};

export { SWAPI_CATEGORIES };
