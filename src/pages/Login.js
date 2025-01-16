import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div
      className="flex h-screen bg-cover bg-[#2D2638] bg-center items-center justify-center"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')", // Replace with your image URL
      }}
    >
      <div className="bg-[#A98ADA36] bg-opacity-21 border p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Login to your Account
        </h2>
        <p className="text-gray-400 mb-8 text-center">
          Don't have an account yet?{" "}
          <a href="/signup" className="text-[#6D55B5] underline">
            Sign up
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#3B364C] text-gray-300 p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#3B364C] text-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#6D55B5] text-white p-3 rounded hover:bg-indigo-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="flex items-center gap-2">
          <hr className="w-40 h-px border-[#7A7685]" />
          <div className="my-6 text-gray-500">Or login with</div>
          <hr className="w-40 h-px border-[#7A7685]" />
        </div>
        <div>
          <button className="w-full border-2 border-[#7A7685] text-gray-300 p-3 rounded hover:bg-gray-600 transition flex items-center justify-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google"
              className="h-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
