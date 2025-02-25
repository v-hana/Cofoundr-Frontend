import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuMessageSquareText, LuUsers } from "react-icons/lu";
import { MdOutlinePostAdd } from "react-icons/md";
import { fetchUserProfile } from "../redux/userSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch()
  console.log(user, 'user');
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <>
      <nav className="bg-[#fdfdfd] lg:px-20 md:px-20 py-2 flex justify-between items-center  sm:px-6 max-sm:px-4">
        {/* Profile Icon */}
        <div className="flex items-center">
          <img
            src={user?.profilePhoto || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-14 h-14 rounded-full border-4 border-[#BAA7FC2E] transition duration-300 hover:border-purple-500"
            onClick={() => navigate("/user-profile")}
          />
        </div>
        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#f6f6f6] shadow text-[#010101b8] rounded-full  px-10 py-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-[#010101b8]"></i>
          </div>
        </div>
        {/* Right-Side Icons */}
        <div>
          {/* Show all icons above 640px */}
          <div className="hidden sm:flex items-center space-x-4" >
            <button className="text-[#010101b8]  text-xl w-10 h-10 rounded-full border-2 border-[#BAA7FC2E] hover:text-white flex justify-center items-center transition duration-300" onClick={() => navigate("/notifications")}>
              <IoNotificationsOutline />
            </button>
            <button className="text-[#010101b8] text-xl w-10 h-10 rounded-full border-2 border-[#BAA7FC2E] hover:text-white flex justify-center items-center transition duration-300" onClick={() => navigate("/message")}>
              <LuMessageSquareText />
            </button >
            <button className="text-[#010101b8] text-xl w-10 h-10 rounded-full border-2 border-[#BAA7FC2E] hover:text-white flex justify-center items-center transition duration-300" onClick={() => navigate("/explore-profiles")}>
              <LuUsers />
            </button>
            <button className="text-[#010101b8] text-xl w-10 h-10 rounded-full border-2 border-[#BAA7FC2E] hover:text-white flex justify-center items-center transition duration-300" onClick={() => navigate("/add-post")}>
              <MdOutlinePostAdd />
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
      </nav >
    </>
  );
};

export default Navbar;
