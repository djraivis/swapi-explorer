// Lists the SWAPI categories supported by the app.
export type SwapiCategory =
  | "people"
  | "planets"
  | "films"
  | "species"
  | "starships"
  | "vehicles";

// Represents the saved search state for one category.
export type CategoryViewState = {
  search: string;
};

// Stores saved view state for every supported category.
export type SavedCategoryState = Record<SwapiCategory, CategoryViewState>;
