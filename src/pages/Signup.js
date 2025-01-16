import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

<<<<<<< HEAD
const SignupForm = () => {
    const captions = [
        "Capturing Moments, Creating Memories",
        "Transform Your Ideas Into Reality",
        "Share Stories That Inspire and Connect",
      ];
    
      // Track the current caption (page)
      const [currentCaption, setCurrentCaption] = useState(0);
    
      // Handle manual navigation through indicators
      const handleIndicatorClick = (index) => {
        setCurrentCaption(index);
      };
      

=======

const LoginForm = () => {
>>>>>>> aa514e0b7d2dfd3ab2f9f5316516ae514c555375
  return (
    <div className="flex h-screen bg-[#2D2638] text-white p-2">
      {/* Left Section: Swiper */}
      <div className="w-1/2 relative rounded-lg overflow-hidden bg-[#775F9E] shadow-lg m-3">
        
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} w-8 h-2 bg-gray-400 rounded-full mx-1 cursor-pointer transition-all hover:bg-white"></span>`,
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
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
              <div className="absolute bottom-10 left-10 z-10">
                <h1 className="text-3xl font-bold text-white">
                  Capturing Moments 1
                </h1>
                <p className="text-gray-300 mt-2">
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
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
              <div className="absolute bottom-10 left-10 z-10">
                <h1 className="text-3xl font-bold text-white">
                  Capturing Moments 2
                </h1>
                <p className="text-gray-300 mt-2">
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
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
              <div className="absolute bottom-10 left-10 z-10">
                <h1 className="text-3xl font-bold text-white">
                  Let’s create something beautiful together.
                </h1>
                <p className="text-gray-300 mt-2">
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
        <p className="text-gray-400 mb-4">
          Doesn't have an account yet?{" "}
          <a href="/login" className="text-[#6D55B5] underline">
            Sign Up
          </a>
        </p>
        <form className="w-full max-w-md">
        <input
            type="Name"
            placeholder="Full Name"
            className="w-full bg-[#3B364C] text-gray-300 p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-[#3B364C] text-gray-300 p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-[#3B364C] text-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full bg-[#3B364C] text-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 focus:ring-2 rounded"
            />
            <label htmlFor="terms" className="text-gray-400 ml-2 text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-[#6D55B5] underline">
                Terms & Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#6D55B5] text-white p-3 rounded hover:bg-indigo-600 transition"
          >
            Create Account
          </button>
        </form>
        <div className="flex items-center gap-2">
        <hr className="w-40 h-px border-[#7A7685]"/>
        <div className="my-6 text-gray-500">Or create with</div>
        <hr className="w-40 h-px border-[#7A7685]"/>
        </div>
        
        <div>
          <button className="w-full border-2 border-[#7A7685] rounded px-48 py-2">
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
