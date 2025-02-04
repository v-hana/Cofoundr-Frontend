import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import SignupForm from "./pages/Signup";
import LoginForm from "./pages/Login";
import Home from "./pages/home";
import UserProfile from "./pages/UserProfile";
import SingleProfile from "./pages/SingleProfile";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/single-profile" element={<SingleProfile />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
