import type { TransportItem } from "@/lib/types";

import { DetailField } from "../DetailField/DetailField";
import styles from "./TransportDetails.module.css";

function formatNumber(value?: string) {
  if (!value) return value;
  // Only format if value is a plain integer string
  if (/^\d+$/.test(value)) {
    return Number(value).toLocaleString();
  }
  return value;
}

type TransportDetailsProps = {
  itemObject: TransportItem;
};

const requiredFields: { label: string; key: keyof TransportItem }[] = [
  { label: "Name", key: "name" },
  { label: "Model", key: "model" },
  { label: "Manufacturer", key: "manufacturer" },
  { label: "Cost in Credits", key: "cost_in_credits" },
  { label: "Length", key: "length" },
  { label: "Crew", key: "crew" },
  { label: "Passengers", key: "passengers" },
  { label: "Cargo Capacity", key: "cargo_capacity" },
]

// Renders the required transport detail fields for a vehicle or starship.
export function TransportDetails({ itemObject }: TransportDetailsProps) {
  const numericFields: (keyof TransportItem)[] = [
    "cost_in_credits",
    "length",
    "crew",
    "passengers",
    "cargo_capacity",
  ];

  return (
    <div className={styles.grid}>
      {requiredFields.map((item) => {
        const value = numericFields.includes(item.key)
          ? formatNumber(itemObject[item.key])
          : itemObject[item.key];
        return (
          <DetailField key={item.key} label={item.label} value={value} />
        )
      })}
    </div>
  );
}
