import axios from "axios";

const authApi = {
  login: (data) =>
    axios.post("http://localhost:8081/api/auth/login", data),
};

export default authApi;
