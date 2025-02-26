// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZW0if6evJfKeMlZMSEVB-0gI7fscrTcE",
  authDomain: "pushnotifications-295b8.firebaseapp.com",
  projectId: "pushnotifications-295b8",
  storageBucket: "pushnotifications-295b8.firebasestorage.app",
  messagingSenderId: "548260533010",
  appId: "1:548260533010:web:58c546e94ceaf98be759cb",
  measurementId: "G-JJKBCZXKHS"
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