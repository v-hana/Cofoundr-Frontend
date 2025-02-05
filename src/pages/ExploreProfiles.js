import React, { useState, useRef } from "react";
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

  const toggleDescription = (slideIndex, swiperType) => {
    setExpandedSlides((prev) => ({
      ...prev,
      [`${swiperType} - ${slideIndex}`]: !prev[`${swiperType} - ${slideIndex}`], // Keep state unique for each Swiper
    }));
  };

  return (

    <div className=" h-full bg-[#BAA7FC2E] text-white rounded-2xl shadow-lg p-4 border border-[#D9D9D9]">

      <div className=" relative flex flex-col items-center mb-4 ">
        <div className="w-full absolute top-3  flex justify-end space-x-3">
          <button className="w-8 h-8  rounded-full border-2 border-[#BAA7FC40] transition duration-300 text-[#BAA7FC40] hover:border-purple-500 hover:text-purple-500">
            <i className="fas fa-check text-xl "></i>
          </button>
          <button className="w-8 h-8  rounded-full border-2 border-[#BAA7FC40] transition duration-300 text-[#BAA7FC40] hover:border-purple-500 hover:text-purple-500">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <div className="w-20 h-20 rounded-full bg-gray-500 border border-4 border-[#BAA7FC40]" />

        <h2 className="md:text-xl sm:text-lg max-sm:text-lg font-semibold">{profile.name}</h2>
        <p className="md:text-sm sm:text-xs max-sm:text-xs text-[#7A7685]">{profile.location}</p>

      </div>
      <div className="bg-[#2D2638]">
        {/* Main Swiper */}
        <Swiper
          style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff" }}
          loop={true}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 mb-2 bg-[#BAA7FC40] p-2"
        >
          {profile.slides.map((slide, slideIndex) => (
            <SwiperSlide key={slideIndex}>
              <div className="flex flex-col items-center" style={{ width: "100%", height: "200px" }}>
                <p className="md:text-sm sm:text-xs max-sm:text-xs text-left mb-2">
                  {expandedSlides[`main - ${slideIndex}`] ? (
                    <>
                      {slide.description}
                      <button
                        onClick={() => toggleDescription(slideIndex, "main")}
                        className="text-blue-400 md:text-sm sm:text-xs max-sm:text-xs inline-block ml-1 hover:underline"
                      >
                        Show Less
                      </button>
                    </>
                  ) : (
                    <>
                      {slide.description.substring(0, 100)}...
                      <button
                        onClick={() => toggleDescription(slideIndex, "main")}
                        className="text-blue-400 md:text-sm sm:text-xs max-sm:text-xs inline-block ml-1 hover:underline"
                      > Read More
                      </button>
                    </>
                  )}
                </p>
                <img
                  src={slide.image}
                  alt={`Slide ${slideIndex + 1}`}
                  className="rounded-lg object-cover overflow-hidden"
                  style={{ width: "100%", height: "80%" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Swiper */}
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
          {profile.slides.map((slide, slideIndex) => (
            <SwiperSlide key={slideIndex} className="bg-[#BAA7FC40] p-2">
              <p className="md:text-xs sm:text-[10px] max-sm:text-[8px] leading-[0.7rem]  text-left mb-2 sm:mb-1 max-sm:mb-1 h-[40%]">
                {expandedSlides[`thumb - ${slideIndex} `] ? (
                  <>
                    {slide.description}
                    <button
                      onClick={() => toggleDescription(slideIndex, "thumb")}
                      className="text-blue-400 text-xs inline-block ml-1 hover:underline"
                    >
                      Show Less
                    </button>
                  </>
                ) : (
                  <>
                    {slide.description.substring(0, 40)}...

                  </>
                )}
              </p>
              <img src={slide.image} alt={`Thumbnail ${slideIndex + 1} `} className="rounded-lg md:w-[200px] md:h-[90px] sm:w-[180px] sm:h-[70px] max-sm:w-[180px] max-sm:h-[70px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex space-x-3 justify-end flex-center mt-4">
        <p className="text-[#D6D6D6]">See More</p>
        <button className="w-8 h-8 rounded-full border border-[#D6D6D6]">
          <i class="fas fa-angle-right text-xl text-[#D6D6D6]"></i>
        </button>
      </div >
    </div >
  );
};




const ProfileGrid = () => {
  const sections = [
    "Profiles based on preferences",
    "Profiles based on skills",
    "Profiles based on experience",
  ];

  const profilesList = [
    [
      {
        name: "John Anderson",
        location: "Colorado,USA",
        slides: [
          { description: "Loves coding and enjoys exploring new technologies. Fascinated by AI, machine learning, and web development. Hobbies include photography and traveling.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Enjoys photography and captures beautiful moments. Also likes to learn about new technologies.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
          { description: "Loves coding and enjoys exploring new technologies. Fascinated by AI, machine learning, and web development. Hobbies include photography and traveling.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Enjoys photography and captures beautiful moments. Also likes to learn about new technologies.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },

        ],
      },
      {
        name: "Sarah Smith",
        location: "Colorado,USA",
        slides: [
          { description: "Loves coding and enjoys exploring new technologies. Fascinated by AI, machine learning, and web development. Hobbies include photography and traveling.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Enjoys photography and captures beautiful moments. Also likes to learn about new technologies.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
          { description: "Loves coding and enjoys exploring new technologies. Fascinated by AI, machine learning, and web development. Hobbies include photography and traveling.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Enjoys photography and captures beautiful moments. Also likes to learn about new technologies.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
        ],
      },
      {
        name: "John Anderson",
        location: "Colorado,USA",
        slides: [
          { description: "Loves coding and enjoys exploring new technologies. Fascinated by AI, machine learning, and web development. Hobbies include photography and traveling.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Enjoys photography and captures beautiful moments. Also likes to learn about new technologies.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
        ],
      },
      {
        name: "Sarah Smith",
        location: "Colorado,USA",
        slides: [
          { description: "Creative mind, loves working on design projects. Focused on digital art, branding, and user interface designs. Enjoys experimenting with various artistic styles.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Passionate about painting and illustration. Also loves exploring new design tools and techniques.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
        ],
      },
    ],
    [
      {
        name: "Michael Johnson",
        location: "Colorado,USA",
        slides: [
          { description: "Data is everything. Deeply involved in analyzing large datasets and uncovering insights that drive business decisions. Passionate about artificial intelligence and machine learning.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Loves solving complex problems using data. Always exploring new algorithms and technologies.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
        ],
      },
      {
        name: "Emily Davis",
        location: "Colorado,USA",
        slides: [
          { description: "Design is key in user interactions. Passionate about creating seamless and intuitive user experiences. Constantly working on improving frontend interfaces and accessibility.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Focused on user experience and making sure the design is intuitive and user-friendly.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
        ],
      },
      {
        name: "Michael Johnson",
        location: "Colorado,USA",
        slides: [
          { description: "Data is everything. Deeply involved in analyzing large datasets and uncovering insights that drive business decisions. Passionate about artificial intelligence and machine learning.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Loves solving complex problems using data. Always exploring new algorithms and technologies.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
        ],
      },
      {
        name: "Emily Davis",
        location: "Colorado,USA",
        slides: [
          { description: "Design is key in user interactions. Passionate about creating seamless and intuitive user experiences. Constantly working on improving frontend interfaces and accessibility.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Focused on user experience and making sure the design is intuitive and user-friendly.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
        ],
      },
    ],
    [
      {
        name: "Michael Johnson",
        location: "Colorado,USA",
        slides: [
          { description: "Data is everything. Deeply involved in analyzing large datasets and uncovering insights that drive business decisions. Passionate about artificial intelligence and machine learning.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Loves solving complex problems using data. Always exploring new algorithms and technologies.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
        ],
      },
      {
        name: "Emily Davis",
        location: "Colorado,USA",
        slides: [
          { description: "Design is key in user interactions. Passionate about creating seamless and intuitive user experiences. Constantly working on improving frontend interfaces and accessibility.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Focused on user experience and making sure the design is intuitive and user-friendly.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
        ],
      },
      {
        name: "Michael Johnson",
        location: "Colorado,USA",
        slides: [
          { description: "Data is everything. Deeply involved in analyzing large datasets and uncovering insights that drive business decisions. Passionate about artificial intelligence and machine learning.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Loves solving complex problems using data. Always exploring new algorithms and technologies.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
        ],
      },
      {
        name: "Emily Davis",
        location: "Colorado,USA",
        slides: [
          { description: "Design is key in user interactions. Passionate about creating seamless and intuitive user experiences. Constantly working on improving frontend interfaces and accessibility.", image: "https://i.ibb.co/ncqpLN7/istockphoto-1353578807-612x612.jpg" },
          { description: "Focused on user experience and making sure the design is intuitive and user-friendly.", image: "https://i.ibb.co/Vp7Gx66/standard-quality-control-concept-m-23-2150041859.jpg" },
        ],
      },
    ],
  ];
  const swiperRefs = useRef([]);
  return (

    <div>
      {/* Navbar */}
      < Navbar />
      <hr className="border-y border-[#3B364C] h-px" />
      <div className="bg-[#2D2638] min-h-screen text-white p-8">
        <div className="max-w-7xl mx-auto">
          {sections.map((section, index) => (
            <div key={index} className="mb-12">
              <div className="flex justify-between items-center">
                <h1 className="md:text-2xl sm:text-xl max-sm:text-xl font-bold mb-6 ">{section}</h1>
                <div className="flex md:space-x-6 sm:space-x-3 max-sm:space-x-2 text-xl mb-6">
                  <button onClick={() => swiperRefs.current[index]?.slidePrev()} className="md:w-10 md:h-10 sm:w-8 sm:h-8 max-sm:w-8 max-sm:h-8 rounded-full border hover:shadow-sm hover:shadow-white"><i class="fas fa-arrow-left "></i></button>
                  <button onClick={() => swiperRefs.current[index]?.slideNext()} className="md:w-10 md:h-10 sm:w-8 sm:h-8 max-sm:w-8 max-sm:h-8 rounded-full border hover:shadow-sm hover:shadow-white"><i class="fas fa-arrow-right"></i></button>
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
                className="mySwiper"
              >
                {profilesList[index]?.map((profile, i) => (
                  <SwiperSlide key={i}>
                    <ProfileCard profile={profile} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
        </div>
      </div >
    </div >
  );
};
export default ProfileGrid;