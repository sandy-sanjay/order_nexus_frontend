import axios from "axios";
import withJwt from "./withJwt";

const axiosOrder = axios.create({
  baseURL: "http://localhost:8083",
});

withJwt(axiosOrder);

export default axiosOrder;
