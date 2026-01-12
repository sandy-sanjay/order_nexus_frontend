import api from "./axios/axiosConfig";

const authApi = {
  // accepts { username, password }
  login: (credentials) => api.post("/api/auth/login", credentials),
  register: (credentials) => api.post("/api/auth/register", credentials),
};

export default authApi;
