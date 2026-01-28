import axios from "axios";
import axiosConfig from "./axiosConfig";

const withJwt = () => {
  const token = localStorage.getItem("token");

  const instance = axios.create({
    baseURL: axiosConfig.defaults.baseURL,
  });

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return instance;
};

export default withJwt;
