import api from "./axios/axiosConfig";

const paymentApi = {
  // Backwards-compatible alias used by UI
  pay: (payment) => api.post("/api/payments", payment),
  makePayment: (payment) => api.post("/api/payments", payment),
  getPayments: () => api.get("/api/payments"),
};

export default paymentApi;
