import type {
  CategoryViewState,
  SavedCategoryState,
  SwapiCategory,
} from "./types";

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

// Identifies the categories that need transport-specific fields in the table.
export const TRANSPORT_CATEGORIES: SwapiCategory[] = ["starships", "vehicles"];

// Sets the category selected when the app loads for the first time.
export const DEFAULT_CATEGORY: SwapiCategory = "people";

// Provides the default saved state for a single category.
export const DEFAULT_VIEW_STATE: CategoryViewState = {
  search: "",
};

// Creates the initial saved state object for every supported category.
export const DEFAULT_CATEGORY_STATE: SavedCategoryState = {
  people: { ...DEFAULT_VIEW_STATE },
  planets: { ...DEFAULT_VIEW_STATE },
  films: { ...DEFAULT_VIEW_STATE },
  species: { ...DEFAULT_VIEW_STATE },
  starships: { ...DEFAULT_VIEW_STATE },
  vehicles: { ...DEFAULT_VIEW_STATE },
};

// Stores the localStorage keys used to persist user state between visits.
export const STORAGE_KEYS = {
  recentCategory: "swapi-explorer-recent-category",
  categoryState: "swapi-explorer-category-state",
} as const;
