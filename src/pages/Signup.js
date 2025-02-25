import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import { useForm } from "react-hook-form";
import { requestForToken } from "../firebase";

const SignupForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate
  const { error, loading } = useSelector((state) => state.auth);
  const [emailError, setEmailError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }, watch
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const fcmToken = await requestForToken();
      console.log("FCM Token on Submit:", fcmToken);
      const registrationData = { ...data, fcmToken };

      dispatch(registerUser(registrationData)).then((result) => {
        if (registerUser.fulfilled.match(result)) {
          navigate("/login");
        } else if (registerUser.rejected.match(result)) {
          const errorMessage = result.payload?.message || "An error occurred. Please try again.";
          if (errorMessage.includes("Email already exists")) {
            setEmailError("Email already exists. Please use a different one.");
          } else {
            setEmailError(errorMessage);
          }
        }
      });
    } catch (error) {
      console.error("Failed to get FCM token:", error);
    }
  };


  return (
    <div className="flex h-screen bg-[#f6f6f6] text-[#010101] p-2">
      {/* Left Section: Swiper */}
      <div className="w-1/2 relative rounded-lg overflow-hidden bg-[#fdfdfd] shadow-lg m-3">
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} w-8 h-2  rounded-full mx-1 shadow-[rgba(149,157,165,0.2)_0px_8px_24px]
 cursor-pointer bg-[#7e012d] transition-all hover:bg-white"></span>`;
            },
          }}
          className="h-full rounded-lg"
        >
          <SwiperSlide>
            <div
              className="h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('https://via.placeholder.com/600')",
              }}
            >
              <div className="absolute inset-0 bg-[#fdfdfd] bg-opacity-50 rounded-lg"></div>
              <div className="absolute bottom-10 left-10 z-10">
                <h1 className="text-3xl font-bold text-black">
                  Capturing Moments 1
                </h1>
                <p className="text-black mt-2">
                  Create timeless memories with us and share your favorite
                  moments with the world.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('https://via.placeholder.com/601')",
              }}
            >
              <div className="absolute inset-0 bg-[#fdfdfd] bg-opacity-50 rounded-lg"></div>
              <div className="absolute bottom-10 left-10 z-10">
                <h1 className="text-3xl font-bold text-black">
                  Capturing Moments 2
                </h1>
                <p className="text-black mt-2">
                  Dive into a world of creativity and unforgettable stories.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('https://via.placeholder.com/602')",
              }}
            >
              <div className="absolute inset-0 bg-[#fdfdfd] bg-opacity-50 rounded-lg"></div>
              <div className="absolute bottom-10 left-10 z-10">
                <h1 className="text-3xl font-bold text-black">
                  Let’s create something beautiful together.
                </h1>
                <p className="text-black mt-2">
                  Let’s create something beautiful together.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Right Section: Form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <h2 className="text-3xl font-bold mb-2">Create an account</h2>
        <p className="text-[#010101b8] mb-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#6D55B5] underline">
            Login
          </a>
        </p>
        <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required." })}
              className="w-full bg-[#fdfdfd] text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7e012d]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="relative mb-3">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format.",
                },
              })}
              className="w-full bg-[#fdfdfd] text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7e012d]"
              onChange={() => setEmailError("")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            {emailError && (<p className="text-red-500 text-sm">{emailError}</p>)}
          </div>
          <div className="relative mb-3">
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
              className="w-full bg-[#fdfdfd] text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7e012d]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Please confirm your password.",
                validate: (value) =>
                  value ===
                  watch("password") || "Passwords do not match.",
              })}
              className="w-full bg-[#fdfdfd] text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7e012d]"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="terms"
              {...register("termsAccepted", {
                required: "You must agree to the Terms & Conditions.",
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
          <button
            type="submit"
            className="w-full bg-[#7e012d] text-white p-2 rounded hover:bg-gray-600 transition"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="flex items-center gap-2">
          <hr className="w-40 h-px border-[#7A7685]" />
          <div className="my-3 text-gray-500">Or create with</div>
          <hr className="w-40 h-px border-[#7A7685]" />
        </div>
        <div>
          <button className="w-full border-2 border-[#7e012d] rounded px-48 py-2">
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
export default SignupForm;