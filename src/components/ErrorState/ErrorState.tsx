import styles from "./ErrorState.module.css";

type ErrorStateProps = {
  title: string;
  message: string;
};

export function ErrorState({ title, message }: ErrorStateProps) {
  return (
    <div className={styles.state} role="alert">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
