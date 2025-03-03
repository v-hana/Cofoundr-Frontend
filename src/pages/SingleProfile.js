import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faExternalLinkAlt, faPen, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfile } from "../redux/profileSlice";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SingleProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user: profile, posts, loading, error } = useSelector((state) => state.profile);

  const postsSwiperRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile(id));
  }, [dispatch, id]);

  const handleSwipe = (swiperRef, direction) => {
    if (!swiperRef.current) return;
    direction === "next" ? swiperRef.current.slideNext() : swiperRef.current.slidePrev();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-options-container")) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="w-full bg-[#f6f6f6] text-black flex flex-col items-center overflow-x-hidden">
      {/* Profile Section */}
      <div className="p-6 relative w-full">
        {/* Options Button */}
        <div className="absolute top-6 right-6 profile-options-container">
          <button
            className="text-black hover:text-gray-500 lg:px-20 py-2 sm:px-10 text-lg transform hover:scale-125 transition duration-100"
            onClick={() => setShowOptions(!showOptions)}
          >
            <FontAwesomeIcon icon={faEllipsisV} size="xl" />
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-50">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Edit Profile</li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <img
            src={profile.profilePhoto || "https://i.ibb.co/WpXfyPL/Ellipse-2.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-8 border-[#7e012d]"
          />
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="font-semibold">
            <a
              href={`https://www.google.com/maps?q=${profile.location}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.location} <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </p>
          <p className="text-[#010101b8]">{profile.experience}</p>
        </div>
      </div>

      {/* Skills, Preferences, Experience */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-4 sm:gap-8 mt-6">
        {[
          { title: "Skills", description: profile.skills?.join(", ") || "N/A" },
          { title: "Preferences", description: profile.preferences?.join(", ") || "N/A" },
          { title: "Experience", description: profile.experience || "N/A" },
        ].map((item, index) => (
          <div key={index} className="relative">
            <div className="w-60 px-6 py-3 rounded-lg flex flex-col items-center justify-center shadow bg-[#fdfdfd]">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-[#010101b8] text-center">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Posts Section */}
      <div className="w-full mt-10 px-10 lg:px-20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Posts</h3>
          <div className="flex gap-2">
            <button onClick={() => handleSwipe(postsSwiperRef, "prev")} className="w-10 h-10 rounded-full hover:border-[#7e012d] border-2">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button onClick={() => handleSwipe(postsSwiperRef, "next")} className="w-10 h-10 rounded-full hover:border-[#7e012d] border-2">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={(swiper) => (postsSwiperRef.current = swiper)}
          spaceBetween={20}
          slidesPerView={1}
          className="pb-6"
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <SwiperSlide key={index} className="bg-[#fdfdfd] rounded-lg shadow-md p-4 relative">
                <img src={post.img} alt="" className="w-full h-40 object-cover rounded-lg" />
                <button className="absolute top-6 right-6 bg-white text-[#2D2638] p-1 rounded hover:bg-[#BAA7FC2E] hover:text-white hover:scale-110 transition duration-300">
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <p className="text-sm text-[#010101b8] mt-2">{post.content}</p>
                <p className="text-xs text-white absolute bottom-2 right-2">{post.createdAt}</p>
              </SwiperSlide>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default SingleProfile;
