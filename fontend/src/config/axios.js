import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // fallback
});

// Automatically attach token if exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("🔗 Axios Request Config:", config); // Debug: log every request
  return config;
});

export default axiosInstance;
