import React, { useState } from "react";

const notifications = [
  {
    id: 1,
    user: "Tim",
    message: "invited you to join the Events.inc organization",
    time: "3:26 AM",
    actions: ["Confirm", "Decline"],
    date: "July 17, 2016",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    user: "Objective C",
    message: "will be closed in 3 days. Go there to finish your remaining tasks",
    time: "4:02 PM",
    actions: ["Go to the Challenge"],
    date: "September 17, 2016",
    avatar: "",
  },
  {
    id: 3,
    user: "John",
    message: "commented on the Healthcare challenge that you are participating",
    time: "6:45 PM",
    actions: ["View Comment"],
    date: "July 17, 2016",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 4,
    user: "Python",
    message: "will be closed in 3 days. Go there to finish your remaining tasks",
    time: "3:13 AM",
    actions: ["Go to the Challenge"],
    date: "September 17, 2016",
    avatar: "",
  },
  {
    id: 5,
    user: "Max",
    message: "invited you to join the Microsoft organization",
    time: "12:08 AM",
    actions: ["Confirm", "Decline"],
    date: "July 17, 2016",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 6,
    user: "Javascript MD",
    message: "will be closed in 3 days. Go there to finish your remaining tasks",
    time: "5:00 PM",
    actions: ["Go to the Challenge"],
    date: "September 17, 2016",
    avatar: "",
  },
  {
    id: 7,
    user: "Tim",
    message: "invited you to join the Events.inc organization",
    time: "3:26 AM",
    actions: ["Confirm", "Decline"],
    date: "July 17, 2016",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 8,
    user: "Javascript MD",
    message: "will be closed in 3 days. Go there to finish your remaining tasks",
    time: "5:00 PM",
    actions: ["Go to the Challenge"],
    date: "September 17, 2016",
    avatar: "",
  },
  {
    id: 9,
    user: "Python",
    message: "will be closed in 3 days. Go there to finish your remaining tasks",
    time: "3:13 AM",
    actions: ["Go to the Challenge"],
    date: "September 17, 2016",
    avatar: "",
  },
];

const Notifications = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  const loadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 4, notifications.length));
  };

  return (
    <div className="mx-auto p-6 bg-[#2D2638] text-white">
      <h2 className="text-xl font-semibold text-center">
        All Notifications{" "}
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          {notifications.length}
        </span>
      </h2>

      <div className="mt-4">
        {/* Notifications List */}
        <div className="space-y-6 relative">
          {notifications.slice(0, visibleCount).map((notification) => (
            <div key={notification.id} className="relative md:w-[80%] sm:w-[70%] w-[65%] flex flex-col sm:flex-row items-start bg-[#BAA7FC2E] shadow-md p-4 rounded-lg">
              {/* Avatar */}
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full">
                {notification.avatar ? (
                  <img src={notification.avatar} alt="avatar" className="w-full h-full rounded-full" />
                ) : (
                  <span className="text-gray-700 font-semibold">{notification.user.charAt(0)}</span>
                )}
              </div>

              <div className="ml-4 flex-1 md:flex justify-between items-center ">
                <div>
                <p className="text-sm">
                  <span className="font-semibold">{notification.user}</span> {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
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
          
        {/* Timeline (Positioned on the Right) */}
        <div className="flex space-x-2 items-center absolute right-0 transform translate-x-[calc(100%+20px)] top-1/2 ">
                <div className="w-3 h-3 bg-white rounded-full"></div>
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
            className="bg-[#7A7685] px-6 py-2 rounded-lg border hover:bg-gray-500 transition"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
