importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging.js");

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

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png",
  });
});
