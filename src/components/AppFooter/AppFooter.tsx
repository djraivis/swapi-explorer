import styles from "./AppFooter.module.css";

// Renders the footer with a link to the public repository.
export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBar}>
        <a
          className={styles.link}
          href="https://github.com/djraivis/swapi-explorer"
          rel="noreferrer"
          target="_blank"
        >
          View GitHub Repository
        </a>
      </div>
    </footer >
  );
}
