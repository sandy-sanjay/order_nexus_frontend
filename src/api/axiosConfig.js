import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Order service URL for now
});

export default api;
