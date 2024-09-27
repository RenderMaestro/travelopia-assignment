// /**
//  * @jest-environment jsdom
//  */
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import Page from "./page";

// it("App Router: Works with dynamic route segments", () => {
//   render(<Page params={{ slug: "Test" }} />);
//   expect(screen.getByRole("heading")).toHaveTextContent("Slug: Test");
// });
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./page";
import FlightApi from "../../services/FlightApi";
import { useParams } from "next/navigation";

// Mocking the API call and useParams
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("../../services/FlightApi", () => ({
  getDetailFlights: jest.fn(),
}));

describe("Flight Details Page", () => {
  beforeEach(() => {
    // Mock useParams to return the flight ID
    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    // Mock the API response
    (FlightApi.getDetailFlights as jest.Mock).mockResolvedValue({
      flightNumber: "ABC123",
      airline: "Travelopia Airlines",
      origin: "New York",
      destination: "London",
      departureTime: new Date("2023-09-27T12:30:00Z").toISOString(),
      status: "On Time",
    });
  });

  it("should display flight details when API call is successful", async () => {
    // Render the component
    render(<Page />);

    // Assert loading state is displayed initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the component to update after the API call
    const flightNumberElem = await screen.findByText("Flight Number:");
    const airlineElem = screen.getByText("Travelopia Airlines");
    const originElem = screen.getByText("New York");
    const destinationElem = screen.getByText("London");
    const departureTimeElem = screen.getByText(
      new Date("2023-09-27T12:30:00Z").toLocaleString()
    );
    const statusElem = screen.getByText("On Time");

    // Assert flight details are rendered
    expect(flightNumberElem).toBeInTheDocument();
    expect(airlineElem).toBeInTheDocument();
    expect(originElem).toBeInTheDocument();
    expect(destinationElem).toBeInTheDocument();
    expect(departureTimeElem).toBeInTheDocument();
    expect(statusElem).toBeInTheDocument();
  });
});
