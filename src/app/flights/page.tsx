"use client";
import { useEffect, useState } from "react";
import FlightApi from "../services/FlightApi";
import { IFlight } from "../types";
import useAsync from "../hooks/useAsync";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [state, executeAsync, resetState] = useAsync();

  useEffect(() => {
    const fetchFlights = async () => {
      const flightPromise = FlightApi.getFlights();
      await executeAsync(flightPromise);
    };

    fetchFlights();

    //Fetch api every 10s
    const intervalId = setInterval(fetchFlights, 10000);
    //cleanUp
    return () => clearInterval(intervalId);
  }, [executeAsync]);

  const handleRowClick = (flightId: number) => {
    router.push(`/flights/${flightId}`);
  };
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Travelopia Assignment</h1>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">
          Real-Time Flight Status Board
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full h-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Flight</th>
                <th className="px-4 py-2">Airline</th>
                <th className="px-4 py-2">Origin</th>
                <th className="px-4 py-2">Destination</th>
                <th className="px-4 py-2">Departure Time</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {state.loading === "LOADING" && (
                <tr>
                  <td colSpan={6} className="px-4 py-2 text-center">
                    Loading flights...
                  </td>
                </tr>
              )}
              {state.hasError === "HAS_ERROR" && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-2 text-center text-red-500"
                  >
                    Error: {state.contents}
                  </td>
                </tr>
              )}
              {state.hasValue === "HAS_VALUE" &&
                state.contents?.map((flight: IFlight) => (
                  <tr
                    key={flight.id}
                    className="border-t cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRowClick(flight.id)}
                  >
                    <td className="px-4 py-2">{flight.flightNumber}</td>
                    <td className="px-4 py-2">{flight.airline}</td>
                    <td className="px-4 py-2">{flight.origin}</td>
                    <td className="px-4 py-2">{flight.destination}</td>
                    <td className="px-4 py-2">
                      {new Date(flight.departureTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-2">{flight.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
