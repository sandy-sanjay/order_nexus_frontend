import axiosPayment from "./axios/axiosPayment";

const paymentApi = {
  pay: (data) => axiosPayment.post("/api/payments", data),
};

export default paymentApi;
