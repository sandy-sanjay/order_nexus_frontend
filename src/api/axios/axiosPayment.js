import axios from "axios";
import withJwt  from "./withJwt";

const axiosPayment = axios.create({
  baseURL: "https://payment-service-xxxx.onrender.com",
});

withJwt(axiosPayment);
export default axiosPayment;
