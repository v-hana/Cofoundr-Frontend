// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx6LWuRTJhyUmC40d3huJ5UohqRF3Whik",
  authDomain: "pushnotifications-ede6d.firebaseapp.com",
  projectId: "pushnotifications-ede6d",
  storageBucket: "pushnotifications-ede6d.firebasestorage.app",
  messagingSenderId: "967905308980",
  appId: "1:967905308980:web:ebd44cd8d122ff9cc7b561",
  measurementId: "G-K5RBPGFC66"
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
