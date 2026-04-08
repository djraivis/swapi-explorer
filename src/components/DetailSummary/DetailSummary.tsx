import { DetailField } from "@/components/DetailField/DetailField";

import styles from "./DetailSummary.module.css";

type SummaryField = {
  label: string;
  value?: string | number;
};

type DetailSummaryProps = {
  fields: SummaryField[];
};

// Renders a grid of summary fields for a detail page.
export function DetailSummary({ fields }: DetailSummaryProps) {
  return (
    <dl className={styles.grid}>
      {fields.map((field) => (
        <DetailField
          key={field.label}
          label={field.label}
          value={field.value === undefined ? undefined : String(field.value)}
        />
      ))}
    </dl>
  );
}
