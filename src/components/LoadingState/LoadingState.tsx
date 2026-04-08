import styles from "./LoadingState.module.css";

type LoadingStateProps = {
  label?: string;
};

// Renders an accessible loading indicator and status label.
export function LoadingState({ label = "Loading..." }: LoadingStateProps) {
  return (
    <div
      className={styles.state}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-busy="true"
    >
      <div aria-hidden="true" className={styles.spinner} />
      <p className={styles.label}>{label}</p>
    </div>
  );
}
