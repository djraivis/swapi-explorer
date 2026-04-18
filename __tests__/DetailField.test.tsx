import { render, screen } from "@testing-library/react";
import { DetailField } from "../src/components/DetailField/DetailField";

describe("DetailField", () => {
    it("renders a label and value", () => {
        render(<DetailField label="Name" value="Luke Skywalker" />);
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });
});
