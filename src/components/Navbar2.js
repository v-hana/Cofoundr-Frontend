import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#fdfdfd] px-8 py-2 flex justify-between items-center">
        {/* Profile Icon */}
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-14 h-14 rounded-full border-4 border-[#BAA7FC2E] transition duration-300 hover:border-purple-500"
          />
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 max-sm:mx-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#BAA7FC2E] shadow text-white rounded-full  px-10 py-2  transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* Right-Side Icons */}
        <div>
          {/* Show all icons above 640px */}
          <div className="hidden sm:flex items-center space-x-4 sm:space-x-2">
            <button className="text-gray-400 hover:text-white">
              <i className="fas fa-bell w-10 h-10 rounded-full shadow border-4 border-[#BAA7FC2E] flex justify-center items-center transition duration-300 hover:border-purple-500 hover:text-white"></i>
            </button>
            <button className="text-gray-400 hover:text-white">
              <i className="fas fa-envelope w-10 h-10 rounded-full shadow border-4 border-[#BAA7FC2E] flex justify-center items-center transition duration-300 hover:border-purple-500 hover:text-white"></i>
            </button>
            <button className="text-gray-400 hover:text-white">
              <i className="fas fa-users w-10 h-10 rounded-full shadow border-4 border-[#BAA7FC2E] flex justify-center items-center transition duration-300 hover:border-purple-500 hover:text-white"></i>
            </button>
            <button className="text-gray-400 hover:text-white">
              <i className="fas fa-plus w-10 h-10 rounded-full shadow border-4 border-[#BAA7FC2E] flex justify-center items-center transition duration-300 hover:border-purple-500 hover:text-white"></i>
            </button>
          </div>

          {/* Show single dropdown icon below 640px */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              <i className="fas fa-ellipsis-h"></i>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-[#2D2638] rounded-lg shadow-lg p-4 space-y-4 z-10">
                <button className="flex items-center text-gray-400 hover:text-white">
                  <i className="fas fa-bell mr-2"></i>
                  <span>Notifications</span>
                </button>
                <button className="flex items-center text-gray-400 hover:text-white">
                  <i className="fas fa-envelope mr-2"></i>
                  <span>Messages</span>
                </button>
                <button className="flex items-center text-gray-400 hover:text-white">
                  <i className="fas fa-users mr-2"></i>
                  <span>Community</span>
                </button>
                <button className="flex items-center text-gray-400 hover:text-white">
                  <i className="fas fa-plus mr-2"></i>
                  <span>Add Post</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
