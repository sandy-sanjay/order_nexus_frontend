import axiosOrder from "./axios/axiosOrder";

const OrderApi = {
  // create order
  create: (data) =>
    axiosOrder.post("/api/orders", data),

  // get all orders
  getAll: () =>
    axiosOrder.get("/api/orders"),

  // get order by id
  getById: (id) =>
    axiosOrder.get(`/api/orders/${id}`),

  // ✅ REQUIRED BY DASHBOARD
  revenue: () =>
    axiosOrder.get("/api/orders/revenue"),

  // ✅ REQUIRED BY DASHBOARD
  topProducts: () =>
    axiosOrder.get("/api/orders/top-products"),
};

export default OrderApi;
