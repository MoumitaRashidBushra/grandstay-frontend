import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // Allow API requests to include browser-managed credentials.
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
