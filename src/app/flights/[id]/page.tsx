"use client";
import useAsync from "@/app/hooks/useAsync";
import FlightApi from "@/app/services/FlightApi";
import { IFlight } from "@/app/types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const router = useRouter();
  const [state, executeAsync, resetState] = useAsync();
  const params = useParams();
  const flightId = params.id;

  useEffect(() => {
    const fetchFlights = async () => {
      const flightPromise = FlightApi.getDetailFlights(flightId);
      await executeAsync(flightPromise);
    };

    fetchFlights();
  }, [executeAsync, router]);

  if (state.loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        {state.hasValue === "HAS_VALUE" && state.contents && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Flight Details
            </h1>
            <p className="mb-2">
              <strong>Flight Number:</strong> {state.contents.flightNumber}
            </p>
            <p className="mb-2">
              <strong>Airline:</strong> {state.contents.airline}
            </p>
            <p className="mb-2">
              <strong>Origin:</strong> {state.contents.origin}
            </p>
            <p className="mb-2">
              <strong>Destination:</strong> {state.contents.destination}
            </p>
            <p className="mb-2">
              <strong>Departure Time:</strong>{" "}
              {new Date(state.contents.departureTime).toLocaleString()}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {state.contents.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
