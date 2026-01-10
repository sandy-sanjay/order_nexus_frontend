import api from "./axios/axiosConfig";

const authApi = {
  // accepts { username, password }
  login: (credentials) => api.post("/api/auth/login", credentials),
};

export default authApi;
