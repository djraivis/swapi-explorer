import type { SortOrder, SwapiCategory } from "@/lib/types";

export const RECENT_CATEGORY_KEY = "swapi-recent-category";
const CATEGORY_STATE_KEY = "swapi-category-state";

type StoredCategoryState = Partial<Record<SwapiCategory, {
  search?: string;
  sort?: SortOrder;
}>>;

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCategoryFromPathname(pathname: string) {
  const [firstSegment] = pathname.split("/").filter(Boolean);

  if (
    firstSegment === "people" ||
    firstSegment === "planets" ||
    firstSegment === "films" ||
    firstSegment === "species" ||
    firstSegment === "starships" ||
    firstSegment === "vehicles"
  ) {
    return firstSegment;
  }

  return null;
}

export function getStoredCategoryState() {
  if (!isBrowser()) {
    return {} as StoredCategoryState;
  }

  const rawValue = window.localStorage.getItem(CATEGORY_STATE_KEY);

  if (!rawValue) {
    return {} as StoredCategoryState;
  }

  try {
    return JSON.parse(rawValue) as StoredCategoryState;
  } catch {
    return {} as StoredCategoryState;
  }
}

export function setStoredCategoryState(
  category: SwapiCategory,
  nextState: { search?: string; sort?: SortOrder }
) {
  if (!isBrowser()) {
    return;
  }

  const currentState = getStoredCategoryState();
  currentState[category] = nextState;
  window.localStorage.setItem(CATEGORY_STATE_KEY, JSON.stringify(currentState));
}

export function getRecentCategory() {
  if (!isBrowser()) {
    return null;
  }

  const category = window.localStorage.getItem(RECENT_CATEGORY_KEY);

  if (
    category === "people" ||
    category === "planets" ||
    category === "films" ||
    category === "species" ||
    category === "starships" ||
    category === "vehicles"
  ) {
    return category;
  }

  return null;
}

export function setRecentCategory(category: SwapiCategory) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(RECENT_CATEGORY_KEY, category);
}
