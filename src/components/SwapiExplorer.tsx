import styles from "./SwapiExplorer.module.css";

export function SwapiExplorer() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Star Wars Data Browser</p>
          <h1 className={styles.title}>SWAPI Explorer</h1>
          <p className={styles.description}>
            Browse, search, and sort Star Wars data from SWAPI.
          </p>
        </header>

        <section className={styles.panel}>
          <p>Select a category, search the results, and sort the data.</p>
        </section>
      </div>
    </main>
  );
}
