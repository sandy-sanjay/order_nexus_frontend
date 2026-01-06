import axios from "axios";
import withJwt  from "./withJwt";

const axiosPayment = axios.create({
  baseURL: "http://localhost:8084",
});

withJwt(axiosPayment);
export default axiosPayment;
