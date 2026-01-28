import { useEffect, useState } from "react";
import notificationsApi from "../api/notificationsApi";
import "../styles/Notifications.css";

function NotificationsPage() {
  const [list, setList] = useState([]);

  const load = () => {
    notificationsApi
      .getAll()
      .then(res => setList(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = (id) => {
  notificationsApi.markRead(id).then(() => {
    load();

    // 🔥 TELL SIDEBAR TO REFRESH
    window.dispatchEvent(new Event("refreshNotifications"));
  });
};

 const remove = (id) => {
  notificationsApi.remove(id).then(() => {
    load();

    // 🔥 ALSO REFRESH SIDEBAR
    window.dispatchEvent(new Event("refreshNotifications"));
  });
};

  return (
    <div className="notifications-page">
      <h2 className="notifications-title">🔔 Notifications</h2>

      <table className="notifications-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Order</th>
            <th>Message</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No notifications found
              </td>
            </tr>
          )}

          {list.map(n => (
            <tr key={n.id}>
              <td>{n.id}</td>
              <td>{n.orderId}</td>
              <td>{n.message}</td>

              <td className={n.readStatus ? "badge-read" : "badge-unread"}>
                {n.readStatus ? "Read" : "Unread"}
              </td>

              <td>
                {!n.readStatus && (
                  <button
                    className="btn-read"
                    onClick={() => markRead(n.id)}
                  >
                    Mark Read
                  </button>
                )}

                <button
                  className="btn-delete"
                  onClick={() => remove(n.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NotificationsPage;
