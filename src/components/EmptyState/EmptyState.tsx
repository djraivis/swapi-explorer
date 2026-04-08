import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  title: string;
  message: string;
};

// Renders a friendly message when no matching content is available.
export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className={styles.state} role="status" aria-live="polite" aria-atomic="true">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
