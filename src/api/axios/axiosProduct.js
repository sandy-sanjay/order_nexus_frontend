import axios from "axios";
import withJwt  from "./withJwt";

const axiosProduct = axios.create({
  baseURL: "http://localhost:8082",
});

withJwt(axiosProduct);
export default axiosProduct;
