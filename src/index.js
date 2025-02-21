import React from "react";
import ReactDOM from "react-dom/client";  // Import from 'react-dom/client' instead of 'react-dom'
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { requestForToken } from './firebase';
import "./index.css"; // Import your global styles here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for push notifications
serviceWorkerRegistration.register();

// Get FCM token
requestForToken();

