import api from "./axios/axiosConfig";

const orderApi = {
  getAll: () => api.get("/api/orders"),
  create: (order) => api.post("/api/orders", order),

  // ✅ Dashboard APIs
  revenue: () => api.get("/api/orders/revenue"),
  topProducts: () => api.get("/api/orders/top-products"),
};

export default orderApi;
