import axiosProduct from "./axios/axiosProduct";

const productApi = {
  getAll: () => axiosProduct.get("/api/products"),

  create: (data) =>
    axiosProduct.post("/api/products", data),

  updateStock: (id, qty) =>
    axiosProduct.put(`/api/products/${id}`, { quantity: qty }),

  remove: (id) =>
    axiosProduct.delete(`/api/products/${id}`),
};

export default productApi;
