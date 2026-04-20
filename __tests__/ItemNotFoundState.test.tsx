import { render, screen } from "@testing-library/react";

import { ItemNotFoundState } from "../src/components/ItemNotFoundState/ItemNotFoundState";

describe("ItemNotFoundState", () => {
  it("renders a dedicated missing-item message with a link back to the category", () => {
    render(<ItemNotFoundState category="vehicles" itemLabel="Vehicle" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Vehicle not found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("No item matched this slug. Return to Vehicles and try a different selection."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to Vehicles" }),
    ).toHaveAttribute("href", "/vehicles");
  });
});
