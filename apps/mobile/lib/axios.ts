import { API_ENDPOINT } from "@constants/api";
import { DEBUG } from "@constants/debug";
import axios from "axios";

export const api = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (DEBUG) {
    console.log(`sending request to ${config.url} with data:`, config.data);
  }
  return config;
});

api.interceptors.response.use((response) => {
  if (DEBUG) {
    console.log(
      `received response from ${response.config.url} with data:`,
      response.data
    );
  }
  return response;
});
