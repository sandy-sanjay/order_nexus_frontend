import axios from "axios";
import withJwt from "./withJwt";

const axiosOrder = axios.create({
  baseURL: "https://order-service-xxxx.onrender.com",
});

withJwt(axiosOrder);

export default axiosOrder;
