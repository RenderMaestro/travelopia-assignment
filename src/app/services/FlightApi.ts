import { IFlight } from "../types";
import { sendGETRequest } from "./apiUtilis";
import qs from "qs";

class FlightApi {
  static apiPath = process.env.NEXT_PUBLIC_BASE_URL;

  static async getFlights() {
    const flights = await sendGETRequest<IFlight[]>(`${this.apiPath}/flights`);

    return flights;
  }

  static async getDetailFlights(params: string | string[]) {
    const Detailflights = await sendGETRequest<IFlight[]>(
      `${this.apiPath}/flights/${params}`
    );

    return Detailflights;
  }
}

export default FlightApi;
