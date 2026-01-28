import withJwt from "./axios/withJwt";

const paymentApi = {
  // Backwards-compatible alias used by UI
  pay: (payment) => withJwt().post("/api/payments", payment),
  makePayment: (payment) => withJwt().post("/api/payments", payment),
  getPayments: () => withJwt().get("/api/payments"),
};

export default paymentApi;
