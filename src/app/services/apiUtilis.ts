import axios, { AxiosRequestConfig } from "axios";

export const sendGETRequest = async <T, K = unknown>(
  url: string,
  config?: AxiosRequestConfig<K>
) => {
  try {
    const response = await axios.get<T>(url, {
      ...config
    });

    return response.data;
  } catch (err: any) {
    //* Error can be anything so its any.
    console.error("unable to complete the get request", err);
  }
};
