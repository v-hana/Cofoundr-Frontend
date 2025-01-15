import React,{useState} from "react";

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
      

  return (
    <div className="flex h-screen bg-gray-900 text-white p-3">

      {/* Left Section: Image with Pagination */}
      <div
        className="w-1/2 bg-cover bg-center relative rounded-lg overflow-hidden shadow-lg m-4"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-10 left-10 z-10">
          <h1 className="text-3xl font-bold">{captions[currentCaption]}</h1>
          <div className="flex space-x-2 mt-4">
            {/* Pagination indicators */}
            {captions.map((_, index) => (
              <div
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`h-2 w-8 rounded cursor-pointer ${
                  currentCaption === index
                    ? "bg-white"
                    : "bg-gray-500"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <h2 className="text-3xl font-bold mb-4">Create an account</h2>
        <p className="text-gray-400 mb-8">
          Already have an account? <a href="/login" className="text-indigo-400">Log in</a>
        </p>
        <form className="w-full max-w-md">
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Full name"
              className="w-full bg-gray-800 text-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-800 text-gray-300 p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-gray-800 text-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400">
            </span>
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full bg-gray-800 text-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400">
            </span>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 focus:ring-2 rounded"
            />
            <label htmlFor="terms" className="text-gray-400 ml-2 text-sm">
              I agree to the <a href="/terms" className="text-indigo-400">Terms & Conditions</a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600 transition"
          >
            Create account
          </button>
        </form>
        <div className="my-6 text-gray-500">Or register with</div>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 bg-gray-800 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" className="h-5" />
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default SignupForm;