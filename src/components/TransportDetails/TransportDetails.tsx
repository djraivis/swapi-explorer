import type { TransportItem } from "@/lib/types";

import { DetailField } from "../DetailField/DetailField";
import styles from "./TransportDetails.module.css";

type TransportDetailsProps = {
  item: TransportItem;
};

// Renders the required transport detail fields for a vehicle or starship.
export function TransportDetails({ item }: TransportDetailsProps) {
  return (
    <div className={styles.grid}>
      <DetailField label="Name" value={item.name} />
      <DetailField label="Model" value={item.model} />
      <DetailField label="Manufacturer" value={item.manufacturer} />
      <DetailField label="Cost in Credits" value={item.cost_in_credits} />
      <DetailField label="Length" value={item.length} />
      <DetailField label="Crew" value={item.crew} />
      <DetailField label="Passengers" value={item.passengers} />
      <DetailField label="Cargo Capacity" value={item.cargo_capacity} />
    </div>
  );
}
