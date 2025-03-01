import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, fetchSavedPosts, removeSavedPost } from "../redux/userSlice";
import { editPost, deletePost } from "../redux/postSlice"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { RiArrowLeftDoubleFill, RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, posts = [], savedposts = [], status } = useSelector((state) => state.user);
  const [expandedSlides, setExpandedSlides] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const postsSwiperRef = useRef(null);
  const savedSwiperRef = useRef(null);

  const toggleDescription = (slideIndex, swiperType) => {
    setExpandedSlides((prev) => ({
      ...prev,
      [`${swiperType} - ${slideIndex}`]: !prev[`${swiperType} - ${slideIndex}`],
    }));
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchSavedPosts());
  }, [dispatch]);

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`); // Navigate to the edit page
  };


  const handleDeleteClick = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await dispatch(deletePost(postId)).unwrap();
        // Optimistically update Redux state
        dispatch(fetchUserProfile()); // Refresh user data
        dispatch({ type: "user/removePost", payload: postId }); // Manually remove from state
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };


  const handleRemoveSavedPost = (postId) => {
    if (!postId) {
      console.error("Post ID is undefined");
      return;
    }
    const token = localStorage.getItem("token"); // Ensure token is retrieved
    dispatch(removeSavedPost({ postId, token }));
    dispatch(fetchSavedPosts());
  };

  const toTitleCase = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };


  const handleSwipe = (swiperRef, direction) => {
    if (!swiperRef.current) return;
    direction === "next" ? swiperRef.current.slideNext() : swiperRef.current.slidePrev();
  };


  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="text-black bg-[#f6f6f6] p-6">

      <div className="mx-auto h-full bg-[#f6f6f6] px-6 sm:px-10 lg:px-20 py-10">

        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row md:flex-row gap-8 rounded-lg">
          {/* Left Profile Card */}
          <div className="relative flex flex-col items-center justify-center gap-8 w-full lg:w-1/3 md:1/2 bg-white shadow rounded-lg text-center p-6">
            <Link to="/home" className="absolute top-2 left-2 text-[#2D2638] p-2 rounded transition duration-300 hover:scale-110">
              <RiArrowLeftDoubleFill className="mb-2 text-2xl" />
            </Link>
            {/* Link to EditProfile Page */}
            <Link to="/edit-profile" className="absolute top-2 right-2 text-[#2D2638] p-2 rounded transition duration-300 hover:scale-110">
              <BiSolidEditAlt className="mb-2 text-2xl" />
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
              <div className="bg-[#f4f4f4] p-6 rounded-lg md:p-4">
                <p className="text-lg md:text-md">Interests</p>
                <p className="text-5xl font-semibold md:text-4xl">{user?.interests || 0}</p>
              </div>
              <div className="bg-[#f4f4f4] p-6 rounded-lg md:p-4">
                <p className="text-lg md:text-md">Impressions</p>
                <p className="text-5xl font-semibold md:text-4xl">{user?.impressions || 0}</p>
              </div>
            </div>
            <button className="bg-[#7e012d] text-white px-4 py-2 rounded-full w-1/2 border-2 border-transparent hover:border-purple-500 transition duration-300">
              Log Out
            </button>
          </div>

          {/* Right Info Section */}
          <div className="w-full lg:w-2/3">
            <div className="p-6 md:p-4">
              <h2 className="text-lg font-semibold mt-4">{toTitleCase(user?.name)}</h2>
              <p className="text-[#7A7685]">{user?.email}</p>
            </div>
            {/* Address & Map */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6 md:gap-0">
              <div className="p-6 md:p-4">
                <strong>{toTitleCase(user?.location)} {user?.location?.country}</strong>
                <p className="text-[#7A7685]">
                  {user?.location?.address} <br />
                  {user?.location?.city} {user?.location?.state} {user?.location?.zipCode}

                </p>
              </div>

              <div className="right-content w-full md:w-1/2">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(user?.location)}&output=embed`}
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
                  <div key={index} className="px-6 py-2 border border-[#7e012d] text-[#7e012d] rounded-full">{toTitleCase(skill)}</div>
                ))}
              </div>
            </div>

            {/* Preferences Section */}
            <div className="p-6 md:p-4">
              <strong>Preferences</strong>
              <div className="flex flex-wrap gap-4 mt-2">
                {user?.preferences?.map((preference, index) => (
                  <div key={index} className="px-6 py-2 border border-[#7e012d] text-[#7e012d] rounded-full">{toTitleCase(preference)}</div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="p-6 md:p-4">
              <strong>Experience</strong>
              <p className="text-[#7A7685]">
                {user?.experience} years
              </p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-10 ">
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
            {posts.map((post, index) => {
              const baseURL = "http://localhost:5000/"; // Change this to match your backend URL
              const imageUrl = post.image ? `${baseURL}${post.image}` : "https://via.placeholder.com/150";

              console.log(imageUrl);

              return (

                <SwiperSlide key={index}>
                  <div className="bg-white rounded-lg shadow-md p-4 relative mb-4">
                    <img
                      src={imageUrl}
                      alt="Post Image"
                      className="w-full h-[130px] object-cover rounded-lg"
                    />
                    <div className="absolute top-6 right-6 flex gap-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(post._id)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                      >
                        <BiSolidEdit />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(post._id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300"
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>

                    <p className="text-sm text-[#7A7685] mt-2 mb-2">
                      {expandedSlides[`main - ${index}`] ? (
                        <>
                          {post.content}
                          <button
                            onClick={() => toggleDescription(index, "main")}
                            className="text-blue-400 md:text-sm sm:text-xs max-sm:text-xs inline-block ml-1 hover:underline"
                          >
                            Show Less
                          </button>
                        </>
                      ) : (
                        <>
                          {post.content?.substring(0, 20)}...
                          <button
                            onClick={() => toggleDescription(index, "main")}
                            className="text-blue-400 md:text-sm sm:text-xs max-sm:text-xs inline-block ml-1 hover:underline"
                          >
                            Read More
                          </button>
                        </>
                      )}
                    </p>

                    <p className="text-xs text-gray-500 absolute bottom-0 right-2 mb-2">
                      {post.createdAt}
                    </p>
                  </div>
                </SwiperSlide>

              );
            })}
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
          {status === "loading" ? (
            <p>Loading saved posts...</p>
          ) : savedposts.length === 0 ? (
            <p>No saved posts found.</p>
          ) : (
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

              {savedposts.map((post, index) => {

                const baseURL = "http://localhost:5000/"; // Change this to match your backend URL
                const imageUrl = post.image ? `${baseURL}${post.image} ` : "https://via.placeholder.com/150";
                console.log(imageUrl);
                return (
                  < SwiperSlide key={index} >
                    <div className="bg-white rounded-lg shadow-md p-4 relative mb-4">
                      <img
                        src={imageUrl}
                        alt="Post Image"
                        className="w-full h-[130px] object-cover rounded-lg"
                      />
                      <button onClick={() => handleRemoveSavedPost(post._id)} className="absolute top-6 right-6 bg-white text-[#2D2638] p-1 rounded hover:bg-[#BAA7FC2E] hover:text-white hover:scale-110 transition duration-300">
                        <FaRegBookmark />
                      </button>
                      <p className="text-sm text-[#7A7685] mt-2 mb-2">
                        {expandedSlides[`thumb - ${index}`] ? (
                          <>
                            {post.content}
                            <button
                              onClick={() => toggleDescription(index, "thumb")}
                              className="text-blue-400 md:text-sm sm:text-xs max-sm:text-xs inline-block ml-1 hover:underline"
                            >
                              Show Less
                            </button>
                          </>
                        ) : (
                          <>
                            {post.content?.substring(0, 20)}...
                            <button
                              onClick={() => toggleDescription(index, "thumb")}
                              className="text-blue-400 md:text-sm sm:text-xs max-sm:text-xs inline-block ml-1 hover:underline"
                            >
                              Read More
                            </button>
                          </>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 absolute bottom-0 right-2 mb-2">{post.createdAt}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div >
    </div >
  );
};

export default UserProfile;