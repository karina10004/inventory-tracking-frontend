import React, { useState, useEffect } from "react";
import "./Notification.css"; // Import your CSS file for styling

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  // Simulated data (replace with actual data fetching logic)
  // useEffect(() => {
  //   // Simulate fetching notifications from an API
  //   fetch('/api/notifications')
  //     .then((response) => response.json())
  //     .then((data) => setNotifications(data))
  //     .catch((error) => console.error('Error fetching notifications:', error));
  // }, []);

  const getNotifications = async () => {
    const token = localStorage.getItem("access_token");
    const res = await fetch(
      "https://inventory-tracking.onrender.com/api/v1/notif/notifications",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resJson = await res.json();
    setNotifications(resJson);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-box">
            <div className="notification-content">
              {/* <h3>{notification.title}</h3> */}
              <p>{notification.content}</p>
              <span>
                {notification.created_at.split("T")[0]}
                <br />
                {notification.created_at.substr(11, 8)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsPage;
