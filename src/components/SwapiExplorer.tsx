import { CATEGORY_LABELS, DEFAULT_CATEGORY, SWAPI_CATEGORIES } from "@/lib/constants";
import styles from "./SwapiExplorer.module.css";

// Holds the main page layout and will contain the explorer UI.
export function SwapiExplorer() {
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
                defaultValue={DEFAULT_CATEGORY}
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
              />
            </div>
          </div>

          <p className={styles.helperText}>
            The controls are in place. Data fetching and results display will be
            wired up next.
          </p>
        </section>
      </div>
    </main>
  );
}
