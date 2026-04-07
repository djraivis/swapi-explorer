import styles from "./LoadingState.module.css";

type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading..." }: LoadingStateProps) {
  return (
    <div className={styles.state}>
      <div aria-hidden="true" className={styles.spinner} />
      <p className={styles.label}>{label}</p>
    </div>
  );
}
