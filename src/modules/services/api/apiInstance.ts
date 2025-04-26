import axios from "axios";
import { baseURL } from "./apiConfig";

export const puplicAxiosInstance = axios.create({
  baseURL
});

export const privateAxiosInstance = axios.create({
  baseURL
});

privateAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    // Choose behavior based on the request URL or a custom flag
    const needsRawToken = config?.headers?.NeedsRawToken === true;

    if (token) {
      const rawToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
      config.headers.Authorization = needsRawToken ? rawToken : token;
    }

    // Optional: remove custom flag before sending
    delete config.headers.NeedsRawToken;

    return config;
  },
  (error) => Promise.reject(error)
);
