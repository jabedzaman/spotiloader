import axios from "axios";

export const http = axios.create({
  baseURL: "http://127.0.0.1:8080/v3",
});

const debug = true;

http.interceptors.request.use(
  (config) => {
    if (debug) {
      console.log("Request:", {
        url: config.url,
        method: config.method,
        data: config.data,
        params: config.params,
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    if (debug) {
      console.log("Response:", response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
