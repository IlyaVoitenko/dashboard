import axios from "axios";
export { ApiError } from "./handleErrorAxios";
import { handleErrorAxios } from "./handleErrorAxios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getHistoryCoin = async (coinName: string = "bitcoin") => {
  try {
    const response = await api.get(`/assets/${coinName}/history?interval=d1`);
    if (!response || !response.data)
      throw new Error("No data returned from API");

    return response.data;
  } catch (error: unknown) {
    handleErrorAxios(error);
  }
};
