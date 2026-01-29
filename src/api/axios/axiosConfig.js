import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const axiosConfig = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to attach the Token
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

console.log("API Base URL:", API_URL);

export default axiosConfig;
