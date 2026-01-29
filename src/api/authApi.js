import api from "./axios/axiosConfig";

const authApi = {
  // accepts { username, password }
  login: (credentials) => api.post("/api/auth/login", credentials),
  register: (credentials) => api.post("/api/auth/register", credentials),
  googleLogin: (data) => api.post("/api/auth/google", data),

  // Verify JWT token with backend
  verifyToken: () => {
    const token = localStorage.getItem("token");
    return api.get("/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default authApi;
