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

        {/* This panel will hold the category controls and results next. */}
        <section className={styles.panel}>
          <p>Select a category, search the results, and sort the data.</p>
        </section>
      </div>
    </main>
  );
}
