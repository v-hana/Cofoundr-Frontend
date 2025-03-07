import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsOutline, IoHomeOutline } from "react-icons/io5";
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
      <nav className="bg-[#fdfdfd] px-8 py-2 flex justify-between items-center">
        {/* Profile Icon */}
        <div className="flex items-center">
          <img
            src={user?.profilePhoto || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-14 h-14 rounded-full border-4 border-[#BAA7FC2E] transition duration-300 hover:border-[#7e012d]"
            onClick={() => navigate("/user-profile")}
          />
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 max-sm:mx-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#BAA7FC2E] shadow text-white rounded-full  px-10 py-2  transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#7e012d]"
            />
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* Right-Side Icons */}
        <div>
          {/* Show all icons above 640px */}
          <div className="hidden sm:flex items-center space-x-4 sm:space-x-2">
            <button className="text-[#010101b8]  text-xl w-10 h-10 rounded-full border-2 border-[#BAA7FC2E] hover:border-[#7e012d] flex justify-center items-center transition duration-300" onClick={() => navigate("/home")}>
              <IoHomeOutline />
            </button>
            <button className="text-[#010101b8]  text-xl w-10 h-10 rounded-full border-2 border-[#BAA7FC2E]  hover:border-[#7e012d] flex justify-center items-center transition duration-300" onClick={() => navigate("/notifications")}>
              <IoNotificationsOutline />
            </button>
            <button className="text-[#010101b8]  text-xl w-10 h-10 rounded-full border-2 border-[#BAA7FC2E]  hover:border-[#7e012d] flex justify-center items-center transition duration-300" onClick={() => navigate("/message")}>
              <LuMessageSquareText />
            </button>
            <button className="text-[#010101b8]  text-xl w-10 h-10 rounded-full border-2 border-[#BAA7FC2E]  hover:border-[#7e012d] flex justify-center items-center transition duration-300" onClick={() => navigate("/explore-profiles")}>
              <LuUsers />
            </button>
            <button className="text-[#010101b8]  text-xl w-10 h-10 rounded-full border-2 border-[#BAA7FC2E]  hover:border-[#7e012d] flex justify-center items-center transition duration-300" onClick={() => navigate("/add-post")}>
              <MdOutlinePostAdd />
            </button>
          </div>

          {/* Show single dropdown icon below 640px */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#010101b8] text-2xl focus:outline-none"
            >
              <i className="fas fa-ellipsis-h"></i>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-[#2D2638] rounded-lg shadow-lg p-4 space-y-4 z-10">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <IoHomeOutline />
                  <span>Home</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <IoNotificationsOutline />
                  <span>Notifications</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <LuMessageSquareText />
                  <span>Messages</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <LuUsers />
                  <span>Community</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <MdOutlinePostAdd />
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
