import { isSwapiCategory } from "@/lib/types";
import type { SortOrder, SwapiCategory } from "@/lib/types";

export const RECENT_CATEGORY_KEY = "swapi-recent-category";
const CATEGORY_STATE_KEY = "swapi-category-state";

type StoredCategoryState = Partial<Record<SwapiCategory, {
  search?: string;
  sort?: SortOrder;
}>>;

// Checks whether the current code is running in the browser.
function isBrowser() {
  return typeof window !== "undefined";
}

// Extracts a supported SWAPI category from the current pathname.
export function getCategoryFromPathname(pathname: string) {
  const [firstSegment] = pathname.split("/").filter(Boolean);

  if (firstSegment && isSwapiCategory(firstSegment)) {
    return firstSegment;
  }

  return null;
}

// Reads the saved per-category explorer state from localStorage.
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

// Saves the current search and sort state for a category.
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

// Reads the most recently viewed category from localStorage.
export function getRecentCategory() {
  if (!isBrowser()) {
    return null;
  }

  const category = window.localStorage.getItem(RECENT_CATEGORY_KEY);

  if (category && isSwapiCategory(category)) {
    return category;
  }

  return null;
}

// Stores the most recently viewed category in localStorage.
export function setRecentCategory(category: SwapiCategory) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(RECENT_CATEGORY_KEY, category);
}
