"use client";

import { useEffect, useState } from "react";

import {
  CATEGORY_LABELS,
  DEFAULT_CATEGORY,
  DEFAULT_CATEGORY_STATE,
  SWAPI_CATEGORIES,
  STORAGE_KEYS,
} from "@/lib/constants";
import { ResultsTable } from "@/components/ResultsTable";
import { VantaGlobeBackground } from "@/components/VantaGlobeBackground";
import { fetchAllCategoryItems } from "@/lib/swapi";
import type { SavedCategoryState, SwapiCategory } from "@/lib/types";
import styles from "./SwapiExplorer.module.css";

type SwapiItem = Record<string, unknown>;
type SortOrder = "asc" | "desc";

function isSwapiCategory(value: string): value is SwapiCategory {
  return SWAPI_CATEGORIES.includes(value as SwapiCategory);
}

function getResultsAnnouncement(
  category: SwapiCategory,
  visibleItems: number,
  totalItems: number
) {
  const label = CATEGORY_LABELS[category];

  return `${label} results: showing ${visibleItems} of ${totalItems}.`;
}

// Holds the main page layout and will contain the explorer UI.
export function SwapiExplorer() {
  // Tracks which SWAPI category the user is currently viewing.
  const [selectedCategory, setSelectedCategory] =
    useState<SwapiCategory>(DEFAULT_CATEGORY);
  // Stores the current search input value.
  const [searchValue, setSearchValue] = useState("");
  // Stores the current alphabetical sort direction.
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  // Holds the fetched records for the selected category.
  const [items, setItems] = useState<unknown[]>([]);
  // Controls the visible loading message while data is being fetched.
  const [isLoading, setIsLoading] = useState(true);
  // Stores a user-facing error message if the request fails.
  const [errorMessage, setErrorMessage] = useState("");
  // Waits for saved browser state before starting the first fetch.
  const [hasRestoredState, setHasRestoredState] = useState(false);

  // PERSISTENCE: RESTORES SAVED CATEGORY, SEARCH, AND SORT STATE FROM LOCALSTORAGE.
  useEffect(() => {
    const savedRecentCategory = window.localStorage.getItem(
      STORAGE_KEYS.recentCategory
    );
    const savedCategoryState = window.localStorage.getItem(
      STORAGE_KEYS.categoryState
    );

    if (savedRecentCategory && isSwapiCategory(savedRecentCategory)) {
      setSelectedCategory(savedRecentCategory);
    }

    if (savedCategoryState) {
      try {
        const parsedState = JSON.parse(savedCategoryState) as SavedCategoryState;
        const categoryToUse =
          savedRecentCategory && isSwapiCategory(savedRecentCategory)
            ? savedRecentCategory
            : DEFAULT_CATEGORY;

        setSearchValue(parsedState[categoryToUse]?.search ?? "");
        setSortOrder(parsedState[categoryToUse]?.sortOrder ?? "asc");
      } catch {
        window.localStorage.removeItem(STORAGE_KEYS.categoryState);
      }
    }

    setHasRestoredState(true);
  }, []);

  // Filters the loaded results using title for films and name for other categories.
  const filteredItems = items.filter((item) => {
    const row = item as SwapiItem;
    const searchTerm = searchValue.trim().toLowerCase();

    if (searchTerm === "") {
      return true;
    }

    const valueToSearch =
      selectedCategory === "films" ? row.title : row.name;

    if (typeof valueToSearch !== "string") {
      return false;
    }

    return valueToSearch.toLowerCase().includes(searchTerm);
  });

  // Sorts the filtered results by title for films and name for other categories.
  const sortedItems = [...filteredItems].sort((firstItem, secondItem) => {
    const firstRow = firstItem as SwapiItem;
    const secondRow = secondItem as SwapiItem;

    const firstValue =
      selectedCategory === "films" ? firstRow.title : firstRow.name;
    const secondValue =
      selectedCategory === "films" ? secondRow.title : secondRow.name;

    const firstText = typeof firstValue === "string" ? firstValue : "";
    const secondText = typeof secondValue === "string" ? secondValue : "";
    const result = firstText.localeCompare(secondText);

    return sortOrder === "asc" ? result : result * -1;
  });

  // PERSISTENCE: RESTORES THE SAVED SEARCH AND SORT STATE WHEN THE CATEGORY CHANGES.
  useEffect(() => {
    if (!hasRestoredState) {
      return;
    }

    const savedCategoryState = window.localStorage.getItem(
      STORAGE_KEYS.categoryState
    );

    if (!savedCategoryState) {
      setSearchValue("");
      setSortOrder("asc");
      return;
    }

    try {
      const parsedState = JSON.parse(savedCategoryState) as SavedCategoryState;
      const nextState = parsedState[selectedCategory];

      setSearchValue(nextState?.search ?? "");
      setSortOrder(nextState?.sortOrder ?? "asc");
    } catch {
      setSearchValue("");
      setSortOrder("asc");
    }
  }, [hasRestoredState, selectedCategory]);

  // Fetches the full dataset whenever the user selects a new category.
  useEffect(() => {
    if (!hasRestoredState) {
      return;
    }

    // Prevents state updates if the component unmounts before the fetch finishes.
    let isCancelled = false;

    async function loadCategoryItems() {
      // Resets the status before starting a new request.
      setIsLoading(true);
      setErrorMessage("");

      try {
        // Loads every SWAPI page for the selected category into one array.
        const nextItems = await fetchAllCategoryItems(selectedCategory);

        if (!isCancelled) {
          setItems(nextItems);
        }
      } catch {
        if (!isCancelled) {
          // Clears stale data and shows a simple error if the request fails.
          setItems([]);
          setErrorMessage("Unable to load this category. Please try again.");
        }
      } finally {
        if (!isCancelled) {
          // Ends the loading state after success or failure.
          setIsLoading(false);
        }
      }
    }

    // Starts the request for the currently selected category.
    loadCategoryItems();

    return () => {
      isCancelled = true;
    };
  }, [hasRestoredState, selectedCategory]);

  // PERSISTENCE: SAVES THE LATEST CATEGORY, SEARCH, AND SORT STATE TO LOCALSTORAGE.
  useEffect(() => {
    if (!hasRestoredState) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEYS.recentCategory, selectedCategory);

    const savedCategoryState = window.localStorage.getItem(
      STORAGE_KEYS.categoryState
    );

    try {
      const parsedState = savedCategoryState
        ? (JSON.parse(savedCategoryState) as SavedCategoryState)
        : DEFAULT_CATEGORY_STATE;

      const nextState: SavedCategoryState = {
        ...parsedState,
        [selectedCategory]: {
          search: searchValue,
          sortOrder,
        },
      };

      window.localStorage.setItem(
        STORAGE_KEYS.categoryState,
        JSON.stringify(nextState)
      );
    } catch {
      const nextState: SavedCategoryState = {
        ...DEFAULT_CATEGORY_STATE,
        [selectedCategory]: {
          search: searchValue,
          sortOrder,
        },
      };

      window.localStorage.setItem(
        STORAGE_KEYS.categoryState,
        JSON.stringify(nextState)
      );
    }
  }, [hasRestoredState, searchValue, selectedCategory, sortOrder]);

  return (
    <main className={styles.page}>
      <VantaGlobeBackground />

      <div className={styles.container}>
        {/* Introduces the page and explains what the app does. */}
        <header className={styles.header}>
          <h1 className={styles.title}>Star Wars API</h1>
          <p className={styles.currentCategory}>
            SWAPI Explorer &gt; {CATEGORY_LABELS[selectedCategory]}
          </p>
          <p className={styles.description}>
            Browse, search, and sort Star Wars data from SWAPI.
          </p>
        </header>

        {/* This panel holds the explorer controls before data is wired up. */}
        <section className={styles.panel}>
          <div className={styles.controls}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className={styles.input}
                value={selectedCategory}
                // Updates the selected category and triggers a new fetch.
                onChange={(event) =>
                  setSelectedCategory(event.target.value as SwapiCategory)
                }
              >
                {SWAPI_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {CATEGORY_LABELS[category]}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="search">
                Search
              </label>
              <input
                id="search"
                className={styles.input}
                type="text"
                placeholder="Search this category"
                value={searchValue}
                // Stores the search text locally until filtering is added.
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="sortOrder">
                Sort
              </label>
              <select
                id="sortOrder"
                className={styles.input}
                value={sortOrder}
                onChange={(event) =>
                  setSortOrder(event.target.value as SortOrder)
                }
              >
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>
          </div>

          {/* Announces loading and error updates to assistive technology. */}
          <div className={styles.statusBlock}>
            {isLoading ? (
              <div
                aria-atomic="true"
                aria-live="polite"
                className={styles.loadingState}
                role="status"
              >
                <p className={styles.statusMessage}>
                  Loading {CATEGORY_LABELS[selectedCategory].toLowerCase()}...
                </p>
                <div
                  aria-hidden="true"
                  className={styles.loadingBar}
                >
                  <span className={styles.loadingBarFill} />
                </div>
              </div>
            ) : null}

            {errorMessage ? (
              <p
                aria-atomic="true"
                aria-live="assertive"
                className={styles.errorMessage}
                role="alert"
              >
                {errorMessage}
              </p>
            ) : null}

            {!isLoading && !errorMessage ? (
              <p
                aria-atomic="true"
                aria-live="polite"
                className={styles.srOnly}
                role="status"
              >
                {getResultsAnnouncement(
                  selectedCategory,
                  sortedItems.length,
                  items.length
                )}
              </p>
            ) : null}
          </div>

          {!isLoading && !errorMessage ? (
            <ResultsTable
              items={sortedItems}
              selectedCategory={selectedCategory}
              totalItems={items.length}
            />
          ) : null}
        </section>
      </div>
    </main>
  );
}
