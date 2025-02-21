import React, { useState, useEffect } from "react";
import { requestForToken, onMessageListener } from "../firebase";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const getToken = async () => {
      console.log("tokenee");
      const token = await requestForToken();
    };
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        getToken();
      }
    });

    // Listen for new messages
    onMessageListener()
      .then((payload) => {
        console.log("New notification received:", payload);
        const newNotification = {
          id: notifications.length + 1,
          user: payload.notification.title || "Unknown",
          message: payload.notification.body || "New notification",
          time: new Date().toLocaleTimeString(),
          actions: ["View"],
          date: new Date().toLocaleDateString(),
          avatar: "", // You can customize based on payload
        };
        setNotifications((prev) => [newNotification, ...prev]);
      })
      .catch((err) => console.log("Error receiving message:", err));
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 4, notifications.length)
    );
  };

  return (
    <div className="mx-auto p-6 bg-[#f6f6f6] text-black">
      <h2 className="text-xl font-semibold text-center">
        All Notifications{" "}
        <span className="bg-[#7e012d] text-white text-xs px-2 py-1 rounded-full">
          {notifications.length}
        </span>
      </h2>

      <div className="mt-4">
        <div className="space-y-6 relative">
          {notifications.slice(0, visibleCount).map((notification) => (
            <div
              key={notification.id}
              className="relative flex flex-col sm:flex-row items-start bg-white shadow-md p-4 rounded-lg"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full">
                {notification.avatar ? (
                  <img
                    src={notification.avatar}
                    alt="avatar"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-gray-700 font-semibold">
                    {notification.user.charAt(0)}
                  </span>
                )}
              </div>

              <div className="ml-4 flex-1 md:flex justify-between items-center">
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">{notification.user}</span>{" "}
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>

                <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-auto flex-wrap">
                  {notification.actions.map((action, index) => (
                    <button
                      key={index}
                      className={`text-sm font-semibold ${
                        action === "Confirm"
                          ? "text-green-500"
                          : action === "Decline"
                          ? "text-red-500"
                          : "text-blue-500"
                      } hover:underline`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 items-center absolute right-0 transform translate-x-[calc(100%+20px)] top-1/2">
                <div className="w-3 h-3 bg-[#7e012d] rounded-full"></div>
                <p className="text-xs">{notification.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {visibleCount < notifications.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="bg-[#7e012d] text-white px-6 py-2 rounded-lg border hover:border-gray-500 transition"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
