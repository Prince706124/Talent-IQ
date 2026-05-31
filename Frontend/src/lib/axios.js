import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api`
  : "/api";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true, // By adding this field, browser will send cookies to server automatically on every single request
});

export default axiosInstance;
