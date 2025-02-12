import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faExternalLinkAlt,
  faPen,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SingleProfile = () => {
  const posts = Array(8).fill({
    img: "https://i.ibb.co/NNrkBBv/a-young-asian-woman-walking-inside-a-modern-wooden-building-1536x1024-3-1.png",
    desc: "Lorem ipsum dolor sit the arfaciliytb be kind amet, consectetur",
    date: "1/2/2034",
  });

  const postsSwiperRef = useRef(null);

  const handleSwipe = (swiperRef, direction) => {
    if (!swiperRef.current) return;
    direction === "next"
      ? swiperRef.current.slideNext()
      : swiperRef.current.slidePrev();
  };

  // Dropdown state for profile menu
  const [showOptions, setShowOptions] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-options-container")) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-[#2D2638] text-white flex flex-col items-center overflow-x-hidden">
      {/* Profile Section */}
      <div className="p-6 relative w-full">
        {/* Options Button */}
        <div className="absolute top-6 right-6 profile-options-container">
          <button
            className="text-gray-400 hover:text-gray-200 lg:px-20 py-2 sm:px-10 text-lg transform hover:scale-125 transition duration-100"
            onClick={() => setShowOptions(!showOptions)}
          >
            <FontAwesomeIcon icon={faEllipsisV} size="xl" />
          </button>

          {/* Options Dropdown */}
          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-50">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Option 1
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Option 2
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Option 3
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <img
            src="https://i.ibb.co/WpXfyPL/Ellipse-2.png"
            alt=""
            className="w-24 h-24 rounded-full border-8 border-[#BAA7FC2E]"
          />
          <h2 className="text-2xl font-bold">John Anderson</h2>
          <p className="font-semibold">
            <a
              href="https://www.google.com/maps?q=Colorado,USA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Colorado, USA <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </p>
          <p className="text-gray-400">5245 Olde Wadsworth Boulevard</p>
          <p className="text-gray-400">Arvada, CO 80102</p>
          <p className="text-gray-400">(469) 624-6708</p>
        </div>
      </div>

      <div className=" flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-4 sm:gap-8 mt-6 relative overflow-visible">
        {[
          {
            title: "Skills",
            description: "React.js, JavaScript, TailwindCSS, Redux",
          },
          {
            title: "Preferences",
            description: "Dark mode, Minimal UI, Accessibility",
          },
          {
            title: "Experience",
            description: "Frontend Developer at XYZ, 3+ years experience",
          },
        ].map((item, index) => (
          <div key={index} className="relative">
            <div className=" w-60 px-6 py-3  text-white rounded-lg flex flex-col items-center justify-center bg-[#3D3450]">
              <h3 className="font-semibold">{item.title}</h3>
              <p className=" text-sm text-gray-300 text-center">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Posts Section */}
      <div className="w-full mt-10 px-10 lg:px-20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Posts</h3>
          <div className="flex gap-2">
            <button
              onClick={() => handleSwipe(postsSwiperRef, "prev")}
              className="w-10 h-10 rounded-full hover:border-purple-500 border-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              onClick={() => handleSwipe(postsSwiperRef, "next")}
              className="w-10 h-10 rounded-full hover:border-purple-500 border-2"
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
          className="pb-6"
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {posts.map((post, index) => (
            <SwiperSlide
              key={index}
              className="bg-[#BAA7FC2E] rounded-lg shadow-md p-4 relative"
            >
              <img
                src={post.img}
                alt=""
                className="w-full h-40 object-cover rounded-lg"
              />
              <button className="absolute top-6 right-6 bg-white text-[#2D2638] p-1 rounded hover:bg-[#BAA7FC2E] hover:text-white hover:scale-110 transition duration-300">
                <FontAwesomeIcon icon={faPen} />
              </button>
              <p className="text-sm text-gray-300 mt-2">{post.desc}</p>
              <p className="text-xs text-white absolute bottom-2 right-2">
                {post.date}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SingleProfile;