// public/firebase-messaging-sw.js
self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("Push notification received:", data);

  self.registration.showNotification(data.notification.title, {
    body: data.notification.body,
    icon: "/logo192.png",
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("http://localhost:3000/notifications")
  );
});
