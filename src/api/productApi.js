import api from "./axios/axiosConfig";

const productApi = {
  getAll: () => api.get("/api/products"),
  create: (product) => api.post("/api/products", product),
  remove: (id) => api.delete(`/api/products/${id}`),
  updateStock: (id, quantity) => api.put(`/api/products/${id}/stock`, { quantity }),
  update: (id, formData) => api.put(`/api/products/${id}`, formData),
};

export default productApi;
