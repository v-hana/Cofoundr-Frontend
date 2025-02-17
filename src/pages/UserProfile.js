import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faPen, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const UserProfile = () => {
  // Example data for Posts and Saved
  const posts = Array(8).fill({
    img: "https://i.ibb.co/NNrkBBv/a-young-asian-woman-walking-inside-a-modern-wooden-building-1536x1024-3-1.png",
    desc: "Lorem ipsum dolor sit the arfaciliytb be kind amet, consectetur ",
    date: "1/2/2034",
  });
  const saved = Array(8).fill({
    img: "https://i.ibb.co/NNrkBBv/a-young-asian-woman-walking-inside-a-modern-wooden-building-1536x1024-3-1.png",
    desc: "Lorem ipsum dolor sit the arfaciliytb be kind amet, consectetur  ",
  });

  const postsSwiperRef = useRef(null);
  const savedSwiperRef = useRef(null);

  const handleSwipe = (swiperRef, direction) => {
    if (!swiperRef.current) return;
    direction === "next" ? swiperRef.current.slideNext() : swiperRef.current.slidePrev();
  };
  return (
    <div className="text-white">
      <div className="mx-auto h-full bg-[#2D2638] px-6 sm:px-10 lg:px-20 py-10">
        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row md:flex-row gap-8 rounded-lg">
          {/* Left Profile Card */}
          <div className="relative flex flex-col items-center justify-center gap-8 w-full lg:w-1/3 md:1/2 bg-[#775F9E] rounded-lg text-center p-6">
            <button className="absolute top-2 right-2 text-[#2D2638] p-2 rounded transition duration-300 hover:scale-110 hover:text-purple-500">
              <FontAwesomeIcon icon={faPen} />
            </button>
            <img
              src="https://i.ibb.co/WpXfyPL/Ellipse-2.png"
              alt="Profile"
              className="w-36 h-36 rounded-full border-8 border-[#2D2638]"
            />

            {/* Profile Views */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="bg-[#2D2638] p-6 rounded-lg md:p-4">
                    <p className="text-lg md:text-md">Profile Views</p>
                    <p className="text-5xl font-semibold md:text-4xl">112</p>
                  </div>
                ))}
            </div>

            <button className="bg-[#2D2638] px-4 py-2 rounded-full w-1/2 border-2 border-transparent hover:border-purple-500 transition duration-300">
              Log Out
            </button>
          </div>

          {/* Right Info Section */}
          <div className="w-full lg:w-2/3">
            {/* Details */}
            <div className="p-6 md:p=4">
              <h2 className="text-lg font-semibold mt-4">John Anderson</h2>
              <p className="text-[#7A7685]">example@gmail.com</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6 md:gap-0">
              <div className="p-6 md:p-4">
                <strong>Colorado, USA</strong>
                <p className="text-[#7A7685]">
                  5245 Olde Wadsworth Boulevard <br />
                  Arvada, CO 80102
                  <br />
                  (469) 624-6708
                </p>
              </div>

              <div className="right-content w-full md:w-1/2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12626.249794535688!2d-122.41941876394634!3d37.77492957902448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c1fae5d47%3A0x10134b4722723218!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1674290287950!5m2!1sen!2sus"
                  className="w-full h-48 rounded-lg"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map"
                ></iframe>
              </div>
            </div>
            <div className="p-6 md:p-4">
              <strong>Skills</strong>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="px-6 py-2 bg-[#BAA7FC2E] rounded-full">Node.js</div>
                <div className="px-6 py-2 bg-[#BAA7FC2E] rounded-full">React</div>
                <div className="px-6 py-2 bg-[#BAA7FC2E] rounded-full">JavaScript</div>
              </div>
            </div>
            <div className="p-6 md:p-4">
              <strong>Preferences</strong>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="px-6 py-2 bg-[#BAA7FC2E] rounded-full">Node.js</div>
                <div className="px-6 py-2 bg-[#BAA7FC2E] rounded-full">React</div>
                <div className="px-6 py-2 bg-[#BAA7FC2E] rounded-full">JavaScript</div>
              </div>
            </div>
            <div className="p-6 md:p-4">
              <strong>Experience</strong>
              <p className="text-[#7A7685]">
                10 years / 1000+ consultations
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
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {posts.map((post, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#BAA7FC2E] rounded-lg shadow-md p-4 relative">
                  <img
                    src={post.img}
                    alt=""
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button className="absolute top-6 right-6 bg-white text-[#2D2638] p-1 rounded hover:bg-[#BAA7FC2E] hover:text-white hover:scale-110 transition duration-300">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <p className="text-sm text-gray-300 mt-2">{post.desc}</p>
                  <p className="text-xs text-gray-500 absolute bottom-2 right-2">{post.date}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Saved Section */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Saved</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleSwipe(savedSwiperRef, "prev")}
                className="w-10 h-10 rounded-full hover:border-purple-500 border-2"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={() => handleSwipe(savedSwiperRef, "next")}
                className="w-10 h-10 rounded-full hover:border-purple-500 border-2"
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
            {saved.map((saved, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#BAA7FC2E] rounded-lg shadow-md p-4 relative">
                  <img
                    src={saved.img}
                    alt=""
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button className="absolute top-6 right-6 bg-white text-[#2D2638] p-1 rounded hover:bg-[#BAA7FC2E] hover:text-white hover:scale-110 transition duration-300">
                    <FontAwesomeIcon icon={faBookmark} />
                  </button>
                  <p className="text-sm text-gray-300 mt-2">{saved.desc}</p>
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