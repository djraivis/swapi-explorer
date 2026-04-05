"use client";

import { useEffect, useState } from "react";

import {
  CATEGORY_LABELS,
  DEFAULT_CATEGORY,
  SWAPI_CATEGORIES,
} from "@/lib/constants";
import { ResultsTable } from "@/components/ResultsTable";
import { fetchAllCategoryItems } from "@/lib/swapi";
import type { SwapiCategory } from "@/lib/types";
import styles from "./SwapiExplorer.module.css";

type SwapiItem = Record<string, unknown>;
type SortOrder = "asc" | "desc";

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

  // Fetches the full dataset whenever the user selects a new category.
  useEffect(() => {
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
  }, [selectedCategory]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Introduces the page and explains what the app does. */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>Star Wars Data Browser</p>
          <h1 className={styles.title}>SWAPI Explorer</h1>
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

          <p className={styles.helperText}>
            Category changes trigger a new fetch. Search and sorting happen in
            the browser using the loaded results.
          </p>

          {/* Announces loading, success, and error updates to the user. */}
          <div aria-live="polite" className={styles.statusBlock}>
            {isLoading ? (
              <p className={styles.statusMessage}>
                Loading {CATEGORY_LABELS[selectedCategory].toLowerCase()}...
              </p>
            ) : null}

            {errorMessage ? (
              <p className={styles.errorMessage} role="alert">
                {errorMessage}
              </p>
            ) : null}

            {!isLoading && !errorMessage ? (
              <p className={styles.statusMessage}>
                Showing {sortedItems.length} of {items.length}{" "}
                {CATEGORY_LABELS[selectedCategory].toLowerCase()}.
              </p>
            ) : null}
          </div>

          {!isLoading && !errorMessage ? (
            <ResultsTable
              items={sortedItems}
              selectedCategory={selectedCategory}
            />
          ) : null}
        </section>
      </div>
    </main>
  );
}
