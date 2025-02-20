// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken,onMessage } from "firebase/messaging";

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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


      // Requesting permission in `firebase.js`
export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BJPm9jzGwPRgMMqF8UzDtJS95ZGHE2I-Z4zta09D4fuxmuKziqeDeZVhbUGTe58LaTCzhDmp2yuGc5tx7RBMKFI",
    });
    console.log("FCM Token:", token);
  } else {
    console.log("Notification permission not granted.");
  }
};

      
      // Listen for messages
      export const onMessageListener = () =>
        new Promise((resolve) => {
          onMessage(messaging, (payload) => {
            console.log("Message received: ", payload);
            resolve(payload);
          });
        });
      
      export default messaging;
          
    


    
