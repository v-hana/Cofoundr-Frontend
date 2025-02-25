// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYwQ2G0gyEFrvqZVnGNj8ziGbKpYS9W60",
  authDomain: "pushnotifications-f2d69.firebaseapp.com",
  projectId: "pushnotifications-f2d69",
  storageBucket: "pushnotifications-f2d69.firebasestorage.app",
  messagingSenderId: "366504581754",
  appId: "1:366504581754:web:06d2c6ad9ff33ddbe3b9c3",
  measurementId: "G-NCZM65KK3G"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Optional: Add your icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
