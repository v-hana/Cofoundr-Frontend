import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../redux/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div
      className="flex h-screen bg-cover bg-[#2D2638] bg-center items-center justify-center"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')",
      }}
    >
      <div className="bg-[#A98ADA36] bg-opacity-21 border  p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Login to your Account
        </h2>
        <p className="text-gray-400 mb-8 text-center">
          Don't have an account yet?{" "}
          <a href="/signup" className="text-[#6D55B5] underline">
            Sign up
          </a>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
            className="w-full bg-[#3B364C] text-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>
            )}
            </div>
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full bg-[#3B364C] text-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              {...register("termsAccepted", {
                required: "You must agree to the Terms & Conditions",
              })}
              className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 focus:ring-2 rounded"
            />
            <label htmlFor="terms" className="text-gray-400 ml-2 text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-[#6D55B5] underline">
                Terms & Conditions
              </a>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm mb-4">
              {errors.termsAccepted.message}
            </p>
          )}
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
