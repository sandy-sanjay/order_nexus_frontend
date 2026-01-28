import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const axiosConfig = axios.create({
  baseURL: API_URL,
});

console.log("API Base URL:", API_URL);

export default axiosConfig;
