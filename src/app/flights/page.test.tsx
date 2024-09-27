import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import FlightApi from "../services/FlightApi";
import { useRouter } from "next/navigation";

// Mocking the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mocking the FlightApi service
jest.mock("../services/FlightApi", () => ({
  getFlights: jest.fn(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    // Mock useRouter
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    // Mock the FlightApi getFlights call
    (FlightApi.getFlights as jest.Mock).mockResolvedValue([
      {
        id: 1,
        flightNumber: "FL123",
        airline: "Airline A",
        origin: "New York",
        destination: "Los Angeles",
        departureTime: new Date("2023-09-27T15:30:00Z").toISOString(), // 03:30 pm
        status: "On Time",
      },
      {
        id: 2,
        flightNumber: "FL456",
        airline: "Airline B",
        origin: "London",
        destination: "Paris",
        departureTime: new Date("2023-09-27T17:00:00Z").toISOString(), // 05:00 pm
        status: "Delayed",
      },
    ]);
  });

  it("should display loading state initially", () => {
    render(<Home />);
    expect(screen.getByText("Loading flights...")).toBeInTheDocument();
  });

  it("should display the flight data when the API call is successful", async () => {
    render(<Home />);

    // Wait for the API call and component update
    await waitFor(() => {
      expect(
        screen.getByText("Real-Time Flight Status Board")
      ).toBeInTheDocument();
    });

    // Assert that the flights are rendered correctly
    expect(screen.getByText("FL123")).toBeInTheDocument();
    expect(screen.getByText("Airline A")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
    expect(screen.getByText("03:30 pm")).toBeInTheDocument(); // Adjusted time format
    expect(screen.getByText("On Time")).toBeInTheDocument();

    expect(screen.getByText("FL456")).toBeInTheDocument();
    expect(screen.getByText("Airline B")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("05:00 pm")).toBeInTheDocument(); // Adjusted time format
    expect(screen.getByText("Delayed")).toBeInTheDocument();
  });

  it("should navigate to flight details when a flight is clicked", async () => {
    const router = useRouter();
    render(<Home />);

    // Wait for the flights to be rendered
    await waitFor(() => {
      expect(screen.getByText("FL123")).toBeInTheDocument();
    });

    // Simulate a click on the first flight row
    fireEvent.click(screen.getByText("FL123"));

    // Check if the router.push was called with the correct URL
    expect(router.push).toHaveBeenCalledWith("/flights/1");
  });
});
