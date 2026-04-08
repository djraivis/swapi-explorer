import styles from "./DetailField.module.css";

type DetailFieldProps = {
  label: string;
  value?: string;
};

// Renders a single label-value row for a detail page.
export function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value ?? "Unknown"}</span>
    </div>
  );
}
