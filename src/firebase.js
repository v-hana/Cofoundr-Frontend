// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDZW0if6evJfKeMlZMSEVB-0gI7fscrTcE",
  authDomain: "pushnotifications-295b8.firebaseapp.com",
  projectId: "pushnotifications-295b8",
  storageBucket: "pushnotifications-295b8.firebasestorage.app",
  messagingSenderId: "548260533010",
  appId: "1:548260533010:web:58c546e94ceaf98be759cb",
  measurementId: "G-JJKBCZXKHS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get FCM token

export const requestForToken = async () => {
  try {
    const fcmToken = await getToken(messaging, {
      vapidKey:
        "BF3FmdDsTcDXNvIZmunTHyZAqpP66xD3QOUOwZk0pT3T5U8IbqL5VmXpHxn7avcAl9hyG3DKcoWRZZ8XaCd0lAU",
    });
    if (fcmToken) {
      console.log("FCM Token:", fcmToken); // Debugging log
      return fcmToken;
    } else {
      console.warn("No FCM token received.");
    }
  } catch (error) {
    console.error("Failed to get FCM token:", error);
  }
  return null; // Return null if token retrieval fails
};

// Handle incoming messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      resolve(payload);
    });
  });

export default messaging;
