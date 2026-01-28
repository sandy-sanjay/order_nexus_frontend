import api from "./axios/axiosConfig";

const authApi = {
  // accepts { username, password }
  login: (credentials) => api.post("/api/auth/login", credentials),
  register: (credentials) => api.post("/api/auth/register", credentials),
  googleLogin: (data) => api.post("/api/auth/google", data),
};

export default authApi;
