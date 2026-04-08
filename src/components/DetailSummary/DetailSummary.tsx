import { DetailField } from "@/components/DetailField/DetailField";

import styles from "./DetailSummary.module.css";

type SummaryField = {
  label: string;
  value?: string | number;
};

type DetailSummaryProps = {
  fields: SummaryField[];
};

export function DetailSummary({ fields }: DetailSummaryProps) {
  return (
    <div className={styles.grid}>
      {fields.map((field) => (
        <DetailField
          key={field.label}
          label={field.label}
          value={field.value === undefined ? undefined : String(field.value)}
        />
      ))}
    </div>
  );
}
