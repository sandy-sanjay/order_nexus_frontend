import axios from "axios";
import { withJwt } from "./withJwt";

const axiosAuth = axios.create({
  baseURL: "https://auth-service-ejig.onrender.com",
});

withJwt(axiosAuth);
export default axiosAuth;
