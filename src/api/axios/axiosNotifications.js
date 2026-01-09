import axios from "axios";

const axiosNotifications = axios.create({
  baseURL: "https://notification-service-xxxx.onrender.com",
});

axiosNotifications.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosNotifications;
