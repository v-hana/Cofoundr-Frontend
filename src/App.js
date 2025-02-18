import React from "react";
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

const App = () => {
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

export default App;