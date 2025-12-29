import { useEffect, useState } from "react";
import api from "../api/axiosConfig";


function NotificationsPage() {
  const [list, setList] = useState([]);

  const loadNotifications = () => {
    api
      .get("http://localhost:8085/api/notifications")
      .then((res) => setList(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // 🔹 AUTO MARK READ
  const markRead = (notification) => {
    if (!notification.readStatus) {
      api
        .put(
          `http://localhost:8085/api/notifications/read/${notification.id}`
        )
        .then(() => {
          loadNotifications();
          window.dispatchEvent(new Event("refreshNotifications"));
        });
    }
  };

  const deleteNotification = (id) => {
    api
      .delete(`http://localhost:8085/api/notifications/${id}`)
      .then(() => {
        loadNotifications();
        window.dispatchEvent(new Event("refreshNotifications"));
      });
  };

        const thStyle = {
        padding: "12px",
        borderBottom: "2px solid #dee2e6",
        color: "#555"
      };

      const tdStyle = {
        padding: "12px",
        borderBottom: "1px solid #eee"
      };


  return (
  <div
    style={{
      padding: "30px",
      background: "#f4f6f8",
      minHeight: "100vh"
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        🔔 Notifications
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "15px"
        }}
      >
        <thead>
          <tr style={{ background: "#f1f3f5", textAlign: "left" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Order</th>
            <th style={thStyle}>Message</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.map((n) => (
            <tr
              key={n.id}
              onClick={() => markRead(n)}
              style={{
                cursor: "pointer",
                backgroundColor: n.readStatus ? "#fff" : "#eef6ff",
                transition: "0.2s"
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#f9fafb")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background =
                  n.readStatus ? "#fff" : "#eef6ff")
              }
            >
              <td style={tdStyle}>{n.id}</td>
              <td style={tdStyle}>{n.orderId}</td>
              <td style={tdStyle}>{n.message}</td>
              <td style={tdStyle}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: n.readStatus ? "#155724" : "#0c5460",
                    background: n.readStatus ? "#d4edda" : "#d1ecf1"
                  }}
                >
                  {n.readStatus ? "Read" : "Unread"}
                </span>
              </td>
              <td style={tdStyle}>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 🔴 unchanged
                    deleteNotification(n.id);
                  }}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "5px",
                    border: "none",
                    background: "#dc3545",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}

export default NotificationsPage;
