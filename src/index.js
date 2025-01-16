import React from "react";
import ReactDOM from "react-dom/client";  // Import from 'react-dom/client' instead of 'react-dom'
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css"; // Import your global styles here

// Get the root element
const root = document.getElementById("root");

// Create a root and render the App component
const rootElement = ReactDOM.createRoot(root);
rootElement.render(
  <Provider store={store}>
    <App />
  </Provider>
);
