import withJwt from "./axios/withJwt";

const notificationsApi = {
  getAll: () => withJwt().get("/api/notifications"),
  unreadCount: () => withJwt().get("/api/notifications/unread-count"),
  markRead: (id) => withJwt().put(`/api/notifications/read/${id}`),
  remove: (id) => withJwt().delete(`/api/notifications/${id}`),
};

export default notificationsApi;
