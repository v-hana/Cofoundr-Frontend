import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/userSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faPen, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link for navigation
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, posts = [], saved = [], status } = useSelector((state) => state.user);
  const postsSwiperRef = useRef(null);
  const savedSwiperRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleSwipe = (swiperRef, direction) => {
    if (!swiperRef.current) return;
    direction === "next" ? swiperRef.current.slideNext() : swiperRef.current.slidePrev();
  };

  // Loading state handling
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="text-black">
      <div className="mx-auto h-full bg-[#f6f6f6] px-6 sm:px-10 lg:px-20 py-10">
        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row md:flex-row gap-8 rounded-lg">
          {/* Left Profile Card */}
          <div className="relative flex flex-col items-center justify-center gap-8 w-full lg:w-1/3 md:1/2 bg-white shadow rounded-lg text-center p-6">
            {/* Link to EditProfile Page */}
            <Link to="/edit-profile" className="absolute top-2 right-2 text-[#2D2638] p-2 rounded transition duration-300 hover:scale-110">
              <FontAwesomeIcon icon={faPen} />
            </Link>
            <img
              src={user?.profilePhoto || "https://i.ibb.co/WpXfyPL/Ellipse-2.png"}
              alt="Profile"
              className="w-36 h-36 rounded-full border-8 border-[#7e012d]"
            />
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="bg-[#f4f4f4] p-6 rounded-lg md:p-4">
                <p className="text-lg md:text-md">Profile Views</p>
                <p className="text-5xl font-semibold md:text-4xl">{user?.profileViews || 0}</p>
              </div>
            </div>
            <button className="bg-[#7e012d] text-white px-4 py-2 rounded-full w-1/2 border-2 border-transparent hover:border-purple-500 transition duration-300">
              Log Out
            </button>
          </div>

          {/* Right Info Section */}
          <div className="w-full lg:w-2/3">
            <div className="p-6 md:p-4">
              <h2 className="text-lg font-semibold mt-4">{user?.name}</h2>
              <p className="text-[#7A7685]">{user?.email}</p>
            </div>
            {/* Address & Map */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6 md:gap-0">
              <div className="p-6 md:p-4">
                <strong>{user?.location?.city}, {user?.location?.country}</strong>
                <p className="text-[#7A7685]">
                  {user?.location?.address} <br />
                  {user?.location?.city}, {user?.location?.state} {user?.location?.zipCode}
                  <br />
                  {user?.phone || "Phone not available"}
                </p>
              </div>

              <div className="right-content w-full md:w-1/2">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(user?.location?.address)}&key=YOUR_GOOGLE_MAPS_API_KEY`}
                  className="w-full h-48 shadow rounded-lg"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map"
                ></iframe>
              </div>
            </div>

            {/* Skills Section */}
            <div className="p-6 md:p-4">
              <strong>Skills</strong>
              <div className="flex flex-wrap gap-4 mt-2">
                {user?.skills?.map((skill, index) => (
                  <div key={index} className="px-6 py-2 border border-[#7e012d] text-[#7e012d] rounded-full">{skill}</div>
                ))}
              </div>
            </div>

            {/* Preferences Section */}
            <div className="p-6 md:p-4">
              <strong>Preferences</strong>
              <div className="flex flex-wrap gap-4 mt-2">
                {user?.preferences?.map((preference, index) => (
                  <div key={index} className="px-6 py-2 border border-[#7e012d] text-[#7e012d] rounded-full">{preference}</div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="p-6 md:p-4">
              <strong>Experience</strong>
              <p className="text-[#7A7685]">
                {user?.experience?.years} years / {user?.experience?.consultations}+ consultations
              </p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Posts</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleSwipe(postsSwiperRef, "prev")}
                className="w-10 h-10 rounded-full hover:border-[#7e012d] border-2"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={() => handleSwipe(postsSwiperRef, "next")}
                className="w-10 h-10 rounded-full hover:border-[#7e012d] border-2"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={(swiper) => (postsSwiperRef.current = swiper)}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {posts.map((post, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg shadow-md p-4 relative">
                  <img
                    src={post.image || "https://i.ibb.co/NNrkBBv/a-young-asian-woman-walking-inside-a-modern-wooden-building-1536x1024-3-1.png"}
                    alt="Post Image"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button className="absolute top-6 right-6 bg-white text-[#2D2638] p-1 rounded hover:bg-[#BAA7FC2E] hover:text-white hover:scale-110 transition duration-300">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <p className="text-sm text-[#7A7685] mt-2">{post.content}</p>
                  <p className="text-xs text-gray-500 absolute bottom-2 right-2">{post.createdAt}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Saved Section */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Saved Posts</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleSwipe(savedSwiperRef, "prev")}
                className="w-10 h-10 rounded-full hover:border-[#7e012d] border-2"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={() => handleSwipe(savedSwiperRef, "next")}
                className="w-10 h-10 rounded-full hover:border-[#7e012d] border-2"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={(swiper) => (savedSwiperRef.current = swiper)}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {saved.map((post, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg shadow-md p-4 relative">
                  <img
                    src={post.image || "https://i.ibb.co/NNrkBBv/a-young-asian-woman-walking-inside-a-modern-wooden-building-1536x1024-3-1.png"}
                    alt="Post Image"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button className="absolute top-6 right-6 bg-white text-[#2D2638] p-1 rounded hover:bg-[#BAA7FC2E] hover:text-white hover:scale-110 transition duration-300">
                    <FontAwesomeIcon icon={faBookmark} />
                  </button>
                  <p className="text-sm text-[#7A7685] mt-2">{post.content}</p>
                  <p className="text-xs text-gray-500 absolute bottom-2 right-2">{post.createdAt}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
