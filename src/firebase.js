// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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


        // Request permission and get FCM token
export const requestForToken = async () => {
  try {
    console.log("hi")
    const currentToken = await getToken(messaging, { vapidKey: 'BHhp00-ilGA7bG5l48sYC5STkEYG25tUrI3PzAdMhxSWeAsS79_Jz-dpWezizLZTiDHfQ2BXD4zhu8RGTEx_ztw' });
    console.log("tokenn", currentToken)
    if (currentToken) {
      console.log('FCM Token:', currentToken);
      return currentToken;
    } else {
      console.log('No registration token available.');
    }
  } catch (error) {
    console.log('An error occurred while retrieving token.', error);
  }
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
          
    


    
