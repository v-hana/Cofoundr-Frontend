import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExploreProfiles } from "../redux/exploreProfileSlice";
import Navbar from "../components/Navbar2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProfileCard = ({ profile }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [expandedSlides, setExpandedSlides] = useState({});
  const baseURL = "http://localhost:5000/";

  const toggleDescription = (slideIndex, swiperType) => {
    setExpandedSlides((prev) => ({
      ...prev,
      [`${swiperType} - ${slideIndex}`]: !prev[`${swiperType} - ${slideIndex}`],
    }));
  };

  const getImageUrl = (imagePath) => {
    return imagePath ? `${baseURL}${imagePath}` : "https://via.placeholder.com/150";
  };

  return (
    <div className="h-full bg-[#fdfdfd] text-white rounded-2xl shadow-lg p-4 border border-[#D9D9D9]">
      <div className="relative flex flex-col items-center mb-4">
        <div className="w-20 h-20 rounded-full bg-gray-500 border-4 border-[#BAA7FC40]" />
        <h2 className="md:text-xl sm:text-lg max-sm:text-lg font-semibold text-[#010101]">
          {profile.name}
        </h2>
        <p className="md:text-sm sm:text-xs max-sm:text-xs text-[#010101b8]">
          {profile.location}
        </p>
      </div>
      <div className="bg-[#b7b0b0]">
        {profile?.posts && profile.posts.length > 0 ? (
          <>
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              loop={true}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2 mb-2 bg-[#d8d0d0] p-2"
            >
              {profile.posts.map((post, slideIndex) => (
                <SwiperSlide key={slideIndex}>
                  <div className="flex flex-col items-center" style={{ width: "100%", height: "200px" }}>
                    <p className="md:text-sm sm:text-xs max-sm:text-xs text-left mb-2 text-[#010101]">
                      {expandedSlides[`main - ${slideIndex}`] ? (
                        <>
                          {post.content}
                          <button
                            onClick={() => toggleDescription(slideIndex, "main")}
                            className="text-blue-400 md:text-sm sm:text-xs max-sm:text-xs inline-block ml-1 hover:underline"
                          >
                            Show Less
                          </button>
                        </>
                      ) : (
                        <>
                          {post.content?.substring(0, 100)}...
                          <button
                            onClick={() => toggleDescription(slideIndex, "main")}
                            className="text-blue-400 md:text-sm sm:text-xs max-sm:text-xs inline-block ml-1 hover:underline"
                          >
                            Read More
                          </button>
                        </>
                      )}
                    </p>
                    <img
                      src={getImageUrl(post.image)}
                      alt={`Slide ${slideIndex + 1}`}
                      className="rounded-lg object-cover overflow-hidden"
                      style={{ width: "100%", height: "80%" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={3}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {profile.posts.map((post, slideIndex) => (
                <SwiperSlide key={slideIndex} className="bg-[#d8d0d0] p-2">
                  <p className="md:text-xs sm:text-[10px] max-sm:text-[8px] leading-[0.7rem] text-left mb-2 sm:mb-1 max-sm:mb-1 h-[40%] text-[#010101]">
                    {expandedSlides[`thumb - ${slideIndex}`] ? (
                      <>
                        {post.content}
                        <button
                          onClick={() => toggleDescription(slideIndex, "thumb")}
                          className="text-blue-400 text-xs inline-block ml-1 hover:underline"
                        >
                          Show Less
                        </button>
                      </>
                    ) : (
                      <>{post.content?.substring(0, 40)}...</>
                    )}
                  </p>
                  <img
                    src={getImageUrl(post.image)}
                    alt={`Thumbnail ${slideIndex + 1}`}
                    className="rounded-lg md:w-[200px] md:h-[90px] sm:w-[180px] sm:h-[70px] max-sm:w-[180px] max-sm:h-[70px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <p className="text-center text-gray-500">No posts available</p>
        )}
      </div>
      <div className="flex space-x-3 justify-center flex-center mt-4">
        <button className="px-4 py-2 rounded-md border bg-[#7e012d] text-white hover:bg-[#7e012dab]">
          Accept
        </button>
        <button className="px-4 py-2 rounded-md border border-[#7e012d] text-[#7e012d] hover:bg-[#7e012d] hover:text-white ml-2">
          Decline
        </button>
      </div>
    </div>
  );
};

const ExploreProfile = () => {
  const dispatch = useDispatch();
  const { preferencesProfiles, skillsProfiles, locationProfiles, status } = useSelector((state) => state.exploreProfiles);
  const swiperRefs = useRef([]);

  useEffect(() => {
    dispatch(fetchExploreProfiles());
  }, [dispatch]);

  if (status === "loading") return <p>Loading profiles...</p>;
  if (status === "failed") return <p>Failed to load profiles.</p>;

  const sections = [
    { title: "Profiles based on preferences", profiles: preferencesProfiles },
    { title: "Profiles based on skills", profiles: skillsProfiles },
    { title: "Profiles based on location", profiles: locationProfiles },
  ];

  return (
    <div>
      <Navbar />
      <hr className="border-y border-[#e2e2e2] h-px" />
      <div className="bg-[#f6f6f6] min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {sections?.map((section, index) => (
            <div key={index} className="mb-12">
              <div className="flex justify-between items-center">
                <h1 className="md:text-2xl sm:text-xl max-sm:text-xl font-bold mb-6 text-[#010101]">
                  {section.title}
                </h1>
                <div className="flex md:space-x-6 sm:space-x-3 max-sm:space-x-2 text-xl mb-6">
                  <button
                    onClick={() => swiperRefs.current[index]?.slidePrev()}
                    className="md:w-10 md:h-10 sm:w-8 sm:h-8 max-sm:w-8 max-sm:h-8 text-[#010101] rounded-full border border-[#010101] hover:shadow-sm hover:shadow-white"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </button>
                  <button
                    onClick={() => swiperRefs.current[index]?.slideNext()}
                    className="md:w-10 md:h-10 sm:w-8 sm:h-8 max-sm:w-8 max-sm:h-8 text-[#010101] rounded-full border border-[#010101] hover:shadow-sm hover:shadow-white"
                  >
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <Swiper
                onSwiper={(swiper) => (swiperRefs.current[index] = swiper)}
                loop={true}
                spaceBetween={20}
                slidesPerView={2}
                modules={[Navigation]}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 1.2 },
                  768: { slidesPerView: 1.5 },
                  1024: { slidesPerView: 2 },
                }}
                className="mySwiper pb-8"
              >
                {section.profiles.map((profile) => (
                  <SwiperSlide key={profile._id}>
                    <ProfileCard profile={profile} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreProfile;