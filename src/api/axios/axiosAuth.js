import axios from "axios";
import { withJwt } from "./withJwt";

const axiosAuth = axios.create({
  baseURL: "http://localhost:8081",
});

withJwt(axiosAuth);
export default axiosAuth;
