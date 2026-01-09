import axios from "axios";

const authApi = {
  login: (data) =>
    axios.post("https://auth-service-ejig.onrender.com/api/auth/login", data),
};

export default authApi;
