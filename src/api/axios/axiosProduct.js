import axios from "axios";
import withJwt  from "./withJwt";

const axiosProduct = axios.create({
  baseURL: "https://inventory-service-xxxx.onrender.com", 
});

withJwt(axiosProduct);
export default axiosProduct;
