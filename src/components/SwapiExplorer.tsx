"use client";

import { useEffect, useState } from "react";

import {
  CATEGORY_LABELS,
  DEFAULT_CATEGORY,
  SWAPI_CATEGORIES,
} from "@/lib/constants";
import { fetchAllCategoryItems } from "@/lib/swapi";
import type { SwapiCategory } from "@/lib/types";
import styles from "./SwapiExplorer.module.css";

// Holds the main page layout and will contain the explorer UI.
export function SwapiExplorer() {
  const [selectedCategory, setSelectedCategory] =
    useState<SwapiCategory>(DEFAULT_CATEGORY);
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetches the full dataset whenever the user selects a new category.
  useEffect(() => {
    let isCancelled = false;

    async function loadCategoryItems() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const nextItems = await fetchAllCategoryItems(selectedCategory);

        if (!isCancelled) {
          setItems(nextItems);
        }
      } catch {
        if (!isCancelled) {
          setItems([]);
          setErrorMessage("Unable to load this category. Please try again.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

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
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>
          </div>

          <p className={styles.helperText}>
            Search will be wired up next. Category changes already trigger a new
            fetch.
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
                Loaded {items.length}{" "}
                {CATEGORY_LABELS[selectedCategory].toLowerCase()}.
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
