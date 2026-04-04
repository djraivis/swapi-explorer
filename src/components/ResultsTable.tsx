import { TRANSPORT_CATEGORIES } from "@/lib/constants";
import type { SwapiCategory } from "@/lib/types";

import styles from "./ResultsTable.module.css";

type ResultsTableProps = {
  items: unknown[];
  selectedCategory: SwapiCategory;
};

type SwapiRow = Record<string, unknown>;

// Renders the loaded SWAPI records in a simple semantic table.
export function ResultsTable({
  items,
  selectedCategory,
}: ResultsTableProps) {
  // Shows a simple message instead of an empty table when there is no data.
  if (items.length === 0) {
    return <p className={styles.emptyState}>No items to display yet.</p>;
  }

  // Chooses the columns to display for the current category.
  const tableHeaders = getTableHeaders(selectedCategory);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header.key} scope="col">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const row = item as SwapiRow;

            return (
              <tr key={getRowKey(row, index)}>
                {tableHeaders.map((header) => (
                  <td key={header.key}>{formatCellValue(row[header.key])}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Returns the correct table columns for the selected SWAPI category.
function getTableHeaders(category: SwapiCategory) {
  // Films use "title" instead of "name", so they need their own column set.
  if (category === "films") {
    return [
      { key: "title", label: "Title" },
      { key: "director", label: "Director" },
      { key: "producer", label: "Producer" },
      { key: "release_date", label: "Release Date" },
    ];
  }

  // People use a small set of direct profile fields from the API response.
  if (category === "people") {
    return [
      { key: "name", label: "Name" },
      { key: "height", label: "Height" },
      { key: "mass", label: "Mass" },
      { key: "gender", label: "Gender" },
      { key: "birth_year", label: "Birth Year" },
    ];
  }

  // Planets show a few key world attributes that fit well in a table.
  if (category === "planets") {
    return [
      { key: "name", label: "Name" },
      { key: "climate", label: "Climate" },
      { key: "terrain", label: "Terrain" },
      { key: "population", label: "Population" },
    ];
  }

  // Species use their own descriptive fields from the API response.
  if (category === "species") {
    return [
      { key: "name", label: "Name" },
      { key: "classification", label: "Classification" },
      { key: "language", label: "Language" },
      { key: "average_lifespan", label: "Average Lifespan" },
    ];
  }

  // Vehicles and starships share the transport fields required by the brief.
  if (TRANSPORT_CATEGORIES.includes(category)) {
    return [
      { key: "name", label: "Name" },
      { key: "model", label: "Model" },
      { key: "manufacturer", label: "Manufacturer" },
      { key: "cost_in_credits", label: "Cost in Credits" },
      { key: "length", label: "Length" },
      { key: "crew", label: "Crew" },
      { key: "passengers", label: "Passengers" },
      { key: "cargo_capacity", label: "Cargo Capacity" },
    ];
  }

  // Any category without a custom setup falls back to a minimal table.
  return [
    { key: "name", label: "Name" },
    { key: "url", label: "URL" },
  ];
}

// Uses the API URL as a stable row key when it is available.
function getRowKey(row: SwapiRow, index: number) {
  const url = row.url;

  // Most SWAPI records include a unique URL, which works well as a React key.
  if (typeof url === "string") {
    return url;
  }

  // Falls back to the array index only when the record has no URL.
  return String(index);
}

// Converts raw API values into simple table-friendly text.
function formatCellValue(value: unknown) {
  // Keeps normal non-empty strings as they are.
  if (typeof value === "string" && value.trim() !== "") {
    return value;
  }

  // Converts numbers to text so they can be rendered in table cells.
  if (typeof value === "number") {
    return String(value);
  }

  // Uses a readable fallback when the value is missing or unsupported.
  return "Unknown";
}
