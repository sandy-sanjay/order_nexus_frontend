import api from "./axios/axiosConfig";

const notificationsApi = {
  getAll: () => api.get("/api/notifications"),
  unreadCount: () => api.get("/api/notifications/unread-count"),
  markRead: (id) => api.put(`/api/notifications/read/${id}`),
  remove: (id) => api.delete(`/api/notifications/${id}`),
};

export default notificationsApi;
