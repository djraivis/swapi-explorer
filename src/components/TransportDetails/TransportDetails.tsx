import type { TransportItem } from "@/lib/types";

import { DetailField } from "../DetailField/DetailField";
import styles from "./TransportDetails.module.css";

type TransportDetailsProps = {
  itemObject: TransportItem;
};

const requiredFields: { label: string; key: keyof TransportItem; display?: boolean }[] = [
  { label: "Name", key: "name", display: true }, // 0
  { label: "Model", key: "model", display: true }, // 1
  { label: "Manufacturer", key: "manufacturer", display: true }, // 2
  { label: "Cost in Credits", key: "cost_in_credits", display: true }, // 3
  { label: "Length", key: "length", display: true }, // 4
  { label: "Crew", key: "crew", display: true }, // 5
  { label: "Passengers", key: "passengers", display: true }, // 6
  { label: "Cargo Capacity", key: "cargo_capacity", display: true }, // 7
  { label: "Vehicle Class", key: "vehicle_class", display: false }, // 8
]

// Renders the required transport detail fields for a vehicle or starship.
export function TransportDetails({ itemObject }: TransportDetailsProps) {
  return (
    <div className={styles.grid}>
      {requiredFields.map((item) => {
        return (
          <DetailField key={item.key} label={item.label} value={itemObject[item.key]} />
        )
      })}
    </div>
  );
}