import { render, screen } from "@testing-library/react";
import { AppHeaderNav } from "../src/components/AppHeader/AppHeaderNav";

jest.mock("next/navigation", () => ({
    usePathname: () => "/people",
}));

jest.mock("@/lib/constants", () => ({
    CATEGORY_LABELS: { people: "People", planets: "Planets" },
    SWAPI_CATEGORIES: ["people", "planets"],
}));

describe("AppHeaderNav", () => {
    it("renders navigation links for categories", () => {
        render(<AppHeaderNav />);
        expect(screen.getByText("People")).toBeInTheDocument();
        expect(screen.getByText("Planets")).toBeInTheDocument();
    });
});
