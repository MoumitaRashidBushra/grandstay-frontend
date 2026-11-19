import axios from "axios";

// Create a reusable Axios instance for all backend API requests.
const api = axios.create({
  // Read the backend API URL from the environment configuration.
  baseURL: import.meta.env.VITE_API_BASE_URL,

  // Allow the browser to send and receive HttpOnly cookies.
  withCredentials: true,

  // Set JSON as the default format for API request and response data.
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
