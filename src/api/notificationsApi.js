import axiosNotifications from "./axios/axiosNotifications";

const notificationsApi = {
  getAll: () =>
    axiosNotifications.get("/api/notifications"),

  unreadCount: () =>
    axiosNotifications.get("/api/notifications/unread-count"),

  markRead: (id) =>
    axiosNotifications.put(`/api/notifications/read/${id}`),

  remove: (id) =>
    axiosNotifications.delete(`/api/notifications/${id}`),
};

export default notificationsApi;
