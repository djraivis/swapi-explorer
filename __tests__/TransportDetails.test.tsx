import { render, screen } from "@testing-library/react";

import { TransportDetails } from "../src/components/TransportDetails/TransportDetails";

describe("TransportDetails", () => {
  it("renders the minimum transportation detail fields from the acceptance criteria", () => {
    render(
      <TransportDetails
        itemObject={{
          url: "https://swapi.dev/api/vehicles/4/",
          name: "Sand Crawler",
          model: "Digger Crawler",
          manufacturer: "Corellia Mining Corporation",
          cost_in_credits: "150000",
          length: "36.8",
          crew: "46",
          passengers: "30",
          cargo_capacity: "50000",
        }}
      />,
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Sand Crawler")).toBeInTheDocument();
    expect(screen.getByText("Model")).toBeInTheDocument();
    expect(screen.getByText("Digger Crawler")).toBeInTheDocument();
    expect(screen.getByText("Manufacturer")).toBeInTheDocument();
    expect(screen.getByText("Corellia Mining Corporation")).toBeInTheDocument();
    expect(screen.getByText("Cost in Credits")).toBeInTheDocument();
    expect(screen.getByText("150,000")).toBeInTheDocument();
    expect(screen.getByText("Length")).toBeInTheDocument();
    expect(screen.getByText("36.8")).toBeInTheDocument();
    expect(screen.getByText("Crew")).toBeInTheDocument();
    expect(screen.getByText("46")).toBeInTheDocument();
    expect(screen.getByText("Passengers")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("Cargo Capacity")).toBeInTheDocument();
    expect(screen.getByText("50,000")).toBeInTheDocument();
  });
});
