import axios from "axios";
import axiosConfig from "./axiosConfig";

const withJwt = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: axiosConfig.defaults.baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default withJwt;
