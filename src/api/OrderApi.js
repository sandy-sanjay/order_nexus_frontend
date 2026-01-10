import withJwt from "./axios/withJwt";

const orderApi = {
  getAll: () => withJwt().get("/api/orders"),
  create: (order) => withJwt().post("/api/orders", order),

  // ✅ Dashboard APIs
  revenue: () => withJwt().get("/api/orders/revenue"),
  topProducts: () => withJwt().get("/api/orders/top-products"),
};

export default orderApi;
