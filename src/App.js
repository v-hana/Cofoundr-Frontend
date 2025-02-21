import React, { useEffect }  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import SignupForm from "./pages/Signup";
import LoginForm from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/home";
import ProfileGrid from "./pages/ExploreProfiles";
import SingleProfile from "./pages/SingleProfile";
import AddPost from "./pages/AddPost";
import Notifications from "./pages/Notifications";
import EditProfile from "./pages/EditProfile";
import { requestForToken} from "../src/firebase";
import axios from 'axios';


const App = () => {
  useEffect(() => {
    const saveFcmToken = async () => {
      const token = await requestForToken();
      if (token) {
        try {
          await axios.post('/api/notifications/save-fcm-token', 
            { fcmToken: token }, 
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          console.log('FCM Token saved successfully');
        } catch (error) {
          console.error('Failed to save FCM token:', error);
        }
      }
    };

    saveFcmToken();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore-profiles" element={<ProfileGrid />} />
            <Route path="/single-profile" element={<SingleProfile />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};
// index.js or App.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

export default App;