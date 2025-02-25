// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


        // Request permission and get FCM token

        export const requestForToken = async () => {
          try {
            const fcmToken = await getToken(messaging, { vapidKey: "BGP2rtBkRLgvdQp6-Y_8sRWu7DkUyeOY3dEuCo21M01TEh2CWgA68-2LPpapkZRcOXJt6MJCKpKtz3o2CaP7hfM" });
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
      console.log('Message received. ', payload);
      resolve(payload);
    });
  });
      
      export default messaging;
          
    


    
