import withJwt from "./axios/withJwt";

const productApi = {
  getAll: () => withJwt().get("/api/products"),
  create: (product) => withJwt().post("/api/products", product),
  remove: (id) => withJwt().delete(`/api/products/${id}`),
  updateStock: (id, quantity) => withJwt().put(`/api/products/${id}/stock`, { quantity }),
  update: (id, formData) => withJwt().put(`/api/products/${id}`, formData),
};

export default productApi;
