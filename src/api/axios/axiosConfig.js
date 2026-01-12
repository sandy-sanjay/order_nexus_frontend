import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://order-nexus-backend.onrender.com",
});

console.log("API Base URL:", process.env.REACT_APP_API_URL || "https://order-nexus-backend.onrender.com");

export default axiosConfig;
